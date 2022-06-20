//get current date and time
let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

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
h2.innerHTML = `${date} ${month} ${year}, ${hours}:${minutes}`;

//change city on form, add event on form
const apiKey = "f96a36c366f556dae54ef30478f423d0";
//get real temperature from open weather api
let getCurrentWeather = function (response) {
  console.log(response.data);
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
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
};
// get current location and current temperature
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCur = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios(apiUrlCur).then(getCurrentWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

let getWeather = function (response) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather-sky");
  weather.innerHTML = response.data.weather[0].main;
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
};

//change city button
let changeCity = function (event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = document.querySelector("#input-city");
  h1.innerHTML = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(getWeather);
};

let searchCity = document.querySelector("#change-city-form");
searchCity.addEventListener("submit", changeCity);
let searchCityBut = document.querySelector("#search-city-button");
searchCityBut.addEventListener("click", changeCity);

// change temperature to C and to F
// const currentTemp = document.querySelector("#temp");
// currentTemp.innerHTML = 27;
// let temp = 27;
// let toCelsius = function (event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#temp");
//   currentTemp.innerHTML = temp;
// };
// let toFahrenheit = function (event) {
//   event.preventDefault();
//   let currentTempF = document.querySelector("#temp");
//   currentTempF.innerHTML = Math.round(temp * 1.8 + 32);
// };

// let currentTempInCel = document.querySelector("#celsius");
// currentTempInCel.addEventListener("click", toCelsius);

// let currentTempInFahrenheit = document.querySelector("#fahrenheit");
// currentTempInFahrenheit.addEventListener("click", toFahrenheit);

// get current location
