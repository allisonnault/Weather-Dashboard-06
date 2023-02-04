dayjs().format();
today = dayjs().format('M/D/YYYY');
var openWeatherKey = "28b9f68edfd5dc9c73e3e4892e6278f5";
var city;
var lat;
var lon;
var currentCity = $('#CityDate');
var currentTemp = $('#temp');
var currentWind = $('#wind');
var currentHumidity = $('#humidity');
var searchCity = $('input[name="search"]');
var searchBtn = $('#searchBtn');
var fiveDay = [];

function openWeatherAPI() {
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey;
    fetch(openWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (var i = 0; i < data.length; i += 8) {
                var date = dayjs.unix(data.list[i].dt).format("MM/DD/YY");
                var temp = Math.trunc((data.list[i].main.temp - 273.15) * (9 / 5) + 32) + "°F";
                var wind = ((data.list[i].wind.speed) * 2.23694).toFixed(2) + " MPH";
                var humidity = data.list[i].main.humidity + '%';

                fiveDayItems = {
                    date: date.val(),
                    temp: temp.val(),
                    wind: wind.val(),
                    humidity: humidity.val(),
                }
                fiveDay.push(fiveDayItems);
                console.log(fiveDay);

            }
            console.log(data.list);
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
            currentCity.text(data[0].name + ", " + data[0].state + " - " + today);
            openWeatherAPI();
            // console.log(data);
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


// currentTemp.text("Temp: " + temp);
// currentWind.text("Wind: " + wind);
// currentHumidity.text("Humidity: " + humidity);