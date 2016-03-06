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

    experiment('3.4', () => {

        test('3.4.3', (done) => {

            setup('3.4.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/login', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('Login');

                    Wreck.post('http://localhost:4000/login', {
                        payload: JSON.stringify({
                            username: 'john',
                            password: 'secret'
                        })
                    }, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(302);
                        expect(res.headers.location).to.equal('http://localhost:4000');
                        expect(res.headers['set-cookie']).to.exist();

                        const options = {
                            headers: {
                                cookie: res.headers['set-cookie'][0].split(';')[0]
                            }
                        };

                        Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.include('Logout');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('3.4.4', (done) => {

            setup('3.4.4', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/login', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('Login');

                    Wreck.post('http://localhost:4000/login', {
                        payload: JSON.stringify({
                            username: 'john',
                            password: 'secret'
                        })
                    }, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(302);
                        expect(res.headers.location).to.equal('http://localhost:4000');
                        expect(res.headers['set-cookie']).to.exist();

                        const options = {
                            headers: {
                                cookie: res.headers['set-cookie'][0].split(';')[0]
                            },
                            payload: JSON.stringify({
                                name: 'Web test',
                                cooking_time: '12 mins',
                                prep_time: '15 mins',
                                serves: 16,
                                cuisine: 'Mongolian',
                                ingredients: 'Cheese',
                                directions: 'Melt'
                            })
                        };

                        Wreck.post('http://localhost:4000/create', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(302);
                            expect(res.headers.location).to.equal('http://localhost:4000');

                            Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('Web test');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });

        test('3.4.5', (done) => {

            setup('3.4.5', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.post('http://localhost:4000/login', {
                    payload: JSON.stringify({
                        username: 'john',
                        password: 'secret'
                    })
                }, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(302);
                    expect(res.headers.location).to.equal('http://localhost:4000');
                    expect(res.headers['set-cookie']).to.exist();

                    const options = {
                        headers: {
                            cookie: res.headers['set-cookie'][0].split(';')[0]
                        }
                    };

                    Wreck.get('http://localhost:4000/logout', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(302);
                        expect(res.headers.location).to.equal('http://localhost:4000');
                        cleanup(child, done);
                    });
                });
            });
        });
    });
});
