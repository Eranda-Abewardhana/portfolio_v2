"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function applyTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      nextTheme === "dark" ? "#11100e" : "#ffffff",
    );
    setTheme(nextTheme);
  }

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        applyTheme(event.newValue === "dark" ? "dark" : "light");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme switching still works when the browser blocks persistent storage.
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
