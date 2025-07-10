// Section reveal on scroll
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach(s => s.style.opacity = 0);
  const revealSections = () => {
    const trigger = window.innerHeight * 0.8;
    document.querySelectorAll("section").forEach(s => {
      if (s.getBoundingClientRect().top < trigger) s.style.opacity = 1;
    });
  };
  window.addEventListener("scroll", revealSections);
  revealSections();
});

// Particle background
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
let particles = [], width, height;

function init() {
  resize();
  particles = Array.from({length: 100}, () => ({
    x: Math.random()*width,
    y: Math.random()*height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5,
  }));
  animate();
}

window.addEventListener("resize", resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function animate() {
  ctx.clearRect(0,0,width,height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>width) p.vx *= -1;
    if(p.y<0||p.y>height) p.vy *= -1;
    ctx.fillStyle = "#ccc";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
    ctx.fill();
  });
  // Draw lines between close particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j],
            dx=a.x-b.x, dy=a.y-b.y, d=dx*dx+dy*dy;
      if(d<10000){
        ctx.strokeStyle = `rgba(200,200,200,${1-d/10000})`;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

init();
