//Main session time
function showCurrentDate (timestamp) {
  let time = new Date(timestamp);
  console.log(time);
  let date = time.getDate (); 
  let conDate = ("0"+date).slice(-2);
  let month = ("0"+(time.getMonth()+1)).slice(-2);
  let year = time.getFullYear();
  return `${conDate}.${month}.${year} Today`;
}

function showCurrentDay (timestamp){
  let time = new Date (timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days [time.getDay()]; 
  return `${day}`;
}

function showCurrentTime (timestamp) {
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
  
  let maxTemperature = Math.round (response.data.main.temp_max);
  let nowMaxTemp = document.querySelector ("#now-max-temp");
  nowMaxTemp.innerHTML = maxTemperature; 
  
  let minTemperature = Math.round (response.data.main.temp_min);
  let nowMinTemp = document.querySelector ("#now-min-temp");
  nowMinTemp.innerHTML = minTemperature; 

  let description = response.data.weather[0].description; 
  let nowDescription = document.querySelector ("#now-weather-description");
  nowDescription.innerHTML = description; 
  

  let timestamp = response.data.dt;
  console.log(timestamp);
  let timezone = response.data.timezone;
  let localTimestamp = timestamp + timezone;
  let conLocalTimestamp = localTimestamp* 1000;
  let todayDate = document.querySelector ("#main-session-date");
  todayDate.innerHTML = showCurrentDate (conLocalTimestamp);
  let todayDay = document.querySelector ("#main-session-day");
  todayDay.innerHTML = showCurrentDay (conLocalTimestamp);
  let todayTime = document.querySelector ("#main-session-time");
  todayTime.innerHTML = showCurrentTime (conLocalTimestamp);
  
  let mainIcon = document.querySelector ("#main-icon");
  let iconCode = response.data.weather[0].icon;
  if (iconCode === "02d") {
    mainIcon.setAttribute ("src", `IMG/cloudy with sun_02d.png`); 
  } else if (iconCode === "02n") {
    mainIcon.setAttribute ("src", `IMG/few clouds_02n.png`)
  }

}


function showCityPosition (response) {
  function showCityPrecipitation (response) {
    let cityPrecipitation = Math.round ((response.data.daily[0].pop)*100);
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
  
  let apiKey = "3cbad6f9a349042eb44901a3bdcb3200";
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

    axios.get(apiLocationUrl).then(showTemperature);
    axios.get(apiLocationNameUrl).then(getCurrentLocationName);
    axios.get(apiPrecipitationUrl).then(showCurrentPrecipitation);

}

navigator.geolocation.getCurrentPosition (showPosition);
}

let currentButton = document.querySelector (".current-button");
currentButton.addEventListener ("click", handleCurrentButton);