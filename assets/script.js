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
var day1 = $('#day1');
var day2 = $('#day2');
var day3 = $('#day3');
var day4 = $('#day4');
var day5 = $('#day5');



function openWeatherAPI() {
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey;
    fetch(openWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list);

            // Day+1
            var dayOne = {
                date: dayjs.unix(data.list[0].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[0].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[0].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[0].main.humidity + '%'
            }
            date1 = $('<h6>');
            date1.text(dayOne.date);
            day1.children('.date').append(date1);
            var weatherInfo1 = day1.children('.weatherInfo');
            var temp1 = $('<li>');
            temp1.text(dayOne.temp);
            weatherInfo1.append(temp1);
            var wind1 = $('<li>');
            wind1.text(dayOne.wind);
            weatherInfo1.append(wind1);
            var humid1 = $('<li>');
            humid1.text(dayOne.humid);
            weatherInfo1.append(humid1);

            // day+2
            var dayTWo = {
                date: dayjs.unix(data.list[8].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[8].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[8].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[8].main.humidity + '%'
            }
            date2 = $('<h6>');
            date2.text(dayTwo.date);
            day2.children('.date').append(date2);
            var weatherInfo2 = day2.children('.weatherInfo');
            var temp2 = $('<li>');
            temp2.text(dayTwo.temp);
            weatherInfo2.append(temp2);
            var wind2 = $('<li>');
            wind2.text(dayTwo.wind);
            weatherInfo2.append(wind2);
            var humid2 = $('<li>');
            humid2.text(dayTwo.humid);
            weatherInfo2.append(humid2);

            // day+3
            var dayThree = {
                date: dayjs.unix(data.list[16].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[16].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[16].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[16].main.humidity + '%'
            }
            date3 = $('<h6>');
            date3.text(dayThree.date);
            day3.children('.date').append(date3);
            var weatherInfo3 = day3.children('.weatherInfo');
            var temp3 = $('<li>');
            temp3.text(dayThree.temp);
            weatherInfo3.append(temp3);
            var wind3 = $('<li>');
            wind3.text(dayThree.wind);
            weatherInfo3.append(wind3);
            var humid3 = $('<li>');
            humid3.text(dayThree.humid);
            weatherInfo3.append(humid3);

            // day+4
            var dayFour = {
                date: dayjs.unix(data.list[24].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[24].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[24].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[24].main.humidity + '%'
            }
            date4 = $('<h6>');
            date4.text(dayFour.date);
            day4.children('.date').append(date4);
            var weatherInfo4 = day4.children('.weatherInfo');
            var temp4 = $('<li>');
            temp4.text(dayFour.temp);
            weatherInfo4.append(temp4);
            var wind4 = $('<li>');
            wind4.text(dayFour.wind);
            weatherInfo4.append(wind4);
            var humid4 = $('<li>');
            humid4.text(dayFour.humid);
            weatherInfo4.append(humid4);

            // day+5
            var dayFive = {
                date: dayjs.unix(data.list[32].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[32].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[32].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[32].main.humidity + '%'
            }
            date5 = $('<h6>');
            date5.text(dayFive.date);
            day5.children('.date').append(date5);
            var weatherInfo5 = day5.children('.weatherInfo');
            var temp5 = $('<li>');
            temp5.text(dayFive.temp);
            weatherInfo5.append(temp5);
            var wind5 = $('<li>');
            wind5.text(dayFive.wind);
            weatherInfo5.append(wind5);
            var humid5 = $('<li>');
            humid5.text(dayFive.humid);
            weatherInfo5.append(humid5);

        });}

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


