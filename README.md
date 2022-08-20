# mock-cpu-length
Mock os.cpus().length in CI env(`!!process.env.CI === true`).

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
