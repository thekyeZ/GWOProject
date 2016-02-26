"use strict";
/**
 * @version 0.1.0
 * @description
 * Entry file app
 */
var express             = require("express"),
    parse               = require("body-parser"),
    cookieParser        = require("cookie-parser"),
    expressSession      = require("express-session"),
    passport            = require("passport");


// Libs
var passportStrategies  = require('./libs/passport'),
    mongodb             = require('./libs/mongodb');

// Controllers
var index = require("./controllers/index"),
    admin = require("./controllers/admin"),
    page = require("./controllers/page"),
    gallery =  require("./controllers/gallery"),
    blog = require("./controllers/blog"),
    __install = require('./controllers/__install');


//Express init and configuration
var app = express();

app.use(parse.json());
app.use(parse.urlencoded({
    "extended" : true
}));
app.use(cookieParser());
app.use(expressSession({
    secret : "kO-#do_1Pl_l-EdQ2gv",
    cookie : { maxAge : 600000 },
    resave: true,
    saveUninitialized: true
}));


// Passport ini
app.use(passport.initialize());
app.use(passport.session());

/**
 * Passport serialize, deserialize user in session-cookies
 */
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {

    mongodb.find("admin", function(err, data) {
        if (err) return done(null, null);
        if (data[0].length === 1) return done(null, true);
        return done(null, data);
    }, { '_id' : mongodb.ObjectId(id)});

});

passportStrategies(passport);

// Routers trace
app.use(express.static("./public"));
app.use('/index', index);
app.use('/admin', admin);
app.use('/page', page);
app.use('/gallery', gallery);
app.use('/blog', blog);


// Comment after installation
app.use('/install', __install);


// Running app
var port = 3000;
console.log("Server listening on %d", port);
app.listen(port);