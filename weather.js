const weather = document.querySelector(".js-weather"),
  icon = weather.querySelector(".js-weatherIcon"),
  temp = weather.querySelector(".js-temp"),
  city = weather.querySelector(".js-city");

const API_KEY = "569b58f3b0d9c346a84bfe1d096a97ec";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json();
        }).then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            const srcIcon = json.weather[0].icon;
            const image = new Image();
            image.src = `http://openweathermap.org/img/wn/${srcIcon}@2x.png`;
            icon.appendChild(image);
            temp.innerText = `${temperature}°`;
            city.innerText = `${place}`;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("Can't access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();