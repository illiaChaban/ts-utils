import { OmitKnown } from "../types";

/**
 * A function that cleans up event listeners when called
 */
type Cleanup = () => void;

/**
 * Boolean shorthand for the capture option in addEventListener
 */
type UseCapture = boolean;

/**
 * Attaches an event listener to a Window object
 * Uses AbortController for event listener removal
 * 
 * @param element - The Window object to attach the event listener to
 * @param event - The event name
 * @param callback - The event handler function
 * @param options - Optional addEventListener options or capture boolean
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters} for details on options
 * @returns A cleanup function that removes the event listener when called
 * 
 * @example
 * // Basic usage
 * const cleanup = on(window, 'click', (e) => console.log(e.clientX, e.clientY));
 * 
 * // Later when you want to remove the listener
 * cleanup();
 * 
 * @example
 * // With options
 * const cleanup = on(window, 'scroll', handleScroll, { passive: true });
 */
export function on<K extends keyof WindowEventMap, Options extends UseCapture | AddEventListenerOptions>(
  element: Window,
  event: K,
  callback: (ev: WindowEventMap[K]) => void,
  options?: Options
): Options extends { signal: AbortSignal } ? void : Cleanup;

/**
 * Attaches an event listener to a Document object
 * Uses AbortController for event listener removal
 * 
 * @param element - The Document object to attach the event listener to
 * @param event - The event name
 * @param callback - The event handler function
 * @param options - Optional addEventListener options or capture boolean
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters} for details on options
 * @returns A cleanup function that removes the event listener when called
 * 
 * @example
 * // Basic usage
 * const cleanup = on(document.body, 'click', (e) => console.log(e.clientX, e.clientY));
 * 
 * // Later when you want to remove the listener
 * cleanup();
 * 
 * @example
 * // With options
 * const cleanup = on(window, 'scroll', handleScroll, { passive: true });
 */
export function on<K extends keyof DocumentEventMap, Options extends UseCapture | AddEventListenerOptions>(
  element: Document,
  event: K,
  callback: (ev: DocumentEventMap[K]) => void,
  options?: Options
): Options extends { signal: AbortSignal } ? void : Cleanup;

/**
 * Attaches an event listener to an HTMLElement object
 * Uses AbortController for event listener removal
 * 
 * @param element - The HTMLElement object to attach the event listener to
 * @param event - The event name
 * @param callback - The event handler function
 * @param options - Optional addEventListener options or capture boolean
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters} for details on options
 * @returns A cleanup function that removes the event listener when called
 * 
 * @example
 * // Basic usage
 * const cleanup = on(document.body, 'click', (e) => console.log(e.clientX, e.clientY));
 * 
 * // Later when you want to remove the listener
 * cleanup();
 * 
 * @example
 * // With options
 * const cleanup = on(window, 'scroll', handleScroll, { passive: true });
 */
export function on<K extends keyof HTMLElementEventMap, Options extends UseCapture | AddEventListenerOptions>(
  element: HTMLElement,
  event: K,
  callback: (ev: HTMLElementEventMap[K]) => void,
  options?: Options
): Options extends { signal: AbortSignal } ? void : Cleanup;

/**
 * Attaches an event listener to an Element object 
 * Uses AbortController for event listener removal
 * 
 * @param element - The Element object to attach the event listener to
 * @param event - The event name 
 * @param callback - The event handler function
 * @param options - Optional addEventListener options or capture boolean
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters} for details on options
 * @returns A cleanup function that removes the event listener when called
 * 
 * @example
 * // Basic usage
 * const cleanup = on(document.body, 'click', (e) => console.log(e.clientX, e.clientY));
 * 
 * // Later when you want to remove the listener
 * cleanup();
 * 
 * @example
 * // With options
 * const cleanup = on(window, 'scroll', handleScroll, { passive: true });
 */
export function on<K extends keyof ElementEventMap, Options extends UseCapture | AddEventListenerOptions>(
  element: Element,
  event: K,
  callback: (ev: ElementEventMap[K]) => void,
  options?: Options
): Options extends { signal: AbortSignal } ? void : Cleanup;

/**
 * Fallback for attaching event listeners to any EventTarget with custom events
 * Uses AbortController for event listener removal
 * 
 * @param element - Any EventTarget object to attach the event listener to
 * @param event - The event name as a string
 * @param callback - The event handler function or object
 * @param options - Optional addEventListener options or capture boolean
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters} for details on options
 * @returns A cleanup function that removes the event listener when called
 * 
 * @example
 * // Basic usage
 * const cleanup = on(document.body, 'click', (e) => console.log(e.clientX, e.clientY));
 * 
 * // Later when you want to remove the listener
 * cleanup();
 * 
 * @example
 * // With options
 * const cleanup = on(window, 'scroll', handleScroll, { passive: true });
 */
export function on<Options extends UseCapture | AddEventListenerOptions>(
  element: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject,
  options?: Options
): Options extends { signal: AbortSignal } ? void : Cleanup;

/**
 * Attaches an event listener to any EventTarget
 * Uses AbortController for event listener removal
 * 
 * @param element - The target object to attach the event listener to
 * @param event - The event name to listen for
 * @param callback - The event handler function to be called when the event occurs
 * @param options - Optional addEventListener options or capture boolean
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters} for details on options
 * @returns A cleanup function that removes the event listener when called
 * 
 * @example
 * // Basic usage
 * const cleanup = on(document.body, 'click', (e) => console.log(e.clientX, e.clientY));
 * 
 * // Later when you want to remove the listener
 * cleanup();
 * 
 * @example
 * // With options
 * const cleanup = on(window, 'scroll', handleScroll, { passive: true });
 */
export function on(
  element: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject,
  options?: UseCapture | AddEventListenerOptions
): Cleanup | void {
  let cleanup: Cleanup | undefined;

  let mergedOptions: AddEventListenerOptions;

  // if outside signal is provided, use it and don't return cleanup function
  if (typeof options === 'object' && options.signal) {
    mergedOptions = options;
  } else {
    const _options = typeof options === 'boolean' ? { capture: options } : options;
    const controller = new AbortController();
    cleanup = () => controller.abort();
    mergedOptions = { ..._options, signal: controller.signal };
  }

  element.addEventListener(event, callback, mergedOptions);

  // Return a cleanup function that aborts the controller
  return cleanup;
}

export const onEvent = on
export const listen = on
