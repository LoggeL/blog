import { generatePostMetadata } from '@/lib/posts'
import { getTsxPostMeta } from '@/lib/post-meta'
import { BlogPostingJsonLd } from '@/components/JsonLd'

export const metadata = generatePostMetadata('nemoclaw-nvidia-openclaw')

export default function Layout({ children }: { children: React.ReactNode }) {
  const post = getTsxPostMeta('nemoclaw-nvidia-openclaw')!
  return (
    <>
      <BlogPostingJsonLd post={post} />
      {children}
    </>
  )
}
