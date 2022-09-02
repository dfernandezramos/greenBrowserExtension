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

//5
//imposta la chiave api e la regione per l'utente

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
