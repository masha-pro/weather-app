// Display time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  return `${day} ${hours}:${minutes}`;
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

search("Kharkiv");

function search(city) {
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function getWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${response.data.name}`;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`;

  dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let weatherElement = document.querySelector("#weather");
  let currentWeather = response.data.weather[0].description;
  weatherElement.innerHTML = `${currentWeather}`;

  let weatherIcon = document.querySelector("#weather-icon");

  if (currentWeather === "clear sky") {
    weatherIcon.innerHTML = "☀️";
  }

  if (currentWeather === "broken clouds") {
    weatherIcon.innerHTML = "⛅";
  }

  if (
    currentWeather === "scattered clouds" ||
    currentWeather === "few clouds"
  ) {
    weatherIcon.innerHTML = "🌤️";
  }

  if (currentWeather === "overcast clouds") {
    weatherIcon.innerHTML = "☁️";
  }

  if (currentWeather === "rain" || currentWeather === "light rain") {
    weatherIcon.innerHTML = "🌧️";
  }

  if (currentWeather === "fog") {
    weatherIcon.innerHTML = "🌫️";
  }

  if (currentWeather === "Snow") {
    weatherIcon.innerHTML = "🌨️";
  }

  let tempFeelsLikeElement = document.querySelector("#temp-feels-like");
  tempFeelsLikeElement.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}`;

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${Math.round(response.data.main.pressure)}`;

  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = `${Math.round(response.data.main.temp_max)}`;

  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = `${Math.round(response.data.main.temp_min)}`;
}

// Current Location

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(getWeather);
}
