function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
  function showCurrentLocation(position) {
    let heading = document.querySelector("#cityHeading");
    heading.innerHTML = position.data.name;
  }
}
let button = document.querySelector("#location-button");
let getLocation = button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});

//search form and api temp
// function showCity(e) {
//   e.preventDefault();
//   let searchForm = document.querySelector("form");
//   let changeCityHeading = document.querySelector("#cityHeading");
//   let cityInput = searchForm.querySelector("#searchInput");
//   changeCityHeading.innerHTML = cityInput.value;
//   let city = cityInput.value;

//   function showTemperature(response) {
//     let heading = document.querySelector("#currentTemp");
//     let temperature = Math.round(response.data.main.temp);
//     heading.innerHTML = ` ${temperature}`;
//   }
//   let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
//   axios.get(apiUrl).then(showTemperature);
// }

//search form and api temp
function showCity(e) {
  e.preventDefault();
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let city = document.querySelector("#searchInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  function showTemperature(response) {
    document.querySelector("#cityHeading").innerHTML = response.data.name;
    document.querySelector("#currentTemp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = Math.round(
      response.data.main.humidity
    );
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].description;
  }
}

let search = document.querySelector("form");
search.addEventListener("submit", showCity);

//time
function formatTime() {
  let currentTime = document.querySelector("#localTime");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hour = now.getHours();

  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTime.innerHTML = `${day} ${hour}:${minutes} ${ampm}`;
}
let now = new Date();
formatTime();

// Celcius and Fahrenheit
function showFTemp() {
  let fTemp = document.querySelector("#currentTemp");
  fTemp.innerHTML = "80";
}
function showCTemp() {
  let cTemp = document.querySelector("#currentTemp");
  cTemp.innerHTML = "27";
}

let selectCelcius = document.querySelector("#celcius");
let selectFahrenheit = document.querySelector("#fahrenheit");
selectCelcius.addEventListener("click", showCTemp);
selectFahrenheit.addEventListener("click", showFTemp);
