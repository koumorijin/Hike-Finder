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
  	let ref = database.ref();
	ref.on("value", function(snapshot) {
		// for each (snapshot.val()) {  
		//    	$("#trailHeaderInfo").append(`
		// 		<div class="row text-center row-striped margin-less header-row" id="trailHeaderInfo">
		// 	        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
		// 	          ${name}
		// 	        </div>
		// 	        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
		// 	          ${hikeCond}
		// 	        </div> 
		// 	        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
		// 	          ${attended}
		// 	        </div>  
		// 	    </div>
		// 	`);  
		// }  
	   console.log(snapshot.val());

	}, function (error) {
	   console.log("Error: " + error.code);
	});
});