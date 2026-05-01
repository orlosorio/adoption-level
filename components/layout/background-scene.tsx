'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function BackgroundScene() {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  const quizActive = pathname === '/assessment/general' || pathname.startsWith('/assessment/role/');

  const slow = quizActive ? 5 : 1;

  return (
    <>
      <motion.div
        aria-hidden
        animate={prefersReduced ? undefined : { rotate: [0, 360] }}
        transition={{
          duration: 120 * slow,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div className="quiz-aurora-layer">
          <div className="quiz-aurora-blob quiz-aurora-blob-tl" />
          <div className="quiz-aurora-blob quiz-aurora-blob-tr" />
          <div className="quiz-aurora-blob quiz-aurora-blob-bl" />
          <div className="quiz-aurora-blob quiz-aurora-blob-br" />
        </div>
      </motion.div>

      <div aria-hidden className="quiz-grain-layer" />

      <div aria-hidden className="quiz-cube quiz-cube-a">
        <motion.div
          animate={prefersReduced ? undefined : { rotateY: [0, 360] }}
          transition={{
            duration: 20 * slow,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
            width: 42,
            height: 42,
          }}
        >
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </motion.div>
      </div>

      <div aria-hidden className="quiz-cube quiz-cube-b">
        <motion.div
          animate={prefersReduced ? undefined : { rotateX: [0, -360] }}
          transition={{
            duration: 28 * slow,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
            width: 48,
            height: 48,
          }}
        >
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </motion.div>
      </div>

      <div aria-hidden className="quiz-cube quiz-pyramid">
        <motion.div
          animate={prefersReduced ? undefined : { rotate: [0, 360] }}
          transition={{
            duration: 24 * slow,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
            width: 36,
            height: 36,
          }}
        >
          <div className="pyramid-face pyramid-front" />
          <div className="pyramid-face pyramid-back" />
          <div className="pyramid-face pyramid-right" />
          <div className="pyramid-face pyramid-left" />
        </motion.div>
      </div>
    </>
  );
}
