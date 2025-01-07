let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Update timer display
  document.getElementById("timer").textContent = timeString;

  // Update page title with timer and mode
  const mode = isWorkTime ? "Work" : "Break";
  document.title = `${timeString} - ${mode} | Pomodoro Timer`;
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
}
