'use strict';

const Assert = require('assert');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

lab.experiment('basic arithmetic', () => {

    lab.test('+ should add numbers together', (done) => {

        Assert(1 + 1 === 2);
        done();
    });

    lab.test('- should subtract numbers', (done) => {

        Assert(10 - 2 === 8);
        done();
    });

});

lab.experiment('modular arithmetic', () => {

    lab.test('% should perform modulus', (done) => {

        Assert((5 + 3) % 6 === 2);
        done();
    });
});
