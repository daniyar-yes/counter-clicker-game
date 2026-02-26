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


const COUNT_INITIAL_STATE = 0;

let count = COUNT_INITIAL_STATE;



const plusOneButton = document.querySelector("#plus-one-btn");
const plusTenButton = document.querySelector("#plus-ten-btn");
const resetCountButton = document.querySelector("#reset-count-btn");
const totalCountSpan = document.querySelector("#counter")
totalCountSpan.textContent = count;

plusOneButton.addEventListener("click", (event) => {
  count = count + 1;
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


// below is a good example of intentional function naming, and internal
// transitionary variable 'sum' naming.
// could have been replaced by simply { return a + b + c; }

// function calculateTheSumOfInput(a,b,c) {
//   let sum = a + b + c;
//   return sum;
// }
