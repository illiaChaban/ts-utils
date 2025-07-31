
import { on } from "./on";

/**
* This allows for a smoother scroll based animation
* It will start a requestAnimationFrame loop at the time of the first scroll event
* and will stop after a debounce delay after the last scroll event.
* This will result in performant css updates on every frame.
* This allows for 60 FPS even on low-end mobile devices and usually matches the screen refresh rate.
* 
* Alternatively, the scroll event on mobile devices usually fires only at 30-40 FPS and in general will cause ~30% frame rate loss on any screen.
* Furthermore, the scroll event doesn't always match the best timing to apply css updates which will likely result in a junky animation,
* so scheduling paint updates via requestAnimationFrame even on scroll event is still recommended.
*/
export const animateOnScroll = (callback: (scrollY: number) => void) => {
  const DEBOUNCE_TIME = 150;

  let requestAnimationFrameId: number | null = null;
  let lastScrollEventTime: number | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  const animate = () => {
    requestAnimationFrameId = requestAnimationFrame(() => {
      callback(window.scrollY);
      animate();
    })
  };

  const reset = () => {
    requestAnimationFrameId && cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = null;
    lastScrollEventTime = null;
    timeoutId && clearTimeout(timeoutId);
    timeoutId = null;
  };
  // This function is a performant version of debounce
  // instead of setting and clearing a timeout on each scroll event, which can be st
  // it is limited to creating timeout to 1000 / DEBOUNCE_TIME times per second
  const scheduleStopAnimating = () => {
    if (timeoutId) return; // already scheduled

    const timePassed = lastScrollEventTime ? performance.now() - lastScrollEventTime : 0;

    if (timePassed >= DEBOUNCE_TIME) return reset();

    const timeLeft = DEBOUNCE_TIME - timePassed;

    timeoutId = setTimeout(() => {
      timeoutId = null;
      scheduleStopAnimating();
    }, timeLeft);
  };

  const handleScroll = (e: Event) => {
    const isFirstFrame = !lastScrollEventTime;
    lastScrollEventTime = e.timeStamp;

    if (isFirstFrame) animate();

    scheduleStopAnimating();
  };

  const cleanup = on(
    window, 'scroll', handleScroll,
    // improves performance by letting the browser know that the scroll event won't change the default behavior
    { passive: true }
  );

  return () => {
    cleanup()
    reset()
  };
};