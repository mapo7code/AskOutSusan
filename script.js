// Function to move the "No" button to a random position
function moveButton() {
    const noButton = document.getElementById("no-btn");
    const yesButton = document.getElementById("yes-btn");
    const container = document.querySelector(".container");

    let randomX, randomY;

    // Generate random positions within the container while ensuring the No button does not overlap with the Yes button
    do {
        randomX = Math.random() * (container.offsetWidth - noButton.offsetWidth);
        randomY = Math.random() * (container.offsetHeight - noButton.offsetHeight);
    } while (isOverlapping(randomX, randomY, noButton, yesButton));

    // Set the new position of the "No" button
    noButton.style.position = 'absolute';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
}

// Function to check if the No button overlaps with the Yes button
function isOverlapping(randomX, randomY, noButton, yesButton) {
    const yesRect = yesButton.getBoundingClientRect();
    const noRect = {
        left: randomX,
        top: randomY,
        right: randomX + noButton.offsetWidth,
        bottom: randomY + noButton.offsetHeight,
    };

    // Check for overlap
    return !(
        noRect.left > yesRect.right ||
        noRect.right < yesRect.left ||
        noRect.top > yesRect.bottom ||
        noRect.bottom < yesRect.top
    );
}

// Function to reset the Yes button size to normal
function resetYesButtonSize() {
    const yesButton = document.getElementById("yes-btn");
    yesButton.style.transform = 'scale(1)'; // Reset to normal size
}

// Function to increase the Yes button size
function increaseYesButtonSize() {
    const yesButton = document.getElementById("yes-btn");
    let currentScale = parseFloat(getComputedStyle(yesButton).transform.split(',')[3]) || 1;

    // Increase scale by a factor (e.g., 0.2)
    currentScale += 0.2;
    yesButton.style.transform = `scale(${currentScale})`;
}

// Function to make the Yes button shake
function shakeYesButton() {
    const yesButton = document.getElementById("yes-btn");
    yesButton.classList.add("shake"); // Add shake class

    // Remove shake class after animation ends to reset
    yesButton.addEventListener("animationend", () => {
        yesButton.classList.remove("shake");
    }, { once: true }); // Ensure it only runs once per click
}

// Event listener for the "Yes" button
document.getElementById("yes-btn").addEventListener("click", function () {
    // Display response and notes
    document.getElementById("response").textContent = "Yay! Can’t wait for our date!";
    document.getElementById("notes-section").style.display = "block";

    // Reset the Yes button size to normal
    resetYesButtonSize();

    // Shake the Yes button
    shakeYesButton();

    // Hide the "No" button
    document.getElementById("no-btn").style.display = "none"; // Hide the No button
});

// Event listener for the "No" button to move it when clicked
document.getElementById("no-btn").addEventListener("click", function () {
    moveButton();
    // Increase the size of the Yes button each time No is clicked
    increaseYesButtonSize();
});
