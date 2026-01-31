import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="mb-8">
        <Image
          src="/images/http-cat-404.jpg"
          alt="404 - Not Found"
          className="rounded-lg border border-border mx-auto"
          width={750}
          height={600}
        />
      </div>

      <h1 className="text-2xl font-semibold text-foreground mb-4">
        Page Not Found
      </h1>

      <p className="text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all posts
      </Link>
    </div>
  )
}
