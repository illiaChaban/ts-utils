/**
 * Handles events through requestAnimationFrame
 * Use for animation (on scroll)
 * @example
 *
 * window.addEventListener('scroll', ticker(runAnimation))
 */
// export const ticker = (callback: FrameRequestCallback) => {
//   let ticking = false;

//   const update: FrameRequestCallback = (...args) => {
//     callback(...args);
//     ticking = false;
//   };

//   const requestTick = () => {
//     if (ticking) return;
//     requestAnimationFrame(update);
//     ticking = true;
//   };

//   return requestTick;
// };

/**
 * Handles events through requestAnimationFrame. Calls update function with latest provided arguments
 *
 * Use for animation (on scroll)
 * @example
 *
 * window.addEventListener('scroll', ticker(runAnimation))
 */
export const ticker = <Args extends any[] = []>(
  callback: (this: { time: DOMHighResTimeStamp }, ...args: Args) => void
) => {
  let animationFrameId: number | null = null;
  let lastArgs: Args;

  const requestTick = (...args: Args) => {
    lastArgs = args;
    if (animationFrameId !== null) return;
    animationFrameId = requestAnimationFrame((time) => {
      callback.call({ time }, ...lastArgs);
      animationFrameId = null;
    });
  };

  return Object.assign(requestTick, {
    cancel: () =>
      animationFrameId !== null && cancelAnimationFrame(animationFrameId),
  });
};

export { ticker as throttleRaf };
