let timer;
let timeLeft = 25 * 60; // default Pomodoro
let running = false;

const timerDisplay = document.getElementById("timer");
const alarmSound = document.getElementById("alarm-sound");

function updateDisplay() {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${mins}:${secs}`;
}

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        running = false;
        alarmSound.play();
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  stopTimer();
  timeLeft = currentModeTime;
  updateDisplay();
}

function setMode(minutes) {
  stopTimer();
  timeLeft = minutes * 60;
  currentModeTime = timeLeft;
  updateDisplay();
}

// Initial time setup
let currentModeTime = timeLeft;
updateDisplay();

// Event listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

document.getElementById("short").addEventListener("click", () => setMode(5));
document.getElementById("long").addEventListener("click", () => setMode(15));
