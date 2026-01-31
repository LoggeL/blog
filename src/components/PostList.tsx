'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Post, Category, categoryLabels } from '@/lib/types'

interface PostListProps {
  posts: Post[]
}

// Illustrative SVG images for posts
const PostIllustrations: Record<string, React.ReactNode> = {
  // Robot with multiple agents/swarm pattern
  robot: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Central AI brain */}
      <rect x="28" y="25" width="24" height="20" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="35" cy="35" r="2" fill="currentColor" />
      <circle cx="45" cy="35" r="2" fill="currentColor" />
      <path d="M35 40h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 25v-5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />

      {/* Agent nodes */}
      <circle cx="15" cy="20" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <circle cx="65" cy="20" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <circle cx="15" cy="55" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <circle cx="65" cy="55" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <circle cx="40" cy="65" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />

      {/* Connections */}
      <path d="M21 23L28 28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M59 23L52 28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M21 52L28 42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M59 52L52 42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M40 45L40 59" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  ),

  // Education/learning illustration
  graduation: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Student figure */}
      <circle cx="25" cy="25" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 33v12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 55L25 45L30 55" stroke="currentColor" strokeWidth="1.5" />

      {/* AI tutor screen */}
      <rect x="42" y="18" width="28" height="22" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="56" cy="26" r="4" stroke="currentColor" strokeWidth="1" />
      <path d="M52 34h8" stroke="currentColor" strokeWidth="1" />

      {/* Knowledge/skill nodes */}
      <rect x="15" y="60" width="12" height="12" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <rect x="34" y="60" width="12" height="12" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <rect x="53" y="60" width="12" height="12" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />

      {/* Connection lines */}
      <path d="M35 29L42 29" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M25 45L21 60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M25 45L40 60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M56 40L59 60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),

  // Context/memory length visualization
  sparkles: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Long document stack */}
      <rect x="10" y="15" width="25" height="50" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 25h15M15 32h15M15 39h15M15 46h10M15 53h12" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Processing arrows */}
      <path d="M38 40h10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M45 36l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* AI model */}
      <circle cx="60" cy="40" r="12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="6" fill="currentColor" fillOpacity="0.3" />
      <circle cx="60" cy="40" r="2" fill="currentColor" />

      {/* Perfect score indicator */}
      <path d="M55 55L58 58L66 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Context tokens */}
      <rect x="52" y="18" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="58" y="18" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="64" y="18" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
    </svg>
  ),

  // Default document icon
  document: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M50 15H22a4 4 0 00-4 4v42a4 4 0 004 4h36a4 4 0 004-4V27L50 15z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 15v12h12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 35h24M28 45h24M28 55h16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
}

const categoryColors: Record<Category, { bg: string; text: string }> = {
  analysis: { bg: 'bg-blue-500/10', text: 'text-blue-600' },
  til: { bg: 'bg-primary/10', text: 'text-primary' },
  tutorial: { bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
  news: { bg: 'bg-amber-500/10', text: 'text-amber-600' },
  opinion: { bg: 'bg-violet-500/10', text: 'text-violet-600' },
}

const iconColors: Record<Category, string> = {
  analysis: 'text-blue-500',
  til: 'text-primary',
  tutorial: 'text-emerald-500',
  news: 'text-amber-500',
  opinion: 'text-violet-500',
}

export function PostList({ posts }: PostListProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')

  const categories: (Category | 'all')[] = ['all', 'analysis', 'til', 'tutorial', 'news', 'opinion']

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
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-surface text-muted hover:bg-border hover:text-foreground'
            }`}
          >
            {cat === 'all' ? 'All' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {filteredPosts.map((post) => {
          const colors = categoryColors[post.category]
          const iconColor = iconColors[post.category]
          const illustration = post.icon ? PostIllustrations[post.icon] : PostIllustrations.document

          return (
            <article key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block p-5 rounded-2xl border border-border bg-surface/50 hover:bg-surface hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex gap-5">
                  {/* Illustration */}
                  <div className={`flex-shrink-0 w-20 h-20 rounded-xl ${colors.bg} ${iconColor} p-2 group-hover:scale-105 transition-transform duration-300`}>
                    {illustration}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${colors.bg} ${colors.text}`}>
                        {categoryLabels[post.category]}
                      </span>
                      <time className="text-xs text-muted">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-muted mt-1.5 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 text-muted opacity-30">
            <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="35" cy="35" r="20" />
              <path d="M50 50l15 15" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-muted">No posts found.</p>
        </div>
      )}
    </section>
  )
}
