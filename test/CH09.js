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


experiment('Chapter 9', () => {

    experiment('9.1', () => {

        test('9.1.1', (done) => {

            setup('9.1.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(401);
                    expect(res.headers['www-authenticate']).to.equal('Basic');

                    const options = {
                        headers: {
                            authorization: 'Basic ' + new Buffer('john:secret').toString('base64')
                        }
                    };

                    Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString()).to.equal('Hi john!');
                        cleanup(child, done);
                    });
                });
            });
        });

        test('9.1.3', (done) => {

            setup('9.1.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(401);
                    expect(res.headers['www-authenticate']).to.equal('Basic');

                    const options = {
                        headers: {
                            authorization: 'Basic ' + new Buffer('john:secret').toString('base64')
                        }
                    };

                    Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString()).to.equal('Hi john!');
                        cleanup(child, done);
                    });
                });
            });
        });

        test('9.1.4', (done) => {

            setup('9.1.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(200);
                    expect(payload.toString()).to.equal('Hi guest!');

                    let options = {
                        headers: {
                            authorization: 'Basic ' + new Buffer('john:secret').toString('base64')
                        }
                    };

                    Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(payload.toString()).to.equal('Hi john!');

                        options = {
                            headers: {
                                authorization: 'Basic ' + new Buffer('john:fakepass').toString('base64')
                            }
                        };

                        Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);
                            expect(payload.toString()).to.equal('Hi guest!');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });

    experiment('9.3', () => {

        test('9.3.1', (done) => {

            setup('9.3.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const options = {
                    headers: {
                        origin: 'http://other-domain.com'
                    }
                };

                Wreck.get('http://localhost:4000/resource', options, (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    expect(res.headers['access-control-allow-origin']).to.equal('http://other-domain.com');
                    cleanup(child, done);
                });
            });
        });

        test('9.3.2', (done) => {

            setup('9.3.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const options = {
                    headers: {
                        origin: 'http://other-domain.com'
                    }
                };

                Wreck.get('http://localhost:4000/resource', options, (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    expect(res.headers['access-control-allow-origin']).to.not.exist();

                    options.headers.origin = 'http://localhost:4000';

                    Wreck.get('http://localhost:4000/resource', options, (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        expect(res.headers['access-control-allow-origin']).to.equal('http://localhost:4000');
                        cleanup(child, done);
                    });
                });
            });
        });

        test('9.3.3', (done) => {

            setup('9.3.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const options = {
                    headers: {
                        origin: 'http://localhost:4000',
                        'Access-Control-Request-Method': 'GET',
                        'access-control-request-headers': 'x-custom-header'
                    }
                };

                Wreck.request('OPTIONS', 'http://localhost:4000/resource', options, (err, res) => {

                    if (err) {
                        throw err;
                    }

                    expect(res.headers['access-control-allow-headers']).to.include('x-custom-header');

                    options.headers['access-control-request-headers'] = 'bleh';

                    Wreck.request('OPTIONS', 'http://localhost:4000/resource', options, (err, res) => {

                        if (err) {
                            throw err;
                        }

                        expect(res.headers['access-control-allow-headers']).to.not.exist();
                        cleanup(child, done);
                    });
                });
            });
        });

        test('9.3.4', (done) => {

            setup('9.3.4', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const options = {
                    headers: {
                        origin: 'http://other-domain.com'
                    }
                };

                Wreck.get('http://localhost:4000/resource', options, (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    expect(res.headers['access-control-allow-origin']).to.equal('http://other-domain.com');
                    expect(res.headers['access-control-allow-credentials']).to.equal('true');
                    cleanup(child, done);
                });
            });
        });

        test('9.3.5', (done) => {

            setup('9.3.5', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                const options = {
                    headers: {
                        origin: 'http://other-domain.com'
                    }
                };

                Wreck.get('http://localhost:4000/resource', options, (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    expect(res.headers['access-control-allow-origin']).to.equal('http://other-domain.com');
                    cleanup(child, done);
                });
            });
        });
    });

    experiment('9.4', () => {

        test('9.4.1', (done) => {

            setup('9.4.1', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    let cookie = res.headers['set-cookie'][0].split(';')[0];
                    expect(payload.toString()).to.include('Feeling great!');

                    let options = {
                        headers: {
                            cookie: cookie
                        },
                        payload: JSON.stringify({
                            message: 'Something else'
                        })
                    };

                    Wreck.post('http://localhost:4000/change', options, (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        cookie = res.headers['set-cookie'][0].split(';')[0];

                        options = {
                            headers: {
                                cookie: cookie
                            }
                        };

                        Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                            if (err) {
                                throw err;
                            }

                            expect(payload.toString()).to.include('Something else');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('9.4.2 - failure', (done) => {

            setup('9.4.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    const sessc = res.headers['set-cookie'][1].split(';')[0];

                    expect(payload.toString()).to.include('Feeling great!');

                    const options = {
                        headers: {
                            cookie: sessc
                        },
                        payload: JSON.stringify({
                            message: 'Something else'
                        })
                    };

                    Wreck.post('http://localhost:4000/change', options, (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        expect(res.statusCode).to.equal(403);
                        cleanup(child, done);
                    });
                });
            });
        });

        test('9.4.2 - success', (done) => {

            setup('9.4.2', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    const crumb = res.headers['set-cookie'][0].split(';')[0];
                    const sessc = res.headers['set-cookie'][1].split(';')[0];

                    expect(payload.toString()).to.include('Feeling great!');

                    const options = {
                        headers: {
                            cookie: sessc + '; ' + crumb,
                            'content-type': 'application/json'
                        },
                        payload: JSON.stringify({
                            message: 'Something else',
                            crumb: crumb.split('=')[1]
                        })
                    };

                    Wreck.post('http://localhost:4000/change', options, (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        expect(res.statusCode).to.equal(302);
                        cleanup(child, done);
                    });
                });
            });
        });

        test('9.4.3', (done) => {

            setup('9.4.3', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    const crumb = res.headers['set-cookie'][0].split(';')[0];
                    const sessc = res.headers['set-cookie'][1].split(';')[0];

                    expect(payload.toString()).to.include('Feeling great!');

                    const options = {
                        headers: {
                            cookie: sessc + '; ' + crumb,
                            'content-type': 'application/json',
                            'x-csrf-token': crumb.split('=')[1]
                        },
                        payload: JSON.stringify({
                            message: 'Something else'
                        })
                    };

                    Wreck.put('http://localhost:4000/change', options, (err, res, payload) => {

                        if (err) {
                            throw err;
                        }

                        expect(res.statusCode).to.equal(302);
                        cleanup(child, done);
                    });
                });
            });
        });
    });

    experiment('9.5', () => {

        test('9.5', (done) => {

            setup('9.5', (err, child, stdout, stderr) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    if (err) {
                        throw err;
                    }

                    expect(res.headers).to.deep.include({
                        'strict-transport-security': 'max-age=15768000; includeSubDomains; preload',
                        'x-frame-options': 'SAMEORIGIN',
                        'x-xss-protection': '1; mode=block',
                        'x-download-options': 'noopen',
                        'x-content-type-options': 'nosniff'
                    });

                    cleanup(child, done);
                });
            });
        });
    });
});
