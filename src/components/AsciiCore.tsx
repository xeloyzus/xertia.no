import { useEffect, useRef } from 'react';

type AsciiCoreProps = {
  className?: string;
};

// Density ramp rendered in an "X" stroke — sparse to dense.
const RAMP = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

function hash(x: number, y: number): number {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return (h & 0x7fffffff) / 0x7fffffff;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Rhythmic "heartbeat" pulse: two quick beats, then a rest.
function heartbeat(t: number): number {
  const p = t % 1.6;
  const b1 = Math.exp(-Math.pow((p - 0.12) / 0.07, 2));
  const b2 = Math.exp(-Math.pow((p - 0.34) / 0.1, 2));
  return 0.3 + 0.7 * ((b1 + b2 * 0.8) / 1.8);
}

export default function AsciiCore({ className }: AsciiCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const element = canvas;

    const context = element.getContext('2d');
    if (!context) return;
    const ctx = context;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    function resize() {
      width = element.clientWidth;
      height = element.clientHeight;
      element.width = Math.max(1, Math.round(width * dpr));
      element.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(t: number) {
      ctx.clearRect(0, 0, width, height);
      if (width <= 0 || height <= 0) return;

      const cx = width * 0.5;
      const cy = height * 0.46;
      const box = Math.min(width, height) * 0.56;
      if (box <= 0) return;

      const pulse = heartbeat(t);
      const brightness = 0.55 + 0.65 * pulse;

      // Soft violet halo that breathes with the pulse.
      const glowR = box * (0.55 + 0.15 * pulse);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, `rgba(139,92,246,${(0.22 + 0.22 * pulse).toFixed(3)})`);
      glow.addColorStop(0.5, `rgba(139,92,246,${(0.08 + 0.08 * pulse).toFixed(3)})`);
      glow.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Brighter white inner bloom for the core.
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, box * 0.32);
      inner.addColorStop(0, `rgba(255,255,255,${(0.1 + 0.12 * pulse).toFixed(3)})`);
      inner.addColorStop(0.5, 'rgba(255,255,255,0.05)');
      inner.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = inner;
      ctx.fillRect(0, 0, width, height);

      const n = 44;
      const cell = box / n;
      ctx.font = `${Math.round(cell)}px 'JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const strokeWidth = 0.085 + 0.045 * pulse;
      const coreRadius = 0.42 + 0.08 * pulse;

      for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
          const x = (i + 0.5) / n;
          const y = (j + 0.5) / n;

          // Xertai "X" stroke formed by two diagonals.
          const d = Math.min(Math.abs(x - y), Math.abs(1 - x - y));
          const stroke = Math.max(0, 1 - d / strokeWidth);
          if (stroke <= 0.01) continue;

          // Circular core mask so the X reads as an orb/core.
          const dx = x - 0.5;
          const dy = y - 0.5;
          const r = Math.sqrt(dx * dx + dy * dy) * 2;
          const mask = 1 - smoothstep(coreRadius, 1.05, r);
          if (mask <= 0.01) continue;

          // Subtle deterministic shimmer so it never looks static.
          const shimmer = 0.86 + 0.14 * Math.sin(t * 1.6 + hash(i, j) * Math.PI * 2);

          let intensity = stroke * mask * brightness * shimmer;
          if (intensity <= 0.045) continue;
          if (intensity > 1) intensity = 1;

          const idx = 1 + Math.min(RAMP.length - 2, Math.floor(intensity * (RAMP.length - 2)));
          const ch = RAMP[idx];

          // Edges render violet, dense core turns white.
          const mix = smoothstep(0.18, 0.85, stroke);
          const rc = Math.round(139 + (255 - 139) * mix);
          const gc = Math.round(92 + (255 - 92) * mix);
          const bc = Math.round(246 + (255 - 246) * mix);

          ctx.globalAlpha = Math.min(1, 0.35 + 0.65 * intensity * 1.5);
          ctx.fillStyle = `rgb(${rc},${gc},${bc})`;

          const px = cx + (i + 0.5 - n / 2) * cell;
          const py = cy + (j + 0.5 - n / 2) * cell;
          ctx.fillText(ch, px, py);
        }
      }

      ctx.globalAlpha = 1;
    }

    let raf = 0;
    let last = 0;
    const FRAME_MS = 1000 / 30;
    const t0 = performance.now();

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw((now - t0) / 1000);
    }

    if (reduced) {
      draw(0.6); // Static, settled frame.
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}