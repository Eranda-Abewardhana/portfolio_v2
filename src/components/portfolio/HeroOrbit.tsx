/** Decorative vector art inherits the active theme's accent color. */
export default function HeroOrbit() {
  return (
    <svg
      className="p-portrait-orbit p-orbit-art"
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--copper)" strokeWidth="0.8">
        <circle data-orbit-stroke cx="250" cy="250" r="268" strokeOpacity="0.18" />
        <circle data-orbit-stroke cx="250" cy="250" r="245" strokeOpacity="0.35" />
        <path data-orbit-stroke d="M38 130 A245 245 0 0 1 354 28" strokeOpacity="0.8" />
        <path data-orbit-stroke d="M464 370 A245 245 0 0 1 144 471" strokeOpacity="0.7" />
        <path data-orbit-stroke d="M48 110 H92 L122 140 H168" strokeOpacity="0.6" />
        <path data-orbit-stroke d="M338 394 H386 L418 426 H470" strokeOpacity="0.6" />
        <path data-orbit-stroke d="M250 -27 V-5 M250 505 V527 M-27 250 H-5 M505 250 H527" strokeOpacity="0.5" />
      </g>
      <g fill="var(--copper)">
        <circle data-orbit-node cx="354" cy="28" r="4" />
        <circle data-orbit-node cx="144" cy="471" r="4" />
        <circle data-orbit-node cx="48" cy="110" r="2.5" />
        <circle data-orbit-node cx="168" cy="140" r="2.5" />
        <circle data-orbit-node cx="338" cy="394" r="2.5" />
        <circle data-orbit-node cx="470" cy="426" r="2.5" />
      </g>
    </svg>
  );
}
