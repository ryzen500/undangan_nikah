// Set the target date and time for the countdown
const targetDate = new Date("2024-06-30T10:00:00"); // Example: New Year's Eve 2024

// Function to update the countdown timer
function updateCountdown() {
    const now = new Date(); // Current date and time
    const timeDifference = targetDate - now; // Time difference in milliseconds

    if (timeDifference <= 0) {
        document.getElementById("timer").innerText = "Event has started!";
        return; // Exit if the countdown is over
    }

    // Convert the time difference to days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the HTML elements with the calculated time
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

// Call updateCountdown every second to keep the countdown updated
setInterval(updateCountdown, 1000);
