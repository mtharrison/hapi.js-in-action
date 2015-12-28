'use strict';

// Once you have RethinkDb installed, run this script to create
// the sample database with some preseeded data

// You will need to run `npm install rethinkdb` first

const RethinkDb = require('rethinkdb');

const data = [
    {
        'code': 'SA2490',
        'lat': 53.470721,
        'lng': -2.240567,
        'timestamp': new Date('2015-08-22T11:00:00+00:00')
    },
    {
        'code': 'SA2490',
        'lat': 53.329890,
        'lng': -2.219967,
        'timestamp': new Date('2015-08-22T11:10:00+00:00')
    },
    {
        'code': 'SA2490',
        'lat': 53.020402,
        'lng': -2.191128,
        'timestamp': new Date('2015-08-22T11:20:00+00:00')
    },
    {
        'code': 'SA2490',
        'lat': 52.475923,
        'lng': -1.889004,
        'timestamp': new Date('2015-08-22T11:30:00+00:00')
    },
    {
        'code': 'SA2490',
        'lat': 51.916999,
        'lng': -1.693997,
        'timestamp': new Date('2015-08-22T11:40:00+00:00')
    },
    {
        'code': 'SA2490',
        'lat': 51.398088,
        'lng': -0.897160,
        'timestamp': new Date('2015-08-22T11:50:00+00:00')
    },
    {
        'code': 'SA2490',
        'lat': 51.468288,
        'lng': -0.461652,
        'timestamp': new Date('2015-08-22T12:00:00+00:00')
    },
    {
        'code': 'RO667',
        'lat': 33.945337,
        'lng': -118.403781,
        'timestamp': new Date('2015-08-22T11:10:00+00:00')
    },
    {
        'code': 'RO667',
        'lat': 36.264670,
        'lng': -112.097475,
        'timestamp': new Date('2015-08-22T12:10:00+00:00')
    },
    {
        'code': 'RO667',
        'lat': 37.028872,
        'lng': -105.129236,
        'timestamp': new Date('2015-08-22T13:10:00+00:00')
    },
    {
        'code': 'RO667',
        'lat': 37.428030,
        'lng': -100.166246,
        'timestamp': new Date('2015-08-22T14:10:00+00:00')
    },
    {
        'code': 'RO667',
        'lat': 39.623985,
        'lng': -87.432917,
        'timestamp': new Date('2015-08-22T15:10:00+00:00')
    },
    {
        'code': 'RO667',
        'lat': 40.734692,
        'lng': -73.947620,
        'timestamp': new Date('2015-08-22T16:00:00+00:00')
    }
];

const dbName = 'pingoo';
const tblName = 'pings';

RethinkDb.connect((err, conn) => {

    if (err) {
        throw err;
    }

    RethinkDb.dbCreate(dbName).run(conn, (err) => {

        RethinkDb.db(dbName).tableCreate(tblName).run(conn, (err) => {

            RethinkDb.db(dbName).table(tblName).delete().run(conn, (err) => {

                RethinkDb.db(dbName).table(tblName).insert(data).run(conn, (err) => {

                    console.log('👏 Database successfully setup');
                    conn.close();
                });
            });
        });
    });
});
