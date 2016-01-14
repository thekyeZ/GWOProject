"use strict";
/**
 * @version 0.1.0
 * @description
 * Entry file app
 */
var express             = require("express");

// Controllers
var index = require("./controllers/index"),
    admin = require("./controllers/admin"),
    page = require("./controllers/page"),
    gallery =  require("./controllers/gallery"),
    blog = require("./controllers/blog");

//Express init and configuration
var app = express();

// Routers trace
app.use(express.static("./public"));

app.use('/', index);
app.use('/admin', admin);
app.use('/page', page);
app.use('/gallery', gallery);
app.use('/blog', blog);

// Running app
var port = 3000;
console.log("Server listening on %d", port);
app.listen(port);