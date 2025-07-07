let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer;

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

function updateDisplay() {
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    document.getElementById("milliseconds").textContent = String(milliseconds).padStart(2, '0');
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            milliseconds++;
            if (milliseconds >= 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 10);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;

    const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    
    // Add to display
    const log = document.getElementById("time-log");
    const li = document.createElement("li");
    li.textContent = time;
    log.appendChild(li);

    // Send to PHP
    fetch('save_log.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'time=' + encodeURIComponent(time)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    hours = minutes = seconds = milliseconds = 0;
    updateDisplay();
    document.getElementById("time-log").innerHTML = '';
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

