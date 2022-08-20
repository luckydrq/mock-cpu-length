'use strict';

const os = require('os');

function isCI() {
  return !!process.env.CI;
}

exports.mockCPULength = function mockCPULength(length) {
  if (!isCI()) {
    return;
  }

  if (typeof length !== 'number') {
    throw new TypeError('length must be a number!');
  }

  const originCPUs = os.__originCpus || os.cpus;
  if (os.cpus.__mocked) {
    console.warn(`cpus length has already been mocked to ${os.cpus.__mocked_length}, now resetting to ${length}`);
  }

  const newCPUs = function() {
    const result = originCPUs();
    return new Proxy(result, {
      get(target, prop) {
        if (prop === 'length') {
          return length;
        }
        return target[prop];
      },
    });
  };
  newCPUs.__mocked = true;
  newCPUs.__mocked_length = length;

  os.cpus = newCPUs;
  os.__originCpus = originCPUs;
};

exports.resetCPULength = function resetCPULength() {
  if (os.cpus.__mocked) {
    os.cpus = os.__originCpus;
    delete os.__originCpus;
    delete os.cpus.__mocked;
    delete os.cpus.__mocked_length;
  }
};
