import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type UseThemeModeReturnType = [string, () => void];

export const useThemeMode = (): UseThemeModeReturnType => {
  const [theme, setTheme] = useState<string>(() => {
    return Cookies.get("theme") == "dark" ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, []);

  useEffect(() => {
    const oldTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.replace(oldTheme, theme);
    Cookies.set("theme", theme, { expires: 365 });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
};
