/*eslint-env node, es6 */
"use strict";

module.exports = (app) => {
		 app.use("/node", require("./routes/node")());
};