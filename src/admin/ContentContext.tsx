import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { SiteContent } from "./types";
import { defaultContent } from "./defaultContent";
import { defaultContentAr } from "./defaultContentAr";
import { useAuth } from "../auth/AuthContext";
import { useLanguage, Language } from "../i18n/LanguageContext";
import { api } from "../lib/api";

// Website content lives in the database (GET /api/content). The browser keeps
// a copy only as a cache so pages render instantly instead of flashing the
// built-in text while the request is in flight.
//
// Each language has its own content: English sections are saved as "aboutPage",
// Arabic ones as "aboutPage__ar". Whatever has not been edited falls back to
// the built-in English (defaultContent) or Arabic (defaultContentAr) text.
const CACHE_KEYS: Record<Language, string> = {
  en: "buildmetric_content_cache",
  ar: "buildmetric_content_cache_ar",
};
const DEFAULTS: Record<Language, SiteContent> = { en: defaultContent, ar: defaultContentAr };
const AR_SUFFIX = "__ar";

// Where edits used to be stored before content moved to the database.
// They are uploaded once by an admin and then removed.
const LEGACY_KEYS = ["buildmetric_site_content_v3", "buildmetric_site_content_v2", "buildmetric_site_content_v1"];

type SaveState = "idle" | "saving" | "saved" | "error";

type UpdateSection = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => Promise<void>;

interface ContentContextType {
  content: SiteContent;
  updateSection: UpdateSection;
  // The English content, whatever language the public site is showing. The
  // admin panel always works with this (see EnglishContentScope).
  english: { content: SiteContent; updateSection: UpdateSection };
  saveState: SaveState;
  saveError: string;
  lastSaved: Date | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Fill in anything missing from saved content with the built-in defaults.
function mergeContent(saved: Partial<SiteContent> | null | undefined, lang: Language = "en"): SiteContent {
  const base = DEFAULTS[lang];
  if (!saved || typeof saved !== "object") return base;
  return {
    ...base,
    ...saved,
    homeCounter: saved.homeCounter || base.homeCounter,
    header: {
      ...base.header,
      ...(saved.header || {}),
      navLinks: saved.header?.navLinks || base.header.navLinks,
      languages: saved.header?.languages || base.header.languages,
    },
    projectDetails: {
      ...base.projectDetails,
      ...(saved.projectDetails || {}),
      specs: saved.projectDetails?.specs || base.projectDetails.specs,
    },
  };
}

// Split the rows from GET /api/content into English and Arabic edits.
function splitByLanguage(raw: Record<string, unknown> | null | undefined) {
  const en: Record<string, unknown> = {};
  const ar: Record<string, unknown> = {};
  for (const [section, data] of Object.entries(raw || {})) {
    if (section.endsWith(AR_SUFFIX)) ar[section.slice(0, -AR_SUFFIX.length)] = data;
    else en[section] = data;
  }
  return { en: en as Partial<SiteContent>, ar: ar as Partial<SiteContent> };
}

function readJSON(key: string) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(lang: Language, content: SiteContent) {
  try {
    localStorage.setItem(CACHE_KEYS[lang], JSON.stringify(content));
  } catch {
    // Cache is optional; ignore quota / private-mode errors.
  }
}

function readLegacyEdits(): Partial<SiteContent> | null {
  for (const key of LEGACY_KEYS) {
    const parsed = readJSON(key);
    if (parsed && typeof parsed === "object") {
      // Very old saves carried outdated counter stats; keep the current ones.
      const outdated = parsed.homeCounter?.some((c: { label?: string }) => c.label?.toLowerCase().includes("machinery"));
      if (outdated || key !== LEGACY_KEYS[0]) delete parsed.homeCounter;
      return parsed;
    }
  }
  return null;
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const isAdmin = user?.role === "admin";

  const [contents, setContents] = useState<Record<Language, SiteContent>>(() => ({
    en: mergeContent(readJSON(CACHE_KEYS.en), "en"),
    ar: mergeContent(readJSON(CACHE_KEYS.ar), "ar"),
  }));
  const contentsRef = useRef(contents);
  const [serverSections, setServerSections] = useState<string[] | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveChain = useRef<Promise<boolean>>(Promise.resolve(true));

  const applyContent = useCallback((language: Language, next: SiteContent) => {
    contentsRef.current = { ...contentsRef.current, [language]: next };
    setContents(contentsRef.current);
    writeCache(language, next);
  }, []);

  // Load the live content from the database.
  useEffect(() => {
    api<{ content: Record<string, unknown> }>("/content")
      .then((data) => {
        const saved = splitByLanguage(data.content);
        applyContent("en", mergeContent(saved.en, "en"));
        applyContent("ar", mergeContent(saved.ar, "ar"));
        setServerSections(Object.keys(saved.en));
      })
      .catch(() => {
        // API unreachable: keep showing the cached or built-in content.
      });
  }, [applyContent]);

  // Saves are queued so they reach the server in the order they were made.
  const saveSection = useCallback((section: string, data: unknown) => {
    setSaveState("saving");
    setSaveError("");
    const run = saveChain.current.then(async () => {
      try {
        await api(`/admin/content/${section}`, { method: "PUT", body: { data } });
        setLastSaved(new Date());
        setSaveState("saved");
        return true;
      } catch (err) {
        setSaveState("error");
        setSaveError(err instanceof Error ? err.message : "Could not save changes.");
        return false;
      }
    });
    saveChain.current = run;
    return run;
  }, []);

  const updateSectionFor = useCallback(
    (language: Language): UpdateSection =>
      (section, data) => {
        applyContent(language, { ...contentsRef.current[language], [section]: data });
        const name = language === "ar" ? `${String(section)}${AR_SUFFIX}` : String(section);
        return saveSection(name, data).then(() => undefined);
      },
    [applyContent, saveSection]
  );
  const updateSection = useCallback<UpdateSection>((section, data) => updateSectionFor(lang)(section, data), [lang, updateSectionFor]);
  const updateEnglishSection = useCallback<UpdateSection>((section, data) => updateSectionFor("en")(section, data), [updateSectionFor]);

  // One-time move of edits that were saved in this browser before content
  // lived in the database. Only runs for an admin, and only while the database
  // has no content yet, so it can never overwrite live content.
  useEffect(() => {
    if (!isAdmin || serverSections === null || serverSections.length > 0) return;
    const legacy = readLegacyEdits();
    if (!legacy) return;

    const sections = (Object.keys(legacy) as (keyof SiteContent)[]).filter((k) => k in defaultContent);
    if (!sections.length) return;

    const merged = mergeContent({ ...contentsRef.current.en, ...legacy }, "en");
    applyContent("en", merged);
    Promise.all(sections.map((k) => saveSection(String(k), merged[k]))).then((results) => {
      if (!results.every(Boolean)) return; // keep the browser copy so nothing is lost
      setServerSections(sections as string[]);
      LEGACY_KEYS.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch {
          // ignore
        }
      });
    });
  }, [isAdmin, serverSections, applyContent, saveSection]);

  return (
    <ContentContext.Provider
      value={{
        content: contents[lang],
        updateSection,
        english: { content: contents.en, updateSection: updateEnglishSection },
        saveState,
        saveError,
        lastSaved,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

// The admin panel is English only. Wrapping it in this scope makes useContent()
// return the English content (and save to it) even when the public site is set
// to Arabic.
// eslint-disable-next-line react-refresh/only-export-components
export const EnglishContentScope: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContent();
  return (
    <ContentContext.Provider value={{ ...context, ...context.english }}>{children}</ContentContext.Provider>
  );
};
