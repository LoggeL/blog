# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
```

## Publishing New Content

**Just push to main.** Auto-deploy is configured—no Dokploy interaction needed.

### Option 1: TSX Page (Recommended for complex posts)

Create `src/app/posts/[slug]/page.tsx`:

```tsx
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Post Title | LMF Blog',
  description: 'Post excerpt for SEO.',
}

export default function PostPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-12">
        <time className="text-sm text-subtle">January 31, 2026</time>
        <h1 className="text-3xl font-semibold text-foreground mt-2">Post Title</h1>
      </header>

      <article className="prose">
        <p>Content here...</p>
        <h2>Section</h2>
        <table>
          <thead><tr><th>Col 1</th><th>Col 2</th></tr></thead>
          <tbody><tr><td>Data</td><td>Data</td></tr></tbody>
        </table>
        <Image src="/images/example.png" alt="Description" width={800} height={400} className="rounded-lg border border-border my-6" />
      </article>
    </div>
  )
}
```

Then register in `src/lib/posts.ts` under `tsxPosts`:

```typescript
const tsxPosts: Omit<Post, 'content'>[] = [
  {
    slug: 'your-post-slug',
    title: 'Post Title',
    date: '2026-01-31',
    excerpt: 'Short description for the post list.',
    isPage: true,
  },
  // ... existing posts
]
```

### Option 2: Markdown (Simple posts only)

Create `content/posts/your-post.md`:

```markdown
---
title: Post Title
date: 2026-01-31
excerpt: Short description for the post list.
---

Content with **bold**, *italic*, `code`, and [links](url).

Use HTML for tables and images:
<table>...</table>
<img src="/images/example.png" alt="Description" />
```

### Images

1. Add images to `public/images/`
2. Reference as `/images/filename.png`

### Publishing Workflow

```bash
npm run build              # Verify build passes
git add -A
git commit -m "Add post: Title"
git push                   # Auto-deploys to blog.logge.top
```

## Architecture

Next.js 15 blog with TSX pages and markdown support.

### Key Files
- `src/app/posts/*/page.tsx` - TSX post pages
- `src/lib/posts.ts` - Post registry (tsxPosts array + markdown loader)
- `content/posts/*.md` - Simple markdown posts
- `public/images/` - Post images
- `src/app/feed.xml/route.ts` - RSS feed

### Features
- Light theme
- RSS at `/feed.xml`
- Tables, images, code blocks in prose
- Auto-sorted by date (newest first)

## Styling

CSS custom properties in `globals.css`:
- `text-foreground` / `text-muted` / `text-subtle` - Text colors
- `bg-surface` / `bg-surface-elevated` - Backgrounds
- `.prose` - Blog post content (handles h2, p, ul, table, img, code, a)

## URLs

- **Blog**: https://blog.logge.top
- **RSS**: https://blog.logge.top/feed.xml
