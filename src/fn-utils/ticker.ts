/**
 * Handles events through requestAnimationFrame
 * Use for animation (on scroll)
 * @example
 *
 * window.addEventListener('scroll', ticker(runAnimation))
 */
export const ticker = (callback: FrameRequestCallback) => {
  let ticking = false;

  const update: FrameRequestCallback = (...args) => {
    callback(...args);
    ticking = false;
  };

  const requestTick = () => {
    if (ticking) return;
    requestAnimationFrame(update);
    ticking = true;
  };

  return requestTick;
};
