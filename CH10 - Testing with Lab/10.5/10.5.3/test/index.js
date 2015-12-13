'use strict';

const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;
const beforeEach = lab.beforeEach;

const InertMock = require('./mocks/inert');
const Server = Proxyquire('..', { inert: InertMock });

let server;

beforeEach((done) => {

    Server((err, srv) => {

        if (err) {
            throw err;
        }

        server = srv;
        done();
    });
});

experiment('Test POST /user', () => {

    test('creates a user object', (done) => {

        const options = {
            method: 'GET',
            url: '/'
        };

        server.inject(options, (res) => {

            expect(res.payload).to.equal('proxyquire');
            done();
        });
    });
});
