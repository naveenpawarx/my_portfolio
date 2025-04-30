// script.js

// Matrix rain effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    // Black background with slight opacity for fading effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px VT323, monospace';

    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it goes beyond the screen height
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Call drawMatrix at intervals for animation
setInterval(drawMatrix, 50);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
});

// Typing effect for intro text
const introElement = document.getElementById('intro-text');
const introText = "Hello, I'm Naveen Pawar, a Cybersecurity Enthusiast.";
let idx = 0;

function typeWriter() {
    if (idx < introText.length) {
        introElement.textContent += introText.charAt(idx);
        idx++;
        setTimeout(typeWriter, 100);
    } else {
        // Add glow effect class once typing is complete
        introElement.classList.add('glow');
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    introElement.textContent = '';
    typeWriter();
});
