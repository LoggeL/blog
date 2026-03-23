"use client"
import Link from "next/link"
import { useLocale } from "@/lib/i18n"

export function BackLink() {
  const { t } = useLocale()
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
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
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      {t({ en: "Back to all posts", de: "Alle Beiträge" })}
    </Link>
  )
}
