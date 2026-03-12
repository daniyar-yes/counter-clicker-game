// boost ownership state
let boosts = {
  plusTen: false,
  minusTen: false,
  plusHundred: false,
  minusHundred: false,
};

// =====================
// Start / Stop
// =====================

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
