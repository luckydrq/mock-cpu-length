# mock-cpu-length
Mock os.cpus().length in CI env(`!!process.env.CI === true`). It often gets wrong CPU core length when using `os.cpus().length` in some CI environments due to containerized technology such as [CPU share](https://docs.docker.com/config/containers/resource_constraints/). It would affect how many child processes should be forked/spawned and cause huge performance issue in Node.js.

# Usage
Notice: This package only has impact in CI.

```js
const os = require('os');
const { mockCPULength, resetCPULength } = require('mock-cpu-length');

process.env.CI = true;

mockCPULength(2);
console.log(os.cpus().length); // print `2`

mockCPULength(3);
console.log(os.cpus().length); // print `3`

resetCPULength();
console.log(os.cpus().length); // print the actual CPU cores number
```

# License
MIT
