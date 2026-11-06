export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-theme";

// Restore an explicit choice before the first paint. New visitors always see light.
export const THEME_INIT_SCRIPT = `(() => {
  let theme = "light";
  try {
    if (localStorage.getItem("${THEME_STORAGE_KEY}") === "dark") theme = "dark";
  } catch {}
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#11100e" : "#ffffff");
})();`;
