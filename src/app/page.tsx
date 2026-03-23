import { getAllPosts } from '@/lib/posts'
import { PostList } from '@/components/PostList'
import { WebSiteJsonLd } from '@/components/JsonLd'
import { HomeHero } from '@/components/HomeHero'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <WebSiteJsonLd />
      <HomeHero />

      {/* Posts with filtering */}
      <PostList posts={posts} />
    </div>
  )
}
