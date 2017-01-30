///////////// Google Maps API Interface ////////////////////
var marketId = [];
var allLatlng = [];
var allMarkers = [];
var marketName = [];
var infowindow = null;
var pos;
var userCords;
var tempMarkerHolder = [];


var mapOptions = {
  zoom: 4,
  center: new google.maps.LatLng(37.09024, -100.712891),
  panControl: false,
  panControlOptions: {
    position: google.maps.ControlPosition.BOTTOM_LEFT
  },
  zoomControl: true,
  zoomControlOPtions: {
    style: google.maps.ZoomControlStyle.LARGE,
    position: google.maps.ControlPosition.RIGHT_CENTER
  },
  scaleControl: false
};

infowindow = new google.maps.InfoWindow({
  content: 'hold on there...'
});



///////////// USDA Farmer's Market Database API Interface ////////////////////
var detailed = function(id, marketName) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
    dataType: 'jsonp'})

  .done(function(response) {
    console.log(response.marketdetails.GoogleLink);
    var googleLink = response.marketdetails.GoogleLink;
    var latLng = decodeURIComponent(googleLink.substring(googleLink.indexOf("=")+1, googleLink.lastIndexOf("(")));
    var split = latLng.split(',');
    var lat = split[0];
    var lng = split[1].slice(1, -1);
    console.log(split);
    console.log(lat);
    mapOptions['center'] = new google.maps.LatLng(lat, lng);
    mapOptions['zoom'] = 13;
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
          position: mapOptions['center'],
          map: map,
          title: 'Hello World!'
        });

    $('#locator-results').append("<h2>" + marketName.substr(marketName.indexOf(' ')+1) + "</h2>")
    $('#locator-results').append("<p>" + response.marketdetails.Address + "</p><br />");
    $('#locator-results').append("<p>" + response.marketdetails.Products + "</p><br />");
    $('#locator-results').append("<p><strong>Schedule:</strong> <br />" + response.marketdetails.Schedule + "</p>");
    console.log(response.marketdetails)
  });

}

var zipcode = function(zipcode) {
 $.ajax({
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode,
  dataType: 'jsonp'})

 .done(function(response) {
    console.log(response);
    console.log(response.results[0].id);

    var marketId = response.results[0].id;
    var marketName = response.results[0].marketname;

    detailed(marketId.toString(), marketName.toString());

  });
}



function myBMIFunction(height, weight) {
    var userHeight = height;
    var userWeight = weight;
    var userBMI = userWeight * 703 / (userHeight * userHeight);
    var bmiClass;
    if (userBMI >= 40) {
    	bmiClass = "Class III Obese";
    }
    else if (userBMI >= 35) {
    	bmiClass = "Class II Obese";
    }
    else if (userBMI >= 30) {
    	bmiClass = "Class I Obese";
    }
    else if (userBMI >= 25) {
    	bmiClass = "Overweight";
    }
    else if (userBMI >= 18.5) {
    	bmiClass = "Normal Weight";
    }
    else {
    	bmiClass = "Underweight!!";
    }
    document.getElementById("bmi").innerHTML = userBMI;
    document.getElementById("bmi-class").innerHTML = bmiClass;
}

function myCalExpenditure() {

}

$(document).ready(function() {
  console.log('hello there')
  if (localStorage.length === 0) {
    console.log('local storage is empty');
  } else {
    $('#userInformation').css('display', 'none');
    console.log('calculating...')
    document.getElementById("info").innerHTML = "<strong>Welcome Back!</strong>";

    myBMIFunction(localStorage.getItem('height'),localStorage.getItem('weight'));
  }

  //RESET BUTTON
  $('button.reset').on('click', function() {

    console.log('resetting...')
    // localStorage.clear();
    window.localStorage.removeItem('age');
    window.localStorage.removeItem('gender');
    window.localStorage.removeItem('height');
    window.localStorage.removeItem('weight');

    document.getElementById("bmi").innerHTML = "";
    document.getElementById("bmi-class").innerHTML = "";
    document.getElementById("info").innerHTML = "";

    // $('#bmi').empty();
    // $('#bmi-class').empty();
    $('#userInformation').css('display', 'inline');
  });

  $('button.calc').on('click', function() {
    if ($('input[name=age]').val() === '') {
      alert('You must enter an age!');
    }
    else if (!$('input[name=gender]:checked')[0]) {
      alert('You must select a gender!');
    }
    else if ($('input[name=wt]').val() === '') {
      alert('You must enter a weight!');
    }
    else if (($('input[name=ht-feet]').val() || $('input[name=ht-inches]').val()) === '') {
      alert('You must enter a height!');
    }
    else if (!$('input[name=activity]:checked')[0]) {
      alert('You must select an activity!');
    }
    else if (!$('input[name=goal]:checked')[0]) {
      alert('You must select a goal!');
    }
    else {
      var gender = $("input[name='gender']").val();
      var age = $("input[name='age']").val();
      var height = parseInt($("input[name='ht-feet']").val()) * 12 + parseInt($("input[name='ht-inches']").val());
      var weight = $("input[name='wt']").val();
      console.log(height);
      localStorage.setItem('gender', gender);
      localStorage.setItem('age', age);
      localStorage.setItem('height', height);
      localStorage.setItem('weight', weight);

      myBMIFunction(height, weight);
    }
  });
  if (window.location.href.indexOf('locator') > -1) {
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  $('#search').on('click', function(event) {
    event.preventDefault();

    var zipInput = $('#farm-form input[name=zip]').val();

    zipcode(zipInput.toString());


});
  $('button#refresh').on('click', function() {
    event.preventDefault();
    $('#locator-results').empty();
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  });
}

});
