const HEART_PATH =
  "M50 91.5C44.2 86.2 18 64.1 10.7 50.1 2.8 34.9 10.3 17.5 26.7 13.1 36.7 10.4 45.2 15.1 50 23.8 54.8 15.1 63.3 10.4 73.3 13.1 89.7 17.5 97.2 34.9 89.3 50.1 82 64.1 55.8 86.2 50 91.5Z";

const defaults = {
  color: "#c52443",
  size: 120,
  rotation: 0,
  stripeAngle: -45,
  stripeColor: null,
  stripeOpacity: 0.32,
  stripeWidth: 4,
  stripeGap: 7,
  id: "heart",
};

function attribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

/** Returns SVG markup for a heart with independently adjustable diagonal stripes. */
export function heartSvgMarkup(options = {}) {
  const settings = { ...defaults, ...options };
  const size = Number(settings.size);
  const rotation = Number(settings.rotation);
  const stripeAngle = Number(settings.stripeAngle);
  const stripeWidth = Number(settings.stripeWidth);
  const stripeGap = Number(settings.stripeGap);
  const stripeOpacity = Number(settings.stripeOpacity);
  const id = attribute(settings.id);
  const patternId = `${id}-stripes`;
  const clipId = `${id}-clip`;
  const tile = stripeWidth + stripeGap;

  if (![size, rotation, stripeAngle, stripeWidth, stripeGap, stripeOpacity].every(Number.isFinite) || size <= 0 || stripeWidth <= 0 || stripeGap < 0) {
    throw new TypeError("size and stripeWidth must be positive numbers; stripeGap, rotation, stripeAngle, and stripeOpacity must be numbers.");
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="Striped heart" style="color: ${attribute(settings.color)}">
  <defs>
    <clipPath id="${clipId}"><path d="${HEART_PATH}" transform="rotate(${rotation} 50 50)" /></clipPath>
    <pattern id="${patternId}" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse" patternTransform="rotate(${stripeAngle})">
      <line x1="0" y1="0" x2="0" y2="${tile}" stroke="${settings.stripeColor ? attribute(settings.stripeColor) : "color-mix(in srgb, currentColor 65%, white)"}" stroke-width="${stripeWidth}" />
    </pattern>
  </defs>
  <path d="${HEART_PATH}" fill="currentColor" transform="rotate(${rotation} 50 50)" />
  <rect width="100" height="100" fill="url(#${patternId})" opacity="${stripeOpacity}" clip-path="url(#${clipId})" />
</svg>`;
}

/** Creates and returns an SVGSVGElement. Intended for browser use. */
export function createHeartSvg(options = {}) {
  if (typeof document === "undefined") {
    throw new Error("createHeartSvg must be called in a browser environment.");
  }

  const template = document.createElement("template");
  template.innerHTML = heartSvgMarkup(options).trim();
  return template.content.firstElementChild;
}
