require('dotenv').config();
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

const app = express();
const { PORT } = process.env;

let projectData = { inputData: {}, weatherData: {} };

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());
app.use(express.static('../app'));

// Spin up the server
function listening() {
    console.log(`Server is listening in port ${PORT}`);
}
app.listen(PORT, listening);
app.get('/getProjectData', (req, res) => {
    res.send(projectData);
});
app.post('/storeInput', (req, res) => {
    projectData.inputData = req.body;
    res.send({ msg: 'Data Stored' });
});
app.post('/storeWeather', (req, res) => {
    projectData.weatherData = req.body;
    res.send({ msg: 'Data Stored' });
});
