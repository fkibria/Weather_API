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
        var humidity = response.main.humidity;
        var wind = response.wind.speed 

    $("#displayWeather").append(name + "<br>" , "Temperature: " + temp + " c" + "<br>", "Humidity: " + humidity + " %" + "<br>", "Wind Speed: " + wind + " MPH");
    })
   } 

   searchWeather("toronto");
})