'use strict';

const Assert = require('assert');
const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const test = lab.test;

const headers = {
    accept: '...'
};

test('ensure headers is correct format', (done) => {

    Assert(typeof headers === 'object');
    Assert('content-type' in headers);
    Assert('accept' in headers);
    done();
});

test('ensure headers is correct format', (done) => {

    expect(headers).to.be.an.object().and.contain(['accept', 'content-type']);
    done();
});
