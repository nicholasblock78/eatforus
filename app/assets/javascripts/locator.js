/////////////API Function Interface////////////////////
var marketId = [];
  var allLatlng = [];
  var allMarkers = [];
  var marketName = [];
  var infowindow = null;
  var pos;
  var userCords;
  var tempMarkerHolder = [];


  var mapOptions = {
    zoom: 5,
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






          // geocodeAddress(geocoder, map);
          console.log('goodbye there')


          var detailed = function(id) {
            $.ajax({
              type: "GET",
              contentType: "application/json; charset=utf-8",
              url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
              dataType: 'jsonp'})

            .done(function(response) {
    // console.log(response)
    console.log(response.marketdetails)
    $('#locator-results').append(response.marketdetails.Address)
    console.log('hellloooooooooo')
    console.log(response.marketdetails.Address)

  })

          }

          var zipcode = function(zipcode) {
           $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipcode,
            dataType: 'jsonp'})

           .done(function(response) {
            console.log(response)
            console.log(response.results[0].id)
            $('#locator-results').append(response.results[0].marketname)

            var marketId = response.results[0].id
            var marketname = response.results[0].marketname
            var nameData = $.param({"marketname": marketname})

            detailed(marketId.toString())

            $.ajax({
             method: 'post',
             url: '/marketname',
             data: nameData,
           })
          })
         }


////////////PAGE LOADED////////////////
//Want it to show a fetching results screen
//then pivot to the google maps of the directions
$(document).ready(function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  $('#farm-form').on('submit', function(event) {
    event.preventDefault();

    var addressInput = $('#farm-form input:first').val();
    var zipInput = $('#farm-form input[name=zip]').val();

    zipcode(zipInput.toString());
  //To pass code off to Ruby to do work with in the display
  var $formZip = $(this);
  var zipQuery = $formZip.serialize();
  $.ajax({
    method: $formZip.attr('method'),
    url: $formZip.attr('action'),
    data: zipQuery
  });


  })




});

