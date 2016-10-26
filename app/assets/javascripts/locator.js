/////////////API Function Interface////////////////////
var detailed = function(id) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
    dataType: 'jsonp'})

  .done(function(response) {
    // console.log(response)
    console.log(response.marketdetails)
    $('#farm-div').append(response.marketdetails.Address)
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
      $('#farm-div').append(response.results[0].marketname)

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

