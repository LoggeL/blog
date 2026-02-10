import fs from 'fs'
import path from 'path'
import { Post, Category } from './types'

export { categoryLabels } from './types'
export type { Post, Category } from './types'

// TSX-based posts (rendered as pages, not markdown)
const tsxPosts: Omit<Post, 'content'>[] = [
  {
    slug: 'cheap-intelligence',
    title: 'When Intelligence Becomes Dirt Cheap',
    date: '2026-02-10',
    excerpt: 'What happens to society when the cost of thinking approaches zero. White collar, blue collar, education, and the three possible futures.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'robot',
  },
  {
    slug: 'real-heroes-local-ai',
    title: 'The Real Heroes of Local AI',
    date: '2026-02-10',
    excerpt: 'The engineers and projects doing the actual work that makes running LLMs on consumer hardware possible — and why they deserve more credit.',
    category: 'opinion',
    tags: ['AI', 'Open Source'],
    isPage: true,
    icon: 'robot',
  },
  {
    slug: 'software-projects-ai-age',
    title: 'Software Projects in the AI Age (2027–2028)',
    date: '2026-02-08',
    excerpt: 'How software teams will restructure around AI agents: three project tiers, shifting skills, and the junior engineer problem.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'robot',
  },
  {
    slug: 'kimi-k25-breakthrough',
    title: 'Kimi K2.5: 1T Open-Source Model with Agent Swarms',
    date: '2026-01-30',
    excerpt: "Moonshot AI's 1 trillion parameter model with video-to-code, agent orchestration, and strong benchmark scores.",
    category: 'analysis',
    isPage: true,
    icon: 'robot',
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
  },
  {
    slug: 'gemini-3-flash-context',
    title: 'Gemini 3 Flash: Perfect Long Context Scores',
    date: '2026-01-24',
    excerpt: "Gemini 3 Flash Preview achieves 100% on Fiction.LiveBench across all context lengths up to 192k tokens.",
    category: 'til',
    isPage: true,
    icon: 'sparkles',
  },
]

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const mdPosts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug)
    })
    .filter((post): post is Post => post !== null)

  // Combine markdown and TSX posts
  const allPosts = [
    ...mdPosts,
    ...tsxPosts.map(p => ({ ...p, content: '' })),
  ].sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return allPosts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const frontMatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (!frontMatterMatch) {
      return null
    }

    const frontMatter = frontMatterMatch[1]
    const content = frontMatterMatch[2]

    const title = frontMatter.match(/title:\s*["']?(.+?)["']?\s*$/m)?.[1] || slug
    const date = frontMatter.match(/date:\s*["']?(.+?)["']?\s*$/m)?.[1] || ''
    const excerpt = frontMatter.match(/excerpt:\s*["']?(.+?)["']?\s*$/m)?.[1] || ''
    const category = (frontMatter.match(/category:\s*["']?(.+?)["']?\s*$/m)?.[1] || 'news') as Category

    return {
      slug,
      title,
      date,
      excerpt,
      content: content.trim(),
      category,
    }
  } catch {
    return null
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

export function getAllCategories(): Category[] {
  return ['analysis', 'til', 'tutorial', 'news', 'opinion']
}
