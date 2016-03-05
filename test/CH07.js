'use strict';

// Load modules

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

before((done) => {

    // Setup the database

    setup('7', 'db-setup.js', (err, child) => {

        if (err) {
            throw err;
        }

        cleanup(child, done, true);
    });
});

experiment('Chapter 7', () => {

    experiment('7.2', () => {

        test('7.2.1', (done) => {

            setup('7.2.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        cleanup(child, done);
                    });
                });
            });
        });

        test('7.2.2', (done) => {

            setup('7.2.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });

        test('7.2.3', (done) => {

            setup('7.2.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });

        test('7.2.4', (done) => {

            setup('7.2.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });
    });

    experiment('7.3', () => {

        test('7.3.2', (done) => {

            setup('7.3.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });

        test('7.3.3', (done) => {

            setup('7.3.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });

        test('7.3.4', (done) => {

            setup('7.3.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });
    });

    experiment('7.4', () => {

        test('7.4.1', (done) => {

            setup('7.4.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString())
                        .to.include('<td><a href="/flight/SA2490">SA2490</a></td>')
                        .and.to.include('<h1>✈ pingoo flight tracking</h1>');

                    Wreck.get('http://localhost:4000/flight/RO667', (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString())
                            .to.include('<h3>Pings for flight RO667</h3>')
                            .and.to.include('<td>40.734692</td>')
                            .and.to.include('mapTypeId: google.maps.MapTypeId.TERRAIN');

                        const now = new Date();

                        payload = JSON.stringify({
                            code: 'ABCDEF',
                            lat: 10,
                            lng: 10,
                            alt: 500,
                            timestamp: now
                        });

                        Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);

                            Wreck.get('http://localhost:4000/flight/ABCDEF', (err, res, payload) => {

                                expect(err).to.not.exist();
                                expect(res.statusCode).to.equal(200);
                                expect(payload.toString()).to.include('<td><a href="/flight/ABCDEF">ABCDEF</a></td>');
                                cleanup(child, done);
                            });
                        });
                    });
                });
            });
        });

        test('7.4.2', (done) => {

            setup('7.4.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    Wreck.get('http://localhost:4000/', (err, res, payload) => {

                        expect(err).to.not.exist();
                        Wreck.get('http://localhost:4000/', (err, res, payload) => {

                            expect(err).to.not.exist();

                            setTimeout(() => {

                                expect(getStreamBuffer(stdout)).to.include('homepage has been viewed 3 times');
                                cleanup(child, done);
                            }, 2000);
                        });
                    });
                });
            });
        });

        test('7.4.3', (done) => {

            setup('7.4.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const payload = JSON.stringify({
                    code: 'ABCDEF',
                    lat: 10,
                    lng: 10,
                    alt: 500,
                    timestamp: Date.now()
                });

                Wreck.post('http://localhost:4000/api', { payload }, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);

                    expect(getStreamBuffer(stderr)).to.include('received a new ping {"code":"ABCDEF","lat":10,"lng":10,"alt":500,"timestamp":');

                    cleanup(child, done);
                });
            });
        });
    });
});
