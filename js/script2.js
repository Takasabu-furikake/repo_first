(() => {
  const leftPupilEl = document.getElementById("leftPupil");
  const rightPupilEl = document.getElementById("rightPupil");
  const leftEyelidEL = document.getElementById("leftEyelid");
  const rightEyelidEL = document.getElementById("rightEyelid");

  const email = document.getElementById("email");
  const emailStyle = getComputedStyle(email);
  const password = document.getElementById("password");

  const cx = +leftPupilEl.getAttribute("cx");
  const cy = +leftPupilEl.getAttribute("cy");

  let rightEyePos = rightPupilEl.getBoundingClientRect();
  let rightEyeCx = rightEyePos.x + rightEyePos.width / 2;
  let rightEyeCy = rightEyePos.y + rightEyePos.height / 2;
  let leftEyePos = leftPupilEl.getBoundingClientRect();
  let leftEyeCx = leftEyePos.x + leftEyePos.width / 2;
  let leftEyeCy = leftEyePos.y + leftEyePos.height / 2;

  window.addEventListener("resize", () => {
    rightEyePos = rightPupilEl.getBoundingClientRect();
    rightEyeCx = rightEyePos.x + rightEyePos.width / 2;
    rightEyeCy = rightEyePos.y + rightEyePos.height / 2;
    leftEyePos = leftPupilEl.getBoundingClientRect();
    leftEyeCx = leftEyePos.x + leftEyePos.width / 2;
    leftEyeCy = leftEyePos.y + leftEyePos.height / 2;
  });

  email.addEventListener("input", moveEyes);
  email.addEventListener("focus", moveEyes);
  email.addEventListener("blur", () => {
    rightPupilEl.setAttribute("cx", cx);
    rightPupilEl.setAttribute("cy", cy);

    leftPupilEl.setAttribute("cx", cx);
    leftPupilEl.setAttribute("cy", cy);
  });

  password.addEventListener("focus", () => {
    leftEyelidEL.setAttribute("stroke-opacity", 1);
    rightEyelidEL.setAttribute("stroke-opacity", 1);

    rightPupilEl.setAttribute("stroke-opacity", 0);
    leftPupilEl.setAttribute("stroke-opacity", 0);
  });
  password.addEventListener("blur", () => {
    leftEyelidEL.setAttribute("stroke-opacity", 0);
    rightEyelidEL.setAttribute("stroke-opacity", 0);

    rightPupilEl.setAttribute("stroke-opacity", 1);
    leftPupilEl.setAttribute("stroke-opacity", 1);
  });

  function moveEyes(e) {
    const span = document.createElement("span");
    const div = document.createElement("div");

    [].forEach.call(emailStyle, function (prop) {
      div.style[prop] = emailStyle[prop];
    });
    div.style.position = "absolute";

    div.textContent = e.target.value;
    span.textContent = ".";
    document.body.appendChild(div);
    div.appendChild(span);

    const emailPos = email.getBoundingClientRect();
    const caretPos = span.getBoundingClientRect();

    const dx = emailPos.x + caretPos.x;
    const dy = emailPos.y + email.clientHeight / 2;
    const rightRad = Math.atan2(dy - rightEyeCy, dx - rightEyeCx);
    const leftRad = Math.atan2(dy - leftEyeCy, dx - leftEyeCx);

    rightPupilEl.setAttribute("cx", 43 * Math.cos(rightRad) + cx);
    rightPupilEl.setAttribute("cy", 43 * Math.sin(rightRad) + cy);
    leftPupilEl.setAttribute("cx", 43 * Math.cos(leftRad) + cx);
    leftPupilEl.setAttribute("cy", 43 * Math.sin(leftRad) + cy);

    document.body.removeChild(div);
  }
})();
