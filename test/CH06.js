'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const TestUtils = require('./utils');
const Wreck = require('wreck');

// Test shortcuts

const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;
const expect = Code.expect;

const setup = TestUtils.setup;
const cleanup = TestUtils.cleanup;
const getStreamBuffer = TestUtils.getStreamBuffer;


experiment('Chapter 6', () => {

    experiment('6.1', () => {

        test('6.1.2', (done) => {

            setup('6.1.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                expect(getStreamBuffer(stdout)).to.include('Validation success!');
                expect(getStreamBuffer(stderr)).to.include('ValidationError');
                cleanup(child, done);
            });
        });

        test('6.1.3', (done) => {

            setup('6.1.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                expect(getStreamBuffer(stderr)).to.include('"windDirection" must be one of [N, NE, E, SE, S, SW, W, NW]');
                cleanup(child, done);
            });
        });
    });

    experiment('6.2', () => {

        test('6.2.3', (done) => {

            setup('6.2.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                expect(getStreamBuffer(stderr)).to.include('"value" must be a number');
                cleanup(child, done);
            });
        });
    });

    experiment('6.3', () => {

        test('6.3.1', (done) => {

            setup('6.3.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/products/1', (err, res, payload) => {

                    expect(err).to.not.exist();

                    expect(res.statusCode).to.equal(200);

                    Wreck.get('http://localhost:4000/products/cheese', (err, res, payload) => {

                        expect(err).to.not.exist();

                        expect(res.statusCode).to.equal(400);
                        cleanup(child, done);
                    });
                });
            });
        });

        test('6.3.2', (done) => {

            setup('6.3.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const payload = JSON.stringify({
                    something: 'else'
                });

                Wreck.post('http://localhost:4000/reports', { payload }, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(400);

                    payload = JSON.stringify({
                        station: 'something',
                        datetime: 'Thu Mar 03 2016 21:52:18 GMT+0000 (GMT)',
                        temp: 0,
                        humidity: 20,
                        precipitation: false,
                        windDirection: 'N'
                    });

                    Wreck.post('http://localhost:4000/reports', { payload }, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        cleanup(child, done);
                    });
                });
            });
        });

        test('6.3.3', (done) => {

            setup('6.3.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/people/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(JSON.parse(payload.toString())).to.deep.equal({
                        firstName: 'Xiang',
                        lastName: 'Zheng',
                        age: 48,
                        location: 'Singapore',
                        dob: '1967-03-02'
                    });
                    expect(res.statusCode).to.equal(200);

                    Wreck.get('http://localhost:4000/people/2', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(500);

                        cleanup(child, done);
                    });
                });
            });
        });

        test('6.3.4', (done) => {

            setup('6.3.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.post('http://localhost:4000/5', { headers: { test: 'something' } }, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(400);
                    expect(payload.toString()).to.equal('headers contained an invalid field.');

                    cleanup(child, done);
                });
            });
        });
    });

    experiment('6.4', () => {

        test('6.4.3', (done) => {

            setup('6.4.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString()).to.include('<title>Registration form</title>');

                    Wreck.get('http://localhost:4000/success', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString()).to.include('<h2>Thanks, we\'ll be in touch soon</h2>');

                        cleanup(child, done);
                    });
                });
            });
        });

        test('6.4.4', (done) => {

            setup('6.4.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString()).to.include('<title>Registration form</title>');

                    Wreck.get('http://localhost:4000/success', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString()).to.include('<h2>Thanks, we\'ll be in touch soon</h2>');

                        cleanup(child, done);
                    });
                });
            });
        });

        test('6.4.5', (done) => {

            setup('6.4.5', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString()).to.include('<title>Registration form</title>');

                    Wreck.get('http://localhost:4000/success', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString()).to.include('<h2>Thanks, we\'ll be in touch soon</h2>');

                        payload = JSON.stringify({
                            name: 12
                        });

                        Wreck.post('http://localhost:4000/', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(400);
                            expect(payload.toString()).to.include('&quot;name&quot; must be a string');

                            payload = JSON.stringify({
                                name: 'Matt',
                                email: 'matt@something.com',
                                age: '30',
                                tshirt: 'L'
                            });

                            Wreck.post('http://localhost:4000/', { payload }, (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(302);

                                payload = JSON.stringify({
                                    name: 'Matt',
                                    email: 'matt@something.com',
                                    age: '030',
                                    tshirt: 'L'
                                });

                                Wreck.post('http://localhost:4000/', { payload }, (err, res, payload) => {

                                    expect(err).to.not.exist();
                                    expect(res.statusCode).to.equal(400);
                                    expect(payload.toString()).to.include('should be a numeric string with no leading zeros');

                                    cleanup(child, done);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
