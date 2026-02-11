import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { Post, Category } from './types'
import { tsxPosts, SITE_NAME, SITE_URL } from './post-meta'

export { categoryLabels } from './types'
export type { Post, Category } from './types'
export { getTsxPostMeta, formatPostDate } from './post-meta'
export type { TsxPostMeta } from './post-meta'

/** Generate Next.js Metadata object from a TSX post's metadata */
export function generatePostMetadata(slug: string): Metadata {
  const post = tsxPosts.find(p => p.slug === slug)
  if (!post) throw new Error(`No TSX post metadata found for slug: ${slug}`)

  const ogImageUrl = post.ogImage ? `${SITE_URL}${post.ogImage}` : undefined

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      ...(post.modifiedDate && { modifiedTime: post.modifiedDate }),
      url: `${SITE_URL}/posts/${post.slug}`,
      siteName: SITE_NAME,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  }
}

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
