// import data for cities in Indiana

//import { cities } from './cities.js';

// notice cities.js has an "export"
// we can now use the variable 'cities' here in P6.js
// always check to make sure it works:

//console.log(cities);

// // PROJECT 6 (SEE DIRECTIONS IN PROJECT ASSIGNMENT)
// // Using this code as a starter, and any styling/code from P5 that is helpful
// // Make a weather app that takes a zipcode but ALSO any CITY in Indiana (you'll need two inputs)
// // then displays the local weather conditions

// // THINGS WE ARE LOOKING FOR YOU TO DO:
// // • verify that use has entered a valid city name (or zip)
// // • for cities, get the city ID from our cities.js for use in the API call
// // • update the user with the local weather conditions (at least what was in P5)
// // • make sure the temperature is in F or C and not Kelvin
// // • give the app an interface
// //    if you aren't good with design, start with our CSS from last time
// //    if you are, creating your own interface
// // • add two new visual aides / weather information (your choice)
// // - for example: (1) update the bkg with what the current weather looks like
// // - (2) like the WTF weather app, have it display a fun message depending on the conditions
// // - (3) give the user a radio button (or similar) choice for F or C readings
// // - (4) make a fancier loading animation / graphic
// // - (5) add an icon/img showing the conditions, the name of which is part of the current conditions JSON
// //       BECAUSE OF SECURITY REASONS, YOU WOULD NEED TO DOWNLOAD THESE TO USE
// //       but if you do that, the name of the image is in <data-response>.weather[0].icon
// //       https://openweathermap.org/weather-conditions
// //       OR download other images or create your own icons
// // - (6) come up with your own addition / adjustment

// // variable
// const base = 'http://api.openweathermap.org/data/2.5/weather';
// const api = 'bbaf86cac3c0e62ef035b4a051fdf664';
// const update = document.querySelector('.update');

// // handle errors
// function handleError(e) {
//   console.log("ERROR!!", e);
//   update.innerHTML = `ERROR!!<br>${e}`;
// }

// update.textContent = 'loading...';

// // async function
// async function displayWeather(id) {
//   const response = await fetch(`${base}?id=${id}&appid=${api}`);
//   const data = await response.json();

//   console.log(data);
//   update.textContent = data.weather[0].main;
// }

// // right now it only works for one city...
// displayWeather('4254679').catch(handleError);


//radio buttons 
var far = document.getElementById('fDegrees');
var cel = document.getElementById('cDegrees');




console.log('weather app online');

// please use this key for weather API
const API_KEY = "fc676f0c6032d100db307e3101c4f7fb"

// ONE
// select HTML elements for the form (zipcode & button)
// select HTML elements for the output (error & info)

var zipcode = document.querySelector('.zipcode');
let button = document.querySelector('button');
let error = document.querySelector('.error');
let info = document.querySelector('.info');
let cityName = document.querySelector('.cityName');



// THREE
// Write a function searchQuery to validate the zipcode
//    • check if the zipcode is a valid zipcode (user helper function)
//    • if it is valid (as in it's 5 digits), call getWeather()
//    • if it is not valid, update text inside 'error' HTML element -
//      text should say "Invalid Zip!" (or similar)

function searchQuery() {
    if(zipcode.value != '') {
        console.log(zipcode.value);
        validateZipCode(zipcode.value);
    }else if(cityName.value != '') {
        console.log(cityName)
        validateCity(cityName.value);
    }
    else{
        error.innerHTML = 'please enter a valid city or zip';
    }  
    };

// FOUR
// Write a helper function validateZipCode
//    • use regex to make sure it's a series of 5 digits
function validateZipCode(zip){
    console.log('checking');
    const checker = /\d{5}/;
    if(checker.test(zip)) {
        console.log("valid");
        error.innerHTML = '';
        getWeather(zip);
    }else{
        console.log('invalid');
        error.innerHTML = 'Invalid Zip!';
        info.innerHTML = '';
    }
};


function validateCity(city){
    //const cityDetails = cities[ci.dataset.index];
    console.log('checking city');
    if(cities.some(cityIN => cityIN.name === city)){
        console.log(cities[name]);
        console.log("valid city");
    }
    else{
        error.innerHTML = 'please enter a vaild city';
    }
}
// FIVE
// Write the function getWeather for fetching weather data using async/await
//    • use async and await
//    • fetch JSON data from OpenWeather API
//    • check the HTTP response status before proceeding in the function
//      - zip might be 5 numbers, but not all 5 number combos are actually zipcodes
//      - OR there could be server issues or internet issues...
//      HOWEVER if data request DID IN FACT work:
//        - clear out any previous error messages
//        - pull data from object for city, humidity, temperature and conditions
//        - by conditions, we mean "Rainy", "Snowy", etc.. 
//        - find where the docs talk about each parameter...
//        - https://openweathermap.org/current
//    • format pulled data using HTML
//    • display in 'info' HTML container - apply class 'weather-desc'



async function getWeather() {
    let units = 'imperial';
    let degree = 'F';

    if(far.checked == true){
        units = 'imperial';
        degree = 'F';
        console.log('what');
    }
    else if(cel.checked == true){
        units = 'metric';
        degree = 'C';
        console.log('metric');
    }
    else{
        units = 'imperial';
        degree = 'F';
    }

    console.log(units);

    console.log('now for the weather');

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+zipcode.value+',us&appid=eecd775ab08f0d0cd13731d6f96182d7&units='+units)
    //fetch('http://api.openweathermap.org/data/2.5/forecast?q=london&appid=fc676f0c6032d100db307e3101c4f7fb&units=metric')
    
    .then(response => response.json())
    .then(data => {
    
    var name = data['name'];
    var temp = data['main']['temp'];
    var desc = data['weather'][0]['description'];
    var humidity = data['main']['humidity'];


///checking the tempurature outside and saying something 
    let update = '';

    if(degree === 'C' && temp <= 13){
        update = 'it\'s fucking cold';
    }else if(degree === 'F' && temp <= 55){
        update = 'it\'s fucking cold';

    }else if(degree === 'C' && 13 < temp < 22){
        update = 'it\'s ok..maybe grab a jacket';
    }else if(degree === 'F' && 55 < temp < 69){
        update = 'it\'s ok..maybe grab a jacket';


    }else if(degree === 'C' && 22 < temp < 30){
        update = 'it\'s nice out';
    }else if(degree === 'F' && 69 < temp < 85){
        update = 'it\'s nice out';


    }else if(degree === 'C' && 29 < temp < 38){
        update = 'it\'s fucking hot';
    }else if(degree === 'F' && 84 < temp < 99){
        update = 'it\'s fucking hot';

    }

    ///changing icons (?)

    var iconcode = data['weather'][0]['icon'];
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('wicon').setAttribute('src', iconurl);
    document.getElementById('icon').style.visibility = 'visible';

    html = `
    <h1>${name}</h1>
    <h3>${update}</h3>
    <p>Current Temperature: ${temp} ${degree}</p>

    <p>Humidity: ${humidity}%</p>

    <p>${desc}</p>
    `;
    console.log(html);
    info.innerHTML = '';
    info.classList.add('.weather-desc');
    info.insertAdjacentHTML('beforeend', html);
})};



// TWO
// When 'search' button is clicked:
//    call a function to first validate the zipcode typed in by the user
// in other words:
//    call searchQuery() and pass it zipcode's value

button.addEventListener('click', searchQuery);
