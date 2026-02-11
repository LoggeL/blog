import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('education-2-0')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('education-2-0')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
