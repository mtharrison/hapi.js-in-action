'use strict';

// Load modules

const Code = require('code');
const FormData = require('form-data');
const Fs = require('fs');
const Lab = require('lab');
const Path = require('path');
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

    experiment('4.1', () => {

        test('4.2.1', (done) => {

            setup('4.2.1', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('<h2>Hello!</h2>');

                    cleanup(child, done);
                });
            });
        });

        test('4.2.3', (done) => {

            setup('4.2.3', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('<h2>Hello!</h2>');

                    const options = {
                        headers: {
                            'accept-language': 'fr'
                        }
                    };

                    Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.equal('<h2>Bonjour!</h2>');

                        const options = {
                            headers: {
                                'accept-language': 'zh'
                            }
                        };

                        Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.equal('<h2>你好!</h2>');

                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('4.2.4', (done) => {

            setup('4.2.4', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('<h2>Hello!</h2>');

                    const options = {
                        headers: {
                            'accept-language': 'fr'
                        }
                    };

                    Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(payload.toString()).to.equal('<h2>Bonjour!</h2>');

                        const options = {
                            headers: {
                                'accept-language': 'zh'
                            }
                        };

                        Wreck.get('http://localhost:4000/', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(payload.toString()).to.equal('<h2>你好!</h2>');

                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });

    experiment('4.3', () => {

        test('4.3.1', (done) => {

            setup('4.3.1', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                const options = {
                    payload: JSON.stringify({ values: [10, 20, 30, 45] })
                };

                Wreck.post('http://localhost:4000/avg', options, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('{\"mean\":26.25}');

                    cleanup(child, done);
                });
            });
        });

        test('4.3.2', (done) => {

            setup('4.3.2', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                const options = {
                    payload: JSON.stringify({ values: [10, 20, 30, 45] })
                };

                Wreck.post('http://localhost:4000/avg', options, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('{\"mean\":26.25}');

                    cleanup(child, done);
                });
            });
        });

        test('4.3.2', (done) => {

            setup('4.3.2', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                const options = {
                    payload: JSON.stringify({ values: [10, 20, 30, 45] })
                };

                Wreck.post('http://localhost:4000/avg', options, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('{\"mean\":26.25}');

                    cleanup(child, done);
                });
            });
        });
    });

    experiment('4.4', () => {

        test('4.4.2', (done) => {

            setup('4.4.2', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('April is the cruelest month, breeding\nlilacs out of the dead land, mixing\nmemory and desire, stirring\ndull roots with spring rain.');

                    cleanup(child, done);
                });
            });
        });

        test('4.4.3', (done) => {

            setup('4.4.3', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.equal('April is the cruelest month, breeding\nlilacs out of the dead land, mixing\nmemory and desire, stirring\ndull roots with spring rain.');

                    cleanup(child, done);
                });
            });
        });

        test('4.4.4', (done) => {

            setup('4.4.4', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                const options = {
                    payload: JSON.stringify({ message: '0dd31dde3980c1b7ecee12e0c52d85a5' })
                };

                Wreck.post('http://localhost:4000', options, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(getStreamBuffer(stdout)).to.include('0dd31dde3980c1b7ecee12e0c52d85a5')
                        .and.to.include('Catflap is open')
                        .and.to.include('I have infiltrated the base');

                    options.payload = JSON.stringify({ message: '65e11a21872da5477187bcdbfa1ef25f' });

                    Wreck.post('http://localhost:4000', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(getStreamBuffer(stdout)).to.include('65e11a21872da5477187bcdbfa1ef25f')
                            .and.to.include('Ink is dry')
                            .and.to.include('I have the blueprints');

                        options.payload = JSON.stringify({ message: 'ef2de8d315317333f7930901287fa768' });

                        Wreck.post('http://localhost:4000', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(getStreamBuffer(stdout)).to.include('ef2de8d315317333f7930901287fa768')
                                .and.to.include('Bird has flown')
                                .and.to.include('I am making my escape');

                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('4.4.5', (done) => {

            setup('4.4.5', (err, child, stdout) => {

                if (err) {
                    throw err;
                }

                const options = {
                    payload: JSON.stringify({ message: '0dd31dde3980c1b7ecee12e0c52d85a5' })
                };

                Wreck.post('http://localhost:4000', options, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(getStreamBuffer(stdout)).to.include('0dd31dde3980c1b7ecee12e0c52d85a5')
                        .and.to.include('Catflap is open')
                        .and.to.include('I have infiltrated the base');

                    options.payload = JSON.stringify({ message: '65e11a21872da5477187bcdbfa1ef25f' });

                    Wreck.post('http://localhost:4000', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(getStreamBuffer(stdout)).to.include('65e11a21872da5477187bcdbfa1ef25f')
                            .and.to.include('Ink is dry')
                            .and.to.include('I have the blueprints');

                        options.payload = JSON.stringify({ message: 'ef2de8d315317333f7930901287fa768' });

                        Wreck.post('http://localhost:4000', options, (err, res, payload) => {

                            expect(err).to.not.exist();
                            expect(getStreamBuffer(stdout)).to.include('ef2de8d315317333f7930901287fa768')
                                .and.to.include('Bird has flown')
                                .and.to.include('I am making my escape');

                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });

    experiment('4.5', () => {

        test('4.5 - data', (done) => {

            setup('4.5', 'data.js', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/', (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(payload.toString()).to.include('<form action="/upload" method="post" enctype="multipart/form-data">');

                    const options = {
                        payload: JSON.stringify({ upload: 'abc' })
                    };

                    Wreck.post('http://localhost:4000/upload', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(Fs.readFileSync(Path.join(fpath, 'uploadedFile')).toString()).to.equal('abc');

                        Fs.unlinkSync(Path.join(fpath, 'uploadedFile'));

                        cleanup(child, done);
                    });
                });
            });
        });

        test('4.5 - data', (done) => {

            setup('4.5', 'file.js', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                const form = new FormData();
                form.append('upload', 'A file', {
                    filename: 'myfile.txt'
                });

                Wreck.read(form, null, (err, body) => {

                    if (err) {
                        throw err;
                    }

                    const options = {
                        payload: body,
                        headers: {
                            'Content-type': 'multipart/form-data;boundary=' + form.getBoundary()
                        }
                    };

                    Wreck.post('http://localhost:4000/upload', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);
                        expect(Fs.readFileSync(Path.join(fpath, 'myfile.txt')).toString()).to.equal('A file');

                        Fs.unlinkSync(Path.join(fpath, 'myfile.txt'));

                        cleanup(child, done);
                    });
                });
            });
        });

        test('4.5 - stream', (done) => {

            setup('4.5', 'stream.js', (err, child, stdout, stderr, fpath) => {

                if (err) {
                    throw err;
                }

                const form = new FormData();
                form.append('upload', 'A file', {
                    filename: 'myfile.txt'
                });

                Wreck.read(form, null, (err, body) => {

                    if (err) {
                        throw err;
                    }

                    const options = {
                        payload: body,
                        headers: {
                            'Content-type': 'multipart/form-data;boundary=' + form.getBoundary()
                        }
                    };

                    Wreck.post('http://localhost:4000/upload', options, (err, res, payload) => {

                        setTimeout(() => {

                            expect(err).to.not.exist();
                            expect(res.statusCode).to.equal(200);
                            expect(Fs.readFileSync(Path.join(fpath, 'uploads/myfile.txt')).toString()).to.equal('A file');

                            Fs.unlinkSync(Path.join(fpath, 'uploads/myfile.txt'));

                            cleanup(child, done);
                        }, 1000);
                    });
                });
            });
        });
    });
});
