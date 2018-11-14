var game ={

wins: 0,
losses: 0,
userGuess: "",
remGuesses: 0,
guessWord: "",
wordsArray: [
    "BROWNS",
    "DOLPHINS",
    "BRONCOS",
    "CAVS",
    "BEARS",
    "INDIANS",
    "CUBS",
    "BULLS"],
lettersGuessed: [""]
};

var winsID = document.getElementById("wins");
var lossesID = document.getElementById("losses");
var remGuessesID = document.getElementById("remGuesses");
var lettersGuessedID = document.getElementById("lettersGuessed");
var wordGuessID = document.getElementById("wordGuess");
var word;

console.log(word);

var userLetter;
var wordArray;
var guessWordArray;




function restartGame() {
    game.guessWord = game.wordsArray[Math.floor(Math.random() * game.wordsArray.length)];
    console.log(game.guessWord);
    game.remGuesses = Math.floor(game.guessWord.length * 1.5);
    word = game.guessWord.replace(/\w/g, "_");
    game.lettersGuessed = [];
    console.log(game.remGuesses);
    console.log(game.guessWord);
    userLetter = "";
    wordArray = game.guessWord.split("");
    guessWordArray = word.split("");
    updateAll();
    // console.log(wordArray);
}

restartGame();
document.getElementById("startButton").onclick = restartGame;

function updateAll(){
    winsID.textContent = "wins: " + game.wins;
    lossesID.textContent = "losses: " + game.losses;
    remGuessesID.textContent = "Remaining Guesses: " + game.remGuesses;
    lettersGuessedID.textContent = game.lettersGuessed.join("");
    wordGuessID.textContent = word;
}

console.log(word);
// console.log(guessWordArray);
console.log(game.remGuesses);

document.onkeyup = function (event) {
    userLetter = event.key;
    userLetter = userLetter.toUpperCase();

    if(userLetter.match(/^[A-Za-z]$/)) {
        console.log(userLetter);
        console.log(game.guessWord.length);

        if (game.guessWord.search(userLetter) != -1) {
            for (i = 0; i < wordArray.length; i++) {

                if (wordArray[i] === userLetter) {
                    guessWordArray[i] = userLetter;

                    word = guessWordArray.join("");
                    console.log(word);
                    if (word == game.guessWord) {

                        game.wins++;
                        wordGuessID.textContent = word;
                        alert("You da boss");
                        restartGame();
                    }

                }
                else {
                }
        }
    }
else {
    game.lettersGuessed.push(userLetter);
    game.remGuesses--;
    if (game.remGuesses == 0){
        game.remGuesses = 0;
        game.losses++;
        alert("YOU LOSE");
        restartGame();
    }
    else{

    }
}

updateAll();
console.log(game.remGuesses);
}
}
