"use strict";
var express     = require("express"),
    router      = express.Router(),
    fs          = require("fs-extra"),
    formidable  = require("formidable");

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
       res.send(data);
    });
});

/**
 * @description
 * Get 12 post
 */
router.get('/posts/:start', function(req, res) {
    mongo.find('posts', function(err, data) {
        res.send(data);
    }, null, { limit : 12 , skip : req.params.start , sort : { "date" : -1 }});
});

/**
 * @description
 * Get category posts
 */
router.get('/post/category/:tag', function(req, res) {
    mongo.find('posts', function(err, data) {
        res.status(200).send(data);
    }, { category : { $in : [req.params.tag]}});
});

/**
 * @description
 * Get category 12 posts
 */
router.get('/post/category/:tag/:start', function(req, res) {
    mongo.find('posts', function(err, data) {
        res.status(200).send(data);
    }, { category : { $in : [req.params.tag]}}, { limit : 12 , skip : req.params.start , sort : { "date" : -1 }});
});

/**
 * @description
 * Get one post
 */
router.get('/post/:id', function(req, res) {
    mongo.find('posts', function(err, data) {
        if (data.length !== 1) {
            console.error("Wykryto POWTÓRZENIA ID");
            console.error(data);
        }
        res.status(200).json(data[0]);
    }, { _id : mongo.ObjectId(req.params.id) });
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
            console.log(fields);
            delete fields.$$hashKey;
            delete fields.$promise;
            delete fields.$resolved;
            if (err) return res.status(500).json({ message : "Data transfer error"});
            // Validation
            if (!fields.category || !fields.title || !fields.author || !fields.content || !fields.date) {
                return res.status(500).json({ message : "Some of forms are incorrect" });
            }

            fields.category = fields.category.split(',');

            // Save with photo
            if (file.background) {
                var _newName = fields.date+Math.round(Math.random()*1000000);
                fs.rename(file.background.path, file.background.path.replace(/upload_.*\./, _newName+"."), function() {
                    fields.background = _newName+file.background.path.match(/\..{3,4}$/)[0];
                    mongo.insert("posts", function(err, data) {
                        if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                        return res.json({
                            id : data[0]._id
                        });
                    }, [fields] );
                });
                // Save without photo
            } else {
                mongo.insert("posts", function(err, data) {
                    if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                    return res.json({
                        id : data[0]._id
                    });
                }, [fields] );
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
    });
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

/**
 * @description
 * Remove tag
 */
router.delete('/tags/:name', function(req, res) {
    mongo.update('site', function(err, data) {
        res.send();
    }, { title : { $exists : true}}, { $pull : { tags : req.params.name }});
    mongo.update('posts', function(err, data) {
        res.send();
    }, { category : { $exists : true}}, { $pull : { category : req.params.name }});
});

/**
 * @description
 * Update each post
 */
router.post('/post/:id', function(req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = './public/images/backgrounds';
    form.parse(req, function(err, fields, file) {
        var __id;
        if (err) return res.status(500).json({ message : "Data transfer error"});
        // Validation
        if (!fields.category || !fields.title || !fields.author || !fields.content || !fields.date) {
            return res.status(500).json({ message : "Some of forms are incorrect" });
        }

        // TODO(jurek) Check this
        fields.category = fields.category.split(',');

        // Save with photo
        if (file.newBackground) {
            fs.unlink('./public/images/backgrounds/'+fields._oldBackground, function() {
                var _newName = fields.date+Math.round(Math.random()*1000000);
                fs.rename(file.newBackground.path, file.newBackground.path.replace(/upload_.*\./, _newName+"."), function() {
                    fields.background = _newName+file.newBackground.path.match(/\..{3,4}$/)[0];
                    // TODO(jurek) Optimal THIS!!!!!!
                    delete fields.newBackground;
                    delete fields.oldBackground;
                    delete fields._oldBackground;
                    delete fields.$$hashKey;
                    delete fields.$promise;
                    delete fields.$resolved;
                    __id = fields._id;
                    delete fields._id;
                    mongo.update("posts", function(err, result) {
                        if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                        fields._id = __id;
                        return res.status(200).json(fields);
                    }, { _id : mongo.ObjectId(req.params.id) }, {$set : fields } );
                });
            });
            // Save without photo
        } else {
            // TODO(jurek) Optimal THIS!!!!!!
            delete fields.newBackground;
            delete fields.oldBackground;
            delete fields._oldBackground;
            delete fields.$$hashKey;
            delete fields.$promise;
            __id = fields._id;
            delete fields._id;
            mongo.update("posts", function(err, result) {
                if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                fields._id = __id;
                return res.status(200).json(fields);
            }, { _id : mongo.ObjectId(req.params.id) }, {$set : fields } );
        }
    });
});

/**
 * @description
 * Remove post
 */
router.delete("/post/:id", function(req, res) {
    if (req.body.background !== "null") {
        fs.unlink('./public/images/backgrounds/'+req.body.background, function() {
            mongo.remove('posts', function(err, data) {
                res.status(200).json({message : "Success"});
            }, { _id : mongo.ObjectId(req.params.id)});
        });
    } else {
        mongo.remove('posts', function(err, data) {
            res.status(200).json({message : "Success"});
        }, { _id : mongo.ObjectId(req.params.id)});
    }
});

module.exports = router;