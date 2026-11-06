"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

// Keep server output and the first hydration render identical, then apply the
// browser preference. This avoids mismatched inline styles on animated elements.
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
