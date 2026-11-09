const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "data:,";
document.head.appendChild(favicon);

// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settings-btn");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north"
];

// Initial game state
let randomWord;
let score = 0;
let time = 10;
let difficulty = "easy";

// PART 1: Function to get random word from words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// PART 1: Function addWordToDOM to update element with a random item
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// PART 1: Function updateScore to increment score by +1
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// PART 2: Function updateTime decrementing timer by -1
function updateTime() {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// PART 2: setInterval running every 1 second
const timeInterval = setInterval(updateTime, 1000);

// PART 2: gameOver function to display end-game-container
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endgameEl.style.display = "flex";
}

// Display the first word on load
addWordToDOM();

// PART 1: Event listener on text element
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Reset input to empty string
    e.target.value = "";

    // Increment time based on difficulty (Part 3) or default 5s
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// PART 3 (OPTIONAL): Settings button to toggle menu
if (settingsBtn && settings) {
  settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
  });
}

// PART 3 (OPTIONAL): Difficulty select dropdown
if (difficultySelect) {
  difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
  });
}