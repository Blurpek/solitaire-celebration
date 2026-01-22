# Solitaire Celebration 🎉

A lightweight canvas-based classic windows alike **solitaire card celebration animation** for **React** and **vanilla JavaScript**.

![Demo](/assets/demo.gif)

## Features

- Works in React and vanilla JS
- Fully customizable: card size, gravity, bounce, spawn rate, rise height ratio

## Installation

Use Your fav package manager

```bash
npm install solitaire-celebration
```

## React Usage

```tsx
import { SolitaireCelebrationReact } from "solitaire-celebration";

<SolitaireCelebrationReact />;
```

You can find code example [here](./demo/react/src/App.tsx)

Props (all optional, defaults shown):

| Prop         | Type   | Default           | Description                   |
| ------------ | ------ | ----------------- | ----------------------------- |
| spriteUrl    | string | bundled cards.png | URL of card sprite            |
| cardWidth    | number | 65                | Width of each card            |
| cardHeight   | number | 65                | Height of each card           |
| gravity      | number | 1800              | Gravity for card motion       |
| bounce       | number | 0.85              | Bounce factor on floor        |
| moveSpeed    | number | 1                 | Speed multiplier for movement |
| spawnSpeed   | number | 1                 | Rate of new cards             |
| minRiseRatio | number | 0.35              | Minimum rise from floor (0–1) |
| maxRiseRatio | number | 0.8               | Maximum rise from floor (0–1) |

## Vanilla JS Usage

Import the vanilla class and create a new instance:

```html
<script src="https://cdn.jsdelivr.net/npm/solitaire-celebration@1.1.0/dist/index.iife.js"></script>
<script>
  const celebration = new window.SolitaireCelebration.SolitaireCelebration({
    container: document.body,
  });
</script>
```

To remove the canvas and stop animation:

```ts
celebration.destroy();
```

You can find code example [here](./demo/index.html)

## Customization

If You'd like to use your sprites of cards then You need to pass the `spriteUrl` to Your spritesheet of cards.
Remember to adjust `cardWidth` and `cardHeight` to fit the spritesheet.

## License

MIT © Blurpek (https://github.com/Blurpek)
