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
		  		let resultDetail = $('ul#results');
		  		let name;
	  			let difficulty;
	  			let rating;
	  			let votes;
	  			let ascent;
	  			let modalName;
	  			let description;
	  			let condition;
	  			let image;
	  			let hikeLat;
	  			let hikeLong


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
		  			hikeLat = results[i].latitude;
		  			hikeLong = results[i].longitude;

		  			resultDetail.append(`
		  				<li>
			  				<div class="panel panel-primary id="hikeName${[i]}">
			                	<div class="panel-heading">
			                		<h2>${name}</h2>
			                	</div>
		                      	<div class="panel-body">
			                        <div class="row">
			                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			                              	<p>Ascent:${ascent}</p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			                              	<p>Difficulty:${difficulty}</p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			                              	<p>Rating:${rating}</p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			                              	<p># of Votes:${votes}</p>
			                            </div>
			                        </div>
		                        	<button class="btn btn-primary myBtn" data-toggle="modal" data-target="#${modalName}">Get Details</button>
		                      	</div>
	                		</div>
	                	<li>`);

		  			$("#newModal").append(`
					  	<div id="${modalName}" class="modal">
					      	<div class="modal-content">
					      	<button class="btn-danger" data-target="#${modalName}">
					        	<span id="close${modalName}" class="close">&times;</span>
					        </button>
					          	<div class="row">
					            	<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					              	<img id="hikeImg" src=${image} style="height: 300px; width: 300px;">
					            	</div>
					            	<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
					            	<div class="row">
					            		<h2>${name}</h2>
					            	</div>
					              	<div class="row">
					                	<h3>Description: <span id="hikeDesc">${description}</span></h3>
					              	</div> 
					              	<div class="row">
					                	<h3>Conditions: <span id="hikeCond">${condition}</span></h3>
					              	</div>
					              	<a href="https://www.google.com/maps/search/?api=1&query=${hikeLat},${hikeLong}" target="_blank" id="${modalName}" class="btn btn-success" role="button">Get Directions</a>
					            	</div>
					          	</div>
					      	</div>
						</div>`)
	  				}
				});
			});
		});

	// initializeSortable = function() {
 //        $('ul#sortable').sortable({
 //            start: function(event, ui) {
 //                // determine which list the assignment record was taken from (source list: $scope.startUl)
 //                startHikeId= $(ui.item).find('div.id').text();
 //            }
 //        });
 //    }
 //    initializeSortable();
 // $(".sortable").sortable();
 $(function() {
    var oldList, newList, item;
    $('.sortable').sortable({
        start: function(event, ui) {
            item = ui.item;
            newList = oldList = ui.item.parent().parent();
        },
        stop: function(event, ui) {          
            // alert("Moved " + item.text() + " from " + oldList.attr('id') + " to " + newList.attr('id'));
        },
        change: function(event, ui) {  
            if(ui.sender) newList = ui.placeholder.parent().parent();
        },
        connectWith: ".sortable"
    }).disableSelection();
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

