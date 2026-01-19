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

Import the React component and add it to your JSX:

```tsx
import { SolitaireCelebrationReact } from "solitaire-celebration";

<SolitaireCelebrationReact />;
```

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

```ts
import { SolitaireCelebration as VanillaCelebration } from "solitaire-celebration";

const confetti = new VanillaCelebration({
  container: document.body,
  cardWidth: 65,
  cardHeight: 65,
  gravity: 1800,
});
```

To remove the canvas and stop animation:

```ts
confetti.destroy();
```

## Customization

If You'd like to use your sprites of cards then You need to pass the `spriteUrl` to Your spritesheet of cards.
Remember to adjust `cardWidth` and `cardHeight` to fit the spritesheet.

## License

MIT © Blurpek (https://github.com/Blurpek)
