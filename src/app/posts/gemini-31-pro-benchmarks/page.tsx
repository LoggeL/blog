'use client'

import Link from 'next/link'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('gemini-31-pro-benchmarks')!

export default function GeminiBenchmarksPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-12">
        <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          Gemini 3.1 Pro is, by many measures, the most capable AI model ever released. It tops <strong>13 out of 16</strong> industry
          benchmarks. It more than doubled its predecessor&apos;s score on ARC-AGI-2. It dominates coding, science, and agentic tasks.
        </p>
        <p>
          And yet, if you ask people which model is &quot;best,&quot; you&apos;ll get five different answers. That&apos;s not because people
          are confused. It&apos;s because benchmarks are broken.
        </p>

        <h2>The Benchmark Crisis</h2>
        <p>
          Here&apos;s what changed: <strong>post-training now eats roughly 80% of total compute.</strong> The pre-training phase&mdash;where
          a model ingests the internet and learns general patterns&mdash;used to be the whole game. Now it&apos;s just the foundation.
          The real differentiation happens after, when models get fine-tuned, RLHF&apos;d, and optimized for specific domains.
        </p>
        <p>
          This means a model can be surgically optimized to crush a particular benchmark without becoming generally smarter. Excelling
          at coding doesn&apos;t mean excelling at creative writing. Dominating science questions doesn&apos;t mean dominating
          real-world enterprise tasks. The correlation between &quot;high benchmark score&quot; and &quot;better model&quot; has quietly
          decoupled.
        </p>
        <p>
          The chess example makes this visceral: <strong>Opus 4.6 scores around 10% on chess puzzles, while the older
          Sonnet 4.5 hits 12%.</strong> Nobody in their right mind would argue Sonnet 4.5 is a better model than Opus 4.6. But if you
          judged purely by that benchmark, you&apos;d reach exactly that conclusion. General reasoning ability is no longer uniform
          across domains&mdash;it&apos;s lumpy, uneven, and shaped by where training compute was allocated.
        </p>

        <h2>Gemini 3.1 Pro: Where It Shines</h2>
        <p>
          Credit where it&apos;s due&mdash;Gemini 3.1 Pro is genuinely impressive in specific areas.
        </p>
        <table>
          <thead>
            <tr><th>Benchmark</th><th>Gemini 3.1 Pro</th><th>Opus 4.6</th><th>GPT-5.2</th></tr>
          </thead>
          <tbody>
            <tr><td>ARC-AGI-2</td><td><strong>77.1%</strong></td><td>37.6%</td><td>54.2%</td></tr>
            <tr><td>GPQA Diamond</td><td><strong>94.3%</strong></td><td>91.3%</td><td>92.4%</td></tr>
            <tr><td>SWE-Bench Verified</td><td><strong>80.6%</strong></td><td>72.6%</td><td>-</td></tr>
            <tr><td>APEX-Agents</td><td><strong>33.5%</strong></td><td>29.8%</td><td>23.0%</td></tr>
            <tr><td>HLE (no tools)</td><td><strong>44.4%</strong></td><td>41.2%</td><td>34.5%</td></tr>
          </tbody>
        </table>
        <p>
          That ARC-AGI-2 jump is staggering&mdash;more than double its predecessor&apos;s 31.1%. The SWE-Bench score puts it ahead
          of every competitor on real-world GitHub issue resolution. And it achieves all of this at the same $2/M input token price
          as Gemini 3 Pro. Performance-per-dollar, nothing else comes close.
        </p>

        <h2>Where It Doesn&apos;t</h2>
        <p>
          Now look at what Google <em>didn&apos;t</em> lead with.
        </p>
        <table>
          <thead>
            <tr><th>Benchmark</th><th>Gemini 3.1 Pro</th><th>Best Competitor</th></tr>
          </thead>
          <tbody>
            <tr><td>HLE (with tools)</td><td>51.4%</td><td><strong>53.1%</strong> (Opus 4.6)</td></tr>
            <tr><td>GDPval-AA</td><td>1317</td><td><strong>1633</strong> (Sonnet 4.6)</td></tr>
            <tr><td>Terminal-Bench 2.0</td><td>68.5%</td><td><strong>77.3%</strong> (GPT-5.3-Codex)</td></tr>
          </tbody>
        </table>
        <p>
          The GDPval-AA gap is striking&mdash;it&apos;s a measure of broad enterprise task performance, and Sonnet 4.6 beats
          Gemini 3.1 Pro by nearly 300 points. When you give models actual tools to use (HLE with tools), Opus 4.6 edges ahead.
          And on terminal-based coding tasks, GPT-5.3-Codex still leads comfortably.
        </p>
        <p>
          Then there&apos;s the hallucination problem. Gemini 3.1 Pro has improved dramatically&mdash;dropping from an 88%
          hallucination rate (Gemini 3 Pro) to about 50%. But that still means <strong>half of its wrong answers are confidently
          wrong</strong>, not uncertain. It doesn&apos;t say &quot;I&apos;m not sure.&quot; It states falsehoods with conviction.
          Claude and GLM-5 are notably better at expressing uncertainty when they don&apos;t know something.
        </p>

        <h2>Welcome to the Vibe Era</h2>
        <p>
          So which model is best? That&apos;s the wrong question now.
        </p>
        <p>
          We&apos;ve entered what you might call the <strong>vibe era</strong> of AI evaluation. Every major model excels at something
          and falls flat at something else. Gemini 3.1 Pro is the best reasoning model. Opus 4.6 is the best tool-using model.
          Sonnet 4.6 dominates enterprise workflows. GPT-5.3-Codex leads terminal coding. No single benchmark captures any of this.
        </p>
        <p>
          The old framework was simple: bigger model + more data = better at everything. That framework is dead. Post-training
          specialization has shattered the idea that a single leaderboard can rank models meaningfully. A model that tops 13 of 16
          benchmarks can still be the wrong choice for your specific use case.
        </p>
        <p>
          What should replace benchmarks? Probably nothing universal. The honest answer is: <strong>try the models on your actual
          tasks.</strong> The era of trusting a leaderboard number to tell you which AI to use is over. We&apos;re going to have to
          vibe it out.
        </p>

        <hr />

        <p>
          <strong>Sources:</strong>
        </p>
        <ul>
          <li><a href="https://youtu.be/2_DPnzoiHaY">AI Explained: Gemini 3.1 Pro and the Downfall of Benchmarks</a></li>
          <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/">Google: Gemini 3.1 Pro announcement</a></li>
          <li><a href="https://deepmind.google/models/model-cards/gemini-3-1-pro/">Google DeepMind: Gemini 3.1 Pro Model Card</a></li>
        </ul>
      </article>
    </div>
  )
}
