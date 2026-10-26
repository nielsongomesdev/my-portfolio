"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DISTANCE = 140;
const GRAB_DISTANCE = 170;
const MAX_PARTICLES = 80;
const MIN_PARTICLES = 18;

/**
 * Lightweight constellation background (dots + faint links, cursor "grab").
 * Written on a plain <canvas> instead of a particles library: ~2 KB of code,
 * no extra dependency. It only animates while visible in the viewport and the
 * tab is active, caps the pixel ratio at 2, uses fewer particles on touch
 * devices and renders a single static frame under `prefers-reduced-motion`.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const host = canvas.parentElement ?? canvas;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let inView = false;
    const pointer = { x: 0, y: 0, active: false };

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random(),
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = coarsePointer ? 24000 : 15000;
      const count = Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, Math.round((width * height) / density)));
      particles = Array.from({ length: count }, (_, i) => particles[i] ?? spawn());
    };

    const draw = (advance: boolean) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (const p of particles) {
        if (!advance) continue;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(255,255,255,${(0.16 * (1 - distance / LINK_DISTANCE)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (distance < GRAB_DISTANCE) {
            ctx.strokeStyle = `rgba(255,255,255,${(0.35 * (1 - distance / GRAB_DISTANCE)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(255,255,255,0.32)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || !inView || document.hidden || reduceMotion.matches) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const onMotionPreference = () => {
      if (reduceMotion.matches) {
        stop();
        draw(false);
      } else {
        start();
      }
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(false);
    });

    resize();
    draw(false);
    intersection.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionPreference);

    if (!coarsePointer) {
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionPreference);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
