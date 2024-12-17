const gameContainer = document.getElementById("parentDiv");
const cardValues = [
  "🍏",
  "🍏",
  "WW",
  "WW",
  "RR",
  "RR",
  "TT",
  "TT",
  "CC",
  "CC",
  "QQ",
  "QQ",
  "GG",
  "GG",
  "LL",
  "LL",
];

// Shuffle function (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(cardValues);

// Create cards dynamically
cardValues.forEach((value) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.innerHTML = `<span class="hidden">${value}</span>`;
  gameContainer.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Flip card function
function flipCard(event) {
  if (lockBoard) return;
  const clickedCard = event.target;

  // Ignore if the card is already flipped or clicked again
  if (clickedCard === firstCard) return;

  clickedCard.classList.add("flipped");
  clickedCard.querySelector("span").classList.remove("hidden");

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    checkForMatch();
  }
}

// Check for card match
function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    firstCard.querySelector("span").classList.add("hidden");
    secondCard.classList.remove("flipped");
    secondCard.querySelector("span").classList.add("hidden");
    resetBoard();
  }, 1000);
}

// Reset the board
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Add click event listeners to all cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", flipCard);
});
