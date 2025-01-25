document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: 0, y: 0 };
    const lastMouse = { x: 0, y: 0 };
    const particles = [];
    const particleCount = 100;
    const particleSize = 5;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.size = Math.random() * particleSize + 1;
            this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        }

        update() {
            this.angle += 0.1;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let particle of particles) {
            particle.update();
            particle.draw();

            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particle.color;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }

        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    animate();
});

