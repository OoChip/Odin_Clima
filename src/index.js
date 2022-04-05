import "./style.css"

const d = document;
let city = "Cucuta"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6d2b8ab3232c710a46bca3c8ec982359&units=metric&lang=sp`
let weatherData = getWeatherDataFromApi(apiUrl)

// fetch data from api
async function getWeatherDataFromApi(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    console.info(`fetch status: ${response.status}`);
    return await response.json();   
  } catch (error) {
    return error
  } finally {
    validateWeatherData()
  }
}

//test the api response or the error in the fecht.
function validateWeatherData(){
  weatherData
  .then((response) => {(response instanceof Error) ? drawWeatherData(false) : drawWeatherData(true)})
}

//draw the response of the api or the error in the DOM.
function drawWeatherData(weatherDataIsValid){
  const $weatherdata = d.getElementById("weatherdata");
  let $fragment = d.createDocumentFragment();

  if (!weatherDataIsValid) {
    weatherData
    .then ((response) => { 
      const message = `Data of Weather Unreachable - ${response.message}`
      const $message = d.createTextNode (message)
      $fragment.appendChild($message)
      $weatherdata.appendChild($fragment)
    })    
  } else {
    weatherData
    .then ((response) => {
      console.log(response);
      const { clouds, coord, id, main, name, sys, timezone, visibility, weather, wind } = response;
      
      appendLetToDom("lat", coord.lat)
      appendLetToDom("lon", coord.lon)
      appendLetToDom("id", id)
      appendLetToDom("sunrise", formatTime(sys.sunrise))
      appendLetToDom("sunset", formatTime(sys.sunset))

      appendLetToDom("weather", weather.description)
      appendLetToDom("clouds", clouds.all)
      appendLetToDom("temp", main.temp)
      appendLetToDom("temp_max", main.temp_max)
      appendLetToDom("temp_min", main.temp_min)
      appendLetToDom("feels_like", main.feels_like)
      appendLetToDom("wind_speed", wind.speed)
      appendLetToDom("visibility", visibility)
      appendLetToDom("humidity", main.humidity)
      appendLetToDom("pressure", main.pressure)
    })
    
  }

  function appendLetToDom (dom, param){
    const domElement = d.querySelector(`#${dom}`)
    domElement.textContent = param
  }

  function formatTime (unixTimestamp){    
    //Get a new Date from the Timestamp.
    const dateObj = new Date(unixTimestamp * 1000);
    //Get the Hours and parse to 12hrs format
    const hours = (dateObj.getHours() > 12 ) ? (dateObj.getHours()) - 12 : (dateObj.getHours())
    //Set am or pm
    const meridium = ((dateObj.getHours() > 12) ? ("pm") : ("am"))
    //return the hour and minute in 12hrs format.
    return `${ hours }:${dateObj.getMinutes()} ${meridium}`    
  }

}


