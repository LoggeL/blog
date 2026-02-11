import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('software-projects-ai-age')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('software-projects-ai-age')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
