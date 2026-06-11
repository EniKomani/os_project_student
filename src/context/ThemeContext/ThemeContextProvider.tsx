import { useEffect, useState } from "react";

import {
  Theme,
  ThemeContext,
  ThemeContextValues,
} from "./ThemeContext";

const THEME_STORAGE_KEY = "os-theme";

const getSystemTheme = (): Theme => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
};

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return getSystemTheme();
};

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (value: Theme) => {
    setThemeState(value);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === "light" ? "dark" : "light"));
  };

  const context: ThemeContextValues = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
