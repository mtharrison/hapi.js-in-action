'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');

const ChildProcess = require('child_process');
const Path = require('path');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const beforeEach = lab.beforeEach;

const children = [];

const chapters = [
    'CH01 - Introducing hapi'
];

const setup = function (path, callback) {

    let fPath;
    const splitPath = path.split('.');
    const chapNum = parseInt(splitPath[0]);
    const basePath = Path.join(__dirname, '../../');

    if (splitPath.length === 2) {

        fPath = Path.join(basePath, chapters[chapNum - 1], chapNum + '.' + splitPath[1]);
    }

    if (splitPath.length === 3) {

    }

    if (!fPath) {
        throw new Error('Invalid path to code');
    }

    ChildProcess.exec('npm install', {
        cwd: fPath
    }, (err, stdout, stderr) => {

        callback(err, fPath);
    });
};

const run = function (base, file, callback) {

    console.log(base);

    children.push(ChildProcess.exec('node ' + file, {
        cwd: base
    }, (err, stdout, stderr) => {

        callback(err);
    }));
};

describe('1.2', () => {

    it('does something', (done) => {

        setup('1.2', (err, path) => {

            if (err) {
                throw err;
            }

            run(path, 'index.js', (err) => {

                if (err) {
                    throw err;
                }
                done();
            });
        });
    });
});

process.on('exit', (code) => {

    children.forEach(c => {

        console.log('Killing ' + c.pid);
        c.kill();
    })
});
