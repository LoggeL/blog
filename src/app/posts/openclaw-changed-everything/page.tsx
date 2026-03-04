'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('openclaw-changed-everything')!

/* ── Paradigm shift comparison ── */
const paradigms = [
  {
    old: 'You go to the AI',
    new: 'The AI lives where you already are',
    detail:
      'Instead of opening a browser tab, you send a voice message. The agent is a permanent resident in your existing messaging stack.',
  },
  {
    old: 'Stateless — every session starts from zero',
    new: 'Persistent — it remembers what matters',
    detail:
      'Memory is just files. The agent reads and writes markdown. It curates what to keep long-term. You stop repeating yourself.',
  },
  {
    old: 'You describe a task, it produces text',
    new: 'You describe an intent, it takes action',
    detail:
      'Shell access, cron scheduling, API calls, git commits — the gap between "describe" and "done" collapses.',
  },
  {
    old: 'Capabilities defined by the developer',
    new: 'Capabilities defined at runtime — by you',
    detail:
      'Tools are modular, addable, describable in plain language. You extend the agent the same way you use it: by talking to it.',
  },
  {
    old: 'Security through code — rules, middleware, RBAC',
    new: 'Security through prompt — intent, judgment, resistance',
    detail:
      'The model reasons about intent. Prompt-hardened agents have proven more resilient to social engineering than most hand-rolled rule systems.',
  },
]

/* ── Tool anatomy ── */
const toolLayers = [
  {
    name: 'Personality (soul file)',
    desc: 'A markdown document. Name, style, values, how it talks, what it refuses. The agent reads this on every session.',
    icon: '🧬',
    color: '#818cf8',
  },
  {
    name: 'Memory (markdown files)',
    desc: 'Daily notes, long-term summaries, per-contact context. Not a database — just files the agent reads and writes itself.',
    icon: '🧠',
    color: '#a78bfa',
  },
  {
    name: 'Skills (instruction modules)',
    desc: 'Domain-specific playbooks. How to handle GitHub, how to talk to a specific API, what to do when X happens. Composable, editable.',
    icon: '📚',
    color: '#c4b5fd',
  },
  {
    name: 'Tools (executable capabilities)',
    desc: 'Shell, cron, browser, messaging, APIs. Each tool is a function the agent can call. You add new ones by describing them.',
    icon: '🔧',
    color: '#ddd6fe',
  },
  {
    name: 'Channel (where you talk to it)',
    desc: 'Telegram, Signal, Discord, voice — whatever you already use. The agent lives there. You do not go to it.',
    icon: '📱',
    color: '#ede9fe',
  },
]

/* ── Journey phases ── */
const phases = [
  {
    label: 'Day 1',
    title: 'It feels like a chatbot',
    text: 'You give it a system prompt, it answers questions. Useful. Unremarkable. You think you understand what it is.',
  },
  {
    label: 'Week 1',
    title: 'It starts remembering things',
    text: 'You mentioned a project once. It brings it up unprompted three days later with the right context. Something shifts.',
  },
  {
    label: 'Week 2',
    title: 'It does things while you sleep',
    text: 'You set up a morning check. You wake up to a voice summary of what is broken. You wrote zero cron jobs.',
  },
  {
    label: 'Week 3',
    title: 'It builds its own extensions',
    text: 'You describe a new capability. It reads its own skill format, writes the file, and starts using it — same session.',
  },
  {
    label: 'Week 6',
    title: 'The unit of work has changed',
    text: 'You no longer think in tasks. You think in intentions. The gap between "I want X" and "X is done" is mostly conversation.',
  },
]

