import { generatePostMetadata } from '@/lib/posts'
export const metadata = generatePostMetadata('secure-your-agents')
export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
