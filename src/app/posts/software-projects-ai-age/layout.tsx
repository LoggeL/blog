import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Projects in the AI Age (2027–2028) | LMF Blog',
  description: 'How software teams will restructure around AI agents: three project tiers, shifting skills, and the junior engineer problem.',
  openGraph: {
    title: 'Software Projects in the AI Age (2027–2028)',
    description: 'How software teams will restructure around AI agents: three project tiers, shifting skills, and the junior engineer problem.',
    type: 'article',
    publishedTime: '2026-02-08',
    url: 'https://blog.logge.top/posts/software-projects-ai-age',
    siteName: 'LMF Blog',
    images: [{ url: 'https://blog.logge.top/images/og/software-projects-ai-age.png', width: 1200, height: 630, alt: 'Software Projects in the AI Age (2027–2028)' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Projects in the AI Age (2027–2028)',
    description: 'How software teams will restructure around AI agents: three project tiers, shifting skills, and the junior engineer problem.',
    images: ['https://blog.logge.top/images/og/software-projects-ai-age.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
