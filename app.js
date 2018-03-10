// firebase info
var config = {
  apiKey: "AIzaSyAUtZhYqRGDnIXsUJrQ6-uZxgfWDw8VU6E",
  authDomain: "st-project-826dd.firebaseapp.com",
  databaseURL: "https://st-project-826dd.firebaseio.com",
  projectId: "st-project-826dd",
  storageBucket: "st-project-826dd.appspot.com",
  messagingSenderId: "87642551793"
};
firebase.initializeApp(config);

// shortname variable for calling firebase
var db = firebase.database();


// this will keep the train schedule automatically updated
db.ref().on("child_added", function (snapshot) {
  var trainNameTD = (snapshot.val().trainName);
  var destinationTD = (snapshot.val().destination);
  var frequencyTD = (snapshot.val().frequency);
  var nextArrivalTD = 0;
  var minutesAwayTD = 0;

  // creating the rows for the train schedule table
  var trainDataRow =
    ("<tr>" +
      "<td>" + trainNameTD + "</td>" +
      "<td>" + destinationTD + "</td>" +
      "<td>" + frequencyTD + "</td>" +
      "<td>" + nextArrivalTD + "</td>" +
      "<td>" + minutesAwayTD + "</td>" +
      "</tr>"
    );
  $("#trainScheduleTable").append(trainDataRow);

  //Log any errors with firebase to the console
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-train button
$("#addTrain").on("click", function (event) {
  event.preventDefault();
  // Get the input values
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  // train time is coming in as military time

  console.log(firstTrainTime);
  console.log(frequency);

  // updates sent to firebase
  db.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    // nextArrival: function that tells time between now and when it arrives
    // minutesAway: (current time) - (time until train cycle is complete)

  });

});

