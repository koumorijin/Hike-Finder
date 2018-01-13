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
  let database = firebase.database();

  	//ON CLICK SUBMIT BUTTON EVENT
  	$("#getHike").on("click", function() {
  		$('ul#results').empty();
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
	  			let descent;
	  			let modalName;
	  			let description;
	  			let condition;
	  			let image;
	  			let hikeLat;
	  			let hikeLong;
	  			let length;


		  		for (let i = 0; i < results.length; i++) {
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
		  			descent = results[i].descent;
		  			length = results[i].length;


		  			resultDetail.append(`
		  				<li>
			  				<div class="panel panel-primary id="hikeName${[i]}">
			                	<div class="panel-heading">
			                		<h2>${name}</h2>
			                	</div>
		                      	<div class="panel-body">
			                        <div class="row">
			                        	<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			                              	<p><strong>Ascent:</strong> <i>${ascent}</i></p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			                              	<p><strong>Difficulty:</strong> <i>${difficulty}</i></p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			                              	<p><strong>Rating:</strong> <i>${rating}</i></p>
			                            </div>
			                        </div>
			                        <div class="row">
			                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			                              	<p><strong>Descent:</strong> <i>${descent}</i></p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			                              	<p><strong>Length:</strong> <i>${length}</i></p>
			                            </div>
			                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			                              	<p><strong># of Votes:</strong> <i>${votes}</i></p>
			                            </div>
			                        </div>
			                        <div class="row">
			                        	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
		                        			<button class="btn btn-primary myBtn" data-toggle="modal" data-target="#${modalName}">Get Details</button>
		                        	</div>
		                      	</div>
	                		</div>
	                	</li>`);

		  			$("#newModal").append(`
					  	<div id="${modalName}" class="modal">
					      	<div class="modal-content">
					      	<button class="btn-danger" data-dismiss="modal">
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
					                	<h3>Description: <span id="hikeDesc"><i>${description}</i></span></h3>
					              	</div> 
					              	<div class="row">
					                	<h3>Conditions: <span id="hikeCond"><strong>${condition}</strong></span></h3>
					              	</div>
					              	<a href="https://www.google.com/maps/search/?api=1&query=${hikeLat},${hikeLong}" target="_blank" id="${modalName}" class="btn btn-success hikeDirections" role="button">Get Directions</a>
					            	</div>
					          	</div>
					      	</div>
						</div>`)
<<<<<<< HEAD
	  				}
	  		// 		$(".move").on("click", function(){
				 // 		//console.log("I was clicked!");
				 // 		//console.log($(this).parent().parent().parent());
				 // 		$(this).parent().parent().parent().parent().append($("#selectedHikes"));
				 //     	$(this).parent().parent().parent().parent().remove();
					// });
=======
  				}
  				$('.hikeDirections').on("click", function(){
  					var name =$(this).parent().children()[0].innerText.trim();
				   	var hikeCond = $(this).parent().children()[2].innerText.split(":").pop().trim();
				   	var attended = moment().format('LLLL');
				   	console.log(name);
				   	console.log(hikeDesc);
				   	console.log(hikeCond);
				   	console.log(attended);
				   	database.ref().push({
					    name: name,
					    hikeCond: hikeCond,
					    attended: attended
					});
>>>>>>> ee8a9e32ecd0b9b94d6d7f041717eb8ec271a0e1
				});
			});		
		});
	});

<<<<<<< HEAD
 	$(function() {
=======
	$(function() {
>>>>>>> ee8a9e32ecd0b9b94d6d7f041717eb8ec271a0e1
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
<<<<<<< HEAD

 	

	// Get the modal
	let modal = document.getElementById('myModal');

	// Get the button that opens the modal
	let btn = document.getElementsByClassName("myBtn");

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
=======
>>>>>>> ee8a9e32ecd0b9b94d6d7f041717eb8ec271a0e1
});

