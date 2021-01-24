//dotenv to use enviroment variables 
require('dotenv').config();
// Express to run server and routes
const express = require("express");
const cors = require('cors');
const body_parser = require('body-parser');

// Start up an instance of app
const app = express();

//get enviroment variables (PORT)
const { PORT, HOST } = process.env;
// Setup empty JS object to act as endpoint for all routes

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }))
// parse application/json
app.use(body_parser.json())

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("../app"));

//
function listening (){
    console.log(`Server is listening in port ${PORT}`);
}

// Spin up the server
app.listen(PORT, listening);
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
