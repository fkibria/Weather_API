var apiKey = "538062e71ac8baa0d64287e376d8516e"
let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
function setLocalStorage(key, value){
    if(typeof value !=="object"){
        localStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

function getLocalStorage(key){
    try{
        return JSON.parse(localStorage.getItem(key))
    }
    catch(e) {
        console.log(e);
        return localStorage.getItem(key);
    }
};


$('#searchBtn').click(function() {
    $(document).find('#displayWeather').css('visibility', 'inherit');
  });


$(document).ready(function(){
   function searchWeather(city) {

       const searchedCity = document.getElementById("searchBox");
       const savedCityBtn = document.getElementById("searchBtn");
       const searchedCities = document.getElementById("searchedCities");

       savedCityBtn.onclick = function() {
        let cities= getLocalStorage("cities")
        if(cities){
            cities.push(city)
        } else {
            cities = [city];
        }
        setLocalStorage("cities", cities);

        for(let i=0; i < localStorage.length; i++) {
            const cities = localStorage.key(i);
            const city = localStorage.getItem(cities);

            searchedCities.innerHTML += `${city}<br /> <hr>`;
        }
 
       };



    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey
    $.ajax({
        type:"GET",
        url: queryUrl
    }).then(function(response){
        var name = response.name;
        var temp = response.main.temp;
        var date = new Date();
        date = `(${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear()})`;
        temp = convertKelvin(temp);
        var humidity = response.main.humidity;
        var wind = response.wind.speed 
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('.wicon').attr('src', iconurl);
        searchUVindex(lat,long);
        getForecast(city);
        console.log(date, temp, humidity, wind, iconcode);
        $("#city").html(city);
        $("#date").html(date);
        $("#temperature").html(String(temp) + " C");
        $("#humidity").html(String(humidity) + " %");
        $("#wind-speed").html(String(wind) + " MPH");
    // $("#displayWeather").append(name + "<br>" , "Temperature: " + temp + " c" + "<br>", "Humidity: " + humidity + " %" + "<br>", "Wind Speed: " + wind + " MPH" + "<br>");
    })



   } 

   function getForecast(city){
       let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
       $.ajax({
        type:"GET",
        url: queryUrl
    }).then(function(response){
        console.log(response);
        // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        let { list } = response;
        let myHtml = ``;
        for(let i=0; i < list.length;i+=8){
            let { main, weather, dt_txt } = list[i];
            console.log(main, weather, dt_txt);
            var icon = {weather};
            var iconcode = icon.weather[0].icon
            console.log(icon.weather[0].icon);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            myHtml+=`
                <div class="card text-white bg-primary mb-3" id= "forecast" style="max-width: 200px;">
                    <div class="card-body" style="max-width: 200px; max-height: 400px;">
                        <h5 class="card-title">${dt_txt.split(" ")[0]}</h5>
                        <img src =${iconurl}>
                        <p class="card-text">Temperature: ${convertKelvin(main.temp)} C</p>
                        <p class="card-text">Humidity: ${main.humidity} %</p>
                    </div>
                </div>
            </div>
            `
        }
    $("#five-day").html(myHtml); 
    })
   }



$("#searchBtn").on("click", function(){
    var city = $("#searchBox").val()
    searchWeather(city);
})

// city = document.getElementById("#searchedCities");
// console.log(cities);


function searchUVindex(lat, long) {
    var apiKey = "538062e71ac8baa0d64287e376d8516e"
    var UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + apiKey
    $.ajax({
        type:"GET",
        url: UVQueryURL
    }).then(function(response){
        var UVIndex = response.value;
        $("#uv").html(UVIndex);
    })
}
let convertKelvin = (kelvin) => {
    return parseInt(kelvin - 273.15);
  };
})