var Q = require("q");

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

exports.process_image = function (req, imgurl, dimensions) {

    var deferred = Q.defer();

    var R = require("requestify");

    var rest = require('restler');
    /*
     rest
     .get(imgurl, {decoding: 'buffer'})
     .on('complete', function (result) {
     */

    R.get(imgurl)
        .then(function (response) {

            var result = response.body;

            console.log("COMPLETE", response);

/*
            if ( result instanceof Error ) {
                deferred.reject(result);
                return;
            }

            var path  = require('path');
            var ext   = (req.params.ext) ? req.params.ext : "jpg";
            var sharp = require("sharp");

            sharp(result)
                .resize(dimensions.width, dimensions.height)
                .flatten()
                .sharpen()
                .toBuffer()
                .then(function (outputBuffer) {
                    deferred.resolve(outputBuffer);
                });
*/


            deferred.resolve();

        });

    return deferred.promise;
};