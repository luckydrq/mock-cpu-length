'use strict';

const assert = require('assert');
const os = require('os');
const { mockCPULength, resetCPULength } = require('../index');

const actualCPULength = os.cpus().length;

describe('test/index.test.js', () => {
  it('should mock cpus length in CI ENV', () => {
    process.env.CI = true;

    mockCPULength(2);
    const cpus = os.cpus();
    assert.notEqual(actualCPULength, cpus.length);
    assert.equal(cpus.length, 2);

    // should not affect others
    assert.equal(!!cpus[3], true);

    // 重置CPU数量
    resetCPULength();
    assert.equal(actualCPULength, os.cpus().length);

    delete process.env.CI;
  });

  it('should have no impact when not in CI ENV', () => {
    mockCPULength(2);
    const cpus = os.cpus();
    assert.equal(actualCPULength, cpus.length);

    // should not affect others
    assert.equal(!!cpus[3], true);
  });

  it('should reset when mockCPULength is called again', () => {
    process.env.CI = true;

    mockCPULength(2);
    let cpus = os.cpus();
    assert.notEqual(actualCPULength, cpus.length);
    assert.equal(cpus.length, 2);

    mockCPULength(3);
    cpus = os.cpus();
    assert.notEqual(actualCPULength, cpus.length);
    assert.equal(cpus.length, 3);

    // 重置CPU数量
    resetCPULength();
    assert.equal(actualCPULength, os.cpus().length);

    delete process.env.CI;
  });
});
