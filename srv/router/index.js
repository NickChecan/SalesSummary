/*eslint-env node, es6 */
"use strict";

module.exports = (app) => {
	app.use("/hello", require("./routes/hello")());
	app.use("/sales", require("./routes/sales")());
};