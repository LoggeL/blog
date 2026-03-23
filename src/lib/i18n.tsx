"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export type Locale = "en" | "de"

export type Translations = {
  en: string
  de: string
}

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (translations: Translations) => string
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: (tr) => tr.en,
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("blog-locale") as Locale | null
    if (stored === "en" || stored === "de") {
      setLocaleState(stored)
      return
    }
    const lang = navigator.language || navigator.languages?.[0] || "en"
    if (lang.startsWith("de")) setLocaleState("de")
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    if (typeof window !== "undefined") {
      localStorage.setItem("blog-locale", next)
    }
  }

  const t = (translations: Translations): string => {
    return translations[locale] ?? translations.en
  }

  // During SSR / before mount, always render with "en" to avoid hydration mismatch
  const ctx: LocaleContextType = mounted
    ? { locale, setLocale, t }
    : { locale: "en", setLocale: () => {}, t: (tr) => tr.en }

  return <LocaleContext.Provider value={ctx}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
