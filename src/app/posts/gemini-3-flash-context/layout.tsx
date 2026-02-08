import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gemini 3 Flash: Perfect Long Context Scores | LMF Blog',
  description: 'Gemini 3 Flash Preview achieves 100% on Fiction.LiveBench across all context lengths up to 192k tokens.',
  openGraph: {
    title: 'Gemini 3 Flash: Perfect Long Context Scores',
    description: 'Gemini 3 Flash Preview achieves 100% on Fiction.LiveBench across all context lengths up to 192k tokens.',
    type: 'article',
    publishedTime: '2026-01-24',
    url: 'https://blog.logge.top/posts/gemini-3-flash-context',
    siteName: 'LMF Blog',
    images: [{ url: 'https://blog.logge.top/images/og/gemini-3-flash-context.png', width: 1200, height: 630, alt: 'Gemini 3 Flash: Perfect Long Context Scores' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini 3 Flash: Perfect Long Context Scores',
    description: 'Gemini 3 Flash Preview achieves 100% on Fiction.LiveBench across all context lengths up to 192k tokens.',
    images: ['https://blog.logge.top/images/og/gemini-3-flash-context.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
