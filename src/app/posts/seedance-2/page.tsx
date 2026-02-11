'use client'

import Link from 'next/link'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('seedance-2')!

/* ── Video Component ── */

function Video({ src, caption, portrait }: { src: string; caption: string; portrait?: boolean }) {
  return (
    <figure className={`my-8 not-prose ${portrait ? 'max-w-sm mx-auto' : ''}`}>
      <video
        src={src}
        controls
        autoPlay
        muted
        loop
        playsInline
        className="w-full rounded-xl border border-border shadow-lg"
      />
      <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>
    </figure>
  )
}

/* ── Side-by-Side Videos ── */

function VideoCompare({ left, right, captionLeft, captionRight }: {
  left: string; right: string; captionLeft: string; captionRight: string
}) {
  return (
    <div className="my-8 not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
      <figure>
        <video src={left} controls autoPlay muted loop playsInline className="w-full rounded-xl border border-border shadow-lg" />
        <figcaption className="mt-2 text-center text-sm text-muted">{captionLeft}</figcaption>
      </figure>
      <figure>
        <video src={right} controls autoPlay muted loop playsInline className="w-full rounded-xl border border-border shadow-lg" />
        <figcaption className="mt-2 text-center text-sm text-muted">{captionRight}</figcaption>
      </figure>
    </div>
  )
}

