var latitude, longitude, tempCels;
var tempFormat="C";

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather(latitude,longitude);
    })
  }
  
  $("#switch").on("click", function(){
    if(tempFormat=="C"){
      $("#temp").html("<h3>"+Math.round(tempCels*9/5+32)+"° F</h3>");
      tempFormat="F";
    } else{
      $("#temp").html("<h3>"+Math.round(tempCels)+"° C</h3>");
      tempFormat="C";
    }
  });
})

function getWeather(lat, long){
  var jsonURL ="https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
  $.getJSON(jsonURL, function(json){
    tempCels = json.main.temp;
    $("#city").html("<h3>"+json.name+", "+json.sys.country+"</h3>");
    $("#temp").html("<h3>"+Math.round(json.main.temp)+"° C</h3>");
    $("#description").html("<h3>"+json.weather[0].main+"</h3>");
    $("#icon").html("<img src='"+json.weather[0].icon+"' alt='weather icon'>")
  });
}