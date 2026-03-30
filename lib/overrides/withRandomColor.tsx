"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import { useColorStore } from "@/lib/stores/colorStore";

interface RandomColorConfig {
  property?: "background" | "color" | "borderColor";
  duration?: number;
  triggerOnClick?: boolean;
  triggerOnHover?: boolean;
}

export function withRandomColor<P extends object>(
  Component: ComponentType<P>,
  config: RandomColorConfig = {},
) {
  const {
    property = "background",
    duration = 0.4,
    triggerOnClick = true,
    triggerOnHover = false,
  } = config;

  return function RandomColorComponent(props: P) {
    const shouldReduce = useReducedMotion();
    const { background, setRandomColor } = useColorStore();

    if (shouldReduce) {
      return (
        <div
          onClick={triggerOnClick ? setRandomColor : undefined}
          style={{
            display: "inline-block",
            cursor: triggerOnClick ? "pointer" : "default",
            [property]: background,
          }}
        >
          <Component {...props} />
        </div>
      );
    }

    return (
      <motion.div
        animate={{ [property]: background }}
        transition={{ duration, ease: "easeInOut" }}
        onClick={triggerOnClick ? setRandomColor : undefined}
        onHoverStart={triggerOnHover ? setRandomColor : undefined}
        style={{
          display: "inline-block",
          cursor: triggerOnClick ? "pointer" : "default",
        }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
}
