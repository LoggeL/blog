import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('gemini-31-pro-benchmarks')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('gemini-31-pro-benchmarks')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
