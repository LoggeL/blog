"use client"
import { useLocale } from "@/lib/i18n"

interface Props {
  enContent: string
  deContent: string | null
  enTitle: string
  deTitle: string | null
  enDate: string
}

export function LocalizedMarkdownPost({ enContent, deContent, enTitle, deTitle, enDate }: Props) {
  const { locale } = useLocale()
  const useDE = locale === "de" && deContent !== null
  const title = useDE && deTitle ? deTitle : enTitle
  // Content comes from trusted local markdown files only (same pattern as existing [slug]/page.tsx)
  const content = useDE ? deContent! : enContent

  return (
    <>
      <header className="mb-12">
        <time className="text-sm text-primary">
          {new Date(enDate).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-3xl font-semibold text-primary mt-2">{title}</h1>
      </header>
      {/* Post content - trusted local markdown only */}
      <article className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
