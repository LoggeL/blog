import { generatePostMetadata } from '@/lib/posts'

export const metadata = generatePostMetadata('real-heroes-local-ai')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
