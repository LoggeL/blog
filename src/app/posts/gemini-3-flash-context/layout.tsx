import { generatePostMetadata } from '@/lib/posts'

export const metadata = generatePostMetadata('gemini-3-flash-context')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
