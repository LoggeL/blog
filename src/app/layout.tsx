import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMF Blog",
  description: "Thoughts on AI, technology, and building things",
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    title: 'LMF Blog',
    description: 'Thoughts on AI, technology, and building things',
    url: 'https://blog.logge.top',
    siteName: 'LMF Blog',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <header className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <svg
                viewBox="0 0 2510 1500"
                className="w-8 h-5 text-[#d90429] group-hover:text-primary-light transition-colors"
                fill="currentColor"
              >
                <path d="M60 1387c0-4 174-779 210-932l51-222 21-93h129c71 0 129 1 129 3l-49 218c-144 634-172 756-177 772l-5 17h121v13c0 6-12 60-27 120l-28 107H248c-104 0-188-1-188-3zM622 858l139-625 21-93h288l2 238 3 237 141-235 140-235 163-3 163-3-4 13c-3 7-49 212-103 456l-98 442h-275l4-17c38-164 74-327 72-329-2-1-43 76-93 172l-90 174H900l-2-166-3-166-74 336-74 336H503l119-532z"/>
                <path d="M810 1381c0-16 48-210 55-221l6-10h1280l-5 18-27 120-22 102H810v-9zM1550 1048l69-308 68-305 328-3 327-2-5 13c-2 7-15 59-27 115l-23 102h-414l-37 173-43 195-5 22h-119c-65 0-119-1-119-2zM1714 318l22-105 16-73h650l-5 23-23 105-17 82h-649l6-32z"/>
              </svg>
              <span className="font-semibold text-foreground group-hover:text-primary-light transition-colors">
                Blog
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="https://learn.logge.top"
                className="text-muted hover:text-foreground transition-colors"
              >
                Learn
              </Link>
              <Link
                href="https://lmf.logge.top"
                className="text-muted hover:text-foreground transition-colors"
              >
                LMF
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>&copy; {new Date().getFullYear()} LMF</span>
              <div className="flex items-center gap-4">
                <Link
                  href="/feed.xml"
                  className="hover:text-foreground transition-colors"
                >
                  RSS
                </Link>
                <Link
                  href="https://lmf.logge.top"
                  className="hover:text-foreground transition-colors"
                >
                  LMF
                </Link>
                <Link
                  href="https://github.com/LoggeL"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
