"use strict";
var express     = require("express"),
    passport    = require("passport"),
    router      = express.Router();

// Libs
var mongo       = require("../libs/mongodb");

/**
 * @description
 * Send admin panel layout site
 */
router.get('/', function(req, res) {

    var template = "login.html";
    if (req.isAuthenticated()) template = "panel.html";
    res.sendFile(template, {
        root : "./public/admin"
    });

});

router.post('/login', function(req, res, next) {

    if(req.isAuthenticated()) {
        res.json(req.user);
        return;
    }
    passport.authenticate('login', function(err, user, info) {
        if (err) next(err);
        if (!user) {
            return res.redirect("/admin?message="+info.message);
        } else {
            req.login(user, function(err) {
                if (err) return next(err);
                res.redirect("/admin");
            });
        }
    })(req, res, next);

});

module.exports = router;