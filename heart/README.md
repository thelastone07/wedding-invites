# Striped heart

`heart.svg` is a ready-to-use static version. For configurable hearts, import `createHeartSvg` from `heart.js`:

```js
import { createHeartSvg } from "./heart/heart.js";

const heart = createHeartSvg({
  color: "#f472b6",
  size: 160,
  rotation: -10,
  stripeAngle: 35,
});

document.querySelector("#proposal").append(heart);
```

`rotation` controls only the heart outline. `stripeAngle` controls the visible stripe direction in the SVG canvas, independently of the heart orientation. Stripe color is automatically derived as a lighter tint of `color`; pass `stripeColor` only if you deliberately need an override. The default stripes are 4 viewBox units wide, so they scale proportionally with `size`; pass `stripeWidth` to override this. Optional `id` values keep pattern IDs unique when adding multiple hearts to the same page.
