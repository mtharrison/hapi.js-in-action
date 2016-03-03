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


experiment('Chapter 5', () => {

    experiment('5.1', () => {

        test('5.1.1', (done) => {

            setup('5.1.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();

                    expect(res.statusCode).to.equal(403);
                    expect(getStreamBuffer(stdout)).to.include('Blocking request from 127.0.0.1. Within blocked subnet 127.0.0.0/8');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('5.2', () => {

        test('5.2.1', (done) => {

            setup('5.2.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();

                    expect(res.statusCode).to.equal(202);
                    expect(res.headers['x-powered-by']).to.equal('hapi');
                    expect(getStreamBuffer(stdout)).to.include('{ \'content-type\': \'text/plain\', \'x-powered-by\': \'hapi\' }').and.to.include('202');
                    cleanup(child, done);
                });
            });
        });

        test('5.2.3', (done) => {

            setup('5.2.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.request('GET', 'http://localhost:4000/video', {}, (err, res) => {

                    expect(err).to.not.exist();

                    expect(res.statusCode).to.equal(200);
                    expect(res.headers['content-type']).to.equal('video/mp4');

                    setTimeout(() => {

                        expect(getStreamBuffer(stdout)).to.include('bytes written to response');
                        cleanup(child, done);
                    }, 1000);
                });
            });
        });
    });

    experiment('5.3', () => {

        test('5.3.1', (done) => {

            setup('5.3.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                expect(getStreamBuffer(stdout)).to.equal('Error\nWoops, wasn’t supposed to do that!\n');
                cleanup(child, done);
            });
        });

        test('5.3.2', (done) => {

            setup('5.3.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/error', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('Internal server error');
                    expect(res.statusCode).to.equal(500);

                    Wreck.get('http://localhost:4000/js-error', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.equal('{"statusCode":500,"error":"Internal Server Error","message":"An internal server error occurred"}');
                        expect(res.statusCode).to.equal(500);
                        cleanup(child, done);
                    });
                });
            });
        });

        test('5.3.3', (done) => {

            setup('5.3.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/v4/users', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('Not Implemented');
                    expect(res.statusCode).to.equal(501);

                    cleanup(child, done);
                });
            });
        });

        test('5.3.4', (done) => {

            setup('5.3.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/error', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('<h2>Internal Server Error</h2>');
                    expect(res.statusCode).to.equal(500);

                    Wreck.get('http://localhost:4000/newFeature', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.include('<h2>Not Implemented</h2>');
                        expect(res.statusCode).to.equal(501);

                        Wreck.get('http://localhost:4000/name/jon', (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.include('<h2>Bad Request</h2>');
                            expect(res.statusCode).to.equal(400);

                            Wreck.get('http://localhost:4000/name/matt', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(payload.toString()).to.include('OK');
                                expect(res.statusCode).to.equal(200);

                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });
    });
});
