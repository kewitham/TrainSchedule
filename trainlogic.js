var config = {
	apiKey: "AIzaSyD5DXnxAYIGqQcOUiZKSl37pRhEHZr2IOU",
    authDomain: "train-schedule-159b8.firebaseapp.com",
    databaseURL: "https://train-schedule-159b8.firebaseio.com",
    storageBucket: "train-schedule-159b8.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();


$("#addTrainBtn").on("click", function(){

	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firsttime = $("#firsttimeInput").val().trim();
	var frequency = $("#frequencyInput").val().trim();

	var newTrain = {
		name:  trainName,
		trainDestination: destination,
		trainFirsttime: firsttime,
		trainFrequency: frequency
	}

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.trainDestination);
	console.log(newTrain.trainFirsttime);
	console.log(newTrain.trainFrequency)

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firsttimeInput").val("");
	$("#frequencyInput").val("");

	return false;
});



database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().trainDestination;
	var firsttime = childSnapshot.val().trainFirsttime;
	var frequency = childSnapshot.val().trainFrequency;


	console.log(trainName);
	console.log(destination);
	console.log(firsttime);
	console.log(frequency);
	var firstmoment = moment(firsttime, "HH:mm");
	var diff = moment().diff(firstmoment, 'minutes');
	var diffFrequency = diff%frequency;
	var frequencyDiff = frequency - diffFrequency;
	var nextArrival = moment().add(frequencyDiff, 'minutes').format('h:mm a');
	var minutesAway = frequencyDiff + " minutes";


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});