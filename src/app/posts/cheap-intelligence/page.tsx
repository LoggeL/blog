'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

/* ── Job Automation Timeline ── */

type JobCategory = 'whiteCollar' | 'blueCollar'

interface JobRole {
  name: string
  start: number
  end: number
  category: JobCategory
}

const jobs: JobRole[] = [
  { name: 'Customer Support', start: 2024, end: 2025, category: 'whiteCollar' },
  { name: 'Translation', start: 2024, end: 2025, category: 'whiteCollar' },
  { name: 'Junior Developers', start: 2024, end: 2026, category: 'whiteCollar' },
  { name: 'Data Analysts', start: 2025, end: 2026, category: 'whiteCollar' },
  { name: 'Paralegals', start: 2025, end: 2027, category: 'whiteCollar' },
  { name: 'Accountants', start: 2025, end: 2027, category: 'whiteCollar' },
  { name: 'Copywriters', start: 2024, end: 2026, category: 'whiteCollar' },
  { name: 'Radiologists', start: 2026, end: 2028, category: 'whiteCollar' },
  { name: 'Warehouse Workers', start: 2026, end: 2028, category: 'blueCollar' },
  { name: 'Delivery Drivers', start: 2026, end: 2029, category: 'blueCollar' },
  { name: 'Assembly Line', start: 2027, end: 2029, category: 'blueCollar' },
  { name: 'Construction', start: 2028, end: 2031, category: 'blueCollar' },
  { name: 'Plumbing/Electrical', start: 2029, end: 2032, category: 'blueCollar' },
  { name: 'Agriculture', start: 2027, end: 2030, category: 'blueCollar' },
]

const TIMELINE_START = 2024
const TIMELINE_END = 2032