export default function SeedancePage() {
  return (
    <article className="prose">
      <header className="mb-8 not-prose">
        <Link href="/" className="text-muted hover:text-foreground text-sm transition-colors">← Back</Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{post.title}</h1>
        <time className="text-muted text-sm">{formatPostDate(post.date)}</time>
      </header>

      <p className="lead">
        ByteDance just dropped Seedance 2.0, and it&apos;s not a marginal improvement. It&apos;s the kind of leap that
        makes Sora, Veo 3, and Kling look like they need a full generational rebuild to even compete. The clips coming
        out of this model are — let me be honest — <em>unreasonably good</em>.
      </p>

      <p>
        Before we talk implications, watch this. Ten seconds, 1080p, single prompt:
      </p>

      <Video
        src="/videos/seedance/demo1.mp4"
        caption="Chase scene — 1080p, 10 seconds, single generation"
      />

      <blockquote className="not-prose my-6 border-l-4 border-[#d90429] pl-4 text-muted italic text-sm">
        <strong>Prompt:</strong> &ldquo;A man flees from a pursuing crowd through a market. He knocks over a fruit stand,
        scattering oranges. Close-up of his panicked face. Handheld camera, motion blur, natural lighting.&rdquo;
      </blockquote>

      <p>
        The physics of the falling fruit, the camera shake, the motion blur on the crowd — this isn&apos;t &ldquo;pretty
        good for AI.&rdquo; This is <em>indistinguishable from a real shoot</em> at casual viewing distance. A year ago,
        AI video meant warped fingers and melting faces. Now it&apos;s producing B-roll that would pass review at any
        production house.
      </p>

      <h2>The Cola Ad That Shouldn&apos;t Exist</h2>

      <Video
        src="/videos/seedance/demo2.mp4"
        caption="Cola commercial — 720p, 8 seconds"
      />

      <blockquote className="not-prose my-6 border-l-4 border-[#d90429] pl-4 text-muted italic text-sm">
        <strong>Prompt:</strong> &ldquo;A character inside a Renaissance painting reaches out and grabs a Cola can from
        outside the frame. A cowboy leans in and steals it. Cinematic lighting, shallow depth of field.&rdquo;
      </blockquote>

      <p>
        This is an <em>ad concept</em>. A creative director at an agency would pitch exactly this kind of thing, and
        it would take a VFX team two weeks and $50k to produce. Seedance spat it out in minutes.
      </p>

      <h2>Camera Control — The Quiet Revolution</h2>

      <p>
        What separates Seedance 2.0 from everything else isn&apos;t just visual quality — it&apos;s <strong>controllability</strong>.
        You can feed it a reference camera movement and it replicates the motion in generated footage:
      </p>

      <VideoCompare
        left="/videos/seedance/demo3.mp4"
        right="/videos/seedance/demo4.mp4"
        captionLeft="Portrait mode — camera control demo"
        captionRight="Landscape — reference movement → generated"
      />

      <p>
        This is what directors actually need. Not just &ldquo;generate me a pretty clip&rdquo; but &ldquo;give me this
        exact camera move on this subject.&rdquo; That&apos;s the difference between a toy and a tool.
      </p>

      <h2>The Compilation Reel</h2>

      <Video
        src="/videos/seedance/demo5.mp4"
        caption="Seedance 2.0 compilation — various styles and subjects"
      />

      <p>
        <strong>Mandatory honesty:</strong> These are cherry-picked demos. ByteDance is showing their best outputs, not
        the average case. Every AI lab does this. The average generation is worse than what you see here. But even
        accounting for cherry-picking, the ceiling has moved dramatically.
      </p>

      <h2>Who Dies, Who Thrives</h2>

      <p>
        Let&apos;s stop dancing around it. Here&apos;s what Seedance-level AI video actually kills:
      </p>

      <h3>Stock Footage Is Dead</h3>

      <p>
        Shutterstock, Getty, Adobe Stock — their video licensing business is walking dead. Why pay $200 for a
        &ldquo;business team in meeting room&rdquo; clip when you can generate exactly what you need, with exact framing,
        exact lighting, exact mood? The stock footage industry survived AI image generation because video was still hard.
        That moat just evaporated.
      </p>

      <h3>VFX Gets Restructured</h3>

      <p>
        Entry-level VFX compositing, rotoscoping, basic motion graphics — these jobs are going to compress hard.
        But senior creative directors, people with <em>taste</em> and vision? They&apos;re about to become 10x more
        productive. The bottleneck shifts from &ldquo;can we produce this?&rdquo; to &ldquo;should we produce this?&rdquo;
      </p>

      <h3>Solo Creators Get Superpowers</h3>

      <p>
        What took a 10-person team — director, DP, gaffer, grip, editor, colorist, VFX artist, sound designer, producer,
        PA — a solo creator with good taste and good prompts can now approximate. Not replace entirely. But approximate
        well enough for YouTube, social media, and indie projects.
      </p>

      <h3>Advertising Costs Collapse</h3>

      <p>
        A 30-second commercial that cost $500k in production? The production part drops to near-zero. The creative
        direction, strategy, and media buy stay expensive. But the actual <em>making of the video</em> becomes trivially
        cheap. Agencies that charged for production will need to charge for ideas instead.
      </p>

      <h3>Corporate Video Goes DIY</h3>

      <p>
        Training videos, product demos, onboarding content, internal comms — no more booking a camera crew for B-roll.
        Marketing teams will generate it at their desks. The corporate video production industry ($20B+) is about to get
        compressed into a software subscription.
      </p>

      <h3>Film Previs Becomes Film</h3>

      <p>
        Directors currently storyboard with sketches or basic 3D previs. When you can storyboard with
        actual <em>video</em> — photorealistic, with camera control — the line between previs and final output blurs.
        For some shots, the AI generation <em>is</em> the final output.
      </p>

      <h2>The New Bottleneck: Taste</h2>

      <p>
        When production capacity is infinite and free, the only thing that matters is <strong>creative direction</strong>.
        Knowing <em>what</em> to make. Having the taste to recognize good from great. Understanding story, composition,
        pacing — the stuff that can&apos;t be prompted.
      </p>

      <p>
        This is the great equalizer and the great filter at the same time. Everyone gets the same tools. The people who
        win are the ones who know what to build with them.
      </p>

      <h2>The Trust Problem</h2>

      <p>
        Here&apos;s the part nobody in AI video wants to talk about: when generated clips are indistinguishable from
        reality, <strong>every video becomes suspect</strong>.
      </p>

      <p>
        We already can&apos;t trust images. We&apos;re about to not be able to trust video either. That chase scene at
        the top of this post? It could be a real protest. It could be a deepfake of a political event that never happened.
        You genuinely cannot tell.
      </p>

      <p>
        Content provenance standards (C2PA and friends) exist but adoption is glacial. We&apos;re racing toward a world
        where seeing is no longer believing, and the infrastructure for verification isn&apos;t ready. This isn&apos;t a
        theoretical concern — it&apos;s a 2026 problem.
      </p>

      <h2>The Scoreboard</h2>

      <p>
        Let me be direct, since most coverage won&apos;t be: <strong>Seedance 2.0 is the best video generation model
        available right now.</strong> It&apos;s not close. Sora feels like a tech demo by comparison. Veo 3 has good
        audio sync but worse visual quality. Kling 2.0 is respectable but a tier below.
      </p>

      <p>
        The other labs need a full new iteration to match this — not a point release, a generational leap. ByteDance has
        pulled ahead decisively, and they did it with a model that also offers camera control, which none of the
        competitors have at this level.
      </p>

      <p>
        The gap will close — it always does. But right now, if you&apos;re doing anything with AI video, Seedance 2.0 is
        the benchmark everyone else is chasing.
      </p>
    </article>
  )
}
