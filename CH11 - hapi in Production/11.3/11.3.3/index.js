'use strict';

const Hapi = require('hapi');
const Oppsy = require('oppsy');
const StatsD = require('node-statsd');

const STATSD_HOST = '192.168.99.100'; // `docker-machine ip default`
const statsd = new StatsD({ host: STATSD_HOST });

const server = new Hapi.Server();
server.connection({ port: 4000 });

const oppsy = new Oppsy(server);

oppsy.on('ops', (data) => {

    console.log(data);
    statsd.timing('ops.osmem.free', data.osmem.free);
    statsd.timing('ops.osload', data.osload[0]);
    statsd.timing('ops.psdelay', data.psdelay);
});

server.start((err) => {

    if (err) {
        throw err;
    }
    oppsy.start(1000);
});
