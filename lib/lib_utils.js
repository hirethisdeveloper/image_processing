var Q      = require("q");

exports.send_success = function (res, obj) {

    var now          = new Date().toISOString();
    obj.status       = "ok";
    obj.request_date = now;

    res.send(obj);
};

exports.send_error = function (res, obj) {

    var now          = new Date().toISOString();
    obj.status       = "error";
    obj.request_date = now;

    res.send(obj);
};