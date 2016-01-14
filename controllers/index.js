"use strict";
/**
 * @description
 * Router for static sites
 */
var express     = require("express"),
    router      = express.Router();

var database    = require("../libs/mongodb");

router.get('/', function(req, res) {
    res.send("Strona główna");
    database.update("site", function(err, result) {
        if (err) return console.log(err);
        console.log(result);
    }, {a : "siema"}, {$set : {a : "siema0"}});
});

module.exports = router;