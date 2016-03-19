"use strict";
var express     = require("express"),
    router      = express.Router(),
    mongo       = require('../libs/mongodb');

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

/**
 * @description
 * Sending contact information object
 */
router.get('/contact', function(req, res) {
    res.send({
        "admin" : "Imię i nazwisko",
        "phone" : "test",
        "mail" : "test",
        "address" : "test",
        "facebook" : "test",
        "twitter" : "test",
        "youtube" : "test",
        "facture" : {
            "number" : 234234234
        }
    })
});

module.exports = router;