import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('gemini-3-flash-context')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('gemini-3-flash-context')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
