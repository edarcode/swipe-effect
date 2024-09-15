let isAnimate = false;
let deltaX = 0;

function startDrag(e) {
  if (isAnimate) return;
  const currentCard = e.target.closest("article");
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
  }

  function endMovement(e) {}
}

document.addEventListener("mousedown", startDrag);
document.addEventListener("touchstart", startDrag, { passive: true });
