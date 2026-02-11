import type { MetadataRoute } from 'next'
import { tsxPosts, SITE_URL } from '@/lib/post-meta'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = tsxPosts
    .filter(p => p.isPage)
    .map(post => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: new Date(post.modifiedDate || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts,
  ]
}
