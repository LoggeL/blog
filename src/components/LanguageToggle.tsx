"use client"
import { useLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  const toggle = () => {
    const next: Locale = locale === "en" ? "de" : "en"
    setLocale(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={locale === "en" ? "Switch to German" : "Zu Englisch wechseln"}
      title={locale === "en" ? "Deutsch" : "English"}
      className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors text-sm font-medium"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-0.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <span className="text-xs font-semibold">{locale === "en" ? "DE" : "EN"}</span>
    </button>
  )
}
