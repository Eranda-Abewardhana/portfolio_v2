// Avoid showing the final hero before hydration starts its entrance animation.
// The timeout restores the content if the animation bundle cannot load.
export const INTRO_INIT_SCRIPT = `(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || location.hash) return;
  document.documentElement.dataset.portfolioIntro = "pending";
  setTimeout(() => document.documentElement.removeAttribute("data-portfolio-intro"), 2500);
})();`;
