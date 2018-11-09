/*
    HANGMAN SOURCE
    Daniel Orlovsky
    UNCC Coding Bootcamp 08/30/2017
*/

'use strict';

var words =           // Word list
    [
        "hoth",
        "wampa",
        "snow",
        "lightsaber",
        "speeder",
        "secretbase",
        "republic",
        "jedi",
        "resistance",
        "empire",
        "tauntaun",
        "wookie",
        "milleniumfalcon",
        "snowstorm",
        "droid",
        "icecave",
        "attack",
        "escape",
    ];

const maxTries = 7;            // Number of guesses player has

var guessedLetters = [];        // Array of guessed letters
var guessWordIndex;           // Guessword index
var guessWord = [];          // The array being filld in by player
var lifePoints = 0;       // Guesses remaining
var finished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins so far
var losses =0;                  // How many losses so far

// Reset our game-level variables
function resetGame() {
    lifePoints = maxTries;

    // Use Math.floor to round the random number down to the nearest whole.
    guessWordIndex = Math.floor(Math.random() * (words.length));

    // Clear out arrays
    guessedLetters = [];
    guessWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < words[guessWordIndex].length; i++) {
        guessWord.push("_");
    }   

    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLosses").innerText = losses;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessWordText = "";
    for (var i = 0; i < guessWord.length; i++) {
        guessWordText += guessWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessWordText;
    document.getElementById("lifePoints").innerText = lifePoints;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < words[guessWordIndex].length; i++) {
        if(words[guessWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess
    if (positions.length <= 0) {
        lifePoints--;

    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessWord[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining underscores in the guessWord we are building.
function checkWin() {
    if(guessWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(lifePoints <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        losses++;
        finished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (lifePoints > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};


// Event listener
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(finished) {
        resetGame();
        finished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};