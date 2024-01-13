function refreshWeather(response) {
    let temperature = response.data.temperature.current;
    let currentTemp = document.querySelector("#currentTemp");
    currentTemp.innerHTML = Math.round(temperature);
    let h1 = document.querySelector("h1");
    h1.innerHTML = `The current weather in ${response.data.city}`;
    let WeatherDescription = document.querySelector("#description");
    WeatherDescription.innerHTML = `Today you will have ${response.data.condition.description}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    let wind = document.querySelector("#wind");
    let windSpeed = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${windSpeed}km/h`;
    let date = new Date(response.data.time * 1000);
    let time = document.querySelector("#currentTime");
    time.innerHTML = formatDate(date);
    let icon = document.querySelector("#icon");
    icon.innerHTML = `<img src="${response.data.condition.icon_url}"  class="current-image"/>`;
    getForecast(response.data.city);
  }
  function formatDate(date) {
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
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
    let month = months[date.getMonth()];
    let number = date.getDate();
    let day = days[date.getDay()];
    return `It is ${day}, ${number} ${month} and the time is ${hours}:${minutes}`;
  }
  
  function search(city) {
    let apiKey = `99e882a3db10efo5bb4b346d32e0a6t0`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
  }
  
  function submitSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar");
    search(searchInput.value);
  }
  function getForecast(city) {
    let apiKey = `99e882a3db10efo5bb4b346d32e0a6t0`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }
  function displayForecast(response) {
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
      if (index < 6) {
        forecastHtml =
          forecastHtml +
          `<div class="col-2">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <div class="forecast-icon">
              <img src="${day.condition.icon_url}" width="50px" />
              </div>
              <div class="forecast-temp">
                <span class="max">${Math.round(
                  day.temperature.maximum
                )}</span> <span class="min">${Math.round(
            day.temperature.minimum
          )}</span>
              </div>
            </div>
  `;
      }
    });
    let forecastElement = document.querySelector("#row");
    forecastElement.innerHTML = forecastHtml;
  }
  let searchForm = document.querySelector("#search");
  searchForm.addEventListener("submit", submitSearch);
  
  search("Leeds");
  
  