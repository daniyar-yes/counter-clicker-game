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
