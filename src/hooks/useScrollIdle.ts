import { useEffect, useRef } from "react";

/**
 * Marks a scroller while it is in flight.
 *
 * Dragging a long page pulls every card under the cursor in turn, and each one
 * that lights up runs a five-hundred millisecond shadow transition — a wide
 * blurred repaint on the main thread, several of them at once, exactly while
 * the frames matter most. Hit testing is pointless mid-flick, so the contents
 * stop taking pointer events until the scroll settles; hover picks up again the
 * moment it does, and nothing looks different at rest.
 */
export default function useScrollIdle<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer = 0;

    const settle = () => element.removeAttribute("data-scrolling");

    const onScroll = () => {
      if (!element.hasAttribute("data-scrolling")) element.setAttribute("data-scrolling", "");
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 140);
    };

    element.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      element.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      settle();
    };
  }, []);

  return ref;
}
