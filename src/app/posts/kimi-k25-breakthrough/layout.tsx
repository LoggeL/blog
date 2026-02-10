import { generatePostMetadata } from '@/lib/posts'

export const metadata = generatePostMetadata('kimi-k25-breakthrough')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
