// known bug -- takes two first user page loads to null all user / wins data.
// known bug -- chat error message on initial null setting and function run, close your console, bro.
// CSS kind of sucks here, I'll admit... When I first looked at this assignment it was more of a god damn, how am I going to get this done moment.
// I have made several adjustments, and currently don't like it at all.  This is a turd with a jet engine under the hood.
// I will probably do some major CSS changes in the future, including but not limited to a separate card for each player that looks a little more jazzy... and a proper readme
// STAY TUNED.


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
var counter;
var chatroom;
var position;
var realMessage;
var messages;
var chatroom = firebase.database().ref("/rpsChatroom/")
var playerTurn;
var realTurn;


var time = new Date().toLocaleTimeString();

$("#send").on("click", function () {
    message = $("#message-input").val();
    chatroom.push({
        username: curUser,
        message: message,
        time: time,

    })
    $("#message-input").val("");
});

function clearAll(){
    if (connected <= 1 && curUser == null) {
        database.ref("/1/User").set(null);
        database.ref("/1/Wins").set(null);
        database.ref("/1/Losses").set(null);
        database.ref("/2/User").set(null);
        database.ref("/2/Wins").set(null);
        database.ref("/2/Losses").set(null);
        database.ref("/rpsChatroom/").set(null)
        event.preventDefault();
        $(".message-box").text("")
        $(".playerTwo").text("Player 2: Enter Name");
        $("#playerTwoInfo").show();
        $(".playerOne").text("Player 1: Enter Name");
        $("#playerOneInfo").show();
    }
}

// on chatroom update, runs these two functions.
chatroom.on("value", gotData, errData)

// processes objects properly, so that I can use the username and message info on firebase 
function gotData(data) {
    var fullMessage = data.val()
    var keys = Object.keys(fullMessage)
    $(".message-box").text("")
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        var user = fullMessage[k].username;
        var messages = fullMessage[k].message;
        $(".message-box").append(user + ": " + messages + " <br>");
    }
}

//provides error data
function errData(err) {
    console.log("errdata running")
}

// initial check to ensure both players have picked. calls playerturns function to update turn text, runs to vs if both players have picked.
function preVersus() {
    playerTurns()
    if (playerOneChoice !== null && playerTwoChoice !== null) {
        versus()
    }
}
// the RPS functionality.
function versus() {
    if (playerOneChoice == "R" && playerTwoChoice == "R") {
        $(".tieGame").text("Player One Chose " + playerOneChoice + " and Player 2 Chose " + playerTwoChoice + "! This game is a tie!")
        clearChoices()
        resetButtons()
        resetTurns()
    } else if (playerOneChoice == "R" && playerTwoChoice == "P") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerTwoName + " wins!")
        dbOneLosses()
        dbTwoWins()
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "R" && playerTwoChoice == "S") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerOneName + " wins!")
        dbOneWins();
        dbTwoLosses();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "P" && playerTwoChoice == "R") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerOneName + " wins!")
        dbOneLosses();
        dbTwoWins();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "P" && playerTwoChoice == "P") {
        $(".tieGame").text("Player One Chose " + playerOneChoice + " and Player 2 Chose " + playerTwoChoice + "! This game is a tie!")
        clearChoices()
        resetButtons()
        resetTurns()
    } else if (playerOneChoice == "P" && playerTwoChoice == "S") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerTwoName + " wins!")
        dbOneLosses();
        dbTwoWins();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "S" && playerTwoChoice == "R") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerTwoName + " wins!")
        dbOneLosses();
        dbTwoWins();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "S" && playerTwoChoice == "P") {
        $(".tieGame").text(realPlayerOneName + " Chose " + playerOneChoice + " and " + realPlayerTwoName + " Chose " + playerTwoChoice + "! " + realPlayerOneName + " wins!")
        dbOneWins();
        dbTwoLosses();
        clearChoices()
        resetButtons()
    } else if (playerOneChoice == "S" && playerTwoChoice == "S") {
        $(".tieGame").text("Player One Chose " + playerOneChoice + " and Player 2 Chose " + playerTwoChoice + "! This game is a tie!")
        clearChoices()
        resetButtons()
        resetTurns()
    }
}

//adds a loss for player one when called
function dbOneLosses() {
    playerOneLosses++;
    database.ref("/1/Losses").set({
        Losses: playerOneLosses
    })

}
// adds a win for player one when called
function dbOneWins() {
    playerOneWins++;
    database.ref("/1/Wins").set({
        Wins: playerOneWins
    })
    resetTurns()
}
//adds a loss for player two when called
function dbTwoLosses() {
    playerTwoLosses++;
    database.ref("/2/Losses").set({
        Losses: playerTwoLosses
    })

}
//adds a win for player two when called
function dbTwoWins() {
    playerTwoWins++;
    database.ref("/2/Wins").set({
        Wins: playerTwoWins
    })
    resetTurns()
}
// sets turns to 1 again
function resetTurns() {
    playerTurn = 1;
    database.ref("/turn").set({
        turn: playerTurn
    })

}

