import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { ease } from "../lib/motion";

interface CountUpOptions {
  duration?: number;
  delay?: number;
}

/**
 * Counts from zero to `target` and writes the formatted value straight to the
 * node, so the roll-up never re-renders the surrounding tab on every frame.
 */
export function useCountUp(
  target: number,
  format: (value: number) => string,
  { duration = 1.6, delay = 0 }: CountUpOptions = {},
) {
  const node = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = node.current;
    if (!element) return;

    if (reduced) {
      element.textContent = format(target);
      return;
    }

    element.textContent = format(0);
    const controls = animate(0, target, {
      duration,
      delay,
      ease: ease.luxe,
      onUpdate: (value) => {
        element.textContent = format(value);
      },
    });

    return () => controls.stop();
    // `format` is defined inline at the call sites, so it is left out on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, delay, reduced]);

  return node;
}
