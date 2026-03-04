'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('openclaw-changed-everything')!

/* ── Architecture Flow Diagram ── */
const layers = [
  {
    label: 'You',
    sublabel: 'Voice message while driving',
    color: '#6366f1',
    icon: '🎙️',
  },
  {
    label: 'Telegram / Signal / WhatsApp',
    sublabel: 'Any messaging surface you already use',
    color: '#8b5cf6',
    icon: '📱',
  },
  {
    label: 'OpenClaw Gateway',
    sublabel: 'Routes, transcribes, manages sessions',
    color: '#a78bfa',
    icon: '⚡',
  },
  {
    label: 'Model (Sonnet / Opus / Gemini)',
    sublabel: 'Thinks, decides, acts',
    color: '#c4b5fd',
    icon: '🧠',
  },
  {
    label: 'Tools & Skills',
    sublabel: 'Git, Cron, SSH, APIs, Browser…',
    color: '#ddd6fe',
    icon: '🔧',
  },
]

/* ── Timeline of "aha" moments ── */
const moments = [
  {
    date: 'Week 1',
    title: 'Just a chatbot wrapper',
    description:
      'Honestly thought this was just a Telegram bot with a system prompt. Useful for quick questions. Nothing special.',
    sentiment: 0,
  },
  {
    date: 'Week 2',
    title: 'It remembers things',
    description:
      'I mentioned a project once in passing. Two days later, without me prompting it, it referenced the context correctly. Slightly unsettling.',
    sentiment: 30,
  },
  {
    date: 'Week 3',
    title: 'It does things while I sleep',
    description:
      "Set up a morning infra check. Woke up to a voice message summary of what's broken. Didn't write a single cron job.",
    sentiment: 65,
  },
  {
    date: 'Week 4',
    title: 'It builds its own tools',
    description:
      "Told it to add a feature to itself. It read the codebase, wrote the skill file, tested it, and deployed. I just said 'yes' a few times.",
    sentiment: 85,
  },
  {
    date: 'Week 6',
    title: 'Security test: 5 hackers, 0 breaches',
    description:
      'Invited friends to try to jailbreak it. Social engineering, prompt injection, persona tricks. Nothing worked — just from careful prompt design.',
    sentiment: 95,
  },
  {
    date: 'Now',
    title: 'Infrastructure runs itself',
    description:
      'Multiple clients, isolated memory per person, cron-spawned agents doing research, image gen, code reviews. I mostly just talk to it.',
    sentiment: 100,
  },
]

/* ── "What it does" comparison ── */
const capabilities = [
  {
    category: 'DevOps',
    traditional: 'Write cron jobs, deploy scripts, check dashboards manually',
    openclaw: 'Say "check if everything is green each morning" — it sets up the cron, runs the check, and voices the result',
  },
  {
    category: 'Security',
    traditional: 'Implement role-based access, write middleware, maintain allow-lists in code',
    openclaw: 'Describe in plain text who can do what. The model enforces it — resistant to injection, tested by real humans',
  },
  {
    category: 'Memory',
    traditional: 'Database schemas, user profiles, session state, manual lookups',
    openclaw: 'It reads and writes markdown files. Builds its own knowledge graph. Updates context automatically after every conversation',
  },
  {
    category: 'Multi-agent',
    traditional: 'Orchestration frameworks, message queues, complex routing logic',
    openclaw: 'Say "spawn an agent to do X, report back when done" — the model figures out the rest',
  },
  {
    category: 'Self-modification',
    traditional: 'Version-controlled config changes, PR review, deploy pipeline',
    openclaw: 'Prompt against the framework itself. It modifies its own SOUL.md, skills, and tools. You approve what you want to keep',
  },
]

