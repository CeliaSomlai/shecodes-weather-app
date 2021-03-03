// Capitalize function
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// creating time functions
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

function day(timestamp) {
  var time = {
    weekday: "short",
  };
  return Intl.DateTimeFormat("en-US", time).format(timestamp);
}

// API Weather Data
function displayWeather(response) {
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureC = Math.round(response.data.current.temp);
  document.querySelector("#currentTemperature").innerHTML = `${temperatureC}`;
  document.querySelector("#description").innerHTML = capitalize(
    response.data.current.weather[0].description
  );
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.current.feels_like
  );
  document.querySelector("#wind_speed").innerHTML =
    response.data.current.wind_speed;
  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.current.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.current.sunset * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`
    );

  forecast = null;
  document.querySelector("#forecast").innerHTML = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.daily[index];
    document.querySelector("#forecast").innerHTML += `
  <div class="col-2">
   <h3>
    ${day(forecast.dt * 1000)}
   </h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" />
            <div class="forecast-temperature"><strong id="forecastTempCMax">${Math.round(
              forecast.temp.max
            )}</strong>° <span class="forecastTempCMin">${Math.round(
      forecast.temp.min
    )}</span>°</div>
          </div>`;
  }
}

function searchCoord(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  let lon2 = response.data.coord.lon;
  let lat2 = response.data.coord.lat;
  let apiKey = "87767cad8ef602f10eee9ef1685a5146";
  let apiURLall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat2}&lon=${lon2}&exclude={hourly}&appid=${apiKey}&units=metric`;
  axios.get(apiURLall).then(displayWeather);
}

function search(city) {
  // API Weather Data
  let apiKey = "87767cad8ef602f10eee9ef1685a5146";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(searchCoord);
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

  let maxTempFC = document.querySelectorAll("#forecastTempCMax");
  maxTempFC.forEach(convertToCFCMax);
  console.log(maxTempFC);
  let minTempFC = document.querySelectorAll(".forecastTempCMin");
  minTempFC.forEach(convertToCFCMin);
  console.log(minTempFC);

  celsius.removeEventListener("click", convertToC);
  fahrenheit.addEventListener("click", convertToF);
}

function convertToCFCMax(item) {
  let currentTempHigh = item.innerHTML;
  console.log(currentTempHigh);
  let newTempHigh = `${Math.round(((currentTempHigh - 32) * 5) / 9)}`;
  console.log(newTempHigh);
  item.innerHTML = newTempHigh;
}

function convertToCFCMin(item) {
  let currentTempLow = item.innerHTML;
  console.log(currentTempLow);
  let newTempLow = `${Math.round(((currentTempLow - 32) * 5) / 9)}`;
  item.innerHTML = newTempLow;
  console.log(newTempLow);
}

let unitC = document.querySelector("#celsius");
unitC.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = Math.round((temperatureC * 9) / 5 + 32);

  let maxTempFC = document.querySelectorAll("#forecastTempCMax");
  maxTempFC.forEach(convertToFFCMax);
  console.log(maxTempFC);
  let minTempFC = document.querySelectorAll(".forecastTempCMin");
  minTempFC.forEach(convertToFFCMin);
  console.log(minTempFC);
  celsius.addEventListener("click", convertToC);
  fahrenheit.removeEventListener("click", convertToF);
}

function convertToFFCMax(item) {
  let currentTempHigh = item.innerHTML;
  console.log(currentTempHigh);
  let newTempHigh = `${Math.round((currentTempHigh * 9) / 5 + 32)}`;
  console.log(newTempHigh);
  item.innerHTML = newTempHigh;
}

function convertToFFCMin(item) {
  let currentTempLow = item.innerHTML;
  console.log(currentTempLow);
  let newTempLow = `${Math.round((currentTempLow * 9) / 5 + 32)}`;
  item.innerHTML = newTempLow;
  console.log(newTempLow);
}

let temperatureC = null;

let unitF = document.querySelector("#fahrenheit");
unitF.addEventListener("click", convertToF);

function logLocation(position) {
  navigator.geolocation.getCurrentPosition(logLocation);

  // API Weather Data
  let apiKey = "87767cad8ef602f10eee9ef1685a5146";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude={hourly}&appid=${apiKey}&units=metric`;
  document.querySelector("#location").innerHTML = `Your location`;
  axios.get(apiURL).then(displayWeather);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", logLocation);

search("Leipzig");
