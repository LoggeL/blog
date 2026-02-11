import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('kimi-k25-breakthrough')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('kimi-k25-breakthrough')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
