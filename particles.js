const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let mouse = { x: null, y: null };
const PARTICLE_COUNT = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor(x, y, size, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.size * 5;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
    }

    update() {
        // Interactivity with mouse
        if (mouse.x !== null && mouse.y !== null) {
            let distanceX = mouse.x - this.x;
            let distanceY = mouse.y - this.y;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            let force = 0.5 / distance;
            let directionX = distanceX * force;
            let directionY = distanceY * force;
            
            if (distance < 100) {
                this.dx -= directionX;
                this.dy -= directionY;
            } else {
                this.dx *= 0.98;
                this.dy *= 0.98;
            }
        }
        
        // Return to normal speed if repelled
        if (Math.abs(this.dx) > 0.8) this.dx = Math.sign(this.dx) * 0.8;
        if (Math.abs(this.dy) > 0.8) this.dy = Math.sign(this.dy) * 0.8;

        this.x += this.dx;
        this.y += this.dy;

        // Bounce off edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

function init() {
    particlesArray = [];
    // Get colors from CSS root variables
    const style = getComputedStyle(document.body);
    const colors = [style.getPropertyValue('--accent-color-1'), style.getPropertyValue('--accent-color-2'), style.getPropertyValue('--accent-color-3')];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 0.8;
        let dy = (Math.random() - 0.5) * 0.8;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, size, dx, dy, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();