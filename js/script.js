(() => {
  const eyeEl = document.getElementById("eye");
  const eyePos = eyeEl.getBoundingClientRect();

  const cx = +eyeEl.getAttribute("cx");
  const cy = +eyeEl.getAttribute("cy");

  let mouseTimer;
  addEventListener("mousemove", e => {
    clearTimeout(mouseTimer);

    let dx = e.clientX - eyePos.x - eyePos.width / 2;
    let dy = e.clientY - eyePos.y - eyePos.height / 2;
    let rad = Math.atan2(dy, dx);

    eyeEl.setAttribute("cx", 4 * Math.cos(rad) + cx);
    eyeEl.setAttribute("cy", 5 * Math.sin(rad) + cy);

    mouseTimer = setTimeout(() => {
      eyeEl.setAttribute("cx", cx);
      eyeEl.setAttribute("cy", cy);
    }, 500);
  });
})();
