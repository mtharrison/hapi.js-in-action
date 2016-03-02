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
const beforeEach = lab.beforeEach;

const setup = TestUtils.setup;
const cleanup = TestUtils.cleanup;
const getStreamBuffer = TestUtils.getStreamBuffer;


experiment('Chapter 3', () => {

    experiment('3.1', () => {

        test('3.1.3', (done) => {

            setup('3.1.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipes = JSON.parse(payload);
                    expect(recipes[0].name).to.equal('Golden Chicken With Tomatoes and Olives');
                    expect(recipes[1].cuisine).to.equal('Nigerian');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('3.2', () => {

        test('3.2.1', (done) => {

            setup('3.2.1', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('DinDin Mobile Website');
                    cleanup(child, done);
                });
            });
        });

        test('3.2.2', (done) => {

            setup('3.2.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/css/style.css', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.headers['content-type']).to.include('text/css');
                    expect(payload.toString()).to.include('font-family: arial, helvetica, sans-serif;');
                    cleanup(child, done);
                });
            });
        });

        test('3.2.3', (done) => {

            setup('3.2.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('Silicate soup');
                    cleanup(child, done);
                });
            });
        });

        test('3.2.4', (done) => {

            setup('3.2.4', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('Silicate soup');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('3.3', () => {

        test('3.3.2', (done) => {

            setup('3.3.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('Nigerian');
                    cleanup(child, done);
                });
            });
        });

        test('3.3.3', (done) => {

            setup('3.3.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/recipes/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('1) Cook the rice according to the package directions.\n2)');
                    cleanup(child, done);
                });
            });
        });

        test('3.3.4', (done) => {

            setup('3.3.4', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/recipes/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('1) Cook the rice according to the package directions.<br>'); // breakline helper
                    cleanup(child, done);
                });
            });
        });
    });
});
