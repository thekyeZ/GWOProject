"use strict";
/**
 * @description
 * Router for static sites
 */
var express     = require("express"),
    router      = express.Router();

var database    = require("../libs/mongodb");

router.get('/', function(req, res) {
    database.find("site", function(err, data) {
        console.log(err);
        console.log(data);
        res.send(data[0]);
    });
});

module.exports = router;