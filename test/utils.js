'use strict';

if (!process.env.CI) {
    require('dotenv').config();
}

const ChildProcess = require('child_process');
const Path = require('path');
const PassThrough = require('stream').PassThrough;

const WAIT_FOR_PROC = 5000;

const chapters = [
    'CH01 - Introducing hapi',
    'CH02 - Building an API',
    'CH03 - Building a Website',
    'CH04 - Routes and Handlers in Depth',
    'CH05 - Understanding Requests and Responses',
    'CH06 - Validation with Joi',
    'CH07 - Creating Modular Applications with Plugins',
    'CH08 - Leveraging Caching',
    'CH09 - Authentication and Security',
    'CH10 - Testing with Lab',
    'CH11 - hapi in Production'
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

        internals.run(fpath, file, (err, child, stdout, stderr) => {

            if (err) {
                return callback(err);
            }

            procs.push(child);
            callback(null, child, stdout, stderr, fpath);
        });
    });
};

exports.setupTest = function (path, file, callback) {

    if (arguments.length === 2) {
        callback = file;
        file = null;
    }

    internals.install(path, (err, fpath) => {

        if (err) {
            return callback(err);
        }

        internals.test(fpath, file, (err, child, stdout, stderr) => {

            if (err) {
                return callback(err);
            }

            procs.push(child);
            callback(null, child, stdout, stderr, fpath);
        });
    });
};

exports.cleanup = function (child, callback, natural) {

    child.once('exit', () => {

        callback();
    });

    if (child.exitCode !== null) {

        // Already dead
        return process.nextTick(() => {

            return callback();
        });
    }

    if (!natural) {
        child.kill();
    }
};

exports.install = internals.install = function (path, callback) {

    let fPath;
    const splitPath = path.split('.');
    const chapNum = parseInt(splitPath[0]);
    const basePath = Path.join(__dirname, '..');

    if (splitPath.length === 1) {
        fPath = Path.join(basePath, chapters[chapNum - 1]);
    }

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

    // Buffer to intermediate streams in case proc exits prematurely

    const stdout = new PassThrough();
    const stderr = new PassThrough();

    const child = ChildProcess.spawn('node', [file], { cwd });

    child.stdout.pipe(stdout);
    child.stderr.pipe(stderr);

    if (!process.env.CI) {
        child.stderr.pipe(process.stdout);  // don't want junk in ci logs
    }

    child.on('error', (err) => {

        console.log(err);
    });

    setTimeout(() => {

        callback(null, child, stdout, stderr);
    }, WAIT_FOR_PROC);
};

exports.test = internals.test = function (cwd, file, callback) {

    const child = ChildProcess.spawn('lab', file ? [file] : [], { cwd });

    child.on('error', (err) => {

        console.log(err);
    });

    callback(null, child);
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
