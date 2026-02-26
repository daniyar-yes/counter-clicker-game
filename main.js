// This is our main state: count
// it's best to define the variables (or states) early on in code for 2 reasons:
// 1st: ensuring that the variable is available to your JS code before it's read (used)
// NOTE: please read about Hoisting: https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
// 2nd: to ensure the intentional and easy-to-read and understand style of code, DISTINCTS NAMES (to avoid confusion)
// example of confusing name: `moveLeft()`; example of a distinct and explicit name: `collapseHideButtonInHeaderMenuToTheLeft()`

// or improved good example (pseudo-code):

// function collapseHideButton(direction) {}
// function headerMenuAdjustment(direction) {
//    collapseHideButton(direction)
// }
// headerMenuAdjustment('left')

// it used to be important to make your code easy to digest by other developers when they need to update your code
// that 'other developer' can be You - just in a few months from now
// nowadays, you write code (using AI/LLM) that another AI will be reading
// it could be your AI working on a new task, or other developers' AI agents
// important: AI skims through the whole file whenever it tries to understand even a small bug.

// console.log as a function itself has a higher priority in the queue for executing
// sync/async functions, sync function execute first, console.log is sync function, fires immediately


// TODO: add an actual game mechanics - how to win, or how to even score anything
// some conditions (if, else, switch cases) for scoring
// conditions for winning
// mechanics themselves (how to play, score)
// the result: what is a victory and what do we show on victory.

// adding a timer that will show like:
// enter a number within the range: 450 to 677 (expected count range)
// and it gives you like 10 seconds (any interval) to get there - per 1 step
// after which the function that checks/compares current count with the expected count range is fired
// if the number is within the range, the user gets 1 point
// victory condition: to score 3 points - or to get the highest point withint the game's main time limit

// goal: get the highest score possible
// challenge: 60 seconds - main larger counter for the whole game session

// progression - leveling up, using points they obtained to buy enhancements:
// +1000 button should not be available by default, but bought from inventory
// maybe initially the available buttons will be only +1, -1
// the cheapest enhancement will cost 1 point (+10, -10)

// always show current score
// show the best score in the localstorage even after refresh - highest scores ever

// we need a start button for the game session, that will launch a longer timer (60s, or 30s)
// each iteration - number to get on the counter, will be limited by a smaller time.

// TODO: definitely later: leaderboard (for localstorage) and user names (enter name before the game)

const COUNT_INITIAL_STATE = 0;
const CURRENT_POINTS_INITIAL_VALUE = 0;

let count = COUNT_INITIAL_STATE;
let finalScore;
let currentPoints = CURRENT_POINTS_INITIAL_VALUE;
let selectedTimeLength;
let isGameRunning = false;




const plusOneButton = document.querySelector("#plus-one-btn");
const minusOneButton = document.querySelector("#minus-one-btn");

const plusTenButton = document.querySelector("#plus-ten-btn");
const resetCountButton = document.querySelector("#reset-count-btn");
const totalCountSpan = document.querySelector("#counter")
totalCountSpan.textContent = count;

plusOneButton.addEventListener("click", (event) => {
  count = count + 1;
  totalCountSpan.textContent = count;
});

minusOneButton.addEventListener("click", (event) => {
  count = count - 1;
  totalCountSpan.textContent = count;
});

plusTenButton.addEventListener("click", (event) => {
  count = count + 10;
  totalCountSpan.textContent = count;
});

resetCountButton.addEventListener("click", (event) => {
  count = COUNT_INITIAL_STATE;
  totalCountSpan.textContent = count;
});

function captureFinalScore(currentScore) {
  finalScore = currentScore;
  console.log(finalScore)
  // break the game loop
}
// non-functional yet timer
setTimeout(captureFinalScore(currentPoints), 60 * 1000);


// below is a good example of intentional function naming, and internal
// transitionary variable 'sum' naming.
// could have been replaced by simply { return a + b + c; }

// function calculateTheSumOfInput(a,b,c) {
//   let sum = a + b + c;
//   return sum;
// }
