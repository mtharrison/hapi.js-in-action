'use strict';

const ChildProcess = require('child_process');
const Path = require('path');

const WAIT_FOR_PROC = 4000;
const WAIT_FOR_KILL = 500;

const chapters = [
    'CH01 - Introducing hapi',
    'CH02 - Building an API'
];

const internals = {};

const procs = [];

exports.setup = function (path, file, callback) {

    if (arguments.length === 2) {
        callback = file;
        file = 'index.js';
    }

    internals.install(path, (err, fpath) => {

        if (err) {
            return callback(err);
        }

        internals.run(fpath, file, (err, child) => {

            if (err) {
                return callback(err);
            }

            procs.push(child);
            callback(null, child);
        });
    });
}

exports.cleanup = function (child, callback) {

    child.kill();
    setTimeout(callback, WAIT_FOR_KILL);
};

exports.install = internals.install = function (path, callback) {

    let fPath;
    const splitPath = path.split('.');
    const chapNum = parseInt(splitPath[0]);
    const basePath = Path.join(__dirname, '..');

    if (splitPath.length === 2) {
        fPath = Path.join(basePath, chapters[chapNum - 1], chapNum + '.' + splitPath[1]);
    }

    if (splitPath.length === 3) {
        fPath = Path.join(basePath, chapters[chapNum - 1], chapNum + '.' + splitPath[1], chapNum + '.' + splitPath[1] + '.' + splitPath[2]);
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

exports.run = internals.run = function (cwd, file, callback) {

    const child = ChildProcess.spawn('node', [file], { cwd });

    child.stderr.pipe(process.stdout);

    setTimeout(() => {
        callback(null, child);
    }, WAIT_FOR_PROC);
};

exports.getStreamBuffer = function (stream) {

    let buff = '';
    stream._readableState.buffer.forEach((b) => {
        buff += b.toString();
    });
    return buff;
};

// Kill all procs on unexpected exit

process.on('exit', () => {

    procs.forEach((p) => p.kill());
});
