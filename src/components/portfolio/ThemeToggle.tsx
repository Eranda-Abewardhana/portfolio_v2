"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = `Switch to ${theme === "light" ? "dark" : "light"} mode`;

  return (
    <button
      type="button"
      className="p-theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="p-theme-track" aria-hidden="true">
        <span className="p-theme-thumb" />
        <Sun className="p-theme-icon p-theme-icon-light" size={16} strokeWidth={1.8} />
        <Moon className="p-theme-icon p-theme-icon-dark" size={16} strokeWidth={1.8} />
      </span>
      <span className="p-theme-label" aria-hidden="true">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
