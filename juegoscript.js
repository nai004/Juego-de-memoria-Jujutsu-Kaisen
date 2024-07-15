// Character Array
const characters = [
    'Itadori', 'Utahime', 'Maki', 'Satoru Gojo', 
    'Sukuna', 'Shoko', 'Nobara', 'Megumi Fushiguro'
];

// DOM Elements
const gameBoard = document.getElementById('gameBoard');
const timerElement = document.getElementById('timer');
const gameOverModal = document.getElementById('gameOverModal');
const winnerModal = document.getElementById('winnerModal');
const closeGameOver = document.getElementById('closeGameOver');
const restartGameOver = document.getElementById('restartGameOver');
const closeWinner = document.getElementById('closeWinner');
const restartWinner = document.getElementById('restartWinner');

// Game Variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeRemaining = 60;

// Function to Create the Game Board
function createBoard() {
    const cardArray = [...characters, ...characters];
    cardArray.sort(() => 0.5 - Math.random());

    cardArray.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.character = character;
        card.addEventListener('click', flipCard);

        const frontFace = document.createElement('img');
        frontFace.src = `imagenes/${character}.jpg`;
        frontFace.classList.add('front-face');

        card.appendChild(frontFace);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

// Function to Start the Timer
function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
        if (timeRemaining === 0) {
            clearInterval(timer);
            showModal(gameOverModal);
        }
    }, 1000);
}

// Function to Flip a Card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

// Function to Check for a Match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.character === card2.dataset.character) {
        matchedPairs++;
        if (matchedPairs === characters.length) {
            clearInterval(timer);
            showModal(winnerModal);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}

// Function to Show the Modal
function showModal(modal) {
    modal.style.display = 'block';
}

// Event Listeners
closeGameOver.onclick = () => gameOverModal.style.display = 'none';
restartGameOver.onclick = () => location.reload();
closeWinner.onclick = () => winnerModal.style.display = 'none';
restartWinner.onclick = () => location.reload();

window.onclick = event => {
    if (event.target === gameOverModal) {
        gameOverModal.style.display = 'none';
    }
    if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
    }
};

// Initialize the Game
createBoard();
