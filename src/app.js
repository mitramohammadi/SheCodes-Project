function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  forecast.shift();
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class="card">
			  <br />
        <div class="next-day-info">${formatDay(forecastDay.dt)} </div>
         <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          class="next-day-emoji" />
          <div class="next-day-temp">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span></div>
          </div>
          </div>
      
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let searchCityTemp = document.querySelector("#current-temp");
  temperature = response.data.main.temp;
  searchCityTemp.innerHTML = Math.round(temperature);
  console.log(response);
  let icon = document.querySelector("#current-city-emoji");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let weatherDesc = document.querySelector("#weatherDesc");
  weatherDesc.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `, Wind: ${response.data.wind.speed}km/h`;
  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-city");
  if (city.value.length > 0) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
    let apiKey = "7dd408b3bd35b3107b440ac80deba4df";
    let temp = axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
    let currentCity = document.querySelector("#cuurent-city");
    currentCity.innerHTML = city.value;
    city.value = "";
  }
}

function showLondon() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric`;
  let apiKey = "7dd408b3bd35b3107b440ac80deba4df";
  let temp = axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function convertTempFtC(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(temperature);
}

function convertTempCtF(event) {
  event.preventDefault();
  let tempF = (temperature * 9) / 5 + 32;
  document.querySelector("#current-temp").innerHTML = Math.round(tempF);
}

function updateDate(event) {
  event.preventDefault();
  let date = new Date();
  let weekDay = date.getDay();
  let hour = date.getHours();
  let mins = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${days[weekDay]} ${hour}:${mins}`;
}

let days = [
  "Sunday",
  "Monday",
  "Thuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let date = new Date();
let weekDay = date.getDay();
let hour = date.getHours();
let mins = date.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (mins < 10) {
  mins = `0${mins}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${days[weekDay]} ${hour}:${mins}`;

let temperature = null;
showLondon();

let searchCity = document.querySelector(".search-button");
searchCity.addEventListener("click", showCity);
searchCity.addEventListener("click", updateDate);

let tempC = document.querySelector("#celsius-link");
let tempF = document.querySelector("#fahrenheit-link");
tempC.addEventListener("click", convertTempFtC);
tempF.addEventListener("click", convertTempCtF);
