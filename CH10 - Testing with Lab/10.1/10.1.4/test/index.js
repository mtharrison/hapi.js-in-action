const Assert = require('assert');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

lab.test('setTimeout() should cause a delay', function (done) {

    var start = Date.now();

    setTimeout(function () {

        Assert(Date.now() - start > 1000);
        done();
    }, 1000);
});

