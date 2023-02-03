dayjs().format();
var openWeatherKey = "28b9f68edfd5dc9c73e3e4892e6278f5";
var city;
var lat;
var lon;

var searchCity = $('input[name="search"]');
var searchBtn = $('#searchBtn');

function openWeatherAPI() {
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey;
    fetch(openWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data.list);
            var currentTemp = Math.trunc((data.list[0].main.temp - 273.15) * (9 / 5) + 32) + "°F";
            var currentWind = ((data.list[0].wind.speed) * 2.23694).toFixed(2) + "MPH";
            var currentHumidity = data.list[0].main.humidity + '%';

        }
        );
}

function geoCodeAPI() {
    var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + openWeatherKey;
    fetch(geoCodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
            openWeatherAPI();
        });
}

searchBtn.on('click', function () {
    if (searchCity.val() === " ") {
        return;
    } else {
        city = $.trim(searchCity.val());
    }
    geoCodeAPI();
})