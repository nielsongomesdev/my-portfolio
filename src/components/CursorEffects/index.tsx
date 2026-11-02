"use client";

import { useEffect, useRef } from "react";

const MAGNET_STRENGTH = 0.25;
const MAGNET_MAX = 8;
const clamp = (value: number) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, value));

export function CursorEffects() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let hx = x;
    let hy = y;
    let frame = 0;
    let magnet: HTMLElement | null = null;

    const place = () => {
      halo.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%)`;
    };

    const follow = () => {
      hx += (x - hx) * 0.18;
      hy += (y - hy) * 0.18;
      place();
      frame = Math.abs(x - hx) > 0.1 || Math.abs(y - hy) > 0.1 ? requestAnimationFrame(follow) : 0;
    };

    const releaseMagnet = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;

      const target = event.target instanceof Element ? event.target : null;
      halo.dataset.visible = "true";
      halo.dataset.hover = String(Boolean(target?.closest("a, button, [data-cursor='hover']")));

      const card = target?.closest<HTMLElement>("[data-spotlight]");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${x - rect.left}px`);
        card.style.setProperty("--my", `${y - rect.top}px`);
      }

      const nextMagnet = reduceMotion.matches ? null : target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) releaseMagnet();
      if (nextMagnet) {
        magnet = nextMagnet;
        const rect = nextMagnet.getBoundingClientRect();
        const dx = clamp((x - (rect.left + rect.width / 2)) * MAGNET_STRENGTH);
        const dy = clamp((y - (rect.top + rect.height / 2)) * MAGNET_STRENGTH);
        nextMagnet.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }

      if (reduceMotion.matches) {
        hx = x;
        hy = y;
        place();
      } else if (!frame) {
        frame = requestAnimationFrame(follow);
      }
    };

    const onLeave = () => {
      halo.dataset.visible = "false";
      releaseMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      releaseMagnet();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={haloRef} aria-hidden="true" className="cursor-halo" data-visible="false" />;
}
