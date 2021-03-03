// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // write your code here

// Capitalize function
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// // Prompt location
// let city = prompt("Enter your location");
// city = city.trim().toLowerCase(); // trimming, using only lowercase
// // Add Fahrenheit

// console.log(weather);
// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp;
//   let tempC = Math.round(temperature);
//   let tempF = Math.round(temperature * 1.8 + 32);
//   let hum = weather[city].humidity;
//   alert(
//     `It is currently ${tempC}°C (${tempF}°F) in ${capitalize(
//       city
//     )} with a humidity of ${hum}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

// week 4 homework

// feature #1
let currentDateTime = new Date();
// Current day and time
var dayTime = {
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
};

let currentDay = Intl.DateTimeFormat("en-US", dayTime).format(currentDateTime);
let currentDayTimePH = document.querySelector("#day-time");
currentDayTimePH.innerHTML = currentDay;

// Current date
var date = {
  day: "numeric",
  month: "long",
  year: "numeric",
};
let currentDate = Intl.DateTimeFormat("en-US", date).format(currentDateTime);
let currentDatePH = document.querySelector("#date");
currentDatePH.innerHTML = currentDate;

function formatTime(timestamp) {
  var time = {
    hour: "numeric",
    minute: "numeric",
  };

  return Intl.DateTimeFormat("en-US", time).format(timestamp);
}

// API Weather Data
function displayWeather(response) {
  console.log(response.data.name);
  console.log(response.data);
  document.querySelector("#location").innerHTML = response.data.name;
  temperatureC = Math.round(response.data.main.temp);
  console.log(temperatureC);
  document.querySelector("#currentTemperature").innerHTML = `${temperatureC}`;
  document.querySelector("#description").innerHTML = capitalize(
    response.data.weather[0].description
  );
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind_speed").innerHTML = response.data.wind.speed;
  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  // API Weather Data
  let apiKey = "87767cad8ef602f10eee9ef1685a5146";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

// feature #2
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  search(city);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

// feature #3
function convertToC(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = temperatureC;
}

let unitC = document.querySelector("#celsius");
unitC.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = Math.round((temperatureC * 9) / 5 + 32);
}

let temperatureC = null;
let unitF = document.querySelector("#fahrenheit");
unitF.addEventListener("click", convertToF);

function logLocation(position) {
  navigator.geolocation.getCurrentPosition(logLocation);
  // API Weather Data
  let apiKey = "87767cad8ef602f10eee9ef1685a5146";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", logLocation);

search("Leipzig");
