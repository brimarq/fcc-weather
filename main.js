$(document).ready(function() {

  var x = document.getElementById("demo");

  /** Round function from MDN, addresses funky JS math issues.
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
   */
  function round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

  // function getWeather() {

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       console.log(position.coords);

  //       var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
  //       console.log(weatherUrl);

  //       $.getJSON(weatherUrl).done(function (json) {
  //         var data = {
  //           city: json.name,
  //           country: json.sys.country,
  //           tempF: round(json.main.temp * 1.8 + 32, 1),
  //           tempC: round(json.main.temp, 1),
  //           cond: json.weather[0].main,
  //           icon: json.weather[0].icon
  //         };
  //         console.log(data);
          
  //         $('#location').text(data.city + ', ' + data.country);
  //         $('#tempF').text(data.tempF);
  //         $('#tempC').text(data.tempC);
  //         $('#condition').text(data.cond);
  //         $('#icon').attr('src', data.icon);
  //         $('#spinner').hide();
  //       });
  //     });
  //   } else { 
  //       x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }

  (function() {
    $('.weatherDiv').toggle();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords);

        var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
        console.log(weatherUrl);

        $.getJSON(weatherUrl).done(function (json) {
          var data = {
            city: json.name,
            country: json.sys.country,
            tempF: round(json.main.temp * 1.8 + 32, 1),
            tempC: round(json.main.temp, 1),
            cond: json.weather[0].main,
            icon: json.weather[0].icon
          };
          console.log(json);
          console.log(data);
          
          $('#location').text(data.city + ', ' + data.country);
          $('#tempF').text(data.tempF);
          $('#tempC').text(data.tempC);
          $('#condition').text(data.cond);
          $('#icon').attr('src', data.icon);
          $('#icon').on('load', function() {
            $('.weatherDiv').fadeToggle(400);
          });
          
        });
      });
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }());

  // $('#fetchWeather').on('click', function() {
  //   // console.log(getCoords());
  //   // console.log(getWeatherUrl(33.153902699999996, -96.7273569));
  //   //getWeather1();
  //   // getCoords(function() {
  //   //   console.log(getWeatherUrl(33.153902699999996, -96.7273569));
  //   // });
  //   getWeather();
  // });

  $('.tempToggle').on('click', function() {
    $('#temp').find('p').toggle();
  });

});

/** NOTES:
 * Weather info won't load right now if there is no icon url retrieved (gets the JP city if the weather api fails. Why??).
 * 
 * Find a way to get time and compare to sunset/sunrise to change background color?
 * 
 * 
 */