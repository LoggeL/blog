import { generatePostMetadata } from '@/lib/posts'

export const metadata = generatePostMetadata('education-2-0')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
