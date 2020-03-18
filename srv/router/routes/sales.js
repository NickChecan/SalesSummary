/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

var express = require("express");
const dbClass = require("sap-hdbext-promisfied");

module.exports = function() {
	
	var app = express.Router();

	// Read Sales Order Header data
	app.get("/", (req, res) => {
		let db = new dbClass(req.db);
		
		var sql = `SELECT "id", "region.name",	"region.subRegion",	"date" FROM "SALESSUMMARY_HDI_DB_1"."Sales.Header"`;
		
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
	
	// Insert Sales Order Header data
	app.post("/", (req, res) => {
		let db = new dbClass(req.db);
		
		var regionName = req.body['region.name'];
		var subRegion = req.body['region.subRegion'];
		
		var sql = `CALL "SALESSUMMARY_HDI_DB_1"."createSalesOrder"(REGION_NAME => ?,SUB_REGION => ?)`;
		
		db.preparePromisified(sql).then(statement => {
			db.statementExecPromisified(statement, [regionName, subRegion]).then(results => {
				return res.type("application/json").status(204).send("Sales Order created!");
			}).catch(err => {
				return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
			});
		}).catch(err => {
			return res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
		});
	});

	return app;
	
};