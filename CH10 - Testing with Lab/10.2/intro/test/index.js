const Assert = require('assert');
const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const test = lab.test;

const headers = {
    accept: '...'
};

lab.test('ensure headers is correct format', function (done) {

    Assert(typeof headers === 'object');
    Assert('content-type' in headers);
    Assert('accept' in headers);
    done();
});

lab.test('ensure headers is correct format', function (done) {

    expect(headers).to.be.an.object().and.contain(['accept', 'content-type']);
    done();
});

