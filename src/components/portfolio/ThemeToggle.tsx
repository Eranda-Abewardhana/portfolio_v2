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
      {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
      <span>{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
