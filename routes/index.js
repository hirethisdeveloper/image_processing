var express = require('express');
var router  = express.Router();
var utils   = require("../lib/lib_utils");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({});
});

router.get("/:asset", function (req, res) {

    var obj    = {route: "/:asset", method: "GET"};
    var imgurl = req.query.img;
    var dimRaw = req.query.dim;

    var darr       = dimRaw.split("x");
    var dimensions = {
        width : darr[0],
        height: darr[1]
    };

    // https://assets.htcsoc.net/hitch/raw/02adcfa9-f9e1-4f4e-96fc-0370564669ca.jpg

    var rest = require('restler');
    rest
        .get(imgurl, {decoding: 'buffer'})
        .on('complete', function (result) {

            if ( result instanceof Error ) {
                res.end("error");
                return;
            }

            var path = require('path');
            var ext  = path.extname(imgurl).replace(".", "");
            var lwip = require("lwip");

            lwip.open(result, ext, function (err, img) {

                if ( err ) {
                    console.log(err);
                    res.end("error");
                    return;
                }

                var ratio = dimensions.width / img.width();
                img.batch()
                    .scale(ratio)
                    .crop(parseInt(dimensions.width), parseInt(dimensions.height))
                    .toBuffer('jpg', function (err, buffer) {
                        serveIt(buffer);
                    });

            });

            function serveIt(buffer) {
                var stream       = require('stream');
                var bufferStream = new stream.PassThrough();
                bufferStream.end(buffer);
                bufferStream.pipe(res);
                return;
            }

        });

});

module.exports = router;
