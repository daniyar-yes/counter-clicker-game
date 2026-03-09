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
const emptyNameWarning = document.querySelector('#empty-name-warning')
const emptyWarning1 = document.querySelector('#empty-warning-1')
const emptyWarning2 = document.querySelector('#empty-warning-2')
const nameBorder = document.querySelector('#name-border')

// boost ownership state
let boosts = {
  plusTen: false,
  minusTen: false,
  plusHundred: false,
  minusHundred: false,
};

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


// =====================
// Start / Stop
// =====================
startBtn.addEventListener("click", () => {
  if (playerNameInput.value.trim() === "") {  // Checks the input value
    nameWarningSignOn();
    return;  // Prevents starting the game
  } else {
    nameWarningSignOff();  // Clear warnings if name is provided
  }
  if (isGameRunning) return;
  startGame();
});

pauseBtn.addEventListener("click", () => {
  if (isGameRunning) {
    pauseGame();
  } else {
    resumeGame();
  }
});

// shop purchase helpers
function buyBoost(boostKey, cost, onPurchase) {
  if (boosts[boostKey]) return; // already bought
  if (currentPoints < cost) {
    alert(`Not enough points to buy ${boostKey} (cost ${cost}).`);
    return;
  }
  currentPoints -= cost;
  currentPointsSpan.textContent = currentPoints;
  boosts[boostKey] = true;
  if (onPurchase) onPurchase();
}

buyPlusTenBtn.addEventListener("click", () => {
  buyBoost("plusTen", 10, () => {
    plusTenButton.disabled = false;
    buyPlusTenBtn.disabled = true;
  });
});

buyMinusTenBtn.addEventListener("click", () => {
  buyBoost("minusTen", 10, () => {
    minusTenButton.disabled = false;
    buyMinusTenBtn.disabled = true;
  });
});

buyPlusHundredBtn.addEventListener("click", () => {
  buyBoost("plusHundred", 50, () => {
    // add a new +100 button to counter row
    const btn = document.createElement("button");
    btn.textContent = "+100";
    btn.addEventListener("click", () => {
      if (!canPlay()) return;
      count += 100;
      totalCountSpan.textContent = count;
    });
    document.querySelector(".main-counter-row").appendChild(btn);
    buyPlusHundredBtn.disabled = true;
  });
});

buyMinusHundredBtn.addEventListener("click", () => {
  buyBoost("minusHundred", 50, () => {
    const btn = document.createElement("button");
    btn.textContent = "-100";
    btn.addEventListener("click", () => {
      if (!canPlay()) return;
      count -= 100;
      totalCountSpan.textContent = count;
    });
    document.querySelector(".main-counter-row").appendChild(btn);
    buyMinusHundredBtn.disabled = true;
  });
});

// =====================
// Early submit (player can finish a round before timer expires)
// =====================
submitBtn.addEventListener("click", () => {
  if (!canPlay()) return;
  scoreAndContinue();
});

function scoreAndContinue() {
  // award point if count falls in current target
  if (count >= currentTargetMin && count <= currentTargetMax) {
    currentPoints += 1;
    currentPointsSpan.textContent = currentPoints;
  } else {
    currentPoints = currentPoints - 1;
    currentPointsSpan.textContent = currentPoints;
  }

  // cancel current countdown and start next round immediately if time remains
  clearInterval(roundIntervalId);
  if (sessionSecondsLeft > 0 && isGameRunning) {
    startNewRound();
  }
}

function startGame() {
  isGameRunning = true;

  // reset round + score + count (simple version)
  count = COUNT_INITIAL_STATE;
  currentPoints = CURRENT_POINTS_INITIAL_VALUE;
  totalCountSpan.textContent = count;
  currentPointsSpan.textContent = currentPoints;

  // enable +/-10 if already bought
  plusTenButton.disabled = !boosts.plusTen;
  minusTenButton.disabled = !boosts.minusTen;

  sessionSecondsLeft = selectedTimeLength;
  countdownDiv.textContent = `${sessionSecondsLeft}s`;

  // allow pause now that game has started
  pauseBtn.disabled = false;

  startSessionTimer();
  startNewRound();
}

