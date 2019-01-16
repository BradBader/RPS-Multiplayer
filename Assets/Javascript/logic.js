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
var playerOneWins = 0;
var playerOneLosses = 0;
var playerTwoWins = 0;
var playerTwoLosses = 0;
var Wins;
var curUser;
var connected;
var nullPlaceHolder = null;
var realPlayerOneName;
var realPlayerTwoName;

var chatObject = {
    "1": {
        "message": "Hello how are you?",
        "time": "8:49AM!",
        "username": ""
    }
};

var time = new Date().toLocaleTimeString();
// updateUI(chatObject);


$("#send").on("click", function () {
    if (curUser != "") {
        var message = $("#message-input").val();
        var time = new Date().toLocaleTimeString();
        $("#message-input").val("");
        chatObject['newMessage'] = {
            message: message,
            time: time,
            username: curUser,
        };
        console.log(chatObject)
        // counter++;

        return false;
    }
});

function preVersus() {
    if (playerOneChoice !== null && playerTwoChoice !== null) {
        versus()
    }
}

function versus() {
    if (playerOneChoice == "R" && playerTwoChoice == "R") {
        $(".tieGame").text("Player One Chose " + playerOneChoice + " and Player 2 Chose " + playerTwoChoice + "! This game is a tie!")
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "R" && playerTwoChoice == "P") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerTwoName + "wins!")
        dbOneLosses()
        dbTwoWins()
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "R" && playerTwoChoice == "S") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerOneName + "wins!")
        dbOneWins();
        dbTwoLosses();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "P" && playerTwoChoice == "R") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerOneName + "wins!")
        dbOneLosses();
        dbTwoWins();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "P" && playerTwoChoice == "P") {
        $(".tieGame").text("Player One Chose " + playerOneChoice + " and Player 2 Chose " + playerTwoChoice + "! This game is a tie!")
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "P" && playerTwoChoice == "S") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerTwoName + "wins!")
        dbOneLosses();
        dbTwoWins();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "S" && playerTwoChoice == "R") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerTwoName + "wins!")
        dbOneLosses();
        dbTwoWins();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "S" && playerTwoChoice == "P") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerOneName + "wins!")
        dbOneWins();
        dbTwoLosses();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "S" && playerTwoChoice == "S") {
        $(".tieGame").text("Player One Chose " + playerOneChoice + " and Player 2 Chose " + playerTwoChoice + "! This game is a tie!")
        clearChoices()
        resetButtons()
    }
}

function dbOneLosses() {
    playerOneLosses++;
    console.log(playerOneLosses)
    database.ref("/1/Losses").set({
        Losses: playerOneLosses
    })

}

function dbOneWins() {
    playerOneWins++;
    console.log(playerOneWins)
    database.ref("/1/Wins").set({
        Wins: playerOneWins
    })

}

function dbTwoLosses() {
    playerTwoLosses++;
    database.ref("/2/Losses").set({
        Losses: playerTwoLosses
    })

}

function dbTwoWins() {
    playerTwoWins++;
    database.ref("/2/Wins").set({
        Wins: playerTwoWins
    })
        ;
}

function clearChoices() {
    database.ref("/1/Choice").set(null)
    database.ref("/2/Choice").set(null)
    playerOneChosen = false;
    playerTwoChosen = false;
}

// clears the current user's buttons
function resetButtons() {
    if (curUser == realPlayerOneName) {
        $(".playerOneBtnR").show();
        $(".playerOneBtnP").show();
        $(".playerOneBtnS").show();
    }
    else if (curUser == realPlayerTwoName) {
        $(".playerTwoBtnR").show();
        $(".playerTwoBtnP").show();
        $(".playerTwoBtnS").show();
    }
}

//when called, hides the buttons playerOne did not pick. 
function hideOneButtons() {
    if (playerOneChoice == "R") {
        $(".playerOneBtnP").hide()
        $(".playerOneBtnS").hide()
    } else if (playerOneChoice == "P") {
        $(".playerOneBtnR").hide()
        $(".playerOneBtnS").hide()
    } else if (playerOneChoice == "S") {
        $(".playerOneBtnR").hide()
        $(".playerOneBtnP").hide()
    }

}

