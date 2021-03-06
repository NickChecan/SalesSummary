/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
/*eslint-env node, es6 */
"use strict";

const http = require("http");
const xsenv = require("@sap/xsenv");
const xsHDBConn = require("@sap/hdbext");
const express = require("express");
const bodyParser = require("body-parser");

// Set server configuration
var port = process.env.PORT || 3000;
var server = http.createServer();

// Initialize Express to set application middlewares and manage the available services
var app = express();

// Prepare app to automatically understand content-type json 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get HANA database connection details
var hanaOptions = xsenv.getServices({hana: {tag: "hana"}});

// Set middleware to provide HANA database connection
app.use(xsHDBConn.middleware(hanaOptions.hana));

// Setup Routes
var router = require("./router")(app);

// Start the Web Server
server.on("request", app);

// Enable port access and log operation details
server.listen(port, () => console.info(`HTTP Server: ${server.address().port}`));