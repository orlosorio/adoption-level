"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundScene() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Aurora blobs — slow 120s full rotation of the whole layer */}
      <motion.div
        aria-hidden
        animate={prefersReduced ? undefined : { rotate: [0, 360] }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
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

      {/* Cube A — 42px, Y-axis rotation over 20s */}
      <div aria-hidden className="quiz-cube quiz-cube-a">
        <motion.div
          animate={prefersReduced ? undefined : { rotateY: [0, 360] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
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

      {/* Cube B — 48px, X-axis counter-rotation over 28s */}
      <div aria-hidden className="quiz-cube quiz-cube-b">
        <motion.div
          animate={prefersReduced ? undefined : { rotateX: [0, -360] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
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

      {/* Pyramid — 36px, Z-axis rotation over 24s */}
      <div aria-hidden className="quiz-cube quiz-pyramid">
        <motion.div
          animate={prefersReduced ? undefined : { rotate: [0, 360] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
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
