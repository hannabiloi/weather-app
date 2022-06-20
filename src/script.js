//get current date and time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let year = now.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  return `${date} ${month} ${year}, ${hours}:${minutes}`;
}
const apiKey = "f96a36c366f556dae54ef30478f423d0";
//change city on form, add event on form
function getApi(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(getWeather);
}
//get real temperature from open weather api
let getWeather = function (response) {
  console.log(response.data);
  let temp = document.querySelector("#temp");
  celsiusTemp = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let weather = document.querySelector("#weather-sky");
  weather.innerHTML = response.data.weather[0].main;
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#current-date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
  icon.setAttribute("alt", response.data.weather[0].description);
};
// get current location and current temperature
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCur = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios(apiUrlCur).then(getWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//change city button
function getApi(city) {
  const apiKey = "f96a36c366f556dae54ef30478f423d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(getWeather);
}
let changeCity = function (event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = document.querySelector("#input-city");
  h1.innerHTML = city.value;
  getApi(city.value);
};

getApi("Kyiv");
let searchCity = document.querySelector("#change-city-form");
searchCity.addEventListener("submit", changeCity);
let searchCityBut = document.querySelector("#search-city-button");
searchCityBut.addEventListener("click", changeCity);

// change temperature to C and to F
// let temp = document.querySelector("#temp").innerHTML;
let celsiusTemp = null;

let toCelsius = function (event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
};
let toFahrenheit = function (event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
};

let currentTempInCel = document.querySelector("#celsius");
currentTempInCel.addEventListener("click", toCelsius);

let currentTempInFahrenheit = document.querySelector("#fahrenheit");
currentTempInFahrenheit.addEventListener("click", toFahrenheit);

// get current location
