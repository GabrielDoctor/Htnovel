"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { useThemeMode } from "../hooks/ThemeHook";
export interface SystemTheme {
  transparentOverlay: string;
  fontFamily: string;
  // fontSize: string;
  // fontColor: string;
}
export enum TransOption {
  Baidu = "baidu",
  Google = "google",
  Bing = "bing",
  Gpt = "gpt",
  STV = "stv",
  GPT_CHIVI = "gpt_chivi",
}
const getInitialValue = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
      }
    }
  }
  return defaultValue;
};

export interface ReadingTheme {
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: {
    light: string;
    dark: string;
  };
  lineHeight: string;
}

export interface ReadingSettings {
  readingMode: boolean;
  chineseAlongside: boolean;
  language: string;
  setLanguage: (language: string) => void;
  transOption: TransOption;
  setTransOption: (transOption: TransOption) => void;
}

export interface SettingsContextProps {
  theme: string;
  toggleTheme: () => void;
  systemTheme: SystemTheme;
  setSystemTheme: (theme: SystemTheme) => void;
  readingTheme: ReadingTheme;
  setReadingTheme: (theme: ReadingTheme) => void;
  readingSetting: ReadingSettings;
  setReadingSetting: (setting: ReadingSettings) => void;
}

export const initValue: SettingsContextProps = {
  theme: "light",
  toggleTheme: () => {},
  systemTheme: {
    transparentOverlay: "rgba(0, 0, 0, 0)",
    fontFamily: "'Roboto', sans-serif",
    // fontSize: "text-base",
    // fontColor: "text-black",
  },
  readingTheme: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "text-base",
    fontColor: "text-black",
    backgroundColor: {
      light: "bg-yellow-100",
      dark: "bg-yellow-800",
    },
    lineHeight: "leading-relaxed",
  },
  readingSetting: {
    readingMode: false,
    chineseAlongside: false,
    language: "en",
    setLanguage: () => {},
    transOption: TransOption.Bing,
    setTransOption: () => {},
  },
  setSystemTheme: () => {},
  setReadingTheme: () => {},
  setReadingSetting: () => {},
};

export const SettingsContext = createContext<SettingsContextProps>(initValue);
export const useSettings = () => useContext(SettingsContext);
interface SettingsProviderProps {
  children: any;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [systemTheme, setSystemTheme] = useState<SystemTheme>(
    getInitialValue("systemTheme", initValue.systemTheme)
  );
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>(
    getInitialValue("readingTheme", initValue.readingTheme)
  );
  const [readingSetting, setReadingSetting] = useState<ReadingSettings>(
    getInitialValue("readingSetting", initValue.readingSetting)
  );
  const [theme, toggleTheme] = useThemeMode();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSystemTheme = localStorage.getItem("systemTheme");
      const storedReadingTheme = localStorage.getItem("readingTheme");
      const storedReadingSetting = localStorage.getItem("readingSetting");

      if (storedSystemTheme) {
        try {
          setSystemTheme(JSON.parse(storedSystemTheme));
        } catch (e) {
          console.error("Error parsing systemTheme from localStorage:", e);
        }
      }
      if (storedReadingTheme) {
        try {
          setReadingTheme(JSON.parse(storedReadingTheme));
        } catch (e) {
          console.error("Error parsing readingTheme from localStorage:", e);
        }
      }
      if (storedReadingSetting) {
        try {
          setReadingSetting(JSON.parse(storedReadingSetting));
        } catch (e) {
          console.error("Error parsing readingSetting from localStorage:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("systemTheme", JSON.stringify(systemTheme));
    localStorage.setItem("readingTheme", JSON.stringify(readingTheme));
    localStorage.setItem("readingSetting", JSON.stringify(readingSetting));
  }, [systemTheme, readingTheme, readingSetting]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        systemTheme,
        setSystemTheme,
        readingTheme,
        setReadingTheme,
        readingSetting,
        setReadingSetting,
      }}
    >
      <div
        suppressHydrationWarning={true}
        style={{
          fontFamily: systemTheme.fontFamily,
        }}
        className={`${systemTheme.transparentOverlay} `}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
