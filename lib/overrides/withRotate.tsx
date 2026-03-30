"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType, CSSProperties } from "react";

interface RotateConfig {
  duration?: number;
  direction?: 1 | -1;
  axis?: "z" | "y" | "x";
  wrapperStyle?: CSSProperties;
  wrapperClassName?: string;
}

export function withRotate<P extends object>(
  Component: ComponentType<P>,
  config: RotateConfig = {},
) {
  const {
    duration = 60,
    direction = 1,
    axis = "z",
    wrapperStyle,
    wrapperClassName,
  } = config;

  return function RotatingComponent(props: P) {
    const shouldReduce = useReducedMotion();
    if (shouldReduce) return <Component {...props} />;

    const rotate =
      axis === "z"
        ? { rotate: direction * 360 }
        : axis === "y"
          ? { rotateY: direction * 360 }
          : { rotateX: direction * 360 };

    return (
      <motion.div
        animate={rotate}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
          ...wrapperStyle,
        }}
        className={wrapperClassName}
      >
        <Component {...props} />
      </motion.div>
    );
  };
}
