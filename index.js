let isAnimate = false;
let deltaX = 0;
const BREAKPOINT = 75;

function startDrag(e) {
  if (isAnimate) return;
  const currentCard = e.target.closest("article");

  if (!currentCard) return;

  const startPos = e.pageX ?? e.touches[0].pageX;

  document.addEventListener("mousemove", moving);
  document.addEventListener("mouseup", endMovement);

  document.addEventListener("touchmove", moving, { passive: true });
  document.addEventListener("touchend", endMovement, { passive: true });

  function moving(e) {
    const currentPos = e.pageX ?? e.touches[0].pageX;
    deltaX = currentPos - startPos;

    if (deltaX == 0) return;

    isAnimate = true;
    const deg = deltaX / 10;
    currentCard.style.transform = `translateX(${deltaX}px) rotate(${deg}deg)`;
    currentCard.style.cursor = "grabbing";
    const choiceElement =
      deltaX > 0
        ? currentCard.querySelector(".choice.like")
        : currentCard.querySelector(".choice.nope");
    const totalOpacity = Math.abs(deltaX) / 100;
    choiceElement.style.opacity = totalOpacity;
  }

  function endMovement(e) {
    document.removeEventListener("mousemove", moving);
    document.removeEventListener("mouseup", endMovement);

    document.removeEventListener("touchmove", moving, { passive: true });
    document.removeEventListener("touchend", endMovement, { passive: true });

    if (Math.abs(deltaX) >= BREAKPOINT) {
      const isMovingRight = deltaX >= 0;
      currentCard.classList.add(isMovingRight ? "go_right" : "go_left");

      currentCard.addEventListener("transitionend", () => {
        currentCard.remove();
      });
    } else {
      currentCard.classList.remove("go_right", "go_left");
      currentCard.classList.add("reset");
      const choiceElements = currentCard.querySelectorAll(".choice");
      choiceElements.forEach((choice) => {
        choice.style.opacity = 0;
      });
    }

    currentCard.addEventListener("transitionend", () => {
      currentCard.removeAttribute("style");
      currentCard.classList.remove("reset");

      deltaX = 0;
      isAnimate = false;
    });
  }
}

document.addEventListener("mousedown", startDrag);
document.addEventListener("touchstart", startDrag, { passive: true });
