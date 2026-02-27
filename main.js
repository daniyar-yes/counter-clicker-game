// =====================
// State
// =====================
const COUNT_INITIAL_STATE = 0;
const CURRENT_POINTS_INITIAL_VALUE = 0;
const GAME_TIME_INITIAL_VALUE = 60;
const LEFT_TIME_INITIAL_VALUE = 0;

const ROUND_LENGTH_SECONDS = 7;


let count = COUNT_INITIAL_STATE;
let currentPoints = CURRENT_POINTS_INITIAL_VALUE;

let isGameRunning = false; // variable that stores a boolean value is also called a flag

let selectedTimeLength = GAME_TIME_INITIAL_VALUE; // default, can be changed by buttons
let sessionSecondsLeft = LEFT_TIME_INITIAL_VALUE;

let roundSecondsLeft = 0;

let currentTargetMin = 0;
let currentTargetMax = 0;

let sessionIntervalId = null;
let roundIntervalId = null;

// =====================
// Elements
// =====================
const plusOneButton = document.querySelector("#plus-one-btn");
const minusOneButton = document.querySelector("#minus-one-btn");
const plusTenButton = document.querySelector("#plus-ten-btn");
const minusTenButton = document.querySelector("#minus-ten-btn");
const resetCountButton = document.querySelector("#reset-count-btn");

const totalCountSpan = document.querySelector("#counter");
const currentPointsSpan = document.querySelector("#current-points");
const currentTaskSpan = document.querySelector("#current-task");
const countdownDiv = document.querySelector("#countdown");

const startBtn = document.querySelector("#start-btn");
const time30Btn = document.querySelector("#time-30-btn");
const time60Btn = document.querySelector("#time-60-btn");

// =====================
// Init UI
// =====================
totalCountSpan.textContent = count;
currentPointsSpan.textContent = currentPoints  ;

const bestScoreKey = "bestScore";
renderBestScore();

// =====================
// Counter button logic
// (block input unless game running, optional but recommended)
// =====================
function canPlay() {
  return isGameRunning;
}

plusOneButton.addEventListener("click", () => {
  if (!canPlay()) return;
  count = count + 1;
  totalCountSpan.textContent = count;
});

minusOneButton.addEventListener("click", () => {
  if (!canPlay()) return;
  count = count - 1;
  totalCountSpan.textContent = count;
});

plusTenButton.addEventListener("click", () => {
  if (!canPlay()) return;
  count = count + 10;
  totalCountSpan.textContent = count;
});

minusTenButton.addEventListener("click", () => {
  if (!canPlay()) return;
  count = count - 10;
  totalCountSpan.textContent = count;
});

resetCountButton.addEventListener("click", () => {
  if (!canPlay()) return;
  count = COUNT_INITIAL_STATE;
  totalCountSpan.textContent = count;
});

// =====================
// Time select
// =====================
time30Btn.addEventListener("click", () => {
  if (isGameRunning) return;
  selectedTimeLength = 30;
  currentTaskSpan.textContent = "Selected: 30s. Press Start.";
});

time60Btn.addEventListener("click", () => {
  if (isGameRunning) return;
  selectedTimeLength = 60;
  currentTaskSpan.textContent = "Selected: 60s. Press Start.";
});

// =====================
// Start / Stop
// =====================
startBtn.addEventListener("click", () => {
  if (isGameRunning) return;
  startGame();
});

function startGame() {
  isGameRunning = true;

  // reset round + score + count (simple version)
  count = COUNT_INITIAL_STATE;
  currentPoints = CURRENT_POINTS_INITIAL_VALUE;
  totalCountSpan.textContent = count;
  currentPointsSpan.textContent = currentPoints;

  // enable +/-10 for now (or keep disabled until "shop" later)
  // plusTenButton.disabled = false;
  // minusTenButton.disabled = false;

  sessionSecondsLeft = selectedTimeLength;
  countdownDiv.textContent = `${sessionSecondsLeft}s`;

  startSessionTimer();
  startNewRound();
}

function endGame() {
  isGameRunning = false;

  clearInterval(sessionIntervalId);
  clearInterval(roundIntervalId);
  sessionIntervalId = null;
  roundIntervalId = null;

  currentTaskSpan.textContent = `Game over! Final score: ${currentPoints}`;
  countdownDiv.textContent = `0s`;

  saveBestScore(currentPoints);
  renderBestScore();

  // optional: disable +/-10 again if you want upgrades later
  // plusTenButton.disabled = true;
  // minusTenButton.disabled = true;
}

// =====================
// Timers
// =====================
function startSessionTimer() {
  clearInterval(sessionIntervalId);

  sessionIntervalId = setInterval(() => {
    sessionSecondsLeft -= 1;
    countdownDiv.textContent = `${sessionSecondsLeft}s`;

    if (sessionSecondsLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function startNewRound() {
  // generate a new target every round
  generateTargetRange();

  roundSecondsLeft = ROUND_LENGTH_SECONDS;
  renderTask();

  clearInterval(roundIntervalId);
  roundIntervalId = setInterval(() => {
    // if game ended mid-round, stop
    if (!isGameRunning) {
      clearInterval(roundIntervalId);
      return;
    }

    roundSecondsLeft -= 1;
    renderTask();

    if (roundSecondsLeft <= 0) {
      // check success at end of round
      if (count >= currentTargetMin && count <= currentTargetMax) {
        currentPoints += 1;
        currentPointsSpan.textContent = currentPoints;
      }

      // immediately start next round (as long as session still running)
      if (sessionSecondsLeft > 0) {
        startNewRound();
      }
    }
  }, 1000);
}

function renderTask() {
  currentTaskSpan.textContent =
    `Get between ${currentTargetMin} and ${currentTargetMax} (Round: ${roundSecondsLeft}s)`;
}

// =====================
// Target generation
// =====================
function generateTargetRange() {
  // simplest: pick a center near current count, random width
  const width = randomInt(4, 10);         // range size
  const center = count + randomInt(-20, 20);

  currentTargetMin = center - width;
  currentTargetMax = center + width;

  // optional: keep targets in a reasonable band
  // if you want only positive:
  // if (currentTargetMin < 0) { currentTargetMax += Math.abs(currentTargetMin); currentTargetMin = 0; }
}

function randomInt(min, max) {
  // inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =====================
// Best score (localStorage)
// =====================
function getBestScore() {
  const raw = localStorage.getItem(bestScoreKey);
  const num = Number(raw);
  return Number.isFinite(num) ? num : 0;
}

function saveBestScore(score) {
  const best = getBestScore();
  if (score > best) {
    localStorage.setItem(bestScoreKey, String(score));
  }
}

function renderBestScore() {
  // You currently only have "Top Scores:" text.
  // If you add <div id="best-score"></div> in HTML, you can display it here.
  // For now we’ll just log:
  console.log("Best score:", getBestScore());
}
