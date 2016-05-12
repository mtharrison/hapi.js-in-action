'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Redis = require('redis');
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

const client = Redis.createClient();

experiment('Chapter 8', () => {

    experiment('8.1', () => {

        test('8.1.1', (done) => {

            setup('8.1.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/image.png', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(res.headers['content-type']).to.include('image/png');
                    expect(res.headers['cache-control']).to.include('max-age=86400');
                    cleanup(child, done);
                });
            });
        });

        test('8.1.2', (done) => {

            setup('8.1.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/image.png', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(res.headers.etag).to.equal('"4a78cc14b09008bcdbed3be01178c2452f7ae177"');
                    expect(res.headers['content-type']).to.include('image/png');
                    expect(res.headers['cache-control']).to.equal('max-age=86400, must-revalidate, private');
                    cleanup(child, done);
                });
            });
        });

        test('8.1.3', (done) => {

            setup('8.1.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/users', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(res.headers.etag).to.equal('"1bka4XaHBAOxhO0iZMwI8Q4ektI="');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('8.2', () => {

        test('8.2.1', (done) => {

            setup('8.2.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                setTimeout(() => {

                    expect(getStreamBuffer(stdout)).to.include('Found').and.to.include('articles in');
                    cleanup(child, done);
                }, 2000);
            });
        });

        test('8.2.2', (done) => {

            setup('8.2.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                setTimeout(() => {

                    const lines = getStreamBuffer(stdout).split('\n');
                    expect(lines[0]).to.not.include('CACHED');
                    expect(lines[1]).to.include('CACHED');
                    expect(lines[2]).to.not.include('CACHED');
                    cleanup(child, done);
                }, 4000);
            });
        });

        test('8.2.3', (done) => {

            setup('8.2.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                setTimeout(() => {

                    const lines = getStreamBuffer(stdout).split('\n');

                    console.log(lines);

                    expect(lines[0]).to.not.include('CACHED').and.to.not.include('STALE');
                    expect(lines[1]).to.include('CACHED').and.to.not.include('STALE');
                    expect(lines[2]).to.include('CACHED').and.to.include('STALE');
                    cleanup(child, done);
                }, 4000);
            });
        });
    });

    experiment('8.3', () => {

        test('8.3.2', (done) => {

            setup('8.3.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                let now = Date.now();

                Wreck.get('http://localhost:4000/movies/manhattan', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    const t1 = Date.now() - now;
                    now = Date.now();

                    Wreck.get('http://localhost:4000/movies/manhattan', (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        const t2 = Date.now() - now;
                        expect(t1 / t2).to.be.greaterThan(5); // at least 5 times faster (really a lot more)

                        client.del('hapi-cache:movies:manhattan', (err) => {

                            if (err) {
                                throw err;
                            }
                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('8.3.3', (done) => {

            setup('8.3.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                let now = Date.now();

                Wreck.get('http://localhost:4000/movies/lebowski', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    const t1 = Date.now() - now;
                    now = Date.now();

                    Wreck.get('http://localhost:4000/movies/lebowski', (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        const t2 = Date.now() - now;
                        expect(t1 / t2).to.be.greaterThan(5); // at least 5 times faster (really a lot more)

                        client.del('hapi-cache:movies:lebowski', (err) => {

                            if (err) {
                                throw err;
                            }
                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });
});
