"use strict";
/**
 * @version 0.1.0
 * @description
 * Entry file app
 */
var express             = require("express"),
    bodyParse           = require("body-parser");

// Controllers
var index = require("./controllers/index");

//Express init and configuration
var app = express();
app.use(bodyParse.json());

// Routers trace
app.use('/', express.static("./public"));
app.use('/', index);


// Running app
var port = 3000;
console.log("Server listening on %d", port);
app.listen(port);