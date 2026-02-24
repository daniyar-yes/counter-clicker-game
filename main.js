let count = 0;

const plusOneButton = document.querySelector("#plus-one-btn");
const plusTenButton = document.querySelector("#plus-ten-btn");
const resetCountButton = document.querySelector("#reset-count-btn");
const totalCountSpan = document.querySelector("#counter")
totalCountSpan.textContent = count;

plusOneButton.addEventListener("click", (event) => {
  count = count + 1;
  console.log('count:', count);
  totalCountSpan.textContent = count;
});

plusTenButton.addEventListener("click", (event) => {
  count = count + 10;
  console.log('count:', count);
  totalCountSpan.textContent = count;
});

resetCountButton.addEventListener("click", (event) => {
  count = 0;
  console.log('count:', count);
  totalCountSpan.textContent = count;
});
