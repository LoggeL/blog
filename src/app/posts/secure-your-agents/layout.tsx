import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('secure-your-agents')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('secure-your-agents')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
