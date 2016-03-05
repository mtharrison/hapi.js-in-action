'use strict';

// Load modules

const ChildProcess = require('child_process');
const Code = require('code');
const Lab = require('lab');
const TestUtils = require('./utils');
const Wreck = require('wreck');

// Test shortcuts

const lab = exports.lab = Lab.script();
const before = lab.before;
const experiment = lab.experiment;
const test = lab.test;
const expect = Code.expect;

const setup = TestUtils.setup;
const cleanup = TestUtils.cleanup;
const getStreamBuffer = TestUtils.getStreamBuffer;


experiment('Chapter 8', () => {

    experiment('8.1', () => {

        test('8.1.1', (done) => {

            setup('8.1.1', (err, child, stdout, stderr) => {

                Wreck.get('http://localhost:4000', (err, res, payload) => {


                });
            });
        });
    });
});