function JobTimeline() {
  const [filter, setFilter] = useState<'all' | JobCategory>('all')
  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.category === filter)
  const range = TIMELINE_END - TIMELINE_START

  return (
    <div className="my-8 not-prose">
      <div className="flex gap-2 mb-4">
        {(['all', 'whiteCollar', 'blueCollar'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border-2 cursor-pointer ${
              filter === f
                ? f === 'whiteCollar' ? 'border-violet-500 bg-violet-500 text-white'
                  : f === 'blueCollar' ? 'border-amber-500 bg-amber-500 text-white'
                  : 'border-[#d90429] bg-[#d90429] text-white'
                : 'border-border text-muted hover:border-zinc-400'
            }`}
          >
            {f === 'all' ? 'All Jobs' : f === 'whiteCollar' ? '💼 White Collar' : '🔧 Blue Collar'}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        {/* Year headers */}
        <div className="flex border-b border-border bg-surface px-4 py-2">
          <div className="w-36 flex-shrink-0" />
          <div className="flex-1 flex">
            {Array.from({ length: range + 1 }, (_, i) => (
              <div key={i} className="flex-1 text-[10px] text-muted text-center font-mono">
                {TIMELINE_START + i}
              </div>
            ))}
          </div>
        </div>

        {/* Job rows */}
        {filtered.map((job, i) => {
          const left = ((job.start - TIMELINE_START) / range) * 100
          const width = ((job.end - job.start) / range) * 100
          const color = job.category === 'whiteCollar' ? '#8b5cf6' : '#f59e0b'

          return (
            <div
              key={job.name}
              className={`flex items-center px-4 py-2 ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="w-36 flex-shrink-0 text-xs text-foreground font-medium truncate pr-2">
                {job.name}
              </div>
              <div className="flex-1 relative h-6">
                <div
                  className="absolute top-1 h-4 rounded-full transition-all duration-500"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: color,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted mt-3 text-center">
        Estimated timeline for significant automation impact (not full replacement)
      </p>
    </div>
  )
}

/* ── Scenario Explorer ── */

interface ScenarioDetail {
  employment: string
  education: string
  wealth: string
  dailyLife: string
}

interface Scenario {
  id: string
  emoji: string
  label: string
  color: string
  summary: string
  details: ScenarioDetail
}

const scenarios: Scenario[] = [
  {
    id: 'dystopian',
    emoji: '🔴',
    label: 'Dystopian',
    color: '#dc2626',
    summary: 'Mass unemployment, extreme wealth concentration, social collapse.',
    details: {
      employment: '40-60% unemployment. Gig economy scraps for the lucky. Most people are economically irrelevant. Companies are 10 people + 10,000 AI agents.',
      education: 'Degrees become worthless faster than student loans can be repaid. Elite education becomes a status symbol disconnected from economic value.',
      wealth: 'AI owners capture nearly all economic output. The gap between the top 0.1% and everyone else becomes a chasm. Capital is the only thing that matters.',
      dailyLife: 'Gated communities with robot servants vs overcrowded cities with UBI barely covering rent. Social unrest, populist movements, potential for authoritarianism.',
    },
  },
  {
    id: 'transition',
    emoji: '🟡',
    label: 'Messy Transition',
    color: '#f59e0b',
    summary: 'UBI, retraining, new job categories. Chaotic but manageable.',
    details: {
      employment: 'UBI covers basics. New roles emerge: AI supervisors, experience designers, human-connection services. 20-30% do traditional work, rest do care/creative/community work.',
      education: 'Universities pivot to micro-credentials and continuous learning. Apprenticeship models return. Education becomes lifelong, not front-loaded.',
      wealth: 'AI taxation funds UBI. Wealth gap narrows slightly but remains large. Middle class survives but looks very different — less consumption, more time-rich.',
      dailyLife: 'A decade of disruption and adjustment. Some industries collapse, others emerge. Mental health crisis during transition as people lose identity tied to work.',
    },
  },
  {
    id: 'utopian',
    emoji: '🟢',
    label: 'Post-Scarcity',
    color: '#10b981',
    summary: 'Work becomes optional. Meaning-economy. Human flourishing.',
    details: {
      employment: 'Work is optional. People contribute because they want to, not because they have to. "Jobs" become "projects" — chosen, not assigned.',
      education: 'Learning for the joy of learning. No economic pressure to study "useful" things. Renaissance of arts, philosophy, and pure science.',
      wealth: 'Abundance makes wealth less relevant. When AI + robots produce everything cheaply, ownership matters less than access. Status shifts from money to reputation and contribution.',
      dailyLife: 'People pursue relationships, creativity, exploration, meaning. Mental health improves as survival anxiety disappears. Communities strengthen. A new golden age — if we get there.',
    },
  },
]

function ScenarioExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="my-8 not-prose">
      <div className="grid gap-3">
        {scenarios.map(s => (
          <div
            key={s.id}
            className="rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden"
            style={{ borderColor: expanded === s.id ? s.color : 'var(--color-border)' }}
            onClick={() => setExpanded(expanded === s.id ? null : s.id)}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <div>
                  <h4 className="text-sm font-semibold text-primary">{s.label}</h4>
                  <p className="text-xs text-muted mt-0.5">{s.summary}</p>
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-muted transition-transform duration-300 ${expanded === s.id ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            {expanded === s.id && (
              <div className="px-5 pb-5 grid sm:grid-cols-2 gap-3">
                {(Object.entries(s.details) as [string, string][]).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-lg bg-surface border border-border">
                    <p className="text-[10px] uppercase tracking-wider font-medium mb-1.5" style={{ color: s.color }}>
                      {key === 'dailyLife' ? 'Daily Life' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="text-xs text-foreground leading-relaxed">{val}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Acceleration Spiral ── */

const spiralSteps = [
  { label: 'Cheap Intelligence', icon: '🧠', desc: 'LLMs make cognitive work nearly free' },
  { label: 'Faster R&D', icon: '⚡', desc: 'AI accelerates engineering & research' },
  { label: 'Better Robots', icon: '🤖', desc: 'Smarter robots designed by AI' },
  { label: 'More Automation', icon: '🏭', desc: 'Physical labor gets automated' },
  { label: 'Even Cheaper Intelligence', icon: '📉', desc: 'Cycle repeats, faster each time' },
]

function AccelerationSpiral() {
  const [activeStep, setActiveStep] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % spiralSteps.length)
    }, 2000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="my-8 not-prose">
      <div className="flex flex-col items-center gap-1">
        {spiralSteps.map((step, i) => {
          const isActive = i === activeStep
          const isPast = i < activeStep

          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-500 w-72 ${
                  isActive
                    ? 'border-[#d90429] bg-[#d90429]/10 scale-105 shadow-lg'
                    : isPast
                      ? 'border-border bg-surface opacity-60'
                      : 'border-border bg-surface opacity-40'
                }`}
              >
                <span className="text-xl">{step.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${isActive ? 'text-[#d90429]' : 'text-primary'}`}>
                    {step.label}
                  </p>
                  <p className="text-[11px] text-muted">{step.desc}</p>
                </div>
              </div>
              {i < spiralSteps.length - 1 && (
                <svg className="w-4 h-6 text-muted" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 0v24M3 19l5 5 5-5" />
                </svg>
              )}
            </div>
          )
        })}
        {/* Loop arrow */}
        <div className="flex items-center gap-2 mt-2 text-xs text-[#d90429] font-medium">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 014-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
          </svg>
          Cycle repeats — faster each iteration
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */

export default function CheapIntelligencePage() {
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
        <div className="flex items-center gap-3 mb-2">
          <time className="text-sm text-primary">February 10, 2026</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">Opinion</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">Outlook</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">AI</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          When Intelligence Becomes Dirt Cheap
        </h1>
      </header>

      <article className="prose">
        <p>
          Electricity made physical power cheap. The internet made information cheap.
          LLMs are making <em>intelligence</em> cheap. And we are not ready for what happens next.
        </p>

        <p>
          This isn&apos;t a gradual shift. The cost of cognitive work is collapsing right now — not in some
          speculative future, but quarter by quarter, benchmark by benchmark. What took a junior analyst
          a week now takes an AI 30 seconds and costs less than a coffee. Multiply that across every
          knowledge worker on the planet and you start to see the scale of what&apos;s coming.
        </p>

        <h2>The Intelligence Price Crash</h2>

        <p>
          Every major economic revolution follows the same pattern: something expensive becomes cheap,
          and society restructures around the new reality.
        </p>

        <ul>
          <li><strong>Electricity:</strong> Physical labor went from human/animal power to machines.
            Entire industries appeared. Others vanished.</li>
          <li><strong>Internet:</strong> Information distribution went from expensive to free.
            Media, retail, communication — all transformed beyond recognition.</li>
          <li><strong>LLMs:</strong> Cognitive work is going from expensive to nearly free.
            Analysis, writing, coding, reasoning, planning — all approaching marginal cost zero.</li>
        </ul>

        <p>
          The pattern is clear, but people keep making the same mistake: assuming their industry,
          their job, their skill is somehow exempt. It wasn&apos;t true for factory workers in 1900.
          It wasn&apos;t true for travel agents in 2005. And it won&apos;t be true for knowledge workers in 2026.
        </p>

        <h2>White Collar Falls First</h2>

        <p>
          This isn&apos;t a prediction. It&apos;s already happening.
        </p>

        <p>
          Klarna replaced 700 customer service agents with AI and reported better satisfaction scores.
          Duolingo laid off contractors because AI handles translation and content generation.
          Law firms are using AI to do document review that previously required teams of paralegals.
          Accounting firms are automating audit procedures. Marketing agencies are cutting copywriting teams.
        </p>

        <p>
          The roles getting hit first share common traits: they involve processing information,
          following established patterns, and producing structured output. In other words —
          exactly what LLMs are good at.
        </p>

        <ul>
          <li><strong>Analysts</strong> — AI can process data, find patterns, and write reports</li>
          <li><strong>Junior developers</strong> — AI writes code, runs tests, fixes bugs</li>
          <li><strong>Translators</strong> — already largely automated for most use cases</li>
          <li><strong>Paralegals</strong> — document review, contract analysis, legal research</li>
          <li><strong>Accountants</strong> — bookkeeping, tax prep, financial reporting</li>
          <li><strong>Support agents</strong> — chatbots that actually work now</li>
        </ul>

        <p>
          The uncomfortable truth: most white-collar work is pattern matching. And pattern matching
          is precisely what AI does better, faster, and cheaper than humans. The jobs that survive
          are the ones that require judgment in genuinely novel situations, deep relationship trust,
          or physical presence. That&apos;s a much smaller number than people think.
        </p>

        <h2>The Blue Collar Illusion</h2>

        <p>
          &quot;Sure, AI can write emails, but it can&apos;t lay bricks.&quot;
        </p>

        <p>
          This is the most dangerous form of complacency right now. Blue-collar workers see white-collar
          jobs getting automated and feel safe. After all, plumbing requires hands, construction requires
          physical presence, and logistics requires navigating the real world.
        </p>

        <p>
          They&apos;re right — for now. But they&apos;re missing the acceleration spiral.
        </p>

        <AccelerationSpiral />

        <p>
          Here&apos;s the key insight: <strong>when you automate the engineers who build robots,
          robot development goes exponential.</strong> Right now, the bottleneck for humanoid robots
          isn&apos;t hardware — it&apos;s the intelligence to make them useful. LLMs are solving that bottleneck.
        </p>

        <p>
          Look at what&apos;s already in motion:
        </p>

        <ul>
          <li><strong>Figure</strong> — humanoid robots doing warehouse work, backed by OpenAI&apos;s models</li>
          <li><strong>Tesla Optimus</strong> — general-purpose humanoid, iterating fast with Tesla&apos;s manufacturing scale</li>
          <li><strong>Boston Dynamics</strong> — Atlas doing complex physical tasks, now paired with LLM reasoning</li>
          <li><strong>1X</strong> — EVE and NEO robots designed for homes and workplaces</li>
          <li><strong>Agility Robotics</strong> — Digit already deployed in Amazon warehouses</li>
        </ul>

        <p>
          The timeline isn&apos;t decades. It&apos;s years. White collar automation is happening now (2024-2026).
          Blue collar automation follows 1-2 years behind, once AI-designed robots reach production scale.
          By 2028-2030, very few jobs will be untouchable.
        </p>

        <JobTimeline />

        <h2>Education System Collapse</h2>

        <p>
          The current education model is built on a simple deal: invest 3-5 years learning a niche skill,
          then extract value from the job market for decades. The skill depreciates slowly enough that the
          investment pays off.
        </p>

        <p>
          That deal is broken.
        </p>

        <p>
          When entire professions get automated in 2-3 years, what happens to the student halfway through
          a 4-year accounting degree? Or the law student who takes on $200k in debt for a career that AI
          is already disrupting? They graduate into a job market that no longer needs their specific skills.
        </p>

        <p>
          Student debt for skills that are worthless by graduation. That&apos;s not a dystopian fantasy —
          it&apos;s the math of automation speed vs education length.
        </p>

        <p>
          What replaces the current model? Probably some combination of:
        </p>

        <ul>
          <li><strong>Continuous learning:</strong> Short bursts of skill acquisition, not front-loaded degrees</li>
          <li><strong>Micro-credentials:</strong> Prove you can do X, not that you sat in a room for 4 years</li>
          <li><strong>Learn-by-doing:</strong> Apprenticeship models where you learn alongside AI, not instead of it</li>
          <li><strong>Meta-skills:</strong> Learning how to learn, how to evaluate AI output, how to orchestrate agents</li>
        </ul>

        <p>
          Universities that don&apos;t adapt will become the Blockbusters of education — charging premium prices
          for a product that&apos;s available better and cheaper elsewhere.
        </p>

        <h2>Three Scenarios</h2>

        <p>
          Nobody knows exactly how this plays out. But the range of outcomes is wide, and the path we
          take depends on choices being made right now — by governments, companies, and individuals.
        </p>

        <ScenarioExplorer />

        <p>
          My honest read? We&apos;ll get something between dystopian and transition, depending on the country.
          Scandinavian countries with strong social safety nets will manage. The US, with its worship of
          unregulated markets, will probably let a lot of people fall through the cracks before fixing anything.
          Developing nations could go either way — they could leapfrog with cheap AI, or get crushed by
          having nothing to export when labor is worthless.
        </p>

        <p>
          The utopian scenario is possible but requires political will that doesn&apos;t currently exist.
          Post-scarcity is a technical possibility. Whether we distribute that abundance fairly is
          a political question — and history doesn&apos;t give great odds.
        </p>

        <h2>What To Do Now</h2>

        <p>
          This isn&apos;t a call to panic. It&apos;s a call to adapt — quickly and honestly.
        </p>

        <ul>
          <li>
            <strong>Be the human in the loop.</strong> Learn to steer AI, not compete with it.
            The person who can prompt, review, and direct AI output is infinitely more valuable
            than the person who does what AI can do, just slower.
          </li>
          <li>
            <strong>Own the stack, not the skill.</strong> Orchestrating multiple AI agents to solve
            complex problems &gt; doing one task well. Think conductor, not violinist.
          </li>
          <li>
            <strong>Build capital, not just career.</strong> When labor is devalued, owning assets
            matters more than earning a salary. Equity, property, investments — anything that generates
            returns independent of your time.
          </li>
          <li>
            <strong>Relationships and trust.</strong> The one thing AI genuinely can&apos;t replicate.
            Your network, your reputation, the trust people place in you — that&apos;s your moat.
          </li>
          <li>
            <strong>Stay adaptable.</strong> No 5-year plans. Think in quarters. The world is changing
            fast enough that long-term career planning is a fiction. Be ready to pivot.
          </li>
          <li>
            <strong>Political engagement.</strong> UBI, AI taxation, education reform, labor protections —
            none of this happens by itself. The decisions being made right now will determine which
            scenario we land in. If you&apos;re not at the table, you&apos;re on the menu.
          </li>
        </ul>

        <hr />

        <p>
          The intelligence revolution is here. Not coming — <em>here</em>. The cost of thinking has
          crashed, and everything built on the assumption that human cognition is scarce and valuable
          is about to be repriced. The question isn&apos;t whether society changes. It&apos;s whether
          we shape that change, or just get hit by it.
        </p>

        <p className="text-sm text-muted italic">
          The future isn&apos;t something that happens to you. It&apos;s something you either build or get buried by.
        </p>
      </article>
    </div>
  )
}
