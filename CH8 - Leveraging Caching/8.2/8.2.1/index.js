var getValue = function (callback) {

    var value = Math.floor(Math.random() * 100);
    callback(value);
};

setInterval(function () {

    getValue(function (value) {

        console.log(value);
    });
}, 1000);
