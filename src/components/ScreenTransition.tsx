import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { screenVariants } from "../lib/motion";

interface ScreenTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Screens stack absolutely so an outgoing and incoming screen can overlap,
 * which is what lets the shared logo morph between them.
 */
export default function ScreenTransition({ children, className = "" }: ScreenTransitionProps) {
  const node = useRef<HTMLDivElement>(null);

  /*
    The entry settles on `filter: blur(0px)`, and any resting filter keeps the
    screen off the compositor — which drops the inner scroller onto the main
    thread. Exit re-applies its own blur, so clearing the settled value costs
    the animation nothing.
  */
  const clearRestingFilter = useCallback(() => {
    const element = node.current;
    if (!element) return;
    element.style.filter = "";
    element.style.willChange = "";
  }, []);

  // A screen mounted without an entry animation settles before the callback runs.
  useEffect(() => {
    if (node.current?.style.filter === "blur(0px)") clearRestingFilter();
  }, [clearRestingFilter]);

  return (
    <motion.div
      ref={node}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={(definition) => {
        if (definition === "animate") clearRestingFilter();
      }}
      className={`absolute inset-0 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}
