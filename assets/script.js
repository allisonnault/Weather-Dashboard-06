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
var searchResults = $('#searchResults');
var day1 = $('#day1');
var day2 = $('#day2');
var day3 = $('#day3');
var day4 = $('#day4');
var day5 = $('#day5');
var fiveDay = [];

function currentWeatherAPI() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey;
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var today = {
                temp: "Temp: " + + Math.trunc((data.main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.main.humidity + '%'
            }
            currentTemp.text(today.temp);
            currentWind.text(today.wind);
            currentHumidity.text(today.humid);
        });

}

function openWeatherAPI() {
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey;
    fetch(openWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list);

            
            var dayOne = {
                date: dayjs.unix(data.list[4].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[4].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[4].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[4].main.humidity + '%'
            }
            fiveDay.push(dayOne);
            var dayTwo = {
                date: dayjs.unix(data.list[12].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[12].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[12].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[12].main.humidity + '%'
            }
            fiveDay.push(dayTwo);
            var dayThree = {
                date: dayjs.unix(data.list[20].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[20].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[20].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[20].main.humidity + '%'
            }
            fiveDay.push(dayThree);
            
            var dayFour = {
                date: dayjs.unix(data.list[28].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[28].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[28].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[28].main.humidity + '%'
            }
            fiveDay.push(dayFour);
            
            var dayFive = {
                date: dayjs.unix(data.list[36].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[36].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[36].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[36].main.humidity + '%'
            }
            fiveDay.push(dayFive);
           
            fiveDayForcast();

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
            currentWeatherAPI();
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

function fiveDayForcast() {

    // Day+1
    date1 = $('<h6>');
    date1.text(fiveDay[0].date);
    day1.children('.date').append(date1);
    var weatherInfo1 = day1.children('.weatherInfo');
    var temp1 = $('<li>');
    temp1.text(fiveDay[0].temp);
    weatherInfo1.append(temp1);
    var wind1 = $('<li>');
    wind1.text(fiveDay[0].wind);
    weatherInfo1.append(wind1);
    var humid1 = $('<li>');
    humid1.text(fiveDay[0].humid);
    weatherInfo1.append(humid1);

    // day+2
    date2 = $('<h6>');
    date2.text(fiveDay[1].date);
    day2.children('.date').append(date2);
    var weatherInfo2 = day2.children('.weatherInfo');
    var temp2 = $('<li>');
    temp2.text(fiveDay[1].temp);
    weatherInfo2.append(temp2);
    var wind2 = $('<li>');
    wind2.text(fiveDay[1].wind);
    weatherInfo2.append(wind2);
    var humid2 = $('<li>');
    humid2.text(fiveDay[1].humid);
    weatherInfo2.append(humid2);

    // day+3
    date3 = $('<h6>');
    date3.text(fiveDay[2].date);
    day3.children('.date').append(date3);
    var weatherInfo3 = day3.children('.weatherInfo');
    var temp3 = $('<li>');
    temp3.text(fiveDay[2].temp);
    weatherInfo3.append(temp3);
    var wind3 = $('<li>');
    wind3.text(fiveDay[2].wind);
    weatherInfo3.append(wind3);
    var humid3 = $('<li>');
    humid3.text(fiveDay[2].humid);
    weatherInfo3.append(humid3);

    // day+4
    date4 = $('<h6>');
    date4.text(fiveDay[3].date);
    day4.children('.date').append(date4);
    var weatherInfo4 = day4.children('.weatherInfo');
    var temp4 = $('<li>');
    temp4.text(fiveDay[3].temp);
    weatherInfo4.append(temp4);
    var wind4 = $('<li>');
    wind4.text(fiveDay[3].wind);
    weatherInfo4.append(wind4);
    var humid4 = $('<li>');
    humid4.text(fiveDay[3].humid);
    weatherInfo4.append(humid4);

    // day+5
    date5 = $('<h6>');
    date5.text(fiveDay[4].date);
    day5.children('.date').append(date5);
    var weatherInfo5 = day5.children('.weatherInfo');
    var temp5 = $('<li>');
    temp5.text(fiveDay[4].temp);
    weatherInfo5.append(temp5);
    var wind5 = $('<li>');
    wind5.text(fiveDay[4].wind);
    weatherInfo5.append(wind5);
    var humid5 = $('<li>');
    humid5.text(fiveDay[4].humid);
    weatherInfo5.append(humid5);


}