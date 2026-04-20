'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentType } from 'react';

interface HoverConfig {
  scale?: number;
  duration?: number;
  lift?: number;
  cursor?: string;
  glassGlow?: boolean;
}

export function withHover<P extends object>(Component: ComponentType<P>, config: HoverConfig = {}) {
  const { scale = 1.05, duration = 0.2, lift = -2, cursor = 'pointer', glassGlow = false } = config;

  return function HoverComponent(props: P) {
    const shouldReduce = useReducedMotion();
    if (shouldReduce) return <Component {...props} />;

    return (
      <motion.div
        whileHover={{
          scale,
          y: lift,
          ...(glassGlow && {
            boxShadow: '0 8px 32px rgba(54, 92, 255, 0.25)',
          }),
        }}
        whileFocus={{
          scale,
          y: lift,
          outline: '2px solid #365cff',
          outlineOffset: '3px',
        }}
        transition={{
          duration,
          ease: 'easeOut',
        }}
        style={{ display: 'inline-block', cursor }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
}
