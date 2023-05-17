const eyeEl = document.getElementById("eye");
const eyePos = eyeEl.getBoundingClientRect();

const cx = +eyeEl.getAttribute("cx");
const cy = +eyeEl.getAttribute("cy");
let dx, dy, rad;
let mouseTimer;

addEventListener("mousemove", e => {
  clearTimeout(mouseTimer);

  dx = e.clientX - eyePos.x - eyePos.width / 2;
  dy = e.clientY - eyePos.y - eyePos.height / 2;
  rad = Math.atan2(dy, dx);

  eyeEl.setAttribute("cx", 4 * Math.cos(rad) + cx);
  eyeEl.setAttribute("cy", 5 * Math.sin(rad) + cy);

  mouseTimer = setTimeout(() => {
    eyeEl.setAttribute("cx", cx);
    eyeEl.setAttribute("cy", cy);
  }, 500);
});
