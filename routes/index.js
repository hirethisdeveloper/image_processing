var express = require('express');
var router  = express.Router();
var utils   = require("../lib/lib_utils");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({});
});

router.get("/:asset", function (req, res) {

    var obj = {route: "/:asset", method: "GET"};

    utils.send_success(res, obj);

    /*require('lwip').open('image.jpg', function(err, image){
     // check err...
     // define a batch of manipulations and save to disk as JPEG:
     image.batch()
     .scale(0.75)          // scale to 75%
     .rotate(45, 'white')  // rotate 45degs clockwise (white fill)
     .crop(200, 200)       // crop a 200X200 square from center
     .blur(5)              // Gaussian blur with SD=5
     .writeFile('output.jpg', function(err){
     // check err...
     // done.
     });

     });*/
});

module.exports = router;
