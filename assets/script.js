$(document).ready(function(){

	$.ajax({
	    url: "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=100&key=200198519-a331d25bdc7ef2acc53d1f1636e3cd3b",
	    type: "GET",
	    data: {
	      "$limit" : 5000,
	      "$$app_token" : "bRM4Mi2HNqY1XERoo2TVouQ67E"
	    }
	}).done(function(data) {
	  alert("Retrieved " + data.length + " records from the dataset!");
	  console.log(data);
	});
});

// $(window).load(function() {
//     // Construct the query string
//     url = `https://www.mountainproject.com/data/get-user?email=essey@colorado.edu&key=200198519-332ea7ee0ec59a89221352f4463bc06b`
//     // url = 'https://data.ct.gov/resource/v4tt-nt9n.json?'
//     //       + 'organization_type=Public%20School%20Districts'
//     //       + '&$$app_token=09sIcqEhoY0teGY5rhupZGqhW';
    
//     // Intialize our map
//     var center = new google.maps.LatLng(41.7656874,-72.680087);
//     var mapOptions = {
//       zoom: 8,
//       center: center
//     }
//     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
//     // Retrieve our data and plot it
//     $.getJSON(url, function(data, textstatus) {
//           $.each(data, function(i, entry) {
//               var marker = new google.maps.Marker({
//                   position: new google.maps.LatLng(entry.location_1.coordinates[1], 
//                                                    entry.location_1.coordinates[0]),
//                   map: map,
//                   title: location.name
//               });
//           });
//     });
// });