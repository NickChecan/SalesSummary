/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

var express = require("express");
const dbClass = require("sap-hdbext-promisfied");

module.exports = function() {
	
	var app = express.Router();

	// Hello World Router
	app.get("/", (req, res) => {
		let db = new dbClass(req.db);
		
		var sql = `SELECT SESSION_USER, CURRENT_SCHEMA FROM "DUMMY"`;
		
		db.preparePromisified(sql).then(statement => {
			db.statementExecPromisified(statement, []).then(results => {
				let result = JSON.stringify({
					Objects: results
				});
				return res.type("application/json").status(200).send(result);
			}).catch(err => {
				return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
			});
		}).catch(err => {
			return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
		});
	});

	return app;
	
};