export default function PostPage() {
  const [activeParadigm, setActiveParadigm] = useState<number | null>(null)
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [activePhase, setActivePhase] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          This is not a product review. It is about a way of working — a paradigm — that I stumbled into and that I
          cannot easily unstumble from. The specific tool does not matter much. What matters is the pattern.
        </p>

        <p>
          The pattern is this: <strong>give a language model a shell, a persistent identity, a memory system, and modular
          tools — then let it roam.</strong> Do not put it behind a chat widget. Do not wrap it in a workflow builder.
          Let it live in your existing environment and act on your behalf between conversations.
        </p>

        <p>
          Once you have done that, something changes that is hard to articulate until it happens to you.
        </p>

        <h2>What &ldquo;free-roaming&rdquo; actually means</h2>

        <p>
          Most AI tooling is reactive. You open a tab, you type, it responds, you close the tab. The model is a function
          you call. Between calls, nothing happens.
        </p>

        <p>
          A free-roaming agent is different. It wakes up on a schedule. It notices things. It follows through on things
          you mentioned last week. It has context that persists not because of a database schema someone designed, but
          because it reads and writes files the same way you would take notes.
        </p>

        <p>
          This is not magic — it is just a model with a cron job and a folder of markdown files. But the behavioral
          difference is enormous.
        </p>

        {/* Paradigm shifts */}
        <div className="not-prose my-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">Five shifts — tap each one</p>
          {paradigms.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveParadigm(activeParadigm === i ? null : i)}
              className="w-full rounded-lg border border-border bg-surface-elevated p-4 text-left transition-all hover:border-indigo-500/40"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] text-subtle line-through">{p.old}</span>
                    <span className="text-[9px] text-subtle">↓</span>
                    <span className="text-xs font-medium text-indigo-400">{p.new}</span>
                  </div>
                </div>
              </div>
              {activeParadigm === i && (
                <p className="mt-3 text-sm text-muted leading-relaxed border-t border-border pt-3">{p.detail}</p>
              )}
            </button>
          ))}
        </div>

        <h2>The anatomy of the thing</h2>

        <p>
          Strip away any specific implementation and what you are left with is a stack of four or five layers.
          Each layer is editable. Each layer is described in plain text. That is the core of the paradigm.
        </p>

        {/* Tool anatomy */}
        <div className="not-prose my-8 space-y-2">
          {toolLayers.map((layer, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
              className="w-full rounded-lg p-4 text-left transition-all"
              style={{
                backgroundColor: activeLayer === i ? layer.color + '18' : layer.color + '0a',
                borderLeft: `3px solid ${layer.color}`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{layer.icon}</span>
                <span className="text-sm font-medium text-foreground">{layer.name}</span>
              </div>
              {activeLayer === i && (
                <p className="mt-2 text-xs text-muted leading-relaxed pl-8">{layer.desc}</p>
              )}
            </button>
          ))}
        </div>

        <p>
          The key thing about this stack: <strong>you extend it the same way you use it.</strong> Want to add a new
          capability? Describe it. The agent reads its own skill format, writes the file, and starts using it.
          The interface for configuring the system is identical to the interface for using the system.
        </p>

        <h2>The security thing no one expects</h2>

        <p>
          Giving an AI shell access on a production server sounds irresponsible. And maybe it is. But here is what
          I found when I tested it seriously: prompt-hardened agents are more resistant to social engineering
          than most rule-based systems.
        </p>

        <p>
          I ran an informal red team. Five technically competent people, trying everything — prompt injection, persona
          replacement, fake authority claims, roleplay framings designed to slip past filters. None of them got through.
          Not because of middleware. Because the model reasoned about intent and found the attempts implausible given
          the context it had built up over weeks of legitimate interaction.
        </p>

        <p>
          The frontier models have been trained on exactly these attack patterns. A rule system can be circumvented
          by finding the edge case it does not cover. A model that reasons about intent does not have clean edges
          to exploit in the same way.
        </p>

        <p>
          This is still a bet, not a proof. But it is a more interesting bet than I expected.
        </p>

        <h2>How it changes — click each phase</h2>

        {/* Journey phases */}
        <div className="not-prose my-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {phases.map((phase, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(activePhase === i ? null : i)}
                className={`shrink-0 rounded-lg border px-4 py-2 text-xs font-medium transition-all
                  ${activePhase === i
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                    : 'border-border bg-surface-elevated text-muted hover:border-indigo-500/40'
                  }`}
              >
                {phase.label}
              </button>
            ))}
          </div>
          {activePhase !== null && (
            <div className="mt-4 rounded-xl border border-border bg-surface-elevated p-5">
              <h3 className="text-sm font-semibold text-foreground">{phases[activePhase].title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{phases[activePhase].text}</p>
            </div>
          )}
        </div>

        <h2>The thing that compounds</h2>

        <p>
          The reason this paradigm is hard to go back from is compounding. Every week the agent gets slightly better
          at working with you specifically — because its memory files accumulate context specific to your projects,
          your contacts, your preferred way of communicating.
        </p>

        <p>
          A generic chatbot that you use intermittently stays flat. An agent that runs persistently, builds memory,
          and evolves its toolset grows with you. The gap between the two widens every week.
        </p>

        <h2>What is still missing</h2>

        <p>
          The honest answer: observability. When an agent runs autonomously — checking things, spawning sub-agents,
          executing tasks while you sleep — you lose the ability to easily see what happened and why. The output lands
          in your messages. The reasoning stays invisible.
        </p>

        <p>
          What I want: activity dashboards, cost tracking, a timeline of what ran and what it decided. Not to control
          the agent more tightly — but to build the kind of trust that lets you give it more autonomy with confidence.
          Visibility and autonomy are not opposites. They are prerequisites for each other.
        </p>

        <h2>Should you do this?</h2>

        <p>
          If you are comfortable with a terminal, yes. The setup is an afternoon. The payoff is ongoing. Start small —
          one channel, one skill, one scheduled check. Let the memory accumulate. Add tools as you need them.
        </p>

        <p>
          The specific implementation does not matter as much as you might think. What matters is the pattern:
          a persistent identity, a memory system, modular tools, and the channel already open in your pocket.
          Once those four things are in place, the agent stops feeling like software you use and starts feeling like
          infrastructure you run.
        </p>

        <p>
          That is the shift. It is smaller than it sounds, and larger than it seems.
        </p>

        <hr />

        <p className="text-subtle text-sm">
          The setup described here is running on{' '}
          <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">OpenClaw</a>,
          an open-source personal AI gateway. Community at{' '}
          <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer">discord.gg/clawd</a>.
          But the pattern works with any framework that gives a model persistent memory, real tools, and a channel.
        </p>
      </article>
    </div>
  )
}
