/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

var express = require("express");

module.exports = function() {
	
	var app = express.Router();

	// Hello World Router
	app.get("/", (req, res) => {
		const dbClass = require("sap-hdbext-promisfied");
		let db = new dbClass(req.db);
		db.preparePromisified(`SELECT "id", "region.name",	"region.subRegion",	"date" FROM "SALESSUMMARY_HDI_DB_1"."Sales.Header"`)
			.then(statement => {
				db.statementExecPromisified(statement, [])
					.then(results => {
						let result = JSON.stringify({
							Objects: results
						});
						return res.type("application/json").status(200).send(result);
					})
					.catch(err => {
						return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
					});
			})
			.catch(err => {
				return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
			});
	});

	return app;
	
};