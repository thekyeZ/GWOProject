"use strict";
var express     = require("express"),
    router      = express.Router(),
    mongo       = require('../libs/mongodb'),
    formidable  = require("formidable"),
    fs          = require("fs-extra");

/**
 * @description
 * Returning document about single static page
 */
router.get('/contact', function(req, res) {
    var query = {};
    query['contact'] = { $exists : true };
    mongo.find("pages", function(err, data) {
        // TODO(jurek) Finish this
        delete data[0]._id;
        res.status(200).send(data[0]);
    }, query);
});

/**
 * @description
 * Save information about 'contact' static page
 */
router.post('/contact', function(req, res) {
    var query = {};
    query['contact'] = { $exists : true };
    mongo.update("pages", function(err, result) {
        res.status(200).send({message : "Zapisano!"});
    }, query, { $set : req.body });
});

router.get('/bazy', function(req, res) {
    mongo.find("bases", function(err, data) {
        res.status(200).send(data);
    });
});

/**
 * @description
 * Save information about 'bazy' static page
 */
router.post('/bazy/:index', function(req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = './public/images/bases';
    form.parse(req, function(err, fields, file) {
        var _newName = Math.round(Math.random()*10000000000),
            data = {
                _index : fields._index,
                title : fields.title,
                description : fields.description,
                background : null
            };

        if (err) return res.status(500).json({ message : "Data transfer error"});

        // Save with photo
        if (file.newBackground) {
            if (fields._oldBackground === null || fields._oldBackground === 'null' || fields._oldBackground === '') {
                fs.rename(file.newBackground.path, file.newBackground.path.replace(/upload_.*\./, _newName+"."), function() {
                    data.background = _newName+file.newBackground.path.match(/\..{3,4}$/)[0];
                    mongo.find("bases", function(err, result) {
                        if (result.length === 0) {
                            mongo.insert("bases", function(err) {
                                if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                                data.message = "Success!";
                                data._id = fields._id;
                                return res.status(200).send(data);
                            }, [data] );
                        } else {
                            mongo.update("bases", function(err) {
                                if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                                data.message = "Success!";
                                data._id = fields._id;
                                return res.status(200).send(data);
                            }, { _id : mongo.ObjectId(fields._id) }, { $set : data } );
                        }
                    }, { _id : mongo.ObjectId(fields._id) });
                });
            } else {
                fs.unlink('./public/images/bases/'+fields._oldBackground, function(err) {
                    if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                    fs.rename(file.newBackground.path, file.newBackground.path.replace(/upload_.*\./, _newName+"."), function() {
                        data.background = _newName+file.newBackground.path.match(/\..{3,4}$/)[0];
                        mongo.find("bases", function(err, result) {
                            if (result.length === 0) {
                                mongo.insert("bases", function(err) {
                                    if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                                    data.message = "Success!";
                                    data._id = fields._id;
                                    return res.status(200).send(data);
                                }, [data] );
                            } else {
                                mongo.update("bases", function(err) {
                                    if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                                    data.message = "Success!";
                                    data._id = fields._id;
                                    return res.status(200).send(data);
                                }, { _id : mongo.ObjectId(fields._id) }, { $set : data } );
                            }
                        }, { _id : mongo.ObjectId(fields._id) });
                    });
                });
            }
            // Save without photo
        } else {
            mongo.find("bases", function(err, result) {
                if (result.length === 0) {
                    mongo.insert("bases", function(err) {
                        if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                        data.message = "Success!";
                        data._id = fields._id;
                        res.status(200).send(data);
                    }, [data] );
                } else {
                    mongo.update("bases", function(err) {
                        if (err) return res.status(500).json({ message : "Error with database("+err+"). Contact with manufacturer"});
                        data.message = "Success!";
                        data._id = fields._id;
                        res.status(200).send(data);
                    }, { _id : mongo.ObjectId(fields._id) }, { $set : data } );
                }
            }, { _id : mongo.ObjectId(fields._id)});
        }
    });
});

module.exports = router;