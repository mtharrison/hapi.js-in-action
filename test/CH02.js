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
                    expect(recipes[0].name).to.equal('Golden Chicken With Tomatoes and Olives');
                    expect(recipes[1].cuisine).to.equal('Nigerian');
                    cleanup(child, done);
                });
            });
        });

        test('2.3.4', (done) => {

            setup('2.3.4', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes?cuisine=Nigerian', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipes = JSON.parse(payload);
                    expect(recipes.length).to.equal(1);
                    expect(recipes[0].cuisine).to.equal('Nigerian');

                    Wreck.get('http://localhost:4000/api/recipes?cuisine=Italian', (err, res, payload) => {

                        expect(err).to.not.exist();
                        const recipes = JSON.parse(payload);
                        expect(recipes.length).to.equal(1);
                        expect(recipes[0].cuisine).to.equal('Italian');
                        cleanup(child, done);
                    });
                });
            });
        });

        test('2.3.5', (done) => {

            setup('2.3.5', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipe = JSON.parse(payload);
                    expect(recipe).to.be.an.object();
                    expect(recipe.id).to.equal(1);
                    expect(recipe.name).to.equal('Golden Chicken With Tomatoes and Olives');

                    Wreck.get('http://localhost:4000/api/recipes/2', (err, res, payload) => {

                        expect(err).to.not.exist();
                        const recipe = JSON.parse(payload);
                        expect(recipe).to.be.an.object();
                        expect(recipe.id).to.equal(2);
                        expect(recipe.name).to.equal('Nigerian suya');
                        cleanup(child, done);
                    });
                });
            });
        });
    });

    experiment('2.4', () => {

        test('2.4.2', (done) => {

            setup('2.4.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipe = JSON.parse(payload);
                    expect(recipe).to.be.an.object();
                    expect(recipe.id).to.equal(1);
                    expect(recipe.name).to.equal('Golden Chicken With Tomatoes and Olives');

                    Wreck.get('http://localhost:4000/api/recipes/2', (err, res, payload) => {

                        expect(err).to.not.exist();
                        const recipe = JSON.parse(payload);
                        expect(recipe).to.be.an.object();
                        expect(recipe.id).to.equal(2);
                        expect(recipe.name).to.equal('Nigerian suya');

                        Wreck.get('http://localhost:4000/api/recipes?cuisine=Italian', (err, res, payload) => {

                            expect(err).to.not.exist();
                            const recipes = JSON.parse(payload);
                            expect(recipes.length).to.equal(1);
                            expect(recipes[0].cuisine).to.equal('Italian');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });

        test('2.4.3', (done) => {

            setup('2.4.3', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipe = JSON.parse(payload);
                    expect(recipe).to.be.an.object();
                    expect(recipe.id).to.equal(1);
                    expect(recipe.name).to.equal('Golden Chicken With Tomatoes and Olives');

                    Wreck.get('http://localhost:4000/api/recipes/2', (err, res, payload) => {

                        expect(err).to.not.exist();
                        const recipe = JSON.parse(payload);
                        expect(recipe).to.be.an.object();
                        expect(recipe.id).to.equal(2);
                        expect(recipe.name).to.equal('Nigerian suya');

                        Wreck.get('http://localhost:4000/api/recipes?cuisine=Italian', (err, res, payload) => {

                            expect(err).to.not.exist();
                            const recipes = JSON.parse(payload);
                            expect(recipes.length).to.equal(1);
                            expect(recipes[0].cuisine).to.equal('Italian');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });

    experiment('2.5', () => {

        test('2.5.2', (done) => {

            setup('2.5.2', (err, child) => {

                if (err) {
                    throw err;
                }

                Wreck.get('http://localhost:4000/api/recipes/1', (err, res, payload) => {

                    expect(err).to.not.exist();
                    const recipe = JSON.parse(payload);
                    expect(recipe).to.be.an.object();
                    expect(recipe.id).to.equal(1);
                    expect(recipe.name).to.equal('Golden Chicken With Tomatoes and Olives');

                    Wreck.get('http://localhost:4000/api/recipes/2', (err, res, payload) => {

                        expect(err).to.not.exist();
                        const recipe = JSON.parse(payload);
                        expect(recipe).to.be.an.object();
                        expect(recipe.id).to.equal(2);
                        expect(recipe.name).to.equal('Nigerian suya');

                        Wreck.get('http://localhost:4000/api/recipes?cuisine=Italian', (err, res, payload) => {

                            expect(err).to.not.exist();
                            const recipes = JSON.parse(payload);
                            expect(recipes.length).to.equal(1);
                            expect(recipes[0].cuisine).to.equal('Italian');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });

    experiment('2.6', () => {

        test('2.6.2', (done) => {

            setup('2.6.2', (err, child) => {

                if (err) {
                    throw err;
                }

                const recipe = {
                    name: 'Test',
                    cooking_time: '12 mins',
                    prep_time: '15 mins',
                    serves: 16,
                    cuisine: 'Mongolian',
                    ingredients: 'Cheese',
                    directions: 'Melt'
                };

                const options = {
                    payload: JSON.stringify(recipe),
                    headers: {
                        'content-type': 'application/json'
                    }
                };

                // No-authentication

                Wreck.post('http://localhost:4000/api/recipes', options, (err, res, payload) => {

                    expect(err).to.not.exist();
                    expect(res.statusCode).to.equal(401);

                    // With authentication

                    options.headers.Authorization = 'Bearer q8lrh5rzkrzdi4un8kfza5y3k1nn184x';

                    Wreck.post('http://localhost:4000/api/recipes', options, (err, res, payload) => {

                        expect(err).to.not.exist();
                        expect(res.statusCode).to.equal(200);

                        Wreck.get('http://localhost:4000/api/recipes?cuisine=Mongolian', (err, res, payload) => {

                            expect(err).to.not.exist();
                            const recipes = JSON.parse(payload);
                            expect(recipes[0].cuisine).to.equal('Mongolian');
                            expect(recipes[0].directions).to.equal('Melt');
                            cleanup(child, done);
                        });
                    });
                });
            });
        });
    });
});
