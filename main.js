$(document).ready(function() {

  var x = document.getElementById("demo");

  function getWeather() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
        $.getJSON(weatherUrl).done(function (data) {
          $('#location').text('Location: ' + data.name + ', ' + data.sys.country);
          $('#temperature').text('Temperature: ' + data.main.temp);
          $('#condition').text('Condition: ' + data.weather[0].main);
          $('#icon').attr('src', data.weather[0].icon);
        });
      });
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  $('button').on('click', function() {
    getWeather();
  });

});
