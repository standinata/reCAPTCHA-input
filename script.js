const button = document.getElementById("verify-button");
const clearButton = document.getElementById("clear-button");
const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let hasDrawn = false; // Tracks if anything has been drawn
let verifyStep = 1; // Step tracking for verification clicks

// Function to enable/disable Verify button
function updateVerifyButton() {
    if (hasDrawn) {
        button.classList.add("active");
        button.classList.remove("inactive");
        button.style.cursor = "pointer";
        button.disabled = false;
    } else {
        button.classList.add("inactive");
        button.classList.remove("active");
        button.style.cursor = "not-allowed";
        button.disabled = true;
    }
}

// Ensure the canvas covers the entire drawing-box
function resizeCanvas() {
    const box = document.querySelector(".drawing-box");
    canvas.width = box.offsetWidth;
    canvas.height = box.offsetHeight;
}

// Resize on load & window resize
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Get mouse position relative to canvas
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Start drawing when mouse is pressed
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    const pos = getMousePos(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

// Draw as mouse moves
canvas.addEventListener("mousemove", (event) => {
    if (!isDrawing) return;
    const pos = getMousePos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();

    hasDrawn = true; // Mark that drawing has occurred
    canvas.style.outline = "solid 1px black"; // Reset canvas outline
    updateVerifyButton(); // Update Verify button state
});

// Stop drawing when mouse is released
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();
});

// Stop drawing if mouse leaves canvas
canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
});

// Function to reset the canvas
function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn = false;
    updateVerifyButton();
}

// Clear button event listener
clearButton.addEventListener("click", () => {
    resetCanvas();
    verifyStep = 1; // Reset verification steps
    canvas.style.outline = "solid 1px black"; // Reset canvas outline
});

// Verify button click event
button.addEventListener("click", () => {
    if (hasDrawn) {
        if (verifyStep === 1) {
            alert("Try again.");
            resetCanvas();
            canvas.style.outline = "solid 2px red"; // Set red outline
            verifyStep = 2;
        } else if (verifyStep === 2) {
            alert("Verification successful!");
            window.location.href = "next-page.html"; // Change this to your next page URL
        }
    }
});
