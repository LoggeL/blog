import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('cheap-intelligence')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('cheap-intelligence')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
