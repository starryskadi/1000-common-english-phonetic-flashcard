import { reactive, effect } from "./reactive.js";
import words from "./source.json";

// Create reactive state
const state = reactive({
  currentIndex: 0,
  isFlipped: false,
  usedIndices: [0], // Initialize with the first word
});

// DOM Elements
const flashcard = document.querySelector(".flashcard");
const wordElement = document.getElementById("word");
const translationElement = document.getElementById("translation");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const randomButton = document.getElementById("random");
const currentElement = document.getElementById("current");
const totalElement = document.getElementById("total");
const longManLink = document.getElementById("longman");
const youglishLink = document.getElementById("youglish");

// Initialize total count
totalElement.textContent = words.length;

// Function to get a random unused index
function getRandomUnusedIndex() {
  const availableIndices = Array.from(
    { length: words.length },
    (_, i) => i
  ).filter((i) => !state.usedIndices.includes(i));

  if (availableIndices.length === 0) {
    // If all words have been used, reset the used indices
    state.usedIndices = [];
    const newIndex = Math.floor(Math.random() * words.length);
    state.usedIndices.push(newIndex);
    return newIndex;
  }

  const randomIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return randomIndex;
}

// Effect to update the UI when state changes
effect(() => {
  const { currentIndex, isFlipped } = state;

  const currentWord = words[currentIndex].word;

  // Update word
  wordElement.textContent = currentWord;
  translationElement.textContent = words[currentIndex].phonetic;

  longManLink.href = `https://www.ldoceonline.com/dictionary/${currentWord}`;
  youglishLink.href = `https://youglish.com/pronounce/${currentWord}/english`;

  // Update progress
  https: currentElement.textContent = currentIndex + 1;

  // Update card flip state
  if (isFlipped) {
    flashcard.classList.add("flipped");
  } else {
    flashcard.classList.remove("flipped");
  }

  // Update button states
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === words.length - 1;
});

// Event Listeners
flashcard.addEventListener("click", () => {
  state.isFlipped = !state.isFlipped;
});

prevButton.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    state.isFlipped = false;
  }
});

nextButton.addEventListener("click", () => {
  if (state.currentIndex < words.length - 1) {
    state.currentIndex++;
    state.isFlipped = false;
  }
});

randomButton.addEventListener("click", () => {
  const randomIndex = getRandomUnusedIndex();
  state.currentIndex = randomIndex;
  state.usedIndices.push(randomIndex);
  state.isFlipped = false;
});

// Keyboard Navigation
document.addEventListener("keydown", (event) => {
  // Prevent default behavior for arrow keys and space
  if (["ArrowLeft", "ArrowRight", " "].includes(event.code)) {
    event.preventDefault();
  }

  switch (event.code) {
    case "ArrowLeft":
      if (state.currentIndex > 0) {
        state.currentIndex--;
        state.isFlipped = false;
      }
      break;
    case "ArrowRight":
      if (state.currentIndex < words.length - 1) {
        state.currentIndex++;
        state.isFlipped = false;
      }
      break;
    case "Space":
      const randomIndex = getRandomUnusedIndex();
      state.currentIndex = randomIndex;
      state.usedIndices.push(randomIndex);
      state.isFlipped = false;
      break;
  }
});
