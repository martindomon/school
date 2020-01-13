var scores, roundScore, activePlayer, gamePlaying;
var gameLimit = 50;

//initializes the game 
init();

// if you press the roll button, generates random numbers for the dices and displays them.
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {

    // Random number
    dice1 = Math.floor(Math.random() * 6) +1;
    dice2 = Math.floor(Math.random() * 6) +1;

    document.querySelector('#message').textContent = "";
    
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src ="images/dice-" + dice1 + ".png";
    document.getElementById('dice-2').src ="images/dice-" + dice2 + ".png";
  
    //Game Rule: If both dices roll a 6, your OVERALL score is RESET.
    if (dice1 === 6 && dice2 === 6) {

    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('#message').textContent = "You've rolled double 6's, thus your overall score is reset!";

    
    nextPlayer();
        
// Game Rule: If you've rolled 1 on either dice, you lose your CURRENT score.
    } else if (dice1 !== 1 && dice2 !== 1) {
        //add score
        //update score
        roundScore += dice1 + dice2;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;

    } else {
        nextPlayer();
    }
    }
    })


document.querySelector('.btn-hold').addEventListener('click', function (){
if (gamePlaying){

//add current score to global score
scores[activePlayer] += roundScore;

//update UI
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

var input = document.querySelector('.final-score').value;
console.log(input);
var winningScore;

if(input) {
    //Change winning score through input box
    winningScore = input;
} else {
    //Standard score to win
    winningScore = 100;
}


//Check if player won
if (scores[activePlayer] >= winningScore) {
    gamePlaying = false;
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('player-' + activePlayer + '-panel').classList.remove('active');
    //remember to add winner code to CSS
} else {
    //next player
    nextPlayer();
}
}
})

document.querySelector('.btn-new').addEventListener('click', init); 

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    
}
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('name-0').textContent = 'player 1'
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}