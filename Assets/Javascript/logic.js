var config = {
    apiKey: "AIzaSyD9UtNpjzF_CX2CQ599HFEX1pW-nxj8hHs",
    authDomain: "this-new-project-87b4a.firebaseapp.com",
    databaseURL: "https://this-new-project-87b4a.firebaseio.com",
    projectId: "this-new-project-87b4a",
    storageBucket: "",
    messagingSenderId: "519711916960"
};
firebase.initializeApp(config);

var database = firebase.database();

var playerOneChoice
var playerOneChosen = false;
var playerTwoChoice
var playerTwoChosen = false;
var playerOneActive = false;
var playerTwoActive = false;
var spectators=0;

var chatObject = {
    "1": {
        "message": "Hello how are you?",
        "time": "8:49AM!",
        "username": ""
    }
}

var time = new Date().toLocaleTimeString();
// updateUI(chatObject);

var counter = 1;

$("#send").click(function () {
    var message= $("#message-input").val();
    var time = new Date().toLocaleTimeString();
    $("#message-input").val("");

    chatObject ['newMessage' + counter] = {
        message: message,
        time: time,
        username: curUser,
    };
    counter ++;

    // updateUI(chatObject);

    return false;
});

// on database root/1/Name value change, runs this function
    // takes a snapshot of the value change, logs to console
    // sets realPlayerOneName variable to that new snapshot value
    // replaces div class playerOne text with realPlayerOne value
    // if that value is not null, proceeds to hide the previous input field.
database.ref("/1/Name").on("value", function(snapshot) {
    console.log(snapshot.val());
    realPlayerOneName = (snapshot.val());
    $(".playerOne").text(realPlayerOneName);
    if (realPlayerOneName !== null) {
        $("#playerOneInfo").hide();
    }

})

database.ref("/2/Name").on("value", function(snapshot) {
    console.log(snapshot.val());
    realPlayerTwoName = (snapshot.val());
    $(".playerTwo").text(realPlayerTwoName);
    if (realPlayerTwoName !== null) {
        $("#playerTwoInfo").hide();
    }
})



// Functions
// ================================================================================

// On Click
$(".playerOneBtn").on("click", function () {
    console.log("Something is happening!")
    if (playerOneChosen == false) {
        playerOneChosen = true;
        playerOneChoice = $(this).val();
        console.log($(this).val())
        database.ref("/1").set({
            choice: playerOneChoice
        });
    }});

$(".playerTwoBtn").on("click", function () {
    if (playerTwoChosen == false) {
        playerTwoChosen = true;
        playerTwoChoice = $(this).val();
        console.log($(this).val())
        database.ref("/2").set({
            choice: playerTwoChoice
        });
    }
});

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snapshot) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#active-spectators").text(snapshot.numChildren() + " ");
    spectators=(snapshot.numChildren());

});

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //

$(document).ready(function () {
    $("#playerOneSubmit").on("click", function (event) {
        event.preventDefault();
        playerOneActive = true;
        playerOneName = $("#playerOneName").val().trim();
        added = true;
        if (playerOneName !== null) {
            $("#playerOneName").val("");
            database.ref("/1").set({
                Name: playerOneName
            })
        }
    })

    $("#playerTwoSubmit").on("click", function (event) {
        event.preventDefault();
        playerTwoActive = true;
        playerTwoName = $("#playerTwoName").val().trim();
        added = true;
        if (playerTwoName !== null) {
            $("#playerTwoName").val("");
            database.ref("/2").set({
                Name: playerTwoName
            })
        }

    })
}
);