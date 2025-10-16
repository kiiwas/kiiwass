// Disable DevTools Protection
// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
    }
});

// Detect DevTools
(function() {
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    }
    const checkDevTools = setInterval(function() {
        console.log(devtools);
        console.clear();
    }, 1000);
})();

// Space Animation
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

// Star class
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkling effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity <= 0.2 || this.opacity >= 1) {
            this.twinkleDirection *= -1;
        }
    }

    draw() {
        // Main star
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect to all stars
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${this.opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Shooting Star class
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height / 2;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.5;
        this.opacity = 1;
        this.angle = Math.PI / 4; // 45 degrees
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.015;

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        const gradient = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }

    shootingStars = [];
    for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Update and draw shooting stars
    shootingStars.forEach(shootingStar => {
        shootingStar.update();
        shootingStar.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize
resizeCanvas();
animate();

window.addEventListener('resize', resizeCanvas);

// Future JavaScript code for interactivity will go here.

document.getElementById('discord-copy').addEventListener('click', function(event) {
    event.preventDefault();
    const discordLink = this;
    navigator.clipboard.writeText('kiiwas').then(() => {
        const discordText = discordLink.querySelector('.discord-text');
        const originalText = discordText.textContent;
        
        discordLink.classList.add('is-copying');
        // Change text to "kiiwas - Copied!"
        discordText.textContent = 'kiiwas - Copied!';
        
        // Revert back to original text after 2 seconds
        setTimeout(() => {
            discordText.textContent = originalText;
            discordLink.classList.remove('is-copying');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

// Genel link yÃ¶nlendirici
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-href]');
    if (link) {
        e.preventDefault();
        window.open(link.dataset.href, '_blank');
    }
});