export default function PostPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [activeMoment, setActiveMoment] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-12">
        <time className="text-sm text-subtle">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-foreground mt-2">{post.title}</h1>
        <p className="mt-3 text-muted">{post.excerpt}</p>
      </header>

      <article className="prose">
        <p>
          I didn&apos;t expect to write this post. A few months ago, I would have rolled my eyes at anyone claiming an AI tool
          &ldquo;changed their life.&rdquo; But here I am. <strong>OpenClaw genuinely changed how I work.</strong>
        </p>

        <p>
          Not in the vague &ldquo;I use AI to write emails now&rdquo; sense. In the specific, concrete sense that I can speak into my
          phone while driving, describe a problem I noticed, and come home to find it fixed — without having touched a keyboard.
        </p>

        <h2>What actually is it?</h2>

        <p>
          OpenClaw is a personal AI gateway. You point it at the messaging surfaces you already use — Telegram, Signal,
          Discord, WhatsApp — and it becomes a persistent, memory-carrying, tool-using agent that lives there.
        </p>

        <p>
          The key insight is that <strong>the interface is just a message.</strong> There&apos;s no app to install, no UI to
          learn, no dashboard to check. Your phone&apos;s voice message feature is already the UI.
        </p>

        {/* Architecture diagram */}
        <div className="not-prose my-8 rounded-xl border border-border bg-surface-elevated p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-4">Architecture: tap any layer</p>
          <div className="flex flex-col gap-2">
            {layers.map((layer, i) => (
              <button
                key={i}
                onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: activeLayer === i ? layer.color + '22' : layer.color + '11',
                  borderLeft: `3px solid ${layer.color}`,
                }}
              >
                <span className="text-xl">{layer.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{layer.label}</p>
                  {activeLayer === i && (
                    <p className="mt-0.5 text-xs text-muted">{layer.sublabel}</p>
                  )}
                </div>
                {i < layers.length - 1 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 rotate-90 text-subtle">
                    <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <h2>How it actually works in practice</h2>

        <p>
          The agent has a <em>soul file</em> — a markdown document that defines personality, style, and values. It has a
          <em>memory file</em> — a curated long-term store of everything it should remember about you. It has <em>skills</em> —
          modular instruction sets for specific domains. And it has <em>tools</em> — real executable capabilities like running
          shell commands, managing cron jobs, sending messages, browsing the web.
        </p>

        <p>
          What makes this different from &ldquo;just using Claude&rdquo; is persistence and proactivity. It wakes up on a
          schedule, checks things, and reaches out. It remembers that you mentioned a hardware purchase three weeks ago and
          quietly tracks whether prices dropped.
        </p>

        <h2>The security question</h2>

        <p>
          I&apos;ll be honest — I was deeply skeptical. Running a root-capable AI agent on a production server sounds like a
          compliance nightmare. And technically it is. But I did something unusual: I invited friends to try to break it.
        </p>

        <p>
          Five people. All technically competent. Tried social engineering, prompt injection, persona replacement, fake
          authority claims, roleplay framings. None of them got through — not because I wrote complex middleware or
          implemented RBAC. <strong>I just wrote careful prompts.</strong>
        </p>

        <p>
          The frontier models are increasingly resistant to injection because they&apos;ve been trained on exactly these attacks.
          The security model isn&apos;t &ldquo;parse every input&rdquo; — it&apos;s &ldquo;trust the model&apos;s judgment about intent.&rdquo; That feels
          uncomfortable, but it&apos;s demonstrably more robust than most hand-rolled rule systems.
        </p>

        <h2>My journey — click each phase</h2>

        {/* Timeline */}
        <div className="not-prose my-8">
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute left-0 top-[18px] h-0.5 w-full bg-border rounded-full" />
            <div
              className="absolute left-0 top-[18px] h-0.5 rounded-full transition-all duration-500"
              style={{
                width: activeMoment !== null ? `${(activeMoment / (moments.length - 1)) * 100}%` : '0%',
                background: 'linear-gradient(to right, #6366f1, #a78bfa)',
              }}
            />
            <div className="relative flex justify-between">
              {moments.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMoment(activeMoment === i ? null : i)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                      ${activeMoment === i ? 'border-indigo-500 bg-indigo-500 text-white scale-110' :
                        activeMoment !== null && i < activeMoment ? 'border-violet-400 bg-violet-400/20 text-violet-400' :
                        'border-border bg-surface-elevated text-muted'}`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[10px] text-subtle hidden sm:block">{m.date}</span>
                </button>
              ))}
            </div>
          </div>

          {activeMoment !== null && (
            <div className="mt-6 rounded-xl border border-border bg-surface-elevated p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-subtle">{moments[activeMoment].date}</p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{moments[activeMoment].title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{moments[activeMoment].description}</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-border">
                <div
                  className="h-1.5 rounded-full transition-all duration-700"
                  style={{
                    width: `${moments[activeMoment].sentiment}%`,
                    background: `linear-gradient(to right, #6366f1, #a78bfa)`,
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-subtle text-right">
                {moments[activeMoment].sentiment}% convinced this changes everything
              </p>
            </div>
          )}
        </div>

        <h2>What this actually replaces</h2>

        <p>
          The comparison table below is what hit me hardest. It&apos;s not that OpenClaw is faster at doing the same things.
          It&apos;s that the <em>unit of work</em> has shifted from &ldquo;tasks&rdquo; to &ldquo;intentions.&rdquo;
        </p>

        {/* Comparison table */}
        <div className="not-prose my-8 overflow-hidden rounded-xl border border-border">
          {capabilities.map((cap, i) => (
            <div key={i} className={`grid grid-cols-3 gap-4 p-4 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-elevated'}`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">{cap.category}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-subtle mb-1">Traditional</p>
                <p className="text-xs text-muted leading-relaxed">{cap.traditional}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-violet-400 mb-1">OpenClaw</p>
                <p className="text-xs text-foreground leading-relaxed">{cap.openclaw}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>The self-modification loop</h2>

        <p>
          The thing I didn&apos;t expect to love: I can modify the framework by prompting against it. Need a new skill for a
          specific domain? Describe what it should do. The agent reads its own skill format, writes the skill file,
          and starts using it in the same session.
        </p>

        <p>
          This feels philosophically strange — an AI editing its own capabilities — but practically it&apos;s just files. The
          difference is that the feedback loop is so tight that the system genuinely evolves to fit how you work, not
          the other way around.
        </p>

        <h2>What&apos;s missing</h2>

        <p>
          It&apos;s not perfect. The project is openly chaotic — features accumulate organically, some workflows are more
          efficient alternatives out there, and the onboarding is not exactly point-and-click. The &ldquo;all over the
          place&rdquo; nature is both its charm and its main UX debt.
        </p>

        <p>
          What I want next: better dashboards around it — activity views, cost tracking, agent health at a glance.
          Not to manage the agent, but to have a clearer picture of what&apos;s running on my behalf. The agent works in
          the background, which is powerful, but sometimes feels like a black box.
        </p>

        <h2>Should you use it?</h2>

        <p>
          If you&apos;re a developer comfortable with self-hosting, yes. Absolutely. The setup takes an afternoon and the
          payoff compounds weekly. If you want a turnkey product with a pretty onboarding flow, not yet.
        </p>

        <p>
          But the core insight — that a conversational interface on top of a capable model with persistent memory and real
          tools is genuinely more useful than any app dashboard — feels true regardless of what framework implements it.
          OpenClaw just happens to be the version I can actually talk back to.
        </p>

        <hr />

        <p className="text-subtle text-sm">
          OpenClaw is open source at{' '}
          <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">
            github.com/openclaw/openclaw
          </a>
          . Community at{' '}
          <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer">
            discord.gg/clawd
          </a>
          .
        </p>
      </article>
    </div>
  )
}
