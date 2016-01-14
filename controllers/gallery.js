"use strict";
var express     = require("express"),
    router      = express.Router();

router.get('/', function(req, res) {
    res.send("Gallery");
});

module.exports = router;