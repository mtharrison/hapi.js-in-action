'use strict';

const Code = require('code');
const Lab = require('lab');
const MongoDb = require('mongodb');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;
const beforeEach = lab.beforeEach;

let server;

beforeEach((done) => {

    const db = {
        collection: function () {

            return {
                insertOne: function (doc, callback) {

                    doc._id = 'abcdef';
                    callback(null, { ops: [doc] });
                }
            };
        }
    };

    MongoDb.MongoClient.connect = function (url, callback) {

        callback(null, db);
    };

    require('..')((err, srv) => {

        if (err) {
            throw err;
        }

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
            const response = JSON.parse(res.payload);
            expect(response).to.deep.include(user);
            expect(response._id).to.be.a.string();
            expect(response.createdAt)
                .to.be.greaterThan(start)
                .and.to.be.lessThan(Date.now());
            done();
        });
    });

    test('age must be a number or numeric string', (done) => {

        const user = {
            name: {
                first: 'Craig',
                last: 'Railton'
            },
            age: 'potato'
        };

        const options = {
            method: 'POST',
            url: '/user',
            payload: user
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(400);
            const response = JSON.parse(res.payload);
            expect(response.message).to.equal('child "age" fails because ["age" must be a number]');
            done();
        });
    });
});
