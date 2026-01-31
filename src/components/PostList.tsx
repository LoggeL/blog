'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Post, Category, categoryLabels } from '@/lib/types'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')

  const categories: (Category | 'all')[] = ['all', 'analysis', 'til', 'tutorial', 'news']

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-subtle focus:outline-none focus:border-primary"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface text-muted hover:bg-border'
            }`}
          >
            {cat === 'all' ? 'All' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="flex items-center gap-3 mb-1">
                <time className="text-sm text-primary">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  post.category === 'til' ? 'bg-primary/10 text-primary' :
                  post.category === 'analysis' ? 'bg-accent/10 text-accent' :
                  post.category === 'tutorial' ? 'bg-emerald-500/10 text-emerald-600' :
                  'bg-surface text-muted'
                }`}>
                  {categoryLabels[post.category]}
                </span>
              </div>
              <h3 className="text-xl font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted mt-2 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-muted">No posts found.</p>
      )}
    </section>
  )
}
