import test from "node:test";
import assert from "node:assert/strict";

import { heartSvgMarkup } from "./heart.js";

test("creates a striped heart with configurable presentation values", () => {
  const svg = heartSvgMarkup({
    color: "#7c3aed",
    size: 144,
    rotation: -12,
    stripeAngle: 30,
  });

  assert.match(svg, /width="144"/);
  assert.match(svg, /height="144"/);
  assert.match(svg, /style="color: #7c3aed"/);
  assert.match(svg, /fill="currentColor"/);
  assert.match(svg, /stroke="color-mix\(in srgb, currentColor 65%, white\)"/);
  assert.match(svg, /transform="rotate\(-12 50 50\)"/);
  assert.match(svg, /patternTransform="rotate\(30\)"/);
  assert.match(svg, /clip-path="url\(#heart-clip\)"/);
});

test("uses proposal-heart defaults", () => {
  const svg = heartSvgMarkup();

  assert.match(svg, /width="120"/);
  assert.match(svg, /style="color: #c52443"/);
  assert.match(svg, /fill="currentColor"/);
  assert.match(svg, /stroke-width="4"/);
  assert.match(svg, /patternTransform="rotate\(-45\)"/);
});
