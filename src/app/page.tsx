import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { PostList } from '@/components/PostList'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-3xl font-semibold text-primary mb-4">
          LMF Blog
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          Thoughts on AI, technology, and the things I build.
          For timeless concepts, see the{' '}
          <Link href="https://learn.logge.top" className="text-primary hover:text-primary-light underline underline-offset-2">
            Learn Guide
          </Link>.
        </p>
      </section>

      {/* Posts with filtering */}
      <PostList posts={posts} />
    </div>
  )
}
