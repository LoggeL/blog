import fs from 'fs'
import path from 'path'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  isPage?: boolean  // TSX page-based post
}

// TSX-based posts (rendered as pages, not markdown)
const tsxPosts: Omit<Post, 'content'>[] = [
  {
    slug: 'kimi-k25-breakthrough',
    title: 'Kimi K2.5: Why This Open-Source Model is a Breakthrough',
    date: '2026-01-31',
    excerpt: "Moonshot AI's 1 trillion parameter model brings video-to-code, agent swarms, and #1 intelligence ranking to open source.",
    isPage: true,
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

    // Parse front matter (simple implementation)
    const frontMatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (!frontMatterMatch) {
      return null
    }

    const frontMatter = frontMatterMatch[1]
    const content = frontMatterMatch[2]

    const title = frontMatter.match(/title:\s*["']?(.+?)["']?\s*$/m)?.[1] || slug
    const date = frontMatter.match(/date:\s*["']?(.+?)["']?\s*$/m)?.[1] || ''
    const excerpt = frontMatter.match(/excerpt:\s*["']?(.+?)["']?\s*$/m)?.[1] || ''

    return {
      slug,
      title,
      date,
      excerpt,
      content: content.trim(),
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
