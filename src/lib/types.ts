export type Category = 'analysis' | 'til' | 'tutorial' | 'news' | 'opinion'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category: Category
  isPage?: boolean
  icon?: string // SVG icon identifier
}

export const categoryLabels: Record<Category, string> = {
  analysis: 'Analysis',
  til: 'TIL',
  tutorial: 'Tutorial',
  news: 'News',
  opinion: 'Opinion',
}
