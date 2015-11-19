const Assert = require('assert');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

lab.experiment('basic arithmetic', function () {

    lab.test('+ should add numbers together', function (done) {

        Assert(1 + 1 === 2);
        done();
    });

    lab.test('- should subtract numbers', function (done) {

        Assert(10 - 2 === 8);
        done();
    });

});

lab.experiment('modular arithmetic', function () {

    lab.test('% should perform modulus', function (done) {

        Assert((5 + 3) % 6 === 2);
        done();
    });
});
