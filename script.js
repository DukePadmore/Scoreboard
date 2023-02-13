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

let homeScore = 0;
let awayScore = 0;
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
    homeNameDisplay.innerText = homeTeamNameInput.value.toUpperCase();
    awayNameDisplay.innerText = awayTeamNameInput.value.toUpperCase();
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
  if (homeScore >= targetScore || awayScore >= targetScore) {
    isGameOver = true;
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
  // let time = timeLimit * 60;
  // intervalId = setInterval(() => {
  //   let minutes = parseInt(time / 60);
  //   let seconds = parseInt(time % 60);
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   seconds = seconds < 10 ? '0' + seconds : seconds;
  //   timeDisplay.innerText = `${minutes}:${seconds}`;
  //   time = time <= 0 ? 0 : time - 1;
  // }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  timeDisplay.innerText = '00:00';
}

// --------------- FONCTIONNALITÉS À AJOUTER --------------- //
/* 
   - points d'écart (ex : augmenter le score cible si les deux joueurs sont à 20 partout et que le match se termine à 21)
   - sauvegarder des scores
   - entrer le nom des participants (afficher le nom de l'équipe sur le scoreboard et liste des joueurs dans le récap sauvegardé)
   - sons (à chaque panier, lorsque la limite de score/temps est atteinte)
   - possibilité de retirer des points en cas d'erreur
*/

// --------------- FONCTIONNALITÉS DONE --------------- //
/* - définir le score cible
   - handle click sur new game
   - terminer la partie lorsque le score cible est atteint
   - limite de temps
   - chrono à ajouter
 */
