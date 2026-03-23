"use client"
import Link from "next/link"
import { useLocale } from "@/lib/i18n"

export function HomeHero() {
  const { locale } = useLocale()

  return (
    <section className="mb-12">
      <h1 className="text-3xl font-semibold text-primary mb-4">
        LMF Blog
      </h1>
      <p className="text-muted text-lg leading-relaxed">
        {locale === "de" ? (
          <>
            Gedanken zu KI, Technologie und den Dingen, die ich baue.
            Für zeitlose Konzepte, siehe den{" "}
            <Link href="https://learn.logge.top" className="text-primary hover:text-primary-light underline underline-offset-2">
              Learn Guide
            </Link>.
          </>
        ) : (
          <>
            Thoughts on AI, technology, and the things I build.
            For timeless concepts, see the{" "}
            <Link href="https://learn.logge.top" className="text-primary hover:text-primary-light underline underline-offset-2">
              Learn Guide
            </Link>.
          </>
        )}
      </p>
    </section>
  )
}
