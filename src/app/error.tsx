'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="mb-8">
        <Image
          src="/images/http-cat-500.jpg"
          alt="500 - Internal Server Error"
          className="rounded-lg border border-border mx-auto"
          width={750}
          height={600}
        />
      </div>

      <h1 className="text-2xl font-semibold text-foreground mb-4">
        Something Went Wrong
      </h1>

      <p className="text-muted mb-8">
        An unexpected error occurred. Please try again.
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition-colors"
        >
          Try Again
        </button>

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
    </div>
  )
}
