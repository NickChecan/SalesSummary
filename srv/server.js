/*eslint no-console: 0*/
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var app = express();

// Define which port will run the application
var port = process.env.PORT || 3000;

// Prepare app to automatically understand content-type json 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get request example
app.get('/', (req, res) => res.send("Hello World!"));

// Request Example: {url}/read/1?name=Nicholas
app.get('/read/:num', (req, res) => {
    let name = req.query.name
    console.log(name)
    let num = req.params.num
    if (num > 5) res.send("Greater than 5!")
    else res.send("Less than 5!")
});

// Post request example
app.post('/save', (req, res) => {
    let name = req.body.name
    let number = req.body.number
    console.log("Received name: " + name + ". Received number: " + number)
    res.send("Ok!")
    res.status(204)
})

// Enable the server to be accessed
app.listen(port, () => console.log(`Listening on port ${port}!`));