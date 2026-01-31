# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
```

## Architecture

Minimalist Next.js 15 blog with markdown posts.

### Key Directories
- `content/posts/` - Markdown blog posts with frontmatter (title, date, excerpt)
- `src/app/` - Next.js App Router pages
- `src/lib/posts.ts` - Post fetching utilities

### Adding Posts

Create a markdown file in `content/posts/`:

```markdown
---
title: Post Title
date: 2025-01-31
excerpt: Short description for the post list.
---

Post content here...
```

Posts are automatically listed on the home page sorted by date (newest first).

## Styling

Light theme with CSS custom properties in `globals.css`. Key classes:
- `text-foreground` / `text-muted` / `text-subtle` - Text colors
- `bg-surface` / `bg-surface-elevated` - Card backgrounds
- `border-border` - Subtle borders
- `.prose` - Blog post content styling
- `.notice` - Callout boxes

## Deployment

Deployed via Dokploy using Dockerfile. Auto-deploys on push to main.

- **URL**: https://blog.logge.top
- **Build**: `output: "standalone"` in next.config.ts
