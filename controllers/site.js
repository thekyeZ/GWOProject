"use strict";
var express     = require("express"),
    router      = express.Router(),
    mongo       = require('../libs/mongodb');

/**
 * @description
 * Sending site information object
 */
router.get('/', function(req, res) {
    mongo.find('site', function(err, data) {
        res.status(200).json(data[0]);
    }, {title : { $exists : true }});
});
/**
 * @description
 * Sending navigation list
 */
router.get('/nav', function(req, res) {
    mongo.find('site', function(err, result) {
        res.status(200).send(result[0].menu);
    }, { title : { $exists : true}});
});

/**
 * @description
 * Save / update navigation list
 */
// TODO(jurek) Add error capture
router.post('/nav', function(req, res) {
    mongo.update('site', function(err, status) {
        res.status(200).json({ message : "Save!" })
    }, { title : {$exists : true}}, {$set : { menu : req.body.nav }});
});


module.exports = router;