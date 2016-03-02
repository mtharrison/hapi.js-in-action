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


experiment('Chapter 4', () => {

    experiment('4.1', () => {

        test('4.1.1', (done) => {

            setup('4.1.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                expect(getStreamBuffer(stderr)).to.include('Error: New route / conflicts with existing /');
                cleanup(child, done);
            });
        });

        test('4.1.2', (done) => {

            setup('4.1.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('Route was matched for a get request');

                    Wreck.post('http://localhost:4000/', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.equal('Route was matched for a post request');
                        cleanup(child, done);
                    });
                });
            });
        });

        test('4.1.3', (done) => {

            setup('4.1.3', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/nature/flowers/orchids/henry.sellers', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('You requested henry.sellers');

                    Wreck.get('http://localhost:4000/images/beans/eggs/ham/bacon.cheese', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(getStreamBuffer(stdout)).to.include('"category": "beans"');

                        Wreck.get('http://localhost:4000/team', (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.include('Showing the whole team page!');

                            Wreck.get('http://localhost:4000/team/bob', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(payload.toString()).to.include('Showing bob\'s page');

                                Wreck.get('http://localhost:4000/this/is/a/path', (err, res, payload) => {

                                    expect(err).to.not.exist();
                                    expect(payload.toString()).to.include('Matched the catch-all route with path: this/is/a/path');

                                    cleanup(child, done);
                                });
                            });
                        });
                    });
                });
            });
        });

        test('4.1.4', (done) => {

            setup('4.1.4', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/document', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('1');

                    Wreck.get('http://localhost:4000/document/2', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.equal('2');

                        Wreck.get('http://localhost:4000/document/2.xml', (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.equal('3');

                            Wreck.get('http://localhost:4000/document/2/3/4/5', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(payload.toString()).to.equal('4');

                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });
    });
});
