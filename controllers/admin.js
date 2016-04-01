"use strict";
var express     = require("express"),
    passport    = require("passport"),
    router      = express.Router();


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

/**
 * @description
 * Logout
 */
router.get('/logout', function(req, res) {

    req.logout();
    return res.redirect("/admin");

});

/**
 * @description
 * Authorization path
 */
router.post('/login', function(req, res, next) {

    if(req.isAuthenticated()) {
        return res.send();
    }
    passport.authenticate('login', function(err, user, info) {
        if (err) next(err);
        if (!user) {
            return res.redirect("/admin?message="+info.message);
        } else {
            req.login(user, function(err) {
                if (err) return next(err);
                res.redirect("/admin?user="+user.username);
            });
        }
    })(req, res, next);

});

module.exports = router;