//when called, hides the buttons playerTwo did not pick.
function hideTwoButtons() {
    if (playerTwoChoice == "R") {
        $(".playerTwoBtnP").hide()
        $(".playerTwoBtnS").hide()
    } else if (playerTwoChoice == "P") {
        $(".playerTwoBtnR").hide()
        $(".playerTwoBtnS").hide()
    } else if (playerTwoChoice == "S") {
        $(".playerTwoBtnR").hide()
        $(".playerTwoBtnP").hide()
    }
}

// on database root/1/Name value change, runs this function
// takes a snapshot of the value change, logs to console
// sets realPlayerOneName variable to that new snapshot value
// replaces div class playerOne text with realPlayerOne value
// if that value is not null, proceeds to hide the previous input field.
database.ref("/1/User/username").on("value", function (snapshot) {

    realPlayerOneName = (snapshot.val());
    if (realPlayerOneName == curUser) {
        logOutOneShow();
        $("#playerTwoLogoutRow").hide();
        $("#playerOneButtons").show();
    }
    if (realPlayerOneName !== null) {
        $(".playerOne").text(realPlayerOneName);
        $("#playerOneInfo").hide();

    }
    if (realPlayerOneName !== null && realPlayerOneName == curUser) {
        $("#playerTwoInfo").hide();
        $("#playerTwoButtons").hide();
    }
    if (realPlayerOneName == null) {
        $(".playerOne").text("Player 1: Enter Name");
        $("#playerOneInfo").show();
    }
    if (realPlayerOneName == curUser) {
        $("#playerTwoLogoutRow").hide();
    }
    if (realPlayerTwoName == curUser) {
        $("#playerOneLogoutRow").hide();
    }
})

database.ref("/1/Choice/Choice").on("value", function (snapshot) {
    playerOneChoice = (snapshot.val());
    versus();
    hideOneButtons();

});

database.ref("/2/User/username").on("value", function (snapshot) {

    realPlayerTwoName = (snapshot.val());
    if (realPlayerTwoName == curUser) {
        logOutTwoShow();
        $("#playerOneLogoutRow").hide();
        $("#playerTwoButtons").show();
    };

    if (realPlayerTwoName !== null) {
        $(".playerTwo").text(realPlayerTwoName);
        $("#playerTwoInfo").hide();
        $("#playerOneInfo").hide();
    }
    if (realPlayerTwoName !== null && realPlayerTwoName == curUser) {
        $("#playerOneInfo").hide();
        $("#playerOneButtons").hide();
    }
    if (realPlayerTwoName == null) {
        $("#playerTwoInfo").show();
        $("#playerTwo").text("Player 2: Enter Name");
    }
});

database.ref("/2/Choice/Choice").on("value", function (snapshot) {
    playerTwoChoice = (snapshot.val());
    versus();
    hideTwoButtons();

});
database.ref("/2/Wins/Wins").on("value", function (snapshot) {
    realPlayerTwoWins = (snapshot.val());
    if (realPlayerTwoWins >= 1) {
        $(".twoWins").text(realPlayerTwoName + " Wins: " + realPlayerTwoWins)
    }
});
database.ref("/2/Losses/Losses").on("value", function (snapshot) {
    realPlayerTwoLosses = (snapshot.val());
    if (realPlayerTwoLosses >= 1) {
        $(".twoLosses").text(realPlayerTwoName + " Losses: " + realPlayerTwoLosses)
    }
});
database.ref("/1/Wins/Wins").on("value", function (snapshot) {
    realPlayerOneWins = (snapshot.val());
    if (realPlayerOneWins >= 1) {
        $(".oneWins").text(realPlayerOneName + " Wins: " + realPlayerOneWins)
    }
});
database.ref("/1/Losses/Losses").on("value", function (snapshot) {
    realPlayerOneLosses = (snapshot.val());
    if (realPlayerOneLosses >= 1) {
        $(".oneLosses").text(realPlayerOneName + " Losses: " + realPlayerOneLosses)
    }
});




