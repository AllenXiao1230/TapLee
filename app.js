const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const timeBoard = document.getElementById('time');
const startButton = document.getElementById('start-btn');
let score = 0;
let time = 30;
let isPlaying = false;
let moleInterval;

function startGame() {
    isPlaying = true;
    startButton.disabled = true;
    score = 0;
    time = 30;
    scoreBoard.innerText = score;
    timeBoard.innerText = time;
    moleInterval = setInterval(showMole(), 500);
    setTimeout(() => {
        clearInterval(moleInterval);
        isPlaying = false;
        startButton.disabled = false;
    }, 30000);
}

function showMole() {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole.classList.contains('mole')) {
        showMole();
    } else {
        hole.classList.add('mole');
        setTimeout(() => {
            hole.classList.remove('mole');
        }, 500);
    }
}

function whackMole(e) {
    if (!isPlaying) return;
    if (!e.isTrusted) return;
    if (e.target.classList.contains('mole')) {
        e.target.classList.remove('mole');
        score++;
        scoreBoard.innerText = score;
    }
}

holes.forEach(hole => hole.addEventListener('click', whackMole()));
startButton.addEventListener('click', startGame());
