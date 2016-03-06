'use strict';

// Load modules

const Code = require('code');
const Fs = require('fs');
const Lab = require('lab');
const Path = require('path');
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


experiment('Chapter 11', () => {

    experiment('11.1', () => {

        test('11.1.1', (done) => {

            setup('11.1.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                expect(getStreamBuffer(stdout)).to.include('Server started!\n');
                cleanup(child, done);
            });
        });

        test('11.1.2', (done) => {

            setup('11.1.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(getStreamBuffer(stderr)).to.include('Debug: my-log-tag')
                        .and.to.include('Wohoo, the server has started!')
                        .and.to.include('Debug: my-request-tag')
                        .and.to.include('Got a request')
                        .and.to.include('Debug: handler');
                    cleanup(child, done);
                });
            });
        });

        test('11.1.3', (done) => {

            setup('11.1.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(getStreamBuffer(stdout)).to.include('[log,my-log-tag], data: Wohoo, the server has started!')
                        .and.to.include('[request,my-request-tag], data: Got a request');

                    cleanup(child, done);
                });
            });
        });

        test('11.1.4', (done) => {

            const base = Path.join(__dirname, '../CH11 - hapi in Production/11.1/11.1.4');
            const debug = Path.join(base, 'debug.log');
            const error = Path.join(base, 'error.log');

            // truncate the files

            Fs.writeFileSync(debug, '');
            Fs.writeFileSync(error, '');

            setup('11.1.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();

                    setTimeout(() => {

                        expect(Fs.readFileSync(debug).toString().split('\n').length).to.equal(4);
                        expect(Fs.readFileSync(error).toString().split('\n').length).to.equal(1);

                        Wreck.get('http://localhost:4000/error', (err, res, payload) => {

                            expect(err).to.not.exist();

                            setTimeout(() => {

                                expect(Fs.readFileSync(debug).toString().split('\n').length).to.equal(5);
                                expect(Fs.readFileSync(error).toString().split('\n').length).to.equal(2);
                                cleanup(child, done);
                            }, 1000);
                        });
                    }, 1000);
                });
            });
        });
    });

    experiment('11.2', () => {

        test('11.2.1', (done) => {

            setup('11.2.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('Hello world!');

                    Wreck.get('http://localhost:4000/users', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.equal('Users page!');
                        cleanup(child, done);
                    });
                });
            });
        });

        test('11.2.2', (done) => {

            setup('11.2.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/docs', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('http://localhost:4000&path=/products/{id}#POST')
                        .and.to.include('http://localhost:4000&path=/products#POST')
                        .and.to.include('http://localhost:4000&path=/products/{id}#PUT');

                    cleanup(child, done);
                });
            });
        });
    });

    experiment('11.4', () => {

        test('11.4.4', (done) => {

            setup('11.4.4', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                setTimeout(() => {

                    expect(JSON.stringify(Fs.readdirSync(fpath))).to.include('.heapsnapshot');
                    cleanup(child, done);
                }, 3000);
            });
        });

        test('11.4.5', (done) => {

            setup('11.4.5', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/debug/console', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('<title>Debug Console</title>');

                    cleanup(child, done);
                });
            });
        });
    });

    experiment('11.6', () => {

        test('11.6.4', (done) => {

            setup('11.6.4', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('Welcome Home!');

                    Wreck.get('https://localhost:4001/', (err, res, payload) => {

                        expect(err).to.exist();
                        expect(err.message).to.equal('Client request error: self signed certificate');

                        Wreck.get('https://localhost:4001/', { rejectUnauthorized: false }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.equal('Welcome Home!');

                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('11.6.5', (done) => {

            setup('11.6.5', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(302);
                    expect(res.headers.location).to.equal('https://localhost:4000/');
                    expect(res.headers['strict-transport-security']).to.equal('max-age=15768000');

                    cleanup(child, done);
                });
            });
        });
    });
});
