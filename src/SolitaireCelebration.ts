import defaultCardsSprite from "./assets/cards.png";

interface Card {
  x: number;
  y: number;
  vx: number;
  vy: number;
  suit: number;
  rank: number;
}

export interface SolitaireCelebrationOptions {
  container?: HTMLElement;
  cardWidth?: number;
  cardHeight?: number;
  gravity?: number;
  bounce?: number;
  moveSpeed?: number;
  spawnSpeed?: number;
  minRiseRatio?: number;
  maxRiseRatio?: number;
  spriteUrl?: string;
}

export class SolitaireCelebration {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cards: Card[] = [];
  private sprite: HTMLImageElement;
  private rafId: number | null = null;
  private spawnTimeoutId: number | null = null;
  private lastTime = 0;

  private options: Required<SolitaireCelebrationOptions>;

  constructor(options: SolitaireCelebrationOptions = {}) {
    this.options = {
      container: document.body,
      cardWidth: 65,
      cardHeight: 65,
      gravity: 1800,
      bounce: 0.85,
      moveSpeed: 1,
      spawnSpeed: 1,
      minRiseRatio: 0.35,
      maxRiseRatio: 0.8,
      spriteUrl: defaultCardsSprite,
      ...options,
    };

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.inset = "0";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.imageRendering = "pixelated";

    this.options.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;

    this.sprite = new Image();
    this.sprite.src = this.options.spriteUrl ?? defaultCardsSprite;
    this.sprite.onload = () => {
      this.resize();
      window.addEventListener("resize", this.resize);
      for (let i = 0; i < 3; i++) this.spawnCard();
      this.scheduleSpawn();
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.loop);
    };
  }

  private resize = () => {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  private spawnCard() {
    const { cardWidth, cardHeight, minRiseRatio, maxRiseRatio, gravity } =
      this.options;
    const floorY = window.innerHeight - cardHeight - 5;
    const minRise = window.innerHeight * minRiseRatio;
    const maxRise = window.innerHeight * maxRiseRatio;
    const rise = minRise + Math.random() * (maxRise - minRise);
    const safeRise = Math.min(rise, floorY - 10);
    const vy = -Math.sqrt(2 * gravity * safeRise);

    this.cards.push({
      x: Math.random() * (window.innerWidth - cardWidth),
      y: floorY,
      vx: (Math.random() - 0.5) * 1400,
      vy,
      suit: (Math.random() * 4) | 0,
      rank: (Math.random() * 13) | 0,
    });

    if (this.cards.length > 800) this.cards.splice(0, 100);
  }

  private scheduleSpawn() {
    const { spawnSpeed } = this.options;
    const delay = (550 + Math.random() * 150) / spawnSpeed;
    this.spawnTimeoutId = window.setTimeout(() => {
      this.spawnCard();
      this.scheduleSpawn();
    }, delay);
  }

  private loop = (time: number) => {
    let dt = (time - this.lastTime) / 1000;
    this.lastTime = time;
    dt = Math.min(dt, 0.05) * this.options.moveSpeed;

    this.update(dt);
    this.draw();

    this.rafId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    const { gravity, bounce, cardWidth, cardHeight } = this.options;
    for (const c of this.cards) {
      c.vy += gravity * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;

      if (c.y + cardHeight > window.innerHeight) {
        c.y = window.innerHeight - cardHeight;
        c.vy *= -bounce;
      }
    }
  }

  private draw() {
    const { cardWidth, cardHeight } = this.options;
    for (const c of this.cards) {
      this.ctx.drawImage(
        this.sprite,
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

  destroy() {
    window.removeEventListener("resize", this.resize);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.spawnTimeoutId) clearTimeout(this.spawnTimeoutId);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}
