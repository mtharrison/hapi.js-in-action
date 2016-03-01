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

experiment('Chapter 2', () => {

    experiment('2.3', () => {

        test('2.3.3', (done) => {

            setup('2.3.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipes = JSON.parse(payload);
                    expect(recipes.length).to.equal(4);
                    expect(recipes[0].name).to.equal('Golden Chicken With Tomatoes and Olives');
                    expect(recipes[1].cuisine).to.equal('Nigerian');
                    cleanup(child, done);
                });
            });
        });
    });
});
