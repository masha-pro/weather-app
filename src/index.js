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

// Display Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
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
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="daily-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }.png"
                alt=""
                width="70"
                class="daily-forecast-icon"
              />
              <div class="daily-forecast-temp">
                <span class="daily-forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="daily-forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// Display Weather

function getWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${response.data.name}`;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  celciusTemperature = Math.round(response.data.main.temp);

  dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let weatherElement = document.querySelector("#weather");
  let currentWeather = response.data.weather[0].description;
  weatherElement.innerHTML = `${currentWeather}`;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let tempFeelsLikeElement = document.querySelector("#temp-feels-like");
  tempFeelsLikeElement.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;
  feelsLikeCelciusTemperature = Math.round(response.data.main.feels_like);

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}`;

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${Math.round(response.data.main.pressure)}`;

  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  maxCelciusTemperature = Math.round(response.data.main.temp_max);

  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  minCelciusTemperature = Math.round(response.data.main.temp_min);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

// Current Location

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

// Conversion Celcius-Fahrenheit

function showFahrenheitTemperature(event) {
  event.preventDefault();

  celciusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;

  let feelsLikeTempElement = document.querySelector("#temp-feels-like");
  let feelsLikeFahrenheitTemperature = Math.round(
    (feelsLikeCelciusTemperature * 9) / 5 + 32
  );
  feelsLikeTempElement.innerHTML = feelsLikeFahrenheitTemperature;

  let maxTempElement = document.querySelector("#max-temp");
  let maxFahrenheitTemperature = Math.round(
    (maxCelciusTemperature * 9) / 5 + 32
  );
  maxTempElement.innerHTML = maxFahrenheitTemperature;

  let minTempElement = document.querySelector("#min-temp");
  let minFahrenheitTemperature = Math.round(
    (minCelciusTemperature * 9) / 5 + 32
  );
  minTempElement.innerHTML = minFahrenheitTemperature;

  let feelsLikeDegreeElement = document.querySelector("#feels-like-degree");
  feelsLikeDegreeElement.innerHTML = `°F`;

  let minTempDegreeElement = document.querySelector("#min-temp-degree");
  minTempDegreeElement.innerHTML = `°F`;

  let maxTempDegreeElement = document.querySelector("#max-temp-degree");
  maxTempDegreeElement.innerHTML = `°F`;
}

function showCelciusTemperature(event) {
  event.preventDefault();

  celciusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celciusTemperature;

  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = maxCelciusTemperature;

  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = minCelciusTemperature;

  let feelsLikeTempElement = document.querySelector("#temp-feels-like");
  feelsLikeTempElement.innerHTML = feelsLikeCelciusTemperature;

  let feelsLikeDegreeElement = document.querySelector("#feels-like-degree");
  feelsLikeDegreeElement.innerHTML = `°C`;

  let maxTempDegreeElement = document.querySelector("#max-temp-degree");
  maxTempDegreeElement.innerHTML = `°C`;

  let minTempDegreeElement = document.querySelector("#min-temp-degree");
  minTempDegreeElement.innerHTML = `°C`;
}

// General variables

let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSubmit);

search("Kharkiv");
