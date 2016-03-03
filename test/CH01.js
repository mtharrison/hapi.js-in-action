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

experiment('Chapter 1', () => {

    test('1.2', (done) => {

        setup('1.2', (err, child) => {

            if (err) {
                throw err;
            }

            Wreck.get('http://localhost:4000/en', (err, res, payload) => {

                expect(err).to.not.exist();
                expect(payload.toString()).to.equal('Hello!');

                Wreck.get('http://localhost:4000/cn', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('你好!');

                    cleanup(child, done);
                });
            });
        });
    });

    test('1.4', (done) => {

        setup('1.4', (err, child, stdout) => {

            if (err) {
                throw err;
            }

            Wreck.get('http://localhost:4000/', (err, res, payload) => {

                expect(err).to.not.exist();
                expect(payload.toString()).to.equal('Hello World!');

                Wreck.get('http://localhost:4000/json', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(JSON.parse(payload)).to.deep.equal({ hello: 'World' });

                    // Check logging output

                    expect(getStreamBuffer(stdout)).to.include('[response]');
                    cleanup(child, done);
                });
            });
        });
    });
});
