//1
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

//4
// gestisce l'invio del form

//3 controlli iniziali

//2
// listeners
form.addEventListener('submit', (e) => handleSubmit(e));
clearbtn.addEventListener('click', (e) => reset(e));
init();
