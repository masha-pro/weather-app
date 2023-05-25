// Display time

function todayTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

  let currentTime = `${day} ${hours}:${minutes}`;
  return currentTime;
}

let time = document.querySelector(".time");
time.innerHTML = todayTime(new Date());

// Get Weather

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
  let currentCity = response.data.name;
  cityElement.innerHTML = `${currentCity}`;

  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${currentTemperature}`;

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
  let tempFeelsLike = Math.round(response.data.main.feels_like);
  tempFeelsLikeElement.innerHTML = `${tempFeelsLike}`;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  windSpeedElement.innerHTML = `${windSpeed}`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `${humidity}`;

  let pressureElement = document.querySelector("#pressure");
  let pressure = Math.round(response.data.main.pressure);
  pressureElement.innerHTML = `${pressure}`;

  let maxTempElement = document.querySelector("#max-temp");
  let maxTemp = Math.round(response.data.main.temp_max);
  maxTempElement.innerHTML = `${maxTemp}`;

  let minTempElement = document.querySelector("#min-temp");
  let minTemp = Math.round(response.data.main.temp_min);
  minTempElement.innerHTML = `${minTemp}`;
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
