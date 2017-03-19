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

    var rest = require('restler');
    rest
        .get(imgurl, {decoding: 'buffer'})
        .on('complete', function (result) {

            //console.log("COMPLETE", result);


            if ( result instanceof Error ) {
                deferred.reject(result);
                return;
            }

            var ExifReader = require('exif-reader');

            var path  = require('path');
            var ext   = (req.params.ext) ? req.params.ext : "jpg";
            var sharp = require("sharp");

            //console.log("ARRTYPE", typeof result);

            var metadata = ExifReader(buf);

            console.log("EXIF", JSON.stringify(metadata));

            sharp(result)
                .resize(dimensions.width, dimensions.height)
                .flatten()
                .sharpen()
                .toBuffer()
                .then(function (outputBuffer) {
                    deferred.resolve(outputBuffer);
                });

        });

    return deferred.promise;
};