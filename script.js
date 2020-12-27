$(document).ready(function(){
   function searchWeather(city) {
    var apiKey = "538062e71ac8baa0d64287e376d8516e"
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey
    $.ajax({
        type:"GET",
        url: queryUrl
    }).then(function(response){
        console.log(response);
        console.log(response.name);
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        var name = response.name;
        var temp = response.main.temp;
        temp = convertKelvin(temp);
        var humidity = response.main.humidity;
        var wind = response.wind.speed 
        var lat = response.coord.lat;
        var long = response.coord.lon;
        searchUVindex(lat,long);
    $("#displayWeather").append(name + "<br>" , "Temperature: " + temp + " c" + "<br>", "Humidity: " + humidity + " %" + "<br>", "Wind Speed: " + wind + " MPH" + "<br>");
    })
   } 
$("#searchBtn").on("click", function(){
    var city = $("#searchBox").val()
    searchWeather(city);
})


function searchUVindex(lat, long) {
    var apiKey = "538062e71ac8baa0d64287e376d8516e"
    var UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + apiKey
    $.ajax({
        type:"GET",
        url: UVQueryURL
    }).then(function(response){
        var UVIndex = response.value;
        $("#displayWeather").append("UV Index: " + UVIndex);
    })
}
let convertKelvin = (kelvin) => {
    return parseInt(kelvin - 273.15);
  };
})