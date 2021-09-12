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
console.log(response.data);
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature); 
  let nowTemp = document.querySelector ("#current-temp");
  nowTemp.innerHTML = temperature; 
  
  let description = response.data.weather[0].description; 
  let nowDescription = document.querySelector ("#now-weather-description");
  nowDescription.innerHTML = description; 

  let windSpeed = Math.round(response.data.wind.speed *3600/1000);
  let nowWindSpeed = document.querySelector ("#wind-speed");
  nowWindSpeed.innerHTML = windSpeed;
  
  
  let timestamp = response.data.dt*1000;
  let d = new Date (timestamp);
  //console.log(d);
  let localTime = d.getTime ();
  //console.log(localTime);
  let localOffset = d.getTimezoneOffset()*60*1000;
  //console.log(localOffset);
  let utc = localTime + localOffset;
  //console.log(utc);
  let timezone = response.data.timezone*1000;
  //console.log(timezone);
  let conLocalTimestamp = utc+timezone;
  //console.log(conLocalTimestamp);
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
  
  
  for (let index = 1; index < 6; index ++) {
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
    
    celsiusForecastMinTemp = forecast.temp.min;
    celsiusForecastMaxTemp = forecast.temp.max;

    function showSegmentation () {
      if (index<5) {return "<hr/>"}
      else if (index === 5) {return ""}
    }

    
    forecastElement.innerHTML += `
    <p>
    <div class="row align-items-center">
    <div class="col-1"></div>
      <div class="col-2">
        ${showDate (forecast.dt*1000)}
        </div>
      <div class="col-2">
        ${showDay (forecast.dt*1000)}
      </div>
      <div class="col-2">
        <img src="${forecastSrc}" alt="${forecastAlt}" class="small-image" id="forecast-icon"/>
      </div>
      <div class="col-2">
        <span class = "forecast-min-temp"> ${Math.round(celsiusForecastMinTemp)} </span> ° / 
        <span class="forecast-max-temp">${Math.round(celsiusForecastMaxTemp)}</span> ° 
        <span class="forecast-max-temp-unit"> C </span> 
      </div>
      <div class="col-2">
        <i class="fas fa-umbrella"></i> ${Math.round(forecast.pop)*100}% <br/>
        <i class="fas fa-wind"></i> ${Math.round(forecast.wind_speed*3600/1000)} km/h
      </div>
      <div class="col-1"></div>
     </div>
    </p>
    ${showSegmentation ()}
     `;
    } 
    
    
  }
        
        
function showCityPrecipitation (response) {
let cityPrecipitation = Math.round ((response.data.daily[0].pop)*100);
let cityPrecipitationPercentage = document.querySelector ("#now-precipitation");
cityPrecipitationPercentage.innerHTML = cityPrecipitation;
}

function showMinMaxTemp (response){
  celsiusMinTemp = response.data.daily[0].temp.min;
  celsiusMaxTemp = response.data.daily[0].temp.max;
  let maxTemperature = Math.round (celsiusMaxTemp);
  let minTemperature = Math.round (celsiusMinTemp);
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
    axios.get(apiOneCallUrl).then(showMinMaxTemp);
  }
  navigator.geolocation.getCurrentPosition (showPosition);
}

let currentButton = document.querySelector (".current-button");
currentButton.addEventListener ("click", handleCurrentButton);






function handleCheckBoxFahrenheit (event) {
  //Current weather//

  let currentTemp=document.querySelector ("#current-temp");
  if (this.checked) {
  let fahreinheitTemp = (celsiusTemperature* 9)/5 + 32;
  currentTemp.innerHTML = Math.round (fahreinheitTemp);
  let tempUnitChange = document.querySelector (".temp-unit");
  tempUnitChange.innerHTML = `F`;
  } else {
    currentTemp.innerHTML = Math.round (celsiusTemperature);
    let tempUnitChange = document.querySelector (".temp-unit");
  tempUnitChange.innerHTML = `C`;
  }

  let minTemp = document.querySelector (".min-temp");
  if (this.checked) {
  let fahreinheitMinTemp = (celsiusMinTemp * 9)/5 + 32;
  minTemp.innerHTML = Math.round (fahreinheitMinTemp);
  } else {
    minTemp.innerHTML = Math.round (celsiusMinTemp);
  }

  let maxTemp=document.querySelector (".max-temp");
  if (this.checked) {
  let fahreinheitMaxTemp = (celsiusMaxTemp * 9)/5 + 32;
  maxTemp.innerHTML = Math.round (fahreinheitMaxTemp);
  let tempUnitChange = document.querySelector (".max-temp-unit");
  tempUnitChange.innerHTML = `F`;
  } else {
    maxTemp.innerHTML = Math.round (celsiusMaxTemp);
    let tempUnitChange = document.querySelector (".max-temp-unit");
  tempUnitChange.innerHTML = `C`;
  }


  // Forecast 
  let checked = this.checked;
  
  let forecastMinTemp = document.querySelectorAll (".forecast-min-temp");  
  forecastMinTemp.forEach (convertMin);
  function convertMin (item) {
    let currentTemp = item.innerHTML;
    // to grab the current value to convert
    if (checked) {
      let forecastFahMinTemp = (currentTemp*9)/5+32;
      item.innerHTML = Math.round (forecastFahMinTemp);
    
    } else {
      let returnCelMinTemp = ((currentTemp - 32)*5)/9;
      item.innerHTML = Math.round (returnCelMinTemp);
     
    }
  }  
    
  let forecastMaxTemp = document.querySelectorAll (".forecast-max-temp");
  forecastMaxTemp.forEach(convertMax);
  function convertMax (item) {
      let currentTemp = item.innerHTML;
      if (checked) {
        let forecastFahMaxTemp = (currentTemp*9)/5+32;
        item.innerHTML = Math.round (forecastFahMaxTemp);
      } else {
        let returnCelMaxTemp = ((currentTemp - 32))*5/9;
        item.innerHTML = Math.round (returnCelMaxTemp);
      }
    }

  let forecastTempUnitChange = document.querySelectorAll (".forecast-max-temp-unit");
  forecastTempUnitChange.forEach (convertUnit);
  function convertUnit (item) {
      if (checked) {
      item.innerHTML = `F`;
     } else {
      item.innerHTML = `C`;
     }
    }

}

let celsiusTemperature = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;
let celsiusForecastMinTemp = null;
let celsiusForecastMaxTemp = null;    


let checkBox = document.querySelector ("#check-box");
checkBox.addEventListener ("change", handleCheckBoxFahrenheit);

