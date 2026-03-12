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
