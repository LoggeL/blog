import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('real-heroes-local-ai')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('real-heroes-local-ai')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
