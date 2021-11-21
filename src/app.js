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

let days = [
  "Sunday",
  "Monday",
  "Thuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
let nextDay = new Array();
let j = 0;
currentDate.innerHTML = `${days[weekDay]} ${hour}:${mins}`;

for (var i = weekDay; i < weekDay + 5; i++) {
  nextDay[j] = days[i + 1];
  j++;
}
document.querySelector("#day1").innerHTML = `${nextDay[0]}`;
document.querySelector("#day2").innerHTML = `${nextDay[1]}`;
document.querySelector("#day3").innerHTML = `${nextDay[2]}`;
document.querySelector("#day4").innerHTML = `${nextDay[3]}`;
document.querySelector("#day5").innerHTML = `${nextDay[4]}`;

let temperature = null;
showLondon();
let searchCity = document.querySelector(".search-button");
searchCity.addEventListener("click", showCity);

let tempC = document.querySelector("#celsius-link");
let tempF = document.querySelector("#fahrenheit-link");
tempC.addEventListener("click", convertTempFtC);
tempF.addEventListener("click", convertTempCtF);
