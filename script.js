const popup = document.querySelector('.popup');
const form = document.querySelector('#new-game-form');
const targetScoreInput = form.querySelector('#form-target-score');
const timeLimitInput = form.querySelector('#form-time-limit');
const homeTeamNameInput = form.querySelector('#form-home-team-name');
const awayTeamNameInput = form.querySelector('#form-away-team-name');
const errorsContainer = document.querySelector('.errors');
const errorList = document.querySelector('.errors-list');
const timeDisplay = document.querySelector('.clock');
const targetScoreDisplay = document.querySelector('.target-score');
const homeNameDisplay = document.querySelector('.home-name');
const awayNameDisplay = document.querySelector('.away-name');
const homeScoreDisplay = document.querySelector('.home');
const awayScoreDisplay = document.querySelector('.away');
const gameOverModal = document.querySelector('.game-over');
const gameOverHeader = document.querySelector('.game-over-header');
const gameOverMessage = document.querySelector('.game-over-message');

let homeScore = 0;
let homeTeam;
let awayScore = 0;
let awayTeam;
let targetScore = 0;
let timeLimit = 0;
let isGameOver = false;
let intervalId;

// ---------- NEW GAME FORM SUBMISSION ---------- //
form.addEventListener('submit', e => {
  e.preventDefault();
  const errorMessages = [];
  clearErrors();
  if (!homeTeamNameInput.value.length) {
    errorMessages.push('Please give the home team a name');
  }

  if (!awayTeamNameInput.value.length) {
    errorMessages.push('Please give the away team a name');
  }

  if (errorMessages.length) {
    showErrors(errorMessages);
  } else {
    timeLimit = +timeLimitInput.value;
    targetScore = targetScoreInput.value;
    targetScoreDisplay.innerText = targetScore;
    homeTeam = homeTeamNameInput.value.toUpperCase();
    awayTeam = awayTeamNameInput.value.toUpperCase();
    homeNameDisplay.innerText = homeTeam;
    awayNameDisplay.innerText = awayTeam;
    homeTeamNameInput.value = '';
    awayTeamNameInput.value = '';
    popup.classList.remove('active');
    startTimer();
  }
});

// ---------- CLICK ON +PTS BUTTONS ---------- //
document.addEventListener('click', e => {
  if (!e.target.matches('.add') || isGameOver) return;
  const points = +e.target.dataset.score;
  if (e.target.matches('.add-home')) {
    homeScore = homeScore + points;
  } else {
    awayScore = awayScore + points;
  }
  updateScore();
  if (homeScore >= targetScore) {
    isGameOver = true;
    stopTimer();
    const winner = homeTeam;
    const loser = awayTeam;
    const endScore = `${homeScore} - ${awayScore}`;
    displayGameOver(winner, loser, endScore);
  } else if (awayScore >= targetScore) {
    isGameOver = true;
    stopTimer();
    const winner = awayTeam;
    const loser = homeTeam;
    const endScore = `${awayScore} - ${homeScore}`;
    displayGameOver(winner, loser, endScore);
  }
});

// ---------- CLICK ON RESET SCORE BUTTON ---------- //
document.addEventListener('click', e => {
  if (!e.target.matches('#reset-game')) return;
  resetGame();
  stopTimer();
  startTimer();
});

// ---------- CLICK ON NEW GAME BUTTON ---------- //
document.addEventListener('click', e => {
  if (!e.target.matches('#new-game')) return;
  resetGame();
  stopTimer();
  popup.classList.add('active');
});

function clearErrors() {
  while (errorList.children.length) {
    errorList.firstElementChild.remove();
  }
  errorsContainer.classList.remove('show');
}

function showErrors(errorMessages) {
  errorMessages.forEach(error => {
    const errorItem = document.createElement('li');
    errorItem.innerText = error;
    errorList.appendChild(errorItem);
  });
  errorsContainer.classList.add('show');
}

function resetGame() {
  gameOverModal.classList.remove('active');
  homeScore = 0;
  awayScore = 0;
  updateScore();
  isGameOver = false;
}

function updateScore() {
  homeScoreDisplay.innerText = homeScore;
  awayScoreDisplay.innerText = awayScore;
}

function startTimer() {
  let time = timeLimit * 60;
  intervalId = setInterval(() => {
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeDisplay.innerText = `${minutes}:${seconds}`;
    time = time <= 0 ? 0 : time - 1;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  timeDisplay.innerText = '00:00';
}

function displayGameOver(winner, loser, score) {
  console.log(winner + 'wins');
  gameOverHeader.innerText = `${winner} WINS !`;
  gameOverMessage.innerText = `${winner} ${score} ${loser}`;
  gameOverModal.classList.add('active');
}
