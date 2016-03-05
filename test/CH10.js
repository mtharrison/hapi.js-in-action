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

const setupTest = TestUtils.setupTest;
const cleanup = TestUtils.cleanup;


experiment('Chapter 10', () => {

    experiment('10.1', () => {

        test('10.1.1', (done) => {

            setupTest('10.1.1', 'index.js', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('addition should add two numbers together')
                        .and.to.include('Failed tests')
                        .and.to.include('1 of 1 tests failed');
                    cleanup(child, done);
                });
            });
        });

        test('10.1.2', (done) => {

            setupTest('10.1.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('1 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.1.3', (done) => {

            setupTest('10.1.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('3 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.1.4', (done) => {

            setupTest('10.1.4', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('1 tests complete');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('10.2', () => {

        test('10.2.1', (done) => {

            setupTest('10.2.1', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('ensure headers is correct format')
                        .and.to.include('ensure headers is correct format')
                        .and.to.include('2 of 2 tests failed');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('10.3', () => {

        test('10.3.1', (done) => {

            setupTest('10.3.1', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('1 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.3.3', (done) => {

            setupTest('10.3.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('2 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.3.4', (done) => {

            setupTest('10.3.4', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('3 tests complete');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('10.4', () => {

        test('10.4.1', (done) => {

            setupTest('10.4.1', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('1 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.4.5', (done) => {

            setupTest('10.4.5', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('Starting test 1\nFinishing test 1')
                        .and.to.include('Starting test 2\nFinishing test 2');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('10.5', () => {

        test('10.5.1', (done) => {

            setupTest('10.5.1', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('2 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.5.2', (done) => {

            setupTest('10.5.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('2 tests complete');
                    cleanup(child, done);
                });
            });
        });

        test('10.5.3', (done) => {

            setupTest('10.5.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.read(child.stdout, null, (err, body) => {

                    expect(err).to.not.exist();
                    expect(body.toString()).to.include('1 tests complete');
                    cleanup(child, done);
                });
            });
        });
    });
});
