'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('poop'), (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Started server');
    });
});

// Create some garbage

class MyObject {
    constructor() {

        this.name = 'MyObject';
    }
};

global.myobjs = [];

for (let i = 0; i < 1000; ++i) {
    myobjs.push(new MyObject());
}

// Cause an uncaught exception

setTimeout(() => {

    throw new Error('Can\'t touch this');
}, 1000);
