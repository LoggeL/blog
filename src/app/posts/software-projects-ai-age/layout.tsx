import { generatePostMetadata } from '@/lib/posts'

export const metadata = generatePostMetadata('software-projects-ai-age')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
