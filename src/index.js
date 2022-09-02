import axios from '../node_modules/axios';

// form fields
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');

// results
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearbtn = document.querySelector('.clear-btn');


//6
//chiamata API

async function displayCarbonUsage (apiKey, regionName) {
    try {
        await axios.get('https://api.co2signal.com/v1/latest', {
            params: {
                countryCode: regionName,
            },
            headers: {
                'auth-token': apiKey,
            },
        }).then((response) => {
            let CO2 = Math.floor(response.data.data.carbonIntensity);

            // calculateColor(CO2);

            loading.style.display = 'none';
            form.style.display = 'none';
            myregion.textContent = regionName;
            usage.textContent = Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour)';
            fossilfuel.textContent = response.data.data.fossilFuelPercentage.toFixed(2) + '% (percentage of fossil fuels used to generate electricity)';
            results.style.display = 'block';
        });
    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = 'Sorry, we have no data for the region you have requested.';
    }
}

function handleSubmit (e) {
    e.preventDefault();
    setUpUser(apiKey.value, region.value);
}

function setUpUser (apiKey, regionName) {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('regionName', regionName);
    loading.style.display = 'block';
    errors.textContent = '';
    clearbtn.style.display = 'block';

    displayCarbonUsage(apiKey, regionName);
}

function init () {
    // if anything is in local storage, pick it up
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegion = localStorage.getItem('regionName');

    // set icon to be generic green
    // TODO

    if (storedApiKey === null || storedRegion === null){
        form.style.display = 'block';
        results.style.display = 'none';
        loading.style.display = 'none';
        clearbtn.style.display = 'none';
        errors.textContent = '';
    } else {
        displayCarbonUsage(storedApiKey, storedRegion);
        results.style.display = 'none';
        form.style.display = 'none';
        clearbtn.style.display = 'block';
    }
};

function reset (e) {
    e.preventDefault();
    localStorage.removeItem('regionName');
    init();
}

// listeners
form.addEventListener('submit', (e) => handleSubmit(e));
clearbtn.addEventListener('click', (e) => reset(e));
init();
