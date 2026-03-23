import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { BackLink } from '@/components/BackLink'
import { LocalizedMarkdownPost } from '@/components/LocalizedMarkdownPost'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | LMF Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://blog.logge.top/posts/${slug}`,
      siteName: 'LMF Blog',
      images: [{ url: `https://blog.logge.top/images/og/${slug}.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`https://blog.logge.top/images/og/${slug}.png`],
    },
  }
}

// Simple markdown to HTML converter
// Note: Content is from trusted local markdown files only
function markdownToHtml(markdown: string): string {
  // Process tables first (before other transformations)
  const tableRegex = /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g
  let html = markdown.replace(tableRegex, (_, header, body) => {
    const headers = header.split('|').filter((h: string) => h.trim()).map((h: string) => `<th>${h.trim()}</th>`).join('')
    const rows = body.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cells}</tr>`
    }).join('')
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`
  })

  html = html
    // Images (before links to avoid conflicts)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Lists
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    // Paragraphs (simple approach)
    .split('\n\n')
    .map((block) => {
      block = block.trim()
      if (!block) return ''
      if (
        block.startsWith('<h') ||
        block.startsWith('<pre') ||
        block.startsWith('<hr') ||
        block.startsWith('<li') ||
        block.startsWith('<table') ||
        block.startsWith('<img')
      ) {
        // Wrap list items
        if (block.includes('<li>')) {
          return `<ul>${block}</ul>`
        }
        return block
      }
      return `<p>${block.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')

  return html
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Content comes from trusted local markdown files in content/posts/
  const contentHtml = markdownToHtml(post.content)
  const deContentHtml = post.contentDE ? markdownToHtml(post.contentDE) : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />
      <LocalizedMarkdownPost
        enContent={contentHtml}
        deContent={deContentHtml}
        enTitle={post.title}
        deTitle={post.titleDE || null}
        enDate={post.date}
      />
    </div>
  )
}
