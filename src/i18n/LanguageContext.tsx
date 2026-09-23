import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ar } from "./ar";

// Website language (English / Arabic). Choosing Arabic sets
// <html lang="ar" dir="rtl">, which src/styles/rtl.css uses for the Arabic
// font and right-to-left layout. The choice is remembered per browser.

export type Language = "en" | "ar";

const STORAGE_KEY = "buildmetric_language";

interface LanguageContextValue {
  lang: Language;
  dir: "ltr" | "rtl";
  setLang: (lang: Language) => void;
  /**
   * Text for the current language. tr("Contact us") looks the English text up
   * in src/i18n/ar.ts; tr("Contact us", "اتصل بنا") gives the Arabic inline.
   * Anything without a translation stays in English.
   */
  tr: (en: string, ar?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readSavedLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(readSavedLanguage);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Remembering the choice is optional.
    }
  }, []);

  const tr = useCallback((en: string, arText?: string) => (lang === "ar" ? arText ?? ar[en] ?? en : en), [lang]);

  return <LanguageContext.Provider value={{ lang, dir, setLang, tr }}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
};
