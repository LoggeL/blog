import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'When Intelligence Becomes Dirt Cheap | LMF Blog',
  description: 'What happens to society when the cost of thinking approaches zero. White collar, blue collar, education, and the three possible futures.',
  openGraph: {
    title: 'When Intelligence Becomes Dirt Cheap',
    description: 'What happens to society when the cost of thinking approaches zero. White collar, blue collar, education, and the three possible futures.',
    type: 'article',
    publishedTime: '2026-02-10',
    url: 'https://blog.logge.top/posts/cheap-intelligence',
    siteName: 'LMF Blog',
    images: [{ url: 'https://blog.logge.top/images/og/cheap-intelligence.png', width: 1200, height: 630, alt: 'When Intelligence Becomes Dirt Cheap' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'When Intelligence Becomes Dirt Cheap',
    description: 'What happens to society when the cost of thinking approaches zero. White collar, blue collar, education, and the three possible futures.',
    images: ['https://blog.logge.top/images/og/cheap-intelligence.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