//deletes firebase data re: choices, allows players to pick again
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

// on turn value, gets a firebase value, sets playerTurn variable to the firebase variable, runs playerTurns function to update text.
database.ref("/turn/turn").on("value", function (snapshot) {
    realTurn = (snapshot.val());
    //the line below is intentional for testing
    playerTurn = realTurn
    playerTurns()
    if (realPlayerOneName == null || realPlayerTwoName == null) {
        $("#playerTurn").text("")
    }
})

// on database root/1/Name value change, runs this function
// takes a snapshot of the value change, logs to console
// sets realPlayerOneName variable to that new snapshot value
// replaces div class playerOne text with realPlayerOne value
// if that value is not null, proceeds to hide the previous input field.
database.ref("/1/User/username").on("value", function (snapshot) {

    realPlayerOneName = (snapshot.val());
    if (realPlayerOneName == curUser) {
        // logOutOneShow();
        // $("#playerTwoLogoutRow").hide();
        $("#playerOneButtons").show();
        playerTurns();
    }
    if (realPlayerOneName !== null) {
        $(".playerOne").text(realPlayerOneName);
        $("#playerOneInfo").hide();
        playerTurns()

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
        // $("#playerTwoLogoutRow").hide();
    }
    if (realPlayerTwoName == curUser) {
        // $("#playerOneLogoutRow").hide();
    }
})

// choice on value, calls preversus
database.ref("/1/Choice/Choice").on("value", function (snapshot) {
    playerOneChoice = (snapshot.val());
    preVersus();
    hideOneButtons();

});

database.ref("/2/User/username").on("value", function (snapshot) {

    realPlayerTwoName = (snapshot.val());
    if (realPlayerTwoName == curUser) {
        $("#playerOneLogoutRow").hide();
        $("#playerTwoButtons").show();
        playerTurns()
    };

    if (realPlayerTwoName !== null) {
        $(".playerTwo").text(realPlayerTwoName);
        $("#playerTwoInfo").hide();
        playerTurns()

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
    preVersus();
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
$(".playerOneBtn").on("click", function () {
    if (playerOneChosen == false && realTurn == 1) {
        playerOneChosen = true;
        playerOneChoice = $(this).val();
        database.ref("/1/Choice").set({
            Choice: playerOneChoice
        });
        playerTurn++
        database.ref("/turn").set({
            turn: playerTurn
        })
    }
});

$(".playerTwoBtn").on("click", function () {
    if (playerTwoChosen == false && realTurn == 2) {
        playerTwoChosen = true;
        playerTwoChoice = $(this).val();
        database.ref("/2/Choice").set({
            Choice: playerTwoChoice
        });
    }
});

var connectionsRef = database.ref("/connections");
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

        database.ref("/2/User").set({
            username: nullPlaceHolder
        });
        $(".playerTwo").text("Player 2: Enter Name");
        $("#playerTwoInfo").show();
        playerTurn = 1
        database.ref("/turn").set({
            turn: playerTurn
        })
    }
    if (connected <= 1 && curUser == null) {
        database.ref("/1/User").set(null);
        database.ref("/1/Wins").set(null);
        database.ref("/1/Losses").set(null);
        database.ref("/2/User").set(null);
        database.ref("/2/Wins").set(null);
        database.ref("/2/Losses").set(null);
        database.ref("/rpsChatroom/").set(null)
        event.preventDefault();
        $(".message-box").text("")
        $(".playerTwo").text("Player 2: Enter Name");
        $("#playerTwoInfo").show();
        $(".playerOne").text("Player 1: Enter Name");
        $("#playerOneInfo").show();
    }
    if (connected >= 3 && curUser == null) {
        hideOneButtons();
        hideTwoButtons();
        $("#playerOneButtons").hide();
        $("#playerTwoButtons").hide();
    }
});


function playerTurns() {
    if (realPlayerOneName == null || realPlayerTwoName == null) {
        $("#playerTurn").text("")
    } else if (realTurn == 0) {
        $("#playerTurn").text("");
    } else if (realTurn == 1) {
        $("#playerTurn").text("It's " + realPlayerOneName + "'s turn!")
        $("#playerTurn").show()
    } else if (realTurn == 2) {
        $("#playerTurn").text("It's " + realPlayerTwoName + "'s turn!")
        $("#playerTurn").show()
    }
}

$(document).ready(function () {
    $("#playerTurns").hide()
    clearAll();
    clearChoices();
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
        playerTurns()

    })

    $("#playerTwoSubmit").on("click", function (event) {
        event.preventDefault();
        $("#playerTurns").show()
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
        playerTurns()


    })
}
);