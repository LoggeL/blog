import { SITE_NAME, SITE_URL, type TsxPostMeta } from '@/lib/post-meta'

export function BlogPostingJsonLd({ post }: { post: TsxPostMeta }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    url: `${SITE_URL}/posts/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Logge',
      url: 'https://lmf.logge.top',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(post.ogImage && {
      image: `${SITE_URL}${post.ogImage}`,
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/posts/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: 'Thoughts on AI, technology, and building things',
      author: {
        '@type': 'Person',
        name: 'Logge',
        url: 'https://lmf.logge.top',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: SITE_NAME,
      url: SITE_URL,
      description: 'Thoughts on AI, technology, and building things',
      author: {
        '@type': 'Person',
        name: 'Logge',
        url: 'https://lmf.logge.top',
      },
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
