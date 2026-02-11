// Client-safe post metadata — single source of truth
// This file has NO Node.js dependencies (no fs, path, etc.)

import type { Category } from './types'

export interface TsxPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: Category
  tags?: string[]
  isPage?: boolean
  icon?: string
  ogImage?: string
  modifiedDate?: string
}

export const SITE_NAME = 'LMF Blog'
export const SITE_URL = 'https://blog.logge.top'

export const tsxPosts: TsxPostMeta[] = [
  {
    slug: 'seedance-2',
    title: 'Seedance 2.0: Stock Footage Is Dead',
    date: '2026-02-11',
    excerpt: 'Seedance 2.0 doesn\'t just beat Sora, Veo, and Kling — it makes them look like last year\'s tech. The real story is what this means for video production, VFX jobs, and trust in visual media.',
    category: 'opinion',
    tags: ['AI', 'Video', 'Outlook'],
    isPage: true,
    icon: 'video',
  },
  {
    slug: 'secure-your-agents',
    title: 'How to Secure Your Agents',
    date: '2026-02-11',
    excerpt: 'A practical guide to securing AI agents — from prompt hardening to honey pot tools. Seven defense layers for every threat model.',
    category: 'tutorial',
    tags: ['Security', 'AI', 'Agents'],
    isPage: true,
    icon: 'shield',
  },
  {
    slug: 'cheap-intelligence',
    title: 'When Intelligence Becomes Dirt Cheap',
    date: '2026-02-10',
    excerpt: 'What happens to society when the cost of thinking approaches zero. White collar, blue collar, education, and the three possible futures.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'globe',
    ogImage: '/images/og/cheap-intelligence.png',
  },
  {
    slug: 'real-heroes-local-ai',
    title: 'The Real Heroes of Local AI',
    date: '2026-02-09',
    excerpt: 'The engineers and projects doing the actual work that makes running LLMs on consumer hardware possible — and why they deserve more credit.',
    category: 'opinion',
    tags: ['AI', 'Open Source'],
    isPage: true,
    icon: 'hero',
    ogImage: '/images/og/real-heroes-local-ai.png',
  },
  {
    slug: 'software-projects-ai-age',
    title: 'Software Projects in the AI Age (2027–2028)',
    date: '2026-02-08',
    excerpt: 'How software teams will restructure around AI agents: three project tiers, shifting skills, and the junior engineer problem.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'code',
    ogImage: '/images/og/software-projects-ai-age.png',
  },
  {
    slug: 'kimi-k25-breakthrough',
    title: 'Kimi K2.5: 1T Open-Source Model with Agent Swarms',
    date: '2026-01-30',
    modifiedDate: '2026-02-10',
    excerpt: "Moonshot AI's 1 trillion parameter model with video-to-code, agent orchestration, and strong benchmark scores.",
    category: 'analysis',
    isPage: true,
    icon: 'microscope',
    ogImage: '/images/og/kimi-k25-breakthrough.png',
  },
  {
    slug: 'education-2-0',
    title: 'Education 2.0: LLMs Teaching Children',
    date: '2026-01-28',
    excerpt: 'Reimagining education with AI tutors, skill-based assessment, and teachers as social mentors.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'graduation',
    ogImage: '/images/og/education-2-0.png',
  },
  {
    slug: 'gemini-3-flash-context',
    title: 'Gemini 3 Flash: Perfect Long Context Scores',
    date: '2026-01-24',
    excerpt: "Gemini 3 Flash Preview achieves 100% on Fiction.LiveBench across all context lengths up to 192k tokens.",
    category: 'til',
    isPage: true,
    icon: 'sparkles',
    ogImage: '/images/og/gemini-3-flash-context.png',
  },
]

/** Get metadata for a TSX post by slug */
export function getTsxPostMeta(slug: string): TsxPostMeta | undefined {
  return tsxPosts.find(p => p.slug === slug)
}

/** Format a date string (YYYY-MM-DD) to a human-readable format */
export function formatPostDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
