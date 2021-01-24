// Express to run server and routes
const express = require("express");
const cors = require('cors');
const body_parser = require('body-parser');

// Start up an instance of app
const app = express();
// Setup empty JS object to act as endpoint for all routes

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("../app"));

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
