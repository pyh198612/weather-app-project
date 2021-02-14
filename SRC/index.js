//Main session time

let apiKey = "3cbad6f9a349042eb44901a3bdcb3200";

function showDate (timestamp) {
  let time = new Date(timestamp);
  let date = time.getDate (); 
  let conDate = ("0"+date).slice(-2);
  let month = ("0"+(time.getMonth()+1)).slice(-2);
  let year = time.getFullYear();
  return `${conDate}.${month}.${year}`;
}

function showDay (timestamp){
  let time = new Date (timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days [time.getDay()]; 
  return `${day}`;
}

function showTime (timestamp) {
  let time = new Date (timestamp);
  let hours = time.getHours();
  let minutes = time.getMinutes ();
  let conMinutes = ("0" + minutes).slice(-2);
  if (hours >11 && hours !== 12) {
    let pmHours = hours - 12;
    let conPmHours = ("0" + pmHours).slice(-2);
    return `${conPmHours}:${conMinutes} pm`;
  } else if (hours === 12) {
    return `${hours}:${conMinutes} pm`;
  } else if (hours >=1 && hours <= 11) {
    let conHours = ("0" + hours).slice(-2);
    return `${conHours}:${conMinutes} am`;
  } else if (hours === 0) {
    let midnightHours = hours +12;
    return `${midnightHours}:${conMinutes} am`;
  }
}



//Main-session

function showTemperature (response) {
//console.log(response.data);
  let temperature = Math.round(response.data.main.temp); 
  let nowTemp = document.querySelector ("#current-temp");
  nowTemp.innerHTML = temperature; 
  
  let description = response.data.weather[0].description; 
  let nowDescription = document.querySelector ("#now-weather-description");
  nowDescription.innerHTML = description; 

  let windSpeed = Math.round(response.data.wind.speed);
  let nowWindSpeed = document.querySelector ("#wind-speed");
  nowWindSpeed.innerHTML = windSpeed;
  
  
  let timestamp = response.data.dt;
  console.log(timestamp);
  let dateFormat = new Date (timestamp*1000);
  console.log (dateFormat);
  let unixDate = new Date (dateFormat).toUTCString();
  console.log (unixDate);
  

  let timezone = response.data.timezone;
  let localTimestamp = timestamp + timezone;
  let conLocalTimestamp = localTimestamp*1000;
  let todayDate = document.querySelector ("#main-session-date");
  todayDate.innerHTML = showDate (conLocalTimestamp);
  let todayDay = document.querySelector ("#main-session-day");
  todayDay.innerHTML = showDay (conLocalTimestamp);
  let todayTime = document.querySelector ("#main-session-time");
  todayTime.innerHTML = showTime (conLocalTimestamp);
  
  let mainIcon = document.querySelector ("#main-icon");
  let iconCode = response.data.weather[0].icon;
  if (iconCode === "02d") {
    mainIcon.setAttribute ("src", `IMG/cloudy with sun_02d.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "02n") {
    mainIcon.setAttribute ("src", `IMG/few clouds_02n.png`)
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "01d") {
    mainIcon.setAttribute ("src", `IMG/sunny_01d.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "01n") {
    mainIcon.setAttribute ("src", `IMG/clear sky_01n.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "03d" || iconCode === "03n"){
    mainIcon.setAttribute ("src", `IMG/scattered clouds_03.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "04d" || iconCode === "04n"){
    mainIcon.setAttribute ("src", `IMG/broken clouds_04.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);    
  } else if (iconCode === "09d" || iconCode === "09n"){
    mainIcon.setAttribute ("src", `IMG/shower rain_09.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);   
  } else if (iconCode === "10d"){ 
    mainIcon.setAttribute ("src", `IMG/rain_10d.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "10n"){ 
    mainIcon.setAttribute ("src", `IMG/rain_10n.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);
  } else if (iconCode === "11d" || iconCode === "11n"){
    mainIcon.setAttribute ("src", `IMG/thunderstorm_11.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);   
  } else if (iconCode === "13d" || iconCode === "13n"){
    mainIcon.setAttribute ("src", `IMG/snow_13.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);   
  } else if (iconCode === "50d" || iconCode === "50n"){
    mainIcon.setAttribute ("src", `IMG/mist_50.png`); 
    mainIcon.setAttribute ("alt", response.data.weather[0].description);   
  }
}

function showForecast (response){
  let forecastElement = document.querySelector ("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 1; index < 5; index ++) {
    forecast = response.data.daily[index];

    let iconCode = forecast.weather[0].icon;
      if (iconCode === "02d") {
      forecastSrc = `IMG/cloudy with sun_02d.png`; 
      forecastAlt = forecast.weather[0].description;
    } else if (iconCode === "02n") {
      forecastSrc = `IMG/few clouds_02n.png`;
      forecastAlt =forecast.weather[0].description;
    } else if (iconCode === "01d") {
      forecastSrc = `IMG/sunny_01d.png`; 
      forecastAlt =forecast.weather[0].description;
    } else if (iconCode === "01n") {
      forecastSrc = `IMG/clear sky_01n.png`; 
      forecastAlt =forecast.weather[0].description;
    } else if (iconCode === "03d" || iconCode === "03n"){
      forecastSrc = `IMG/scattered clouds_03.png`; 
      forecastAlt = forecast.weather[0].description;
    } else if (iconCode === "04d" || iconCode === "04n"){
      forecastSrc = `IMG/broken clouds_04.png`; 
      forecastAlt = forecast.weather[0].description;    
    } else if (iconCode === "09d" || iconCode === "09n"){
      forecastSrc = `IMG/shower rain_09.png`; 
      forecastAlt = forecast.weather[0].description;   
    } else if (iconCode === "10d"){ 
      forecastSrc = `IMG/rain_10d.png`; 
      forecastAlt = forecast.weather[0].description;
    } else if (iconCode === "10n"){ 
      forecastSrc = `IMG/rain_10n.png`; 
      forecastAlt = forecast.weather[0].description;
    } else if (iconCode === "11d" || iconCode === "11n"){
      forecastSrc = `IMG/thunderstorm_11.png`; 
      forecastAlt = forecast.weather[0].description;   
    } else if (iconCode === "13d" || iconCode === "13n"){
      forecastSrc = `IMG/snow_13.png`; 
      forecastAlt = forecast.weather[0].description;   
    } else if (iconCode === "50d" || iconCode === "50n"){
      forecastSrc = `IMG/mist_50.png`; 
      forecastAlt = forecast.weather[0].description;   
    }

  forecastElement.innerHTML += `
   
   <p>
     <div class="row align-items-center">
      <div class="col-1"></div>
      <div class="col-2">
        ${showDate ((forecast.dt)*1000)}
      </div>
      <div class="col-2">
        ${showDay ((forecast.dt)*1000)}
      </div>
      <div class="col-2">
        <img src="${forecastSrc}" alt="${forecastAlt}" class="small-image" id="forecast-icon"/>
      </div>
      <div class="col-2">
        ${Math.round(forecast.temp.min)}° / ${Math.round(forecast.temp.max)} °C
      </div>
      <div class="col-2">
        <i class="fas fa-umbrella"></i> ${(forecast.pop)*100}% <br/>
        <i class="fas fa-wind"></i> ${Math.round(forecast.wind_speed)} m/s
      </div>
      <div class="col-1"></div>
     </div>
    </p>
  <hr/>
  `;
  } 

  lastForecast = response.data.daily[5];
    let iconCode = lastForecast.weather[0].icon;
      if (iconCode === "02d") {
      forecastSrc = `IMG/cloudy with sun_02d.png`; 
      forecastAlt = lastForecast.weather[0].description;
    } else if (iconCode === "02n") {
      forecastSrc = `IMG/few clouds_02n.png`;
      forecastAlt =lastForecast.weather[0].description;
    } else if (iconCode === "01d") {
      forecastSrc = `IMG/sunny_01d.png`; 
      forecastAlt =lastForecast.weather[0].description;
    } else if (iconCode === "01n") {
      forecastSrc = `IMG/clear sky_01n.png`; 
      forecastAlt =lastForecast.weather[0].description;
    } else if (iconCode === "03d" || iconCode === "03n"){
      forecastSrc = `IMG/scattered clouds_03.png`; 
      forecastAlt =lastForecast.weather[0].description;
    } else if (iconCode === "04d" || iconCode === "04n"){
      forecastSrc = `IMG/broken clouds_04.png`; 
      forecastAlt = lastForecast.weather[0].description;    
    } else if (iconCode === "09d" || iconCode === "09n"){
      forecastSrc = `IMG/shower rain_09.png`; 
      forecastAlt = flastForecast.weather[0].description;   
    } else if (iconCode === "10d"){ 
      forecastSrc = `IMG/rain_10d.png`; 
      forecastAlt = lastForecast.weather[0].description;
    } else if (iconCode === "10n"){ 
      forecastSrc = `IMG/rain_10n.png`; 
      forecastAlt = lastForecast.weather[0].description;
    } else if (iconCode === "11d" || iconCode === "11n"){
      forecastSrc = `IMG/thunderstorm_11.png`; 
      forecastAlt = flastForecast.weather[0].description;   
    } else if (iconCode === "13d" || iconCode === "13n"){
      forecastSrc = `IMG/snow_13.png`; 
      forecastAlt = lastForecast.weather[0].description;   
    } else if (iconCode === "50d" || iconCode === "50n"){
      forecastSrc = `IMG/mist_50.png`; 
      forecastAlt = lastForecast.weather[0].description;   
    }

  forecastElement.innerHTML += `
   <p>
     <div class="row align-items-center">
      <div class="col-1"></div>
      <div class="col-2">
        ${showDate ((lastForecast.dt)*1000)}
      </div>
      <div class="col-2">
        ${showDay ((lastForecast.dt)*1000)}
      </div>
      <div class="col-2">
        <img src="${forecastSrc}" alt="${forecastAlt}" class="small-image" id="forecast-icon"/>
      </div>
      <div class="col-2">
        ${Math.round(lastForecast.temp.min)}° / ${Math.round(lastForecast.temp.max)} °C
      </div>
      <div class="col-2">
        <i class="fas fa-umbrella"></i> ${(lastForecast.pop)*100}% <br/>
        <i class="fas fa-wind"></i> ${Math.round(lastForecast.wind_speed)} m/s
      </div>
      <div class="col-1"></div>
     </div>
    </p>
  `;
  } 


function showCityPrecipitation (response) {
  let cityPrecipitation = Math.round ((response.data.daily[0].pop)*100);
  let cityPrecipitationPercentage = document.querySelector ("#now-precipitation");
  cityPrecipitationPercentage.innerHTML = cityPrecipitation;
}

function showMinMaxTemp (response){
  let maxTemperature = Math.round (response.data.daily[0].temp.max);
  let minTemperature = Math.round (response.data.daily[0].temp.min);
  let nowMaxTemp = document.querySelector ("#now-max-temp");
  let nowMinTemp = document.querySelector ("#now-min-temp");
  nowMaxTemp.innerHTML = maxTemperature; 
  nowMinTemp.innerHTML = minTemperature; 
}

function showCityPosition (response) {
  let cityLon = response.data[0].lon;
  let cityLat = response.data[0].lat;
  let units = "metric";
  let excludes = "current,hourly,minutely,alerts";
  let apiOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=${excludes}&appid=${apiKey}&units=${units}`;

  axios.get(apiOneCallUrl).then(showCityPrecipitation);
  axios.get(apiOneCallUrl).then(showMinMaxTemp);
  axios.get(apiOneCallUrl).then (showForecast);
}

function searchCity (event) {
  event.preventDefault ();
  let cityInput = document.querySelector("#search-input");
  let h1= document.querySelector ("h1");
  h1.innerHTML = `${cityInput.value}`;
  
  let city = cityInput.value; 
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  let apiGeocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${apiKey}`;
  axios.get(apiGeocodingUrl).then (showCityPosition);

}


let searchEngine = document.querySelector ("#search-form");
searchEngine.addEventListener ("submit", searchCity);

// For Current button
function getCurrentLocationName (response) {
  let currentLocationName = response.data[0].name;
  let h1 = document.querySelector ("h1");
  h1.innerHTML = currentLocationName;
}

function handleCurrentButton (event) {
  function showPosition (position) {
    let latitude = position.coords.latitude; 
    let longitude = position. coords.longitude;
    let units = "metric";
    let excludes = "current,hourly,minutely,alerts";
    let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    let apiLocationNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    let apiOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${excludes}&appid=${apiKey}&units=${units}`;

    axios.get(apiLocationUrl).then(showTemperature);
    axios.get(apiLocationNameUrl).then(getCurrentLocationName);
    axios.get(apiOneCallUrl).then(showCityPrecipitation);
    axios.get(apiOneCallUrl).then(showForecast);
  }
navigator.geolocation.getCurrentPosition (showPosition);
}

let currentButton = document.querySelector (".current-button");
currentButton.addEventListener ("click", handleCurrentButton);


