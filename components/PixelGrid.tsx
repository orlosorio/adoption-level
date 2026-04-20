'use client';

import { useEffect, useRef } from 'react';

interface PixelGridProps {
  pixelSize?: number;
  gap?: number;
  colorMode?: 'palette' | 'hsl' | 'brand';
  backgroundColor?: string;
  opacity?: number;
  interactive?: boolean;
}

interface Pixel {
  x: number;
  y: number;
  size: number;
  targetSize: number;
  color: string;
  speed: number;
}

const MINT = ['#4ade80', '#6ee7a0', '#86efb4', '#a7f3c8'];
const ORANGE = ['#fb923c', '#f97316', '#fdba74', '#fed7aa'];
const WHITE = ['#ffffff', '#f0f0f0', '#e0e0e0', '#cccccc'];
const GREEN = ['#4ade80', '#22c55e', '#86efac', '#bbf7d0'];
const MUTED = ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)'];

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function getColor(mode: PixelGridProps['colorMode']): string {
  if (mode === 'hsl') {
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.floor(Math.random() * 40);
    const l = 50 + Math.floor(Math.random() * 30);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  if (mode === 'brand') {
    const r = Math.random();
    if (r < 0.5) return pick(GREEN);
    if (r < 0.8) return pick(WHITE);
    return pick(MUTED);
  }
  const r = Math.random();
  if (r < 0.4) return pick(MINT);
  if (r < 0.75) return pick(ORANGE);
  return pick(WHITE);
}

export default function PixelGrid({
  pixelSize = 4,
  gap = 6,
  colorMode = 'palette',
  backgroundColor = '#080808',
  opacity = 1,
  interactive = true,
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pixels: Pixel[] = [];
    let animFrameId: number;
    let stopped = false;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;
    const effectivePixelSize = isMobile ? Math.max(3, pixelSize - 1) : pixelSize;
    const effectiveGap = isMobile ? gap + 2 : gap;
    const effectiveCell = effectivePixelSize + effectiveGap;

    function initGrid() {
      if (!canvas) return;
      const cols = Math.floor(canvas.width / effectiveCell);
      const rows = Math.floor(canvas.height / effectiveCell);
      pixels = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          pixels.push({
            x: c * effectiveCell + effectiveGap / 2,
            y: r * effectiveCell + effectiveGap / 2,
            size: Math.random() * effectivePixelSize,
            targetSize: Math.random() * effectivePixelSize,
            color: getColor(colorMode),
            speed: 0.02 + Math.random() * 0.04,
          });
        }
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    }

    function drawFrame() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const px of pixels) {
        if (px.size > 0.3) {
          ctx.fillStyle = px.color;
          const offset = (effectivePixelSize - px.size) / 2;
          ctx.fillRect(px.x + offset, px.y + offset, px.size, px.size);
        }
      }
    }

    function animate() {
      if (stopped) return;
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const px of pixels) {
        px.size += (px.targetSize - px.size) * px.speed;
        if (Math.abs(px.size - px.targetSize) < 0.1) {
          px.targetSize = Math.random() * effectivePixelSize;
        }
        if (px.size > 0.3) {
          ctx.fillStyle = px.color;
          const offset = (effectivePixelSize - px.size) / 2;
          ctx.fillRect(px.x + offset, px.y + offset, px.size, px.size);
        }
      }

      animFrameId = requestAnimationFrame(animate);
    }

    function handleClick(e: MouseEvent) {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (const px of pixels) {
        const dist = Math.hypot(px.x - clickX, px.y - clickY);
        setTimeout(() => {
          px.targetSize = Math.random() * effectivePixelSize;
          px.color = getColor(colorMode);
        }, dist * 0.4);
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function debouncedResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    }

    resize();

    if (prefersReduced) {
      drawFrame();
    } else {
      animate();
    }

    window.addEventListener('resize', debouncedResize);
    if (interactive && !prefersReduced) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(animFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('click', handleClick);
    };
  }, [pixelSize, gap, colorMode, interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor,
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
