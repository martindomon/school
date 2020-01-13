
// Card collection
let deck = [
	//ACES
    { card: '🂡', value: 1 }, { card: '🂢', value: 2 }, { card: '🂣', value: 3 }, { card: '🂤',value:  4 }, { card: '🂥', value: 5 }, { card: '🂦',value: 6  }, { card: '🂧', value: 7 }, { card: '🂨',value: 8  }, { card: '🂩', value: 9 }, { card: '🂪', value: 10  }, { card: '🂫', value: 10 }, { card: '🂭', value: 10 }, { card: '🂮', value: 10 },
	//HEARTS
	{ card: '🂱', value: 1 }, { card: '🂲', value: 2 }, { card: '🂳', value: 3 }, { card: '🂴', value: 4 }, { card: '🂵', value: 5 }, { card: '🂶', value: 6 }, { card: '🂷', value: 7 }, { card: '🂸', value: 8 }, { card: '🂹', value: 9 }, { card: '🂺', value: 10  }, { card: '🂻', value: 10 }, { card: '🂽', value: 10 }, { card: '🂾', value: 10 },
	//DIAMONDS
	{ card: '🃁', value: 1 }, { card: '🃂', value: 2 }, { card: '🃃', value: 3 }, { card: '🃄', value: 4 }, { card: '🃅', value: 5 }, { card: '🃆', value: 6 }, { card: '🃇', value: 7 }, { card: '🃈', value: 8 }, { card: '🃉', value: 9 }, { card: '🃊', value: 10  }, { card: '🃋', value: 10 }, { card: '🃍', value: 10 }, { card: '🃎', value: 10 },
	//CLUBS
	{ card: '🃑', value: 1 }, { card: '🃒', value: 2 }, { card: '🃓', value: 3 }, { card: '🃔', value: 4 }, { card: '🃕', value: 5 }, { card: '🃖', value: 6 }, { card: '🃗', value: 7 }, { card: '🃘', value: 8 }, { card: '🃙', value: 9 }, { card: '🃚', value: 10  }, { card: '🃛', value: 10 }, { card: '🃝', value: 10 }, { card: '🃞', value: 10 },
]

let dealer = [];
let player = [];

let outputArea = document.getElementById("output-area"),
	newGameButton = document.getElementById("new-game-button"),
	hitButton = document.getElementById("hit-button"),
    	stayButton = document.getElementById("stay-button"),
   	winnerArea = document.getElementById("winner-area");

let playerScore = 0,
    dealerScore = 0;
let result = '';

function shuffleDeck () {
    var i = 0 , j = 0, temp = null

    for (i = deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
	}
	console.log(deck);
}
    

newGameButton.addEventListener('click', function () {
	startNewGame();
});

hitButton.addEventListener('click', function(){
	dealAnotherCard(player);
	showHands();
});

stayButton.addEventListener('click', function() {
	hideGameButtons();
	while(dealerScore < playerScore
		&& playerScore <= 21
		&& dealerScore <= 21){
		dealer.push(drawCard());
		showHands(true);
	}
});

function drawCard() {
	return deck.shift();
}

deck.forEach(card => result += `${card.card}` ); 

function ShowHandPlayer(hand, score) {
	let cards = '';
	for (let i = 0; i < hand.length; i++)
		cards += hand[i].card + ' ';

	outputArea.innerText += 'Player: ' +  cards + '' + score + '\n';
}
function ShowHandDealer(hand, score) {
	let cards = '';
	for (let i = 0; i < hand.length; i++)
		cards += hand[i].card + ' ';

	outputArea.innerText += 'Dealer: ' +  cards + '' + score + '\n';
}

function dealInitialCards() {
	clearTable();
	player.push(drawCard());
	player.push(drawCard());
	dealer.push(drawCard());
	dealer.push(drawCard());

	playerScore = calculateHand(player);
	dealerScore = calculateHand(dealer);

	ShowHandDealer(dealer, dealerScore);
   	ShowHandPlayer(player, playerScore);
    	calculateHand(player);
    
}

function calculateHand(cards) {
    console.log(cards);
	let score = 0;
	let hasAce = cards.find(card => card.value === 1) !== undefined;

	cards.forEach(card => score += card.value);

	if (hasAce && score + 10 <= 21)
		score += 10;

	return score;
}

function clearTable() {
	outputArea.innerText = '';
}

function startNewGame() {
	newGameButton.style.display = 'none';
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';
	player = [];
	dealer = [];
	clearTable();
	shuffleDeck();
	dealInitialCards();
	winnerArea.innerText = '';
}

function dealAnotherCard(hand) {
	hand.push(drawCard());
}

function showHands(stayed = false) {
	playerScore = calculateHand(player);
	dealerScore = calculateHand(dealer);
	clearTable();
	ShowHandDealer(dealer, dealerScore);
	ShowHandPlayer(player, playerScore);
	winner = determineWinner(stayed);
	winnerArea.innerText = winner;
	if(winner !=='') hideGameButtons();
}

function hasBlackJack(hand, score) {
    if(hand.length === 2 && score === 21)
    return true;
}

function isBust(score) {
    if(score > 21)
     	return true;
}

function determineWinner(stayed) {
    const dealerWins = 'dealer wins';
    const playerWins = 'you win';
    const draw = 'It\'s a draw';

if(isBust(playerScore)) return dealerWins;
else if (isBust(dealerScore)) return playerWins;
else if(dealerScore <= 21 && dealer.length === 5) return dealerWins;
else if(stayed && dealerScore === playerScore) return draw;
else if(stayed && dealerScore > playerScore) return dealerWins;
else if (stayed && dealerScore < playerScore) return playerWins;
else {
	let dealerBJ = hasBlackJack(dealer, dealerScore);
	let playerBJ = hasBlackJack(player, playerScore);
	if(playerBJ && dealerBJ) return draw;
	if(playerBJ) return playerWins;
	if(dealerBJ) return dealerWins;
    }
    return '';
}

function showGameButtons() {
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
}

function hideGameButtons() {
	newGameButton.style.display = 'inline';
	hitButton.style.display = 'none';
	stayButton.style.display = 'none';
}

hideGameButtons();
