"use strict";
/**
 * @version 0.1.0
 * @description
 * Entry file app
 */
var express             = require("express"),
    parse               = require("body-parser");

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