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


////////////PAGE LOADED////////////////
$(document).ready(function() {
  if (window.location.href.indexOf('locator') > -1) {
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

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



});
