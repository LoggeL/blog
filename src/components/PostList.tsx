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

  // Education/learning - simple book with lightbulb
  graduation: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Open book */}
      <path d="M40 25v35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 25c-5-3-15-3-22 0v35c7-3 17-3 22 0" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 25c5-3 15-3 22 0v35c-7-3-17-3-22 0" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      {/* Lightbulb above */}
      <circle cx="40" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M37 18h6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 8v-3" stroke="currentColor" strokeWidth="1" />
      <path d="M35 7l-2-2" stroke="currentColor" strokeWidth="1" />
      <path d="M45 7l2-2" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),

  // Context length - simple expanding bars
  sparkles: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Stacked bars representing context */}
      <rect x="15" y="55" width="50" height="8" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="42" width="50" height="8" rx="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="29" width="50" height="8" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="16" width="50" height="8" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* 100% indicator */}
      <circle cx="58" cy="20" r="5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      <path d="M55 20l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          const isOpinion = post.category === 'opinion'

          return (
            <article key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className={`group block p-5 rounded-2xl border transition-all duration-300
                  ${isOpinion
                    ? 'border-violet-500/30 bg-gradient-to-r from-violet-500/5 to-transparent hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10'
                    : 'border-border bg-surface/50 hover:bg-surface hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5'
                  }`}
              >
                <div className="flex gap-5">
                  {/* Illustration */}
                  <div className={`flex-shrink-0 w-20 h-20 rounded-xl ${colors.bg} ${iconColor} p-2 group-hover:scale-105 transition-transform duration-300`}>
                    {illustration}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${colors.bg} ${colors.text}`}>
                        {categoryLabels[post.category]}
                      </span>
                      {post.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                      <time className="text-xs text-muted ml-auto">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>

                    <h3 className={`text-lg font-semibold transition-colors leading-snug
                      ${isOpinion
                        ? 'text-foreground group-hover:text-violet-600'
                        : 'text-foreground group-hover:text-primary'
                      }`}>
                      {post.title}
                    </h3>

                    <p className="text-muted mt-1.5 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className={`w-5 h-5 ${isOpinion ? 'text-violet-500' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
