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
        .on('complete', function (result, response) {

            //console.log("COMPLETE", response);


            if ( result instanceof Error ) {
                deferred.reject(result);
                return;
            }

            var exif = require('exif-reader');

            var path  = require('path');
            var ext   = (req.params.ext) ? req.params.ext : "jpg";
            var sharp = require("sharp");

            //console.log("ARRTYPE", typeof result);

            var strImg = result.slice(result.toString('ascii', 0, 100).indexOf('Exif'));
            var metadata = exif(strImg);
            var orientation = metadata.image.Orientation;
            //console.log("EXIF", JSON.stringify(metadata));

            var rotationAngle = 0;

            if ( orientation == 6 ) rotationAngle = 90;
            else if ( orientation == 8 ) rotationAngle = -90;
            else if ( orientation == 3 ) rotationAngle = 180;


            sharp(result)
                .rotate(rotationAngle)
                .resize(dimensions.width, dimensions.height)
                .flatten()
                .sharpen()
                .toBuffer()
                .then(function (outputBuffer) {
                    deferred.resolve(outputBuffer);
                });

        })

    return deferred.promise;
};