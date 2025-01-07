let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const CIRCLE_RADIUS = 140;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function initializeProgressRing() {
  const circle = document.querySelector(".progress-ring__circle");
  circle.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;
  circle.style.strokeDashoffset = "0";
}

function updateProgress() {
  const circle = document.querySelector(".progress-ring__circle");
  const totalTime = isWorkTime ? 25 * 60 : 5 * 60;
  const progress = timeLeft / totalTime;
  const offset = CIRCLE_CIRCUMFERENCE * (1 - progress);
  circle.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;
  circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Update timer display
  document.getElementById("timer").textContent = timeString;

  // Update page title with timer and mode
  document.title = `${timeString} - ${
    isWorkTime ? "Work" : "Break"
  } | Pomodoro Timer`;

  // Update progress ring
  updateProgress();
}

function startTimer() {
  if (timerId === null) {
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft === 0) {
        clearInterval(timerId);
        timerId = null;

        // Toggle between work and break
        isWorkTime = !isWorkTime;
        timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
        document.getElementById("status").textContent = isWorkTime
          ? "Work Time!"
          : "Break Time!";

        // Play notification sound
        alert("Time is up!");
        updateDisplay();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isWorkTime = true;
  timeLeft = 25 * 60;
  document.getElementById("status").textContent = "Work Time!";
  updateDisplay();
  updateProgress();
}

function toggleMode() {
  // Stop the current timer
  clearInterval(timerId);
  timerId = null;

  // Toggle between work and break
  isWorkTime = !isWorkTime;
  timeLeft = isWorkTime ? 25 * 60 : 5 * 60;

  // Update the status text
  document.getElementById("status").textContent = isWorkTime
    ? "Work Time!"
    : "Break Time!";

  // Update the display
  updateDisplay();
  updateProgress();
}

function initializeTheme() {
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggle(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
  const toggle = document.getElementById("theme-toggle");
  toggle.querySelector(".theme-toggle-icon").textContent =
    theme === "dark" ? "☀️" : "🌙";
}

// Add event listener for theme toggle
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
});

initializeProgressRing();
