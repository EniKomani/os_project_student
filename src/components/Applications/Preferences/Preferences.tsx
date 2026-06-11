import { useThemeContext } from "@context/ThemeContext/ThemeContext";

import { Icon } from "@components/shared/Icon/Icon";

export const Preferences = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto">
      <h1 className="w-full text-4xl font-bold text-left dark:text-white">
        Preferences
      </h1>

      <div className="flex items-center justify-between mt-8 p-4 bg-white rounded-lg shadow dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <Icon icon="light" className="w-6" />
          <div>
            <p className="font-semibold dark:text-white">Dark Mode</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {theme === "dark" ? "Dark theme is enabled" : "Light theme is enabled"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            theme === "dark" ? "bg-blue-600" : "bg-grey"
          }`}
          aria-label="Toggle dark mode"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
