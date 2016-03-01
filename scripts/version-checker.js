'use strict';

// Go through each project and gather the used dependencies
// Indended as a check to make sure every sample is using the same deps

const _ = require('lodash');
const Fs = require('fs');
const Items = require('items');
const Glob = require('glob');
const Path = require('path');

const basePath = Path.join(__dirname, '..');

Fs.readdir(basePath, (err, contents) => {

    const deps = {};
    const chapters = contents.filter((d) => d.match(/^CH[0-9]{2}/));

    const getDeps = function (chapter, next) {

        const chapterDeps = {
            normal: {},
            dev: {}
        };

        Glob(Path.join(__dirname, '..', chapter) + '/**/package.json', {
            ignore: '/**/node_modules/**/*'
        }, (err, files) => {

            files.forEach((f) => {

                const pkg = require(f);
                const normal = pkg.dependencies || {};
                const dev = pkg.devDependencies || {};

                for (const i in normal) {
                    if (chapterDeps.normal[i] === undefined) {
                        chapterDeps.normal[i] = [];
                    }
                    chapterDeps.normal[i].push(normal[i]);
                    chapterDeps.normal[i] = _.uniq(chapterDeps.normal[i]);
                }
                for (const i in dev) {
                    if (chapterDeps.dev[i] === undefined) {
                        chapterDeps.dev[i] = [];
                    }
                    chapterDeps.dev[i].push(dev[i]);
                    chapterDeps.dev[i] = _.uniq(chapterDeps.dev[i]);
                }
            });

            deps[chapter] = chapterDeps;

            next();
        });
    };

    Items.serial(chapters, getDeps, (err) => {

        if (err) {
            throw err;
        }

        const agg = {};

        for (var i in deps) {
            for (var j in deps[i].normal) {
                if (!agg[j]) {
                    agg[j] = [];
                }
                agg[j] = _.uniq(agg[j].concat(deps[i].normal[j]));
            }
            for (var j in deps[i].dev) {
                if (!agg[j]) {
                    agg[j] = [];
                }
                agg[j] = _.uniq(agg[j].concat(deps[i].dev[j]));
            }
        }

        deps.aggregate = agg;
        console.log(JSON.stringify(deps, null, 2));
    });
});
