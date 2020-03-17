/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
/*eslint-env node, es6 */
"use strict";

var http = require("http");
var port = process.env.PORT || 3000;
var server = require("http").createServer();

//Initialize Express App for XSA UAA and HDBEXT Middleware
var xsenv = require("@sap/xsenv");
var xssec = require("@sap/xssec");
var xsHDBConn = require("@sap/hdbext");
var express = require("express");

//Initialize Express App for XS UAA and HDBEXT Middleware
var app = express();

var hanaOptions = xsenv.getServices({hana: {tag: "hana"}});

app.use(xsHDBConn.middleware(hanaOptions.hana));

// Setup Routes
var router = require("./router")(app);

// Start the Server 
server.on("request", app);

server.listen(port, function() {
	console.info(`HTTP Server: ${server.address().port}`);
});