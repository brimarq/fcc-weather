$(document).ready(function() {
  
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

  (function() {
    $('.weatherDiv').toggle();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);

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
          if (data.icon) {
            $('#icon').attr('src', data.icon);
            $('#icon').on('load', function() {
              $('.weatherDiv').fadeToggle(400);
            });
          } else {
            $('#icon').hide();
            $('.weatherDiv').fadeToggle(400);
          }
        });

      });
    } else { 
      // Show the noGeo p if geolocation is unavailable
      $('#noGeo').show();
    }
  }());

  // Toggle temperature between F and C.
  $('.tempToggle').on('click', function() {
    $('.temp').toggle();
  });

});
