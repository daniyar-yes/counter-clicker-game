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

let currentPlayerName = "";

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
// no longer use single current-task span; we have separate elements for range and round
// const currentTaskSpan = document.querySelector("#current-task");
const countdownDiv = document.querySelector("#countdown");

const startBtn = document.querySelector("#start-btn");
const time30Btn = document.querySelector("#time-30-btn");
const time60Btn = document.querySelector("#time-60-btn");
const submitBtn = document.querySelector("#submit-btn");
const pauseBtn = document.querySelector("#pause-btn");
const playerNameInput = document.querySelector("#player-name");

// shop buttons
const buyPlusTenBtn = document.querySelector("#buy-plus-ten");
const buyMinusTenBtn = document.querySelector("#buy-minus-ten");
const buyPlusHundredBtn = document.querySelector("#buy-plus-hundred");
const buyMinusHundredBtn = document.querySelector("#buy-minus-hundred");

// Empty name sign objects
const emptyNameWarning = document.querySelector('#empty-name-warning')
const emptyWarning1 = document.querySelector('#empty-warning-1')
const emptyWarning2 = document.querySelector('#empty-warning-2')
const nameBorder = document.querySelector('#name-border')

// =====================
// Init UI
// =====================
totalCountSpan.textContent = count;
currentPointsSpan.textContent = currentPoints;

const bestScoreKey = "bestScoreList"; // we'll store JSON array here
renderBestScore();

// disable plus/minus ten until bought
plusTenButton.disabled = true;
minusTenButton.disabled = true;

// pause button initially disabled until game is running
pauseBtn.disabled = true;

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
  const rangeEl = document.querySelector("#task-range");
  const roundEl = document.querySelector("#task-round");
  if (rangeEl) rangeEl.textContent = "Selected: 30s. Press Start.";
  if (roundEl) roundEl.textContent = "";
});

time60Btn.addEventListener("click", () => {
  if (isGameRunning) return;
  selectedTimeLength = 60;
  const rangeEl = document.querySelector("#task-range");
  const roundEl = document.querySelector("#task-round");
  if (rangeEl) rangeEl.textContent = "Selected: 60s. Press Start.";
  if (roundEl) roundEl.textContent = "";
});

// Start button will be disabled and the player name input will be with red borders and a placeholder stating add a name please

 startBtn.disabled = true
  playerNameInput.addEventListener('blur', () => {
    if (playerNameInput.value ==="") {
    // emptyNameWarning.style.
    emptyWarning1.textContent = '!'
    emptyWarning1.style.borderWidth = '1px'
    emptyWarning2.textContent = ' Enter a name'
    nameBorder.style.borderWidth = '1px'
  } else if (playerNameInput !== "") {
    startBtn.disabled = false
    emptyWarning1.textContent = ''
    emptyWarning1.style.borderWidth = '0'
    emptyWarning2.textContent = ''
    nameBorder.style.borderWidth = '0'
  }
  })
  
function nameWarningSignOn() {
  emptyWarning1.textContent = '!'
    emptyWarning1.style.borderWidth = '1px'
    emptyWarning2.textContent = ' Enter a name'
    nameBorder.style.borderWidth = '1px'
}
function nameWarningSignOff() {
  startBtn.disabled = false
    emptyWarning1.textContent = ''
    emptyWarning1.style.borderWidth = '0'
    emptyWarning2.textContent = ''
    nameBorder.style.borderWidth = '0'
}

