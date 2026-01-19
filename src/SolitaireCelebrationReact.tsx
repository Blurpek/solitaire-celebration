import { useEffect, useRef } from "react";
import defaultCardsSprite from "./assets/cards.png";

interface Card {
  x: number;
  y: number;
  vx: number;
  vy: number;
  suit: number;
  rank: number;
}

export interface SolitaireCelebrationProps {
  spriteUrl?: string;

  cardWidth?: number;
  cardHeight?: number;

  gravity?: number;
  bounce?: number;

  moveSpeed?: number;
  spawnSpeed?: number;

  minRiseRatio?: number;
  maxRiseRatio?: number;
}

export function SolitaireCelebration({
  spriteUrl,

  cardWidth = 65,
  cardHeight = 65,

  gravity = 1800,
  bounce = 0.85,

  moveSpeed = 1,
  spawnSpeed = 1,

  minRiseRatio = 0.35,
  maxRiseRatio = 0.8,
}: SolitaireCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<Card[]>([]);
  const spriteRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const spawnTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    const sprite = new Image();
    sprite.src = spriteUrl ?? defaultCardsSprite;

    sprite.onload = () => {
      spriteRef.current = sprite;

      for (let i = 0; i < 3; i++) spawnCard();
      scheduleSpawn();

      last = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    };

    function spawnCard() {
      const floorY = window.innerHeight - cardHeight - 5;

      const minRise = window.innerHeight * minRiseRatio;
      const maxRise = window.innerHeight * maxRiseRatio;

      const rise = minRise + Math.random() * (maxRise - minRise);
      const safeRise = Math.min(rise, floorY - 10);

      const vy = -Math.sqrt(2 * gravity * safeRise);

      cardsRef.current.push({
        x: Math.random() * (window.innerWidth - cardWidth),
        y: floorY,
        vx: (Math.random() - 0.5) * 1400,
        vy,
        suit: (Math.random() * 4) | 0,
        rank: (Math.random() * 13) | 0,
      });

      if (cardsRef.current.length > 800) {
        cardsRef.current.splice(0, 100);
      }
    }

    function scheduleSpawn() {
      const delay = (550 + Math.random() * 150) / spawnSpeed;
      spawnTimeoutRef.current = window.setTimeout(() => {
        spawnCard();
        scheduleSpawn();
      }, delay);
    }

    let last = 0;

    function loop(time: number) {
      let dt = (time - last) / 1000;
      last = time;

      if (dt > 0.05) dt = 0.05;
      dt *= moveSpeed;

      update(dt);
      draw();

      rafRef.current = requestAnimationFrame(loop);
    }

    function update(dt: number) {
      for (const c of cardsRef.current) {
        c.vy += gravity * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;

        if (c.y + cardHeight > window.innerHeight) {
          c.y = window.innerHeight - cardHeight;
          c.vy *= -bounce;
        }
      }
    }

    function draw() {
      const sprite = spriteRef.current!;
      for (const c of cardsRef.current) {
        ctx.drawImage(
          sprite,
          c.rank * cardWidth,
          c.suit * cardHeight,
          cardWidth,
          cardHeight,
          Math.round(c.x),
          Math.round(c.y),
          cardWidth,
          cardHeight
        );
      }
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    };
  }, [
    spriteUrl,
    cardWidth,
    cardHeight,
    gravity,
    bounce,
    moveSpeed,
    spawnSpeed,
    minRiseRatio,
    maxRiseRatio,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        imageRendering: "pixelated",
        pointerEvents: "none",
      }}
    />
  );
}
