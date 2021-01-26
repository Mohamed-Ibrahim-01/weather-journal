let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const btn = document.getElementById('btn-generate');
btn.addEventListener('click', () => updateUI());
/* Function called by event listener */
const updateUI = () => {
    const inputData = getInput();
    passInput(inputData);
    const { temprature, feeling } = getWeatherData();
    document.getElementById('date').innerHTML = `📅 Date: ${newDate}`;
    document.getElementById('temp').innerHTML = `🌡️ Temprature: ${temprature}`;
    document.getElementById('feel').innerHTML = `🌼 Feeling:${feeling}`;
};

/* Function to GET Web API Data*/
const getWeatherData = async () => {
    try {
        const response = await fetch('getWeather');
        return response;
    } catch (err) {
        console.log(err);
    }
};

/* Function to POST data */
const passInput = async (inputData) => {
    try {
        const response = await fetch('/passData', inputData);
    } catch (err) {
        console.log(err);
    }
};

/* Function to GET Project Data */

const getInput = () => {
    let feeling = document.getElementById('feeling').value;
    let zip = document.getElementById('zip').value;
    data = { feeling, zip };
    return data;
};
