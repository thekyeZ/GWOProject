"use strict";
/**
 * @description
 * Strategies for passport-local module
 *
 * @require 'passport-local'
 * @require 'mongodb'
 *
 */
var LocalStrategy   = require("passport-local").Strategy,
    sha3            = require("js-sha3").sha3_512,
    mongo           = require("./mongodb");

module.exports = function(passport) {

    /**
     * Login strategy
     */
    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    }, function(req, username, password, done) {
        // mongodb query
        mongo.find("admin", function(err, data) {
            // query error
            if (err) return done(null, false, { message : "Server error" });
            // invalid username or wrong db response
            if (data.length !== 1) return done(null, false, { message : "Invalid username" });
            // Compare passwords
            if (data[0].password === sha3(password)) {
                return done(null, {
                    _id : data[0]._id,
                    username : data[0].username
                });
            } else {
                console.log("Wrong pass");
                return done(null, false, { message : "Invalid password" });
            }
        }, { "username" : username.toLowerCase() });
    }));
};
