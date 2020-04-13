const weather = document.querySelector(".js-weather");

const API_KEYS = "4c4bf1018405d0f118c9257bda9ef9e3";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
  )
    .then(function (response) {
      //then은 데이터가 완전히 다들어오고 호출
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `온도 : ${temperature} 지역 : ${place}`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  //로컬스트리지에 위도,경도 저장
}
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude; //위도
  const longitude = position.coords.longitude; //경도
  const coordsObj = {
    latitude, //= latitude : latitude 변수값과 객체의 키값이 같을 때
    longitude, //longitude : longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't find your location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  //로케이션 정보를 읽어옴
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
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
