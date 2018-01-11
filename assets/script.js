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

  	//ON CLICK SUBMIT BUTTON EVENT
  	$("#getHike").on("click", function() {
		let city = $("#city").val();
		let state = $("#state").val();
		let radius = $("input#radius").val();
		let resultsDesired = $("input#resultsDesired").val();
		//console.log(city);
		//console.log(radius);
		address = city +', ' +state;
		//console.log(address);
		
		//API CALL TO HIKING TRAILS
		$.ajax({
	   	 url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key=AIzaSyDRwYY-1gElgh60JvbxuJfZr0BJQJ37E00',
	    	type: "GET"
			}).done(function(data) {
			console.log('googleapis');
	  		console.log(data);
	  		let currentLat = data.results[0].geometry.location.lat;
	  		let currentLong = data.results[0].geometry.location.lng;
	  		$.ajax({
		   	 //url: "https://www.hikingproject.com/data/get-trails?lat="+cityLon+"&lon="+cityLon+"&maxDistance="+radius+"&key=200198519-a331d25bdc7ef2acc53d1f1636e3cd3b&maxResults=100",
		   	url: "https://www.hikingproject.com/data/get-trails?lat="+currentLat+"&lon="+currentLong+"&maxDistance="+radius+"&key=200198519-a331d25bdc7ef2acc53d1f1636e3cd3b&maxResults="+resultsDesired+"",
		    	type: "GET"
				}).done(function(data) {
		  		console.log(data);
		  		let results = data.trails;
		  		console.log(results);
		  		let resultDetail = $('div#results');
		  		let name;
	  			let difficulty;
	  			let rating;
	  			let votes;
	  			let ascent;
	  			let modalName;
	  			let description;
	  			let condition;
	  			let image;


		  		for (var i = 0; i < results.length; i++) {
		  			modalName = "modal" + Math.floor((Math.random() * 100000) + 1);
		  			name = results[i].name;
		  			difficulty = results[i].difficulty;
		  			rating = results[i].stars;
		  			votes = results[i].starVotes;
		  			ascent = results[i].ascent;
		  			description = results[i].summary;
		  			condition = results[i].conditionStatus;
		  			image = results[i].imgMedium;

		  			resultDetail.append(`
		  				<div class="panel panel-primary">
		                	<div class="panel-heading" id="hikeName">
		                		<h2>${name}</h2>
		                	</div>
	                      	<div class="panel-body">
		                        <div class="row">
		                            <div class="col-lg-3">
		                              	<p>Ascent:${ascent}</p>
		                            </div>
		                            <div class="col-lg-3">
		                              	<p>Difficulty:${difficulty}</p>
		                            </div>
		                            <div class="col-lg-3">
		                              	<p>Rating:${rating}</p>
		                            </div>
		                            <div class="col-lg-3">
		                              	<p># of Votes:${votes}</p>
		                            </div>
		                        </div>
	                        	<button class="btn btn-primary myBtn" data-toggle="modal" data-target="#${modalName}">Get Details</button>
	                      	</div>
                		</div>`);

		  			$("#newModal").append(`
					  	<div id="${modalName}" class="modal">
					      	<div class="modal-content">
					      	<button class="btn-danger" data-target="#${modalName}">
					        	<span id="close${modalName}" class="close">&times;</span>
					        </button>
					          	<div class="row">
					            	<div class="col-lg-4">
					              	<img id="hikeImg" src=${image} style="height: 300px; width: 300px;">
					            	</div>
					            	<div class="col-lg-8">
					            	<div class="row">
					            		<h2>${name}</h2>
					            	</div>
					              	<div class="row">
					                	<h3>Description: <span id="hikeDesc">${description}</span></h3>
					              	</div> 
					              	<div class="row">
					                	<h3>Conditions: <span id="hikeCond">${condition}</span></h3>
					              	</div>
					              	<button type="button" class="btn btn-default" id="getHike${modalName}">Get Map</button> 
					            	</div>
					          	</div>
					      	</div>
						</div>`)
	  				}
				});
			});
		});

	// Get the modal
	let modal = document.getElementById('myModal');

	// Get the button that opens the modal
	let btn = document.getElementsByClassName("myBtn");

	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	// btn.onclick = function() {
	//     modal.style.display = "block";
	// }

	//When the user clicks on <span> (x), close the modal
	$(".close").onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
});

