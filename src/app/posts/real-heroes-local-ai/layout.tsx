import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Real Heroes of Local AI | LMF Blog',
  description: 'The engineers and projects doing the actual work that makes running LLMs on consumer hardware possible — and why they deserve more credit.',
  openGraph: {
    title: 'The Real Heroes of Local AI',
    description: 'The engineers and projects doing the actual work that makes running LLMs on consumer hardware possible — and why they deserve more credit.',
    type: 'article',
    publishedTime: '2026-02-09',
    url: 'https://blog.logge.top/posts/real-heroes-local-ai',
    siteName: 'LMF Blog',
    images: [{ url: 'https://blog.logge.top/images/og/real-heroes-local-ai.png', width: 1200, height: 630, alt: 'The Real Heroes of Local AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Real Heroes of Local AI',
    description: 'The engineers and projects doing the actual work that makes running LLMs on consumer hardware possible — and why they deserve more credit.',
    images: ['https://blog.logge.top/images/og/real-heroes-local-ai.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
