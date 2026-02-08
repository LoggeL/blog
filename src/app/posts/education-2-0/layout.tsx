import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education 2.0: LLMs Teaching Children | LMF Blog',
  description: 'Reimagining education with AI tutors, skill-based assessment, and teachers as social mentors.',
  openGraph: {
    title: 'Education 2.0: LLMs Teaching Children',
    description: 'Reimagining education with AI tutors, skill-based assessment, and teachers as social mentors.',
    type: 'article',
    publishedTime: '2026-01-28',
    url: 'https://blog.logge.top/posts/education-2-0',
    siteName: 'LMF Blog',
    images: [{ url: 'https://blog.logge.top/images/og/education-2-0.png', width: 1200, height: 630, alt: 'Education 2.0: LLMs Teaching Children' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education 2.0: LLMs Teaching Children',
    description: 'Reimagining education with AI tutors, skill-based assessment, and teachers as social mentors.',
    images: ['https://blog.logge.top/images/og/education-2-0.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
