/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
3. Add another dice to the game, so that there are two dices now. 
The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, diceOne, diceTwo, gamePlaying;

init()

var secondDice, winningScore;


// create dice
// dice = Math.floor(Math.random() * 6 + 1);
// // console.log(dice)

// document.querySelector("#current-" + activePlayer).textContent = dice;

// // HTML method
// // document.querySelector("#current-" + activePlayer).innerHTML = "<strong>" + dice + "</strong>";
// var totalScore = document.querySelector("#score-0").textContent;
// console.log(totalScore)

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. random number
        diceOne = Math.floor(Math.random() * 6) + 1;
        diceTwo = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        var diceDOM1 = document.querySelector(".diceOne");
        diceDOM1.style.display = "block";
        diceDOM1.src = "dice-" + diceOne + ".png";
        console.log(diceOne + " " + diceTwo);
        var diceDOM2 = document.querySelector(".diceTwo");
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + diceTwo + ".png";
        // 3. update the round score if the rolled number was Not a 1
        // 1. A player looses his ENTIRE score when he rolls two 6 in a row.After that,
        //    it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
        if (diceOne === 1 || diceTwo === 1) {
            // set it to 0 and next player
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer()
        }

        else {
            roundScore += (diceOne + diceTwo);
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        
        // if (dice === 6 && secondDice === 6) {
        //     // make it 0 and turn to next player
        //     scores[activePlayer] = 0;
        //     document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        //     nextPlayer()
        // }
        // else if (dice !== 1) {
        //     // add score 
        //     roundScore += dice;
        //     document.querySelector("#current-" + activePlayer).textContent = roundScore;

        // }
        // else {
        //     // then next player

        //     // ternary operator  (? = then)
        //     nextPlayer();
        // }
        // secondDice = dice;
    }


});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // add current score to the global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector(".finalScore").value;

        //undefined, 0, null or "" are coerced to false
        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 10;
        }

        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER";
            document.querySelector('.diceOne').style.display = 'none';
            document.querySelector('.diceTwo').style.display = 'none';
            // to access winner class we use classList
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }

})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");

    document.querySelector(".diceOne").style.display = "none";
    document.querySelector(".diceTwo").style.display = "none";

}

document.querySelector(".btn-new").addEventListener("click", init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".diceOne").style.display = "none";
    document.querySelector(".diceTwo").style.display = "none";


    document.getElementById("score-0").textContent = "0"
    document.getElementById("score-1").textContent = "0"
    document.getElementById("current-0").textContent = "0"
    document.getElementById("current-1").textContent = "0"

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

// state variable tells condition of statement 
// ex. is our game playing or not playing?



