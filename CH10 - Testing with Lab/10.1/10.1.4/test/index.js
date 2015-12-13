'use strict';

const Assert = require('assert');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

lab.test('setTimeout() should cause a delay', (done) => {

    const start = Date.now();

    setTimeout(() => {

        Assert(Date.now() - start > 1000);
        done();
    }, 1000);
});
