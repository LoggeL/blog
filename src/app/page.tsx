import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-3xl font-semibold text-foreground mb-4">
          LMF Blog
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          Thoughts on AI, technology, and the things we build.
          For timeless concepts, see the{' '}
          <Link href="https://learn.logge.top" className="text-primary-light hover:text-accent underline underline-offset-2">
            Learn Guide
          </Link>.
        </p>
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-sm font-medium text-subtle uppercase tracking-wider mb-6">
          Posts
        </h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/posts/${post.slug}`} className="block">
                <time className="text-sm text-subtle">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="text-xl font-medium text-foreground mt-1 group-hover:text-primary-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-muted">No posts yet. Check back soon.</p>
        )}
      </section>
    </div>
  )
}