function endGame() {
  isGameRunning = false;

  clearInterval(sessionIntervalId);
  clearInterval(roundIntervalId);
  sessionIntervalId = null;
  roundIntervalId = null;

  // show result in the task area
  const rangeEl = document.querySelector("#task-range");
  const roundEl = document.querySelector("#task-round");
  if (rangeEl) rangeEl.textContent = `Game over! Final score: ${currentPoints}`;
  if (roundEl) roundEl.textContent = "";
  countdownDiv.textContent = `0s`;

  saveScore(currentPlayerName || "Player", currentPoints);
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

function startRoundTimer() {
  clearInterval(roundIntervalId);

  roundIntervalId = setInterval(() => {
    if (!isGameRunning) {
      clearInterval(roundIntervalId);
      return;
    }

    roundSecondsLeft -= 1;
    renderTask();

    if (roundSecondsLeft <= 0) {
      // score round
      if (count >= currentTargetMin && count <= currentTargetMax) {
        currentPoints += 1;
        currentPointsSpan.textContent = currentPoints;
      }
      if (sessionSecondsLeft > 0) {
        startNewRound();
      }
    }
  }, 1000);
}

function pauseGame() {
  if (!isGameRunning) return;
  isGameRunning = false;
  clearInterval(sessionIntervalId);
  clearInterval(roundIntervalId);
  pauseBtn.textContent = "Resume";
}

function resumeGame() {
  if (isGameRunning) return;
  isGameRunning = true;
  pauseBtn.textContent = "Pause";
  startSessionTimer();
  // resume current round without resetting it
  startRoundTimer();
}

function startNewRound() {
  // if the player hasn't provided a name yet, ask once at the start of the
  // session so we can record it with the top score.  Using an <input> field
  // on the page is more pleasant than prompt(), but we fall back to prompt()
  // if the field is empty.
  if (!currentPlayerName) {
    currentPlayerName = playerNameInput.value.trim() || prompt("Enter your name", "Player") || "Player";
    playerNameInput.value = currentPlayerName;
  }

  // start a new round: clear old timer and reset counter
  clearInterval(roundIntervalId);
  count = COUNT_INITIAL_STATE;
  totalCountSpan.textContent = count;

  generateTargetRange();
  roundSecondsLeft = ROUND_LENGTH_SECONDS;
  renderTask();

  startRoundTimer();
}

function renderTask() {
  const rangeEl = document.querySelector("#task-range");
  const roundEl = document.querySelector("#task-round");
  if (rangeEl) rangeEl.textContent = `Get between ${currentTargetMin} and ${currentTargetMax}`;
  if (roundEl) roundEl.textContent = `Round: ${roundSecondsLeft}s`;
}

// =====================
// Target generation
// =====================
// We keep the previous range so that we can avoid giving the player the
// same or heavily overlapping range two rounds in a row.  A simple "no
// overlap" rule is enough for a student project.
let prevTargetMin = null;
let prevTargetMax = null;

function generateTargetRange() {
  let width, center;
  do {
    width = randomInt(4, 10); // range size
    center = count + randomInt(-20, 20);

    currentTargetMin = center - width;
    currentTargetMax = center + width;

    // ensure we stay in a reasonable band (optional)
    // if (currentTargetMin < 0) { currentTargetMax += Math.abs(currentTargetMin); currentTargetMin = 0; }

    // repeat if this new range would overlap the previous one
  } while (
    prevTargetMin !== null &&
    currentTargetMin <= prevTargetMax &&
    currentTargetMax >= prevTargetMin
  );

  // remember for the next call
  prevTargetMin = currentTargetMin;
  prevTargetMax = currentTargetMax;
}

function randomInt(min, max) {
  // inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =====================
// High scores (name + score list stored in localStorage)
// =====================
function getScoreList() {
  const raw = localStorage.getItem(bestScoreKey);
  if (!raw) return [];
  try {
    const list = JSON.parse(raw);
    if (Array.isArray(list)) return list;
  } catch (e) {
    // ignore
  }
  return [];
}

function saveScore(name, score) {
  const list = getScoreList();
  list.push({ name, score });
  list.sort((a, b) => b.score - a.score);
  list.splice(5); // keep top 5
  localStorage.setItem(bestScoreKey, JSON.stringify(list));
}

function renderBestScore() {
  const container = document.querySelector("#best-score");
  if (!container) return;
  const list = getScoreList();
  if (list.length === 0) {
    container.textContent = "(no scores yet)";
    return;
  }
  const ol = document.createElement("ol");
  list.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    ol.appendChild(li);
  });
  container.innerHTML = "";
  container.appendChild(ol);
}
