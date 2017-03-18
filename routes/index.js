var express = require('express');
var router  = express.Router();
var utils   = require("../lib/lib_utils");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({});
});

router.get("/:noun/:guid", function (req, res) {

    // 960x720
    // 66x66
    //https://s3.amazonaws.com/assets.htcsoc.net/post/raw/greyed.png

    var imgurl = "https://s3.amazonaws.com/assets.htcsoc.net/" + req.params.noun + "/raw/" + req.params.guid + "." + ((req.query.ext) ? req.query.ext : "jpg");
    var dimRaw = req.query.dim;

    var darr       = dimRaw.split("x");
    var dimensions = {
        width : parseInt(darr[0]),
        height: parseInt(darr[1])
    };

    //console.log("imgurl", imgurl);

    utils.process_image(req, imgurl, dimensions).then(
        function (buffer) {
            var stream       = require('stream');
            var bufferStream = new stream.PassThrough();
            bufferStream.end(buffer);
            bufferStream.pipe(res);
            return;
        },
        function (err) {
            res.send(404);
        });

});

module.exports = router;
