'use strict';

// var Fs = require('fs');

// Fs.readFile('/not/a/real/filepath', function (err, contents) {

//     if (err) {
//         console.log(err.name);
//         console.log(err.message);
//         console.log(JSON.stringify(err));

//         throw err;
//     }

//     console.log(contents);
// });

const err = new Error('Woops, wasn’t supposed to do that!');

console.log(err.name);
console.log(err.message);
