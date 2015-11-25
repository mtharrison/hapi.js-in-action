'use strict';

const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;
const beforeEach = lab.beforeEach;

let server;

const MongoCollection = function () {};
MongoCollection.prototype.insertOne = function (doc, callback) {

    doc._id = 'abcdef';
    callback(null, { ops: [doc] });
};

const MongoDB = function () {};
MongoDB.prototype.collection = function (name) {

    return new MongoCollection();
};

const MongoStub = {
    MongoClient: {
        connect: function (url, callback) {

            callback(null, new MongoDB());
        }
    }
};

beforeEach(function (done) {

    Proxyquire('..', {
        'mongodb': MongoStub
    })(function (err, srv) {

        server = srv;
        done();
    });
});

experiment('Test POST /user', () => {

    test('creates a user object', (done) => {

        const user = {
            name: {
                first: 'Craig',
                last: 'Railton'
            },
            age: 29
        };

        const options = {
            method: 'POST',
            url: '/user',
            payload: user
        };

        const start = Date.now();

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            var response = JSON.parse(res.payload);
            expect(response).to.deep.include(user);
            expect(response._id).to.be.a.string();
            expect(response.createdAt)
                .to.be.greaterThan(start)
                .and.to.be.lessThan(Date.now());
            done();
        });
    });

    test('creates a user object (stub)', (done) => {

        const user = {
            name: {
                first: 'Craig',
                last: 'Railton'
            },
            age: 'not an age'
        };

        const options = {
            method: 'POST',
            url: '/user',
            payload: user
        };

        const start = Date.now();

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(400);
            var response = JSON.parse(res.payload);
            expect(response.message).to.equal('child "age" fails because ["age" must be a number]');
            done();
        });
    });
});
