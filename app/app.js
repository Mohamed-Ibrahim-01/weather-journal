/**
 * Global variables
 */
let d = new Date();
let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const APIKEY = '62e30290b589b588152e348058e99031';

// Event listener to add function to existing HTML DOM element
const btn = document.getElementById('btn-generate');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    updateUI();
});

/**
 * @param {string} zip which the user enters
 * @description It constructs the path depends on the given zip
 * @returns {string} Url with zip and apikey to fetch the data from openweather
 */
const constructAPI = (zip) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&appid=${APIKEY}`;
    console.log(api);
    return api;
};
/* Function called by event listener */
/**
 * @description Updates the UI depending on the user input and the fetched data then send post requests to the server
 */
const updateUI = async () => {
    const inputData = getInput();
    if (inputData.feeling && inputData.zip) {
        const url = constructAPI(inputData.zip);
        const fetchedWeather = await getWeatherData(url);
        const temprature = fetchedWeather.main.temp;
        const feeling = inputData.feeling;

        document.getElementById('date').innerHTML = `📅 Date: ${date}`;
        document.getElementById(
            'temp'
        ).innerHTML = `🌡️ Temprature: ${temprature}`;
        document.getElementById('feel').innerHTML = `🌼 Feeling:${feeling}`;
        clearValues(document.getElementsByTagName('input'));

        await storeInput({ temprature, date, inputData });
        await storeWeather(fetchedWeather);
        await getProjectData();
    } else {
        console.log('Please Enter valid input');
    }
};

/**
 * @param {HTMLCollection} list
 * @description Clears the values for the given list
 */
const clearValues = (list) => {
    for (var i = 0; i < list.length; i++) {
        list[i].value = '';
    }
};

/**
 * @description an async function that makes a get request to fetch the projectData
 */
const getProjectData = async () => {
    try {
        const projectData = await fetch('/getProjectData');
        const resData = await projectData.json();
        console.log(resData);
        return resData;
    } catch (err) {
        console.log('CANT FETCH', err);
    }
};
/**
 * @param {string} url a url to fetch data from
 * @description an async function that makes a get request to fetch the weatherData from
 */
const getWeatherData = async (url) => {
    try {
        const fetchedData = await fetch(url);
        const resData = await fetchedData.json();
        console.log(resData);
        return resData;
    } catch (err) {
        console.log('CANT FETCH', err);
    }
};

/**
 * @description an async function as a helper method in post request
 * @param {string} url a url to fetch data from
 * @param {object} reqInfo request info (method, headers , data)
 */

const makeReq = async (url, reqInfo) => {
    try {
        const response = await fetch(url, reqInfo);
        const resData = await response.json();
        return resData;
    } catch (err) {
        console.log(err);
    }
};

/**
 * @description an async function to make POST request to store user input data
 * @param {object} data data to be stored
 */
const storeInput = async (data) => {
    const reqData = data;
    const url = '/storeInput';
    const reqInfo = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData),
    };
    makeReq(url, reqInfo);
};

/**
 * @description an async function to make POST request to store weather data fetched from "openweathermap"
 * @param {object} data data to be stored
 */
const storeWeather = async (data) => {
    const reqData = data;
    const url = '/storeWeather';
    const reqInfo = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData),
    };
    makeReq(url, reqInfo);
};

/**
 * @description Getting user input from the DOM
 */
const getInput = () => {
    let feeling = document.getElementById('feeling').value;
    let zip = document.getElementById('zip').value;
    data = { feeling, zip };
    return data;
};
