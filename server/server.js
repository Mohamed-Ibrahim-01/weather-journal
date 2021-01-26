// Express to run server and routes
const express = require('express');
/* Dependencies */
const cors = require('cors');
const body_parser = require('body-parser');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

// Setup empty JS object to act as endpoint for all routes
let projectData = { inputData: {}, weatherData: {} };

/* Middleware*/
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('../app'));

// Spin up the server
function listening() {
    console.log(`Server is listening in port ${PORT}`);
}
app.listen(PORT, listening);

//GET Route
app.get('/getProjectData', (req, res) => {
    console.log(projectData);
    res.send(projectData);
});
//POST Routes
app.post('/storeInput', (req, res) => {
    projectData.inputData = req.body;
    console.log("Data Stored ");
    res.send({ msg: 'Data Stored' });
});
app.post('/storeWeather', (req, res) => {
    projectData.weatherData = req.body;
    console.log("Data Stored ");
    res.send({ msg: 'Data Stored' });
});