// Functions
// ================================================================================

$(".playerOneBtn").on("click", function () {
    if (playerOneChosen == false) {
        playerOneChosen = true;
        playerOneChoice = $(this).val();
        database.ref("/1/Choice").set({
            Choice: playerOneChoice
        });
    }
});

$(".playerTwoBtn").on("click", function () {
    if (playerTwoChosen == false) {
        playerTwoChosen = true;
        playerTwoChoice = $(this).val();
        database.ref("/2/Choice").set({
            Choice: playerTwoChoice
        });
    }
});

// connections counter and code from codersbay activity //
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
connectionsRef.on("value", function (snap) {

    connected = (snap.numChildren());
    if (connected == 2 && curUser == null) {
        console.log("292 triggered")
        database.ref("/2/User").set({
            username: nullPlaceHolder
        });
        $(".playerTwo").text("Player 2: Enter Name");
        $("#playerTwoInfo").show();
    }
    if (connected == 1 && curUser == null) {
        console.log("300 triggered")
        database.ref("/1/User").set({
            username: nullPlaceHolder
        });
        database.ref("/1/Wins").set({
            Wins: nullPlaceHolder
        });
        database.ref("/1/Losses").set({
            Losses: nullPlaceHolder
        });
        database.ref("/2/User").set({
            username: nullPlaceHolder
        });
        database.ref("/2/Wins").set({
            Wins: nullPlaceHolder
        });
        database.ref("/2/Losses").set({
            Losses: nullPlaceHolder
        });

        $(".playerTwo").text("Player 2: Enter Name");
        $("#playerTwoInfo").show();
        $(".playerOne").text("Player 1: Enter Name");
        $("#playerOneInfo").show();
    }
    if (connected >= 3 && curUser == null) {
        logOutHide();
        hideOneButtons();
        hideTwoButtons();
        $("#playerOneButtons").hide();
        $("#playerTwoButtons").hide();
    }
});

function logOutHide() {
    $("#playerTwoLogoutRow").hide();
    $("#playerOneLogoutRow").hide();

}
function logOutOneShow() {
    $("#playerOneLogoutRow").show();
}
function logOutTwoShow() {
    $("#playerTwoLogoutRow").show();
}

$(document).ready(function () {
    clearChoices();
    if (playerOneWins === 0 && playerTwoWins === 0) {
        // $(".oneWins").text("");
        // $(".oneLosses").text("");
        // $(".twoWins").text("");
        // $(".twoLosses").text("");
        // $(".tieGame").text("");

    }
    // $(".logout").on("click", function (event) {
    //     if (curUser == realPlayerOneName) {
    //         database.ref("/1/User").set({
    //             username: nullPlaceHolder
    //         });
    //         $(".playerOne").text("Player 1: Enter Name");
    //         $("#playerOneInfo").show()
    //     }
    //     if (curUser == realPlayerTwoName) {
    //         database.ref("/2/User").set({
    //             username: nullPlaceHolder
    //         });
    //         console.log("user 2 disconnected");
    //         $(".playerTwo").text("Player 2: Enter Name");
    //         $("#playerTwoInfo").show();
    //     }
    // })
    $("#playerOneSubmit").on("click", function (event) {
        event.preventDefault();
        playerOneActive = true;
        playerOneName = $("#playerOneName").val().trim();
        added = true;
        curUser = playerOneName;
        if (playerOneName !== "") {
            $("#playerOneName").val("");
            database.ref("/1/User").set({
                username: playerOneName
            })
        }

    })

    $("#playerTwoSubmit").on("click", function (event) {
        event.preventDefault();
        playerTwoActive = true;
        playerTwoName = $("#playerTwoName").val().trim();
        added = true;
        curUser = playerTwoName;
        if (playerTwoName != "") {
            $("#playerTwoName").val("");
            database.ref("/2/User").set({
                username: playerTwoName
            })
        }


    })
}
);