"use strict";
/**
 * @description
 * Router for static sites
 */
var express     = require("express"),
    router      = express.Router();

router.get('/', function(req, res) {
    res.send("Hello World!");
});

module.exports = router;