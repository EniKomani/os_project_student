import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValues {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useThemeContext = () => {
  if (!ThemeContext) {
    throw new Error("useThemeContext must be used within ThemeContext");
  }

  return useContext(ThemeContext);
};
