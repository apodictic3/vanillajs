const weather = document.querySelector(".js-weather");
const API_KEY = "6a54443a15328652dd113c428efdee93";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(function(response) {
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const country = json.sys.country;
            const place = json.name;
            weather.innerText = `${temperature} . ${country} . ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
        //  변수와 키가 동일할 때는 latitude, longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoErro() {
    console.log("Cant access geo location");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro)
}

function loadCoords() {
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
