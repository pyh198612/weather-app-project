//W4-Feature #1
function showCurrentDate (event) {
  let date = currentTime.getDate (); 
  let conDate = ("0"+date).slice(-2);
  let month = currentTime.getMonth()+"1";
  let year = currentTime.getFullYear();
  return `${conDate}.${month}.${year} Today`;
}

function showCurrentDay (event){
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days [currentTime.getDay()]; 
  return `${day}`;
}

function showCurrentTime (event) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes ();
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

let currentTime = new Date (); 

let todayDate = document.querySelector ("#main-session-date");
todayDate.innerHTML = showCurrentDate (currentTime);

let todayDay = document.querySelector ("#main-session-day");
todayDay.innerHTML = showCurrentDay (currentTime);

let todayTime = document.querySelector ("#main-session-time");
todayTime.innerHTML = showCurrentTime (currentTime);

//W4-Feature #2

function showTemperature (response) {
  let temperature = Math.round(response.data.main.temp); 
  let nowTemp = document.querySelector ("#current-temp");
  nowTemp.innerHTML = temperature; 

  function showFahrenheitTemp (event) {
      event.preventDefault ();
      let nowTemp = document.querySelector ("#current-temp");
      nowTemp.innerHTML = Math.round((temperature*9/5) + 32);
  }

  function showCelsiusTemp (event) {
      let nowTemp = document.querySelector ("#current-temp");
      nowTemp.innerHTML = temperature; 
  }
  let fahrenheit = document.querySelector ("#fahrenheit-link");
  fahrenheit.addEventListener ("click", showFahrenheitTemp);

  let celsius = document.querySelector ("#celsius-link");
  celsius.addEventListener ("click", showCelsiusTemp);

  let maxTemperature = Math.round (response.data.main.temp_max);
  let nowMaxTemp = document.querySelector ("#now-max-temp");
  nowMaxTemp.innerHTML = maxTemperature; 

  let minTemperature = Math.round (response.data.main.temp_min);
  let nowMinTemp = document.querySelector ("#now-min-temp");
  nowMinTemp.innerHTML = minTemperature; 

  let description = response.data.weather[0].description; 
  let nowDescription = document.querySelector ("#now-weather-description");
  nowDescription.innerHTML = description; 
  
}

function showCityPosition (response) {
  function showCityPrecipitation (response) {
    let cityPrecipitation = (response.data.daily[0].pop)*100;
    let cityPrecipitationPercentage = document.querySelector ("#now-precipitation");
    cityPrecipitationPercentage.innerHTML = cityPrecipitation;
  }

  let cityLon = response.data[0].lon;
  let cityLat = response.data[0].lat;
  let apiKey = "3cbad6f9a349042eb44901a3bdcb3200";
  let units = "metric";
  let excludes = "current,hourly,minutely,alerts";
  let apiCityPrecipitationUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=${excludes}&appid=${apiKey}&units=${units}`;

  axios.get(apiCityPrecipitationUrl).then(showCityPrecipitation);
}

function searchCity (event) {
  event.preventDefault ();
  let cityInput = document.querySelector("#search-input");
  let h1Span = document.querySelector ("span");
  h1Span.innerHTML = `${cityInput.value}`;
  
  //W5-Homework
  let apiKey = "3cbad6f9a349042eb44901a3bdcb3200";
  let city = cityInput.value; 
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showTemperature);

  let apiGeocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${apiKey}`
  axios.get(apiGeocodingUrl).then (showCityPosition);
}


let searchEngine = document.querySelector ("#search-form");
searchEngine.addEventListener ("submit", searchCity);

//W5 Homework - add a current button

function showCurrentLocationTemp (response){
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector ("#current-temp");
  currentTemp.innerHTML = temp; 
     
  function showCurrentFahTemp (event) {
      event.preventDefault ();
      let currentLocationTemp = document.querySelector ("#current-temp");
      currentLocationTemp.innerHTML = Math.round((temp*9/5) + 32);
  }

  function showCurrentCelTemp (event) {
      let currentLocationTemp = document.querySelector ("#current-temp");
      currentLocationTemp.innerHTML = temp; 
  }

  let currentF = document.querySelector ("#fahrenheit-link");
  currentF.addEventListener ("click", showCurrentFahTemp);

  let currentC = document.querySelector ("#celsius-link");
  currentC.addEventListener ("click", showCurrentCelTemp);

  let maxTemp = Math.round(response.data.main.temp_max);
  let currentMaxTemp = document.querySelector ("#now-max-temp");
  currentMaxTemp.innerHTML = maxTemp; 

  let minTemp = Math.round(response.data.main.temp_min);
  let currentMinTemp = document.querySelector ("#now-min-temp");
  currentMinTemp.innerHTML = minTemp; 

  let descript = response.data.weather[0].description; 
  let currentDescript = document.querySelector ("#now-weather-description");
  currentDescript.innerHTML = descript; 
}

function getCurrentLocationName (response) {
  let currentLocationName = response.data[0].name;
  let h1Span = document.querySelector ("span");
  h1Span.innerHTML = currentLocationName;
}

function showCurrentPrecipitation (response) {
  let currentPrecipitation = (response.data.daily[0].pop)*100;
  let currentPrecipitationPercentage = document.querySelector ("#now-precipitation");
  currentPrecipitationPercentage.innerHTML=currentPrecipitation;
} 

function handleCurrentButton (event) {
  function showPosition (position) {
    let latitude = position.coords.latitude; 
    let longitude = position. coords.longitude;
    let apiKey = "3cbad6f9a349042eb44901a3bdcb3200";
    let units = "metric";
    let excludes = "current,hourly,minutely,alerts";
    let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    let apiLocationNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    let apiPrecipitationUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${excludes}&appid=${apiKey}&units=${units}`;

    axios.get(apiLocationUrl).then(showCurrentLocationTemp);
    axios.get(apiLocationNameUrl).then(getCurrentLocationName);
    axios.get(apiPrecipitationUrl).then(showCurrentPrecipitation);

}

navigator.geolocation.getCurrentPosition (showPosition);
}

let currentButton = document.querySelector (".current-button");
currentButton.addEventListener ("click", handleCurrentButton);