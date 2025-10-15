const canvas = document.getElementById("shaderCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arka plan görseli
const bgImage = new Image();
bgImage.src = 'https://i.imgur.com/6kYQZQx.jpg'; // Minecraft ormanı

// Particles (ışıklı tozlar)
const particles = [];
const colors = ["rgba(0,255,0,0.3)", "rgba(0,200,0,0.2)", "rgba(255,255,255,0.1)"];

// Yaprak benzeri katmanlar
const leaves = [];
const leafColors = ["rgba(34,139,34,0.15)", "rgba(50,205,50,0.1)", "rgba(0,100,0,0.12)"];

function createParticles() {
    for(let i=0;i<300;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            radius: Math.random()*3+1,
            dx: (Math.random()-0.5)*0.6,
            dy: (Math.random()-0.5)*0.6,
            color: colors[Math.floor(Math.random()*colors.length)]
        });
    }
}

function createLeaves() {
    for(let i=0;i<100;i++){
        leaves.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            radius: Math.random()*10+5,
            dx: (Math.random()-0.5)*0.2,
            dy: (Math.random()*0.3),
            color: leafColors[Math.floor(Math.random()*leafColors.length)]
        });
    }
}

function drawLeaves() {
    leaves.forEach(l=>{
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.radius, 0, Math.PI*2);
        ctx.fillStyle = l.color;
        ctx.fill();
        l.x += l.dx;
        l.y += l.dy;

        if(l.y > canvas.height) {
            l.y = -10;
            l.x = Math.random()*canvas.width;
        }
        if(l.x < 0 || l.x > canvas.width) l.dx*=-1;
    });
}

function drawParticles() {
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x<0||p.x>canvas.width)p.dx*=-1;
        if(p.y<0||p.y>canvas.height)p.dy*=-1;
    });
}

function drawShaderWaves(time) {
    const waveCount = 5;
    for(let i=0;i<waveCount;i++){
        ctx.beginPath();
        ctx.moveTo(0, canvas.height/2);
        for(let x=0;x<canvas.width;x+=10){
            const y = canvas.height/2 + Math.sin((x*0.01)+(time*0.002)+i) * 20;
            ctx.lineTo(x,y);
        }
        ctx.strokeStyle = `rgba(0,255,0,0.05)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function animate(time){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    drawLeaves();
    drawParticles();
    drawShaderWaves(time);
    requestAnimationFrame(animate);
}

bgImage.onload = ()=>{
    createParticles();
    createLeaves();
    animate(0);
}

// Join button
document.getElementById("joinBtn").addEventListener("click", ()=>{
    alert("Welcome to MyMachSMP!");
});

// Responsive canvas
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
