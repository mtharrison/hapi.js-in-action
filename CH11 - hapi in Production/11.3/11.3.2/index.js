'use strict';

const StatsD = require('node-statsd');

const STATSD_HOST = '192.168.99.100'; // `docker-machine ip default`
const statsd = new StatsD({ host: STATSD_HOST });

// Generate random integer between a and b

const randomIntBetween = (a,b) => a + Math.floor(Math.random() * ( b - a + 1));

// Send some fake stats every ten seconds

const interval = setInterval(() => {

    statsd.timing('number_of_connections', randomIntBetween(0,100));
    statsd.timing('response_time', randomIntBetween(500,2000));
}, 1000 * 10);

// Stop after one minute

setTimeout(() => {

    clearInterval(interval);
    statsd.close();
}, 1000 * 60 * 10);
