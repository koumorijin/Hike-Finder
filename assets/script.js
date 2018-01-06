$(document).ready(function(){
  
  // INITIALIZE FIREBASE
  var config = {
    apiKey: "AIzaSyCYdyEbewGrsZ77lOrWG0tRH-aBaEB9oP8",
    authDomain: "hikefinder-22a32.firebaseapp.com",
    databaseURL: "https://hikefinder-22a32.firebaseio.com",
    projectId: "hikefinder-22a32",
    storageBucket: "",
    messagingSenderId: "241059448457"
  };
  firebase.initializeApp(config);

  let city = "";
  let radius = 0;
  let cityLat = 0;
  let cityLon = 0;

  	//ON CLICK SUBMIT BUTTON EVENT
  	$("#getHike").on("click", function() {
		city = $("#city").val();
		radius = $("#radius").val();
		console.log(city);
		console.log(radius);
	});

	//FUNCTION TO GET THE LATITIUDE AND LONGITUDE OF THE CITY ENTERED

	$.ajax({
	    url: "https://www.hikingproject.com/data/get-trails?lat="+cityLon+"&lon="cityLon"&maxDistance="+radius+"&key=200198519-a331d25bdc7ef2acc53d1f1636e3cd3b&maxResults=100",
	    type: "GET"
	}).done(function(data) {
	  console.log(data);
	});

	// Get the modal
	var modal = $('#myModal');

	// Get the button that opens the modal
	var btn = $("#myBtn");

	// Get the <span> element that closes the modal
	var span = $(".close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

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

