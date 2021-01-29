// Express to run server and routes
const express = require('express');
/* Dependencies */
const path = require('path');
const cors = require('cors');
const body_parser = require('body-parser');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

// Setup empty JS object to act as endpoint for all routes
let projectData = { date: '', inputData: {}, weatherData: {} };

/* Middleware*/
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());

// Initialize the main project folder
const appDir = path.dirname(require.main.filename);
app.use(express.static(`${appDir}/../app`));

// Spin up the server
function listening() {
    console.log(`Server is listening in port ${PORT}`);
}
app.listen(PORT, listening);

//GET Route
app.get('/getProjectData', (req, res) => {
    const temprature = projectData.weatherData.main.temp;
    const feeling = projectData.inputData.feeling;
    const date = projectData.date;
    console.log(projectData);
    res.send({ date, temprature, feeling });
});
//POST Routes
app.post('/storeInput', (req, res) => {
    projectData.date = req.body.date;
    projectData.inputData = req.body.data;
    console.log('Data Stored ');
    res.send({ msg: 'Data Stored' });
});
app.post('/storeWeather', (req, res) => {
    projectData.weatherData = req.body;
    console.log('Data Stored ');
    res.send({ msg: 'Data Stored' });
});
