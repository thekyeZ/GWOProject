"use strict";
/**
 * @description
 * Unique file for GWOProject
 */
// TODO Install controller
var express         = require("express"),
    router          = express.Router(),
    EventEmitter    = require("events").EventEmitter,
    sha3            = require("js-sha3").sha3_512;

// Libs
var database = require("../libs/mongodb");

var synchronous = new EventEmitter();

/**
 * @description
 * Installation panel for programmer to create admin password.
 * WARNING! - db configuration require before installation
 */
router.get('/', function(req, res) {
    // installation panel
    res.send("<form action='/install' method='post'>"+
                    "<h1>Installation</h1>"+
                    "<p>Login:</p>"+
                    "<input value='admin' name='admin' disabled>"+
                    "<p>Password:</p>"+
                    "<input placeholder='password' name='pass'>"+
                    "<p></p>"+
                    "<input type='submit' value='INSTALL' name='GoToInstall'>"+
                "</form>");
});

router.post('/', function(req, res) {
    // check if button was clicked
    if (req.body.GoToInstall !== "INSTALL") {
        return console.log("PROBLEM WITH INSTALL BUTTON");
    }

    database.find("admin", function(err, result) {
        // Stop if already install
        if (result[0]) return res.send("<h1>System already installed!</h1><p>Restart server and remove '__install' controller!</p>");

        // closure for "synchronous callback"
        var _completed = {
            "value" : 0,
            "errors" : []
        };
        // synchronous response after update data in database
        synchronous.on("complete", function(id, err) {
            _completed.value += id;
            if (err) _completed.errors.push(err);
            if (_completed.value === 5 && _completed.errors.length === 0) return res.send("<h1>Installation COMPLETE!</h1><p>Restart server!</p>");
            if (_completed.value === 5 && _completed.errors.length !== 0) return res.send("<h1>Installation ERROR!</h1><p>"+_completed.errors+"</p>");
        });

        /**
         * @description
         * Create 'site' collection
         * contain website title and contact information
         */
        database.insert("site", function(err) {
            if (err) return synchronous.emit("complete", 1 , err);
            synchronous.emit("complete", 1);
        }, [{
            "title" : "Tytuł strony",
            "contact" : {
                "admin" : null,
                "phone" : null,
                "mail" : null,
                "address" : null,
                "facebook" : null,
                "twitter" : null,
                "youtube" : null
            }
        }]);

        /**
         * @description
         * Create '_admin' collection
         * contain super-admin login and password
         */
        database.insert("admin", function(err) {
            if (err) return synchronous.emit("complete", 1 , err);
            synchronous.emit("complete", 1);
        }, [{
            "username" : "admin",
            "permissions" : 7,
            "password" : sha3(req.body.pass)
        }]);

        /**
         * @description
         * Create 'posts' collection
         * contain list of posts
         */
        database.insert("posts", function(err) {
            database.remove("posts", function(err) {
                if (err) return synchronous.emit("complete", 1 , err);
                synchronous.emit("complete", 1);
            }, {"ini" : true});
        }, [{"ini" : true}]);

        /**
         * @description
         * Create 'galleries' collection
         * contain list of galleries
         */
        database.insert("galleries", function(err) {
            database.remove("galleries", function(err) {
                if (err) return synchronous.emit("complete", 1 , err);
                synchronous.emit("complete", 1);
            }, {"ini" : true});
        }, [{"ini" : true}]);

        /**
         * @description
         * Create 'pages' collection
         * contain list of static pages
         */
        database.insert("pages", function(err) {
            database.remove("pages", function(err) {
                if (err) return synchronous.emit("complete", 1 , err);
                synchronous.emit("complete", 1);
            }, {"ini" : true});
        }, [{"ini" : true}]);

    }, {"username" : {$exists : true}});
});

module.exports = router;
