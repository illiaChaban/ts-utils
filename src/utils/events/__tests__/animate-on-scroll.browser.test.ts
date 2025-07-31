import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";

import { animateOnScroll } from "../animate-on-scroll";

describe(animateOnScroll.name, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const simulateScrollEvent = (timeStamp: number) => {
    const scrollEvent = new Event('scroll', { bubbles: true });
    Object.defineProperty(scrollEvent, 'timeStamp', { value: timeStamp });
    window.dispatchEvent(scrollEvent);
  }

  it('should properly handle animation lifecycle with short scroll event', () => {
    const mockCallback = vi.fn();

    const setTimeOutSpy = vi.spyOn(window, 'setTimeout');
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');

    const now = 1000;
    const performanceNowSpy = vi.spyOn(performance, "now").mockReturnValue(now);

    const cleanup = animateOnScroll(mockCallback);

    expect(addEventListenerSpy).toHaveBeenCalled();
    simulateScrollEvent(now);
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(setTimeOutSpy).toHaveBeenCalled();
    vi.advanceTimersToNextTimer();
    expect(mockCallback).toHaveBeenCalled();

    // Advance time to trigger cleanup
    performanceNowSpy.mockReturnValue(now + 200);
    vi.advanceTimersByTime(200);
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();

    // clearTimeout won't be called since the first timeout executed and timeoutId was nulled
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    cleanup();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should properly handle animation lifecycle with long lasting scroll events', () => {
    const mockCallback = vi.fn();
    const setTimeOutSpy = vi.spyOn(window, 'setTimeout');
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const now = 1000;
    const performanceNowSpy = vi.spyOn(performance, "now").mockReturnValue(now);

    const cleanup = animateOnScroll(mockCallback);
    expect(addEventListenerSpy).toHaveBeenCalled();

    // Simulate multiple scroll events
    for (let i = 1; i < 10; i++) {
      performanceNowSpy.mockReturnValue(now + i * 100);
      vi.advanceTimersByTime(100);
      simulateScrollEvent(now + i * 100);
    }

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(setTimeOutSpy).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalled();

    cleanup();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should properly cleanup outstanding timeouts & scheduled animation', () => {
    const mockCallback = vi.fn();
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const now = 1000;
    const performanceNowSpy = vi.spyOn(performance, "now").mockReturnValue(now);

    const cleanup = animateOnScroll(mockCallback);

    simulateScrollEvent(now);

    cleanup();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    // clearTimeout should have been called since there were outstanding scheduled cleanup
    // but "cleanup" should have cleared it
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});