dayjs().format();
var today = dayjs().format('M/D/YYYY');
var openWeatherKey = "28b9f68edfd5dc9c73e3e4892e6278f5";
var city;
var lat;
var lon;
var currentCity = $('#CityDate');
var currentIcon = $('#icon');
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
            // console.log(data);
            
            var currentDay = {
                icon: data.weather[0].icon,
                temp: "Temp: " + + Math.trunc((data.main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.main.humidity + '%'
            }
            var iconURL = 'http://openweathermap.org/img/wn/' + currentDay.icon + '@2x.png'
            var icon = $('<img>');
            icon.attr("src", iconURL);
            currentCity.append(icon);
            currentTemp.text(currentDay.temp);
            currentWind.text(currentDay.wind);
            currentHumidity.text(currentDay.humid);
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

            fiveDay = [];
            var dayOne = {
                icon: data.list[4].weather[0].icon,
                date: dayjs.unix(data.list[4].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[4].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[4].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[4].main.humidity + '%'
            }

            fiveDay.push(dayOne);
            var dayTwo = {
                icon: data.list[12].weather[0].icon,
                date: dayjs.unix(data.list[12].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[12].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[12].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[12].main.humidity + '%'
            }
            fiveDay.push(dayTwo);
            var dayThree = {
                icon: data.list[20].weather[0].icon,
                date: dayjs.unix(data.list[20].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[20].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[20].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[20].main.humidity + '%'
            }
            fiveDay.push(dayThree);

            var dayFour = {
                icon: data.list[28].weather[0].icon,
                date: dayjs.unix(data.list[28].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[28].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[28].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[28].main.humidity + '%'
            }
            fiveDay.push(dayFour);

            var dayFive = {
                icon: data.list[36].weather[0].icon,
                date: dayjs.unix(data.list[36].dt).format("MM/DD/YY"),
                temp: "Temp: " + Math.trunc((data.list[36].main.temp - 273.15) * (9 / 5) + 32) + "°F",
                wind: "Wind: " + ((data.list[36].wind.speed) * 2.23694).toFixed(2) + " MPH",
                humid: "Humidity: " + data.list[36].main.humidity + '%'
            }
            fiveDay.push(dayFive);

            fiveDayForcast();

        });
}

function geoCodeAPI() {
    var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + openWeatherKey;
    fetch(geoCodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            currentCity.text(data[0].name + ", " + data[0].state + " - " + today + " ");
            var cityInfo = {
                city: data[0].name,
                state: data[0].state,
                lat: data[0].lat,
                lon: data[0].lon
            }
            var storedSearch = JSON.parse(localStorage.getItem("weatherAPI")) || [];
            storedSearch.push(cityInfo);
            localStorage.setItem("weatherAPI", JSON.stringify(storedSearch));
            saveSearch();
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
    day1.children('.date').html(date1);
    var weatherInfo1 = day1.children('.weatherInfo');
    var temp1 = $('<li>');
    temp1.text(fiveDay[0].temp);
    weatherInfo1.html(temp1);
    var wind1 = $('<li>');
    wind1.text(fiveDay[0].wind);
    weatherInfo1.append(wind1);
    var humid1 = $('<li>');
    humid1.text(fiveDay[0].humid);
    weatherInfo1.append(humid1);
    var icon1 = $('<img>');
    icon1.attr('src', 'http://openweathermap.org/img/wn/' + fiveDay[0].icon + '@2x.png')
    weatherInfo1.append(icon1);

    // day+2
    date2 = $('<h6>');
    date2.text(fiveDay[1].date);
    day2.children('.date').html(date2);
    var weatherInfo2 = day2.children('.weatherInfo');
    var temp2 = $('<li>');
    temp2.text(fiveDay[1].temp);
    weatherInfo2.html(temp2);
    var wind2 = $('<li>');
    wind2.text(fiveDay[1].wind);
    weatherInfo2.append(wind2);
    var humid2 = $('<li>');
    humid2.text(fiveDay[1].humid);
    weatherInfo2.append(humid2);
    var icon2 = $('<img>');
    icon2.attr('src', 'http://openweathermap.org/img/wn/' + fiveDay[1].icon + '@2x.png')
    weatherInfo2.append(icon2);

    // day+3
    date3 = $('<h6>');
    date3.text(fiveDay[2].date);
    day3.children('.date').html(date3);
    var weatherInfo3 = day3.children('.weatherInfo');
    var temp3 = $('<li>');
    temp3.text(fiveDay[2].temp);
    weatherInfo3.html(temp3);
    var wind3 = $('<li>');
    wind3.text(fiveDay[2].wind);
    weatherInfo3.append(wind3);
    var humid3 = $('<li>');
    humid3.text(fiveDay[2].humid);
    weatherInfo3.append(humid3);
    var icon3 = $('<img>');
    icon3.attr('src', 'http://openweathermap.org/img/wn/' + fiveDay[2].icon + '@2x.png')
    weatherInfo3.append(icon3);

    // day+4
    date4 = $('<h6>');
    date4.text(fiveDay[3].date);
    day4.children('.date').html(date4);
    var weatherInfo4 = day4.children('.weatherInfo');
    var temp4 = $('<li>');
    temp4.text(fiveDay[3].temp);
    weatherInfo4.html(temp4);
    var wind4 = $('<li>');
    wind4.text(fiveDay[3].wind);
    weatherInfo4.append(wind4);
    var humid4 = $('<li>');
    humid4.text(fiveDay[3].humid);
    weatherInfo4.append(humid4);
    var icon4 = $('<img>');
    icon4.attr('src', 'http://openweathermap.org/img/wn/' + fiveDay[3].icon + '@2x.png')
    weatherInfo4.append(icon4);

    // day+5
    date5 = $('<h6>');
    date5.text(fiveDay[4].date);
    day5.children('.date').html(date5);
    var weatherInfo5 = day5.children('.weatherInfo');
    var temp5 = $('<li>');
    temp5.text(fiveDay[4].temp);
    weatherInfo5.html(temp5);
    var wind5 = $('<li>');
    wind5.text(fiveDay[4].wind);
    weatherInfo5.append(wind5);
    var humid5 = $('<li>');
    humid5.text(fiveDay[4].humid);
    weatherInfo5.append(humid5);
    var icon5 = $('<img>');
    icon5.attr('src', 'http://openweathermap.org/img/wn/' + fiveDay[4].icon + '@2x.png')
    weatherInfo5.append(icon5);
}

function saveSearch() {
    var storedSearch = JSON.parse(localStorage.getItem("weatherAPI")) || [];
    searchResults.html(" ");
    for (var i = storedSearch.length -1; i > storedSearch.length-6; i--) {
        var buttonEl = $("<button>");
        buttonEl.text(storedSearch[i].city)
        buttonEl.attr('data-lat', storedSearch[i].lat);
        buttonEl.attr('data-lon', storedSearch[i].lon);
        buttonEl.attr('data-city', storedSearch[i].city);
        buttonEl.attr("data-state", storedSearch[i].state);
        buttonEl.addClass('pastBtn btn btn-dark w-100 gap-2')
        searchResults.append(buttonEl);
    }
}
saveSearch();

searchResults.on('click', '.pastBtn', function () {
    lat = $(this).attr('data-lat');
    lon = $(this).attr('data-lon');
    currentCity.text($(this).attr('data-city') + ", " + $(this).attr('data-state') + " - " + today);
    openWeatherAPI();
    currentWeatherAPI();
}); 