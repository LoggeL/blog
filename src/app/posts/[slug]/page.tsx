import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'

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
  }
}

// Simple markdown to HTML converter
// Note: Content is from trusted local markdown files only
function markdownToHtml(markdown: string): string {
  let html = markdown
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
        block.startsWith('<li')
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

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all posts
      </Link>

      {/* Post header */}
      <header className="mb-12">
        <time className="text-sm text-subtle">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="text-3xl font-semibold text-foreground mt-2">
          {post.title}
        </h1>
      </header>

      {/* Post content - trusted local markdown only */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  )
}
