"use strict";
var express     = require("express"),
    router      = express.Router(),
    fs          = require("fs-extra"),
    formidable  = require("formidable"),
    jimp        = require('jimp');

/**
 * Libs
 */
var mongo = require('../libs/mongodb');

/**
 * @description
 * Get all post
 */
router.get('/post', function(req, res) {
    mongo.find('posts', function(err, data) {
       res.json(data);
    });
});

/**
 * @description
 * Add new post
 */
router.post('/post', function(req, res) {
    if (req.isAuthenticated()) {
        var form = new formidable.IncomingForm();
        form.uploadDir = './public/images/backgrounds';
        form.keepExtensions = true;
        form.parse(req, function(err, fields, file) {
            // Validation
            if (!fields.category || !fields.title || !fields.author || !fields.content || !fields.date) {
                return res.status(500).json({ message : "Some of forms are incorrect" });
            }

            if (file) {
                //fs.rename(file.path, String.prototype.replace(file.path, /upload_.*\./, "siema"), function() {
                //
                //});
            } else {
                mongo.insert("posts", function(err, data) {
                    if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                    return res.json({
                        id : data[0]._id
                    });
                }, [req.body] );
            }
        });
    }
});

/**
 * @description
 * Send all tags
 */
router.get('/tags', function(req, res) {
    mongo.find('site', function(err, data) {
        if (err) return res.status(500).json({ message : "Cannot load site elements"});
        res.json(data[0].tags);
    })
});

/**
 * @description
 * Add new tag
 */
router.post('/tags', function(req, res) {
    mongo.update('site', function(err, data) {
        res.send(data);
    }, { title : { $exists : true}}, { $push : { tags : req.body.newTag }});
});

module.exports = router;