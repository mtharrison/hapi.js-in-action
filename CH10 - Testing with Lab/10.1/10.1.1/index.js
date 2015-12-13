'use strict';

// Run globally:
// `npm install -g lab && lab index.js`

const Assert = require('assert');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

lab.test('addition should add two numbers together', (done) => {

    Assert(1 + 1 === 10);
    done();
});
