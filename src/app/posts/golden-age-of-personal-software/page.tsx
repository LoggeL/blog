'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('golden-age-of-personal-software')!

/* ─────────────────────────────────────────────
   1. Cost comparison slider: 2020 → 2026
───────────────────────────────────────────── */
const costData: Record<number, { cost: string; detail: string; label: string }> = {
  2020: { cost: '$50,000', detail: 'Senior developer, ~3 months, design + dev + testing', label: 'Agency or freelancer required' },
  2021: { cost: '$35,000', detail: 'Rise of low-code tools cuts simple projects', label: 'Webflow/Bubble reduce frontend cost' },
  2022: { cost: '$18,000', detail: 'GitHub Copilot speeds up individual devs', label: 'Copilot era — devs 30% faster' },
  2023: { cost: '$8,000', detail: 'GPT-4 + early coding assistants', label: 'AI pair programming goes mainstream' },
  2024: { cost: '$800', detail: 'Claude 3.5, Cursor, full-feature scaffolding', label: 'Agentic coding emerges' },
  2025: { cost: '$80', detail: 'Claude 4, multi-agent pipelines, minimal oversight', label: 'Autonomous builds become reliable' },
  2026: { cost: '$20', detail: 'API tokens + an afternoon of prompting', label: 'Personal software era' },
}
const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]

function CostSlider() {
  const [yearIdx, setYearIdx] = useState(0)
  const year = years[yearIdx]
  const data = costData[year]

  // Progress percentage from 2020 (0) to 2026 (100)
  const progress = (yearIdx / (years.length - 1)) * 100

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
    }}>
      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '1rem' }}>
        Cost to build a typical small business web app
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: year >= 2025 ? 'var(--primary)' : 'var(--foreground)',
            transition: 'color 0.3s',
            lineHeight: 1,
          }}>
            {data.cost}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.4rem' }}>{data.detail}</div>
        </div>
        <div style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--subtle)',
          lineHeight: 1,
        }}>
          {year}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
        <div style={{
          height: '6px',
          background: 'var(--border)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(to right, var(--muted), var(--primary))',
            borderRadius: '3px',
            transition: 'width 0.2s',
          }} />
        </div>
        <input
          type="range"
          min={0}
          max={years.length - 1}
          value={yearIdx}
          onChange={e => setYearIdx(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: '-6px',
            left: 0,
            width: '100%',
            opacity: 0,
            cursor: 'pointer',
            height: '18px',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        {years.map((y, i) => (
          <button
            key={y}
            onClick={() => setYearIdx(i)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.7rem',
              color: i === yearIdx ? 'var(--foreground)' : 'var(--subtle)',
              cursor: 'pointer',
              padding: '2px 0',
              fontWeight: i === yearIdx ? 600 : 400,
              transition: 'color 0.2s',
            }}
          >
            {y}
          </button>
        ))}
      </div>

      <div style={{
        padding: '0.6rem 0.875rem',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: 'var(--muted)',
      }}>
        {data.label}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   2. Long tail visualization (SVG bar chart)
───────────────────────────────────────────── */
const longTailSegments = [
  { label: 'ERP / CRM', size: 95, served: true, example: 'SAP, Salesforce, Oracle' },
  { label: 'E-commerce', size: 80, served: true, example: 'Shopify, WooCommerce' },
  { label: 'Collaboration', size: 70, served: true, example: 'Notion, Slack, Teams' },
  { label: 'HR & Payroll', size: 60, served: true, example: 'Workday, BambooHR' },
  { label: 'Accounting', size: 50, served: true, example: 'QuickBooks, Xero' },
  { label: 'Niche CRM', size: 35, served: false, example: '5-person consulting firm intake' },
  { label: 'Club mgmt', size: 25, served: false, example: 'Amateur rugby lineout tracker' },
  { label: 'Custom reports', size: 18, served: false, example: 'Coach match analysis tool' },
  { label: 'Shop tools', size: 12, served: false, example: 'Craftsman appointment booking' },
  { label: 'Personal ops', size: 8, served: false, example: 'Teacher grading rubric app' },
  { label: 'One-offs', size: 4, served: false, example: 'Household inventory, event planner' },
]

function LongTailChart() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
    }}>
      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '0.5rem' }}>
        The software long tail
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
        Big SaaS serves the head. AI coding unlocks the long tail.
      </p>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '120px', marginBottom: '0.5rem' }}>
        {longTailSegments.map((seg, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1,
              height: `${seg.size}%`,
              background: seg.served
                ? (hovered === i ? 'var(--muted)' : 'var(--subtle)')
                : (hovered === i ? 'var(--primary-light)' : 'var(--primary)'),
              borderRadius: '3px 3px 0 0',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              transform: hovered === i ? 'scaleY(1.03)' : 'scaleY(1)',
              transformOrigin: 'bottom',
              opacity: hovered !== null && hovered !== i ? 0.6 : 1,
            }}
          />
        ))}
      </div>

      <div style={{
        height: '1px',
        background: 'var(--border)',
        marginBottom: '0.75rem',
      }} />

      {hovered !== null ? (
        <div style={{
          padding: '0.6rem 0.875rem',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          fontSize: '0.8rem',
        }}>
          <strong style={{ color: 'var(--foreground)' }}>{longTailSegments[hovered].label}</strong>
          <span style={{ color: 'var(--subtle)', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
            {longTailSegments[hovered].served ? '✓ Covered by SaaS' : '→ Now accessible via AI coding'}
          </span>
          <div style={{ color: 'var(--muted)', marginTop: '0.2rem' }}>{longTailSegments[hovered].example}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--subtle)' }} />
            Served by existing SaaS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--primary)' }} />
            Newly accessible (hover to explore)
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   3. The Window — timeline visualization
───────────────────────────────────────────── */
const timelinePhases = [
  {
    label: 'Too Expensive',
    period: '~2020',
    desc: 'Custom software requires professional developers. Only enterprises and well-funded startups can afford it.',
    state: 'past',
  },
  {
    label: 'Transition',
    period: '2022–2024',
    desc: 'Copilot, GPT-4, early agents. Faster for developers, but still requires technical knowledge.',
    state: 'transition',
  },
  {
    label: 'Golden Age',
    period: '2025–2027',
    desc: 'AI agents build software from description. Human direction is the bottleneck — not code.',
    state: 'now',
    isNow: true,
  },
  {
    label: 'Full Automation',
    period: '2028+',
    desc: 'AI identifies what software should be built and builds it. Human direction becomes optional.',
    state: 'future',
  },
]

function WindowTimeline() {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
    }}>
      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '1.25rem' }}>
        The transitional window
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        {timelinePhases.map((phase, i) => (
          <div key={i} style={{ flex: phase.isNow ? 1.6 : 1, position: 'relative' }}>
            <div style={{
              height: '6px',
              borderRadius: '3px',
              background: phase.isNow
                ? 'linear-gradient(to right, var(--primary), var(--primary-light))'
                : phase.state === 'past'
                  ? 'var(--border)'
                  : phase.state === 'transition'
                    ? 'var(--subtle)'
                    : 'var(--surface-elevated)',
              border: phase.state === 'future' ? '1px dashed var(--border)' : 'none',
              marginBottom: '0.75rem',
            }} />

            {phase.isNow && (
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '2px solid var(--background)',
                boxShadow: '0 0 0 3px rgba(217, 4, 41, 0.2), 0 0 12px rgba(217, 4, 41, 0.3)',
              }} />
            )}

            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: phase.isNow ? 'var(--foreground)' : 'var(--muted)', marginBottom: '0.25rem' }}>
              {phase.label}
              {phase.isNow && (
                <span style={{
                  display: 'inline-block',
                  marginLeft: '0.4rem',
                  fontSize: '0.6rem',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: '3px',
                  padding: '1px 4px',
                  verticalAlign: 'middle',
                }}>
                  NOW
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--subtle)', marginBottom: '0.4rem' }}>{phase.period}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.5 }}>{phase.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   4. Before vs Now comparison
───────────────────────────────────────────── */
const comparisons = [
  {
    sector: 'Local craftsman',
    need: 'Appointment booking',
    before: '€3,000+ custom dev or wrestle with generic SaaS',
    now: 'Describe the workflow, get a working app in an afternoon',
  },
  {
    sector: 'Small nonprofit',
    need: 'Donor management',
    before: "Salesforce (too expensive) or spreadsheets",
    now: 'Custom donor tracker, exactly their workflow, ~$20',
  },
  {
    sector: 'Local government',
    need: 'Permit workflows',
    before: 'Years-long procurement, generic systems that don\'t fit',
    now: 'Specific permit flow built by someone who knows the process',
  },
  {
    sector: 'Teacher',
    need: 'Grading tool',
    before: 'Excel with manual formulas or expensive LMS',
    now: 'Custom rubric app, exactly their grading system',
  },
  {
    sector: 'Coach',
    need: 'Match analysis',
    before: 'Paper notes or expensive sports software',
    now: 'Video-to-report tool, built for their exact metrics',
  },
]

function DigitalizationComparison() {
  const [active, setActive] = useState(0)
  const comp = comparisons[active]

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
    }}>
      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '1rem' }}>
        Before vs. now
      </p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {comparisons.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: i === active ? 'var(--foreground)' : 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              color: i === active ? 'var(--background)' : 'var(--muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {c.sector}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
        Need: <strong style={{ color: 'var(--foreground)' }}>{comp.need}</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{
          padding: '0.875rem',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
        }}>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '0.5rem' }}>
            Before
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{comp.before}</div>
        </div>
        <div style={{
          padding: '0.875rem',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--primary)',
          borderRadius: '8px',
        }}>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            Now
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--foreground)', lineHeight: 1.6 }}>{comp.now}</div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function PostPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-12">
        <time className="text-sm text-subtle">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-foreground mt-2">{post.title}</h1>
        <p className="text-muted mt-3 text-base leading-relaxed">{post.excerpt}</p>
      </header>

      <article className="prose">
        <p>
          There&apos;s a narrative dominating AI discourse right now: coding jobs are dying, developers are being replaced, the sky is falling. And yes, that future is coming—eventually. But between now and then, something genuinely exciting is happening that deserves more attention.
        </p>
        <p>
          <strong>Software is becoming personal.</strong>
        </p>

        <h2>The Economics Have Flipped</h2>
        <p>
          Building a custom web app in 2023 meant hiring a developer for $5,000–50,000, or spending months learning to code yourself. In 2026, the same app costs $20 in API tokens and an afternoon of prompting.
        </p>
        <p>
          This isn&apos;t theoretical. I&apos;ve watched non-technical people build and deploy functional applications in hours:
        </p>
        <ul>
          <li>A teacher building a custom grading tool tailored to their exact rubric</li>
          <li>A small business owner creating an inventory system that matches their specific workflow</li>
          <li>A coach generating match analysis reports from video recordings</li>
        </ul>
        <p>
          None of these people would have commissioned custom software before. The cost-benefit math never worked out. Off-the-shelf tools were close enough, and &ldquo;close enough&rdquo; was all they could afford. That equation has changed.
        </p>
        <h2>Small Problems, Finally Worth Solving</h2>
        <p>
          The enterprise software world optimizes for the largest possible market. Salesforce doesn&apos;t build features for a 5-person consulting firm&apos;s specific client intake process. Notion doesn&apos;t ship a template for tracking your amateur rugby team&apos;s lineout statistics.
        </p>
        <p>
          These are real problems. They&apos;re just too small for traditional software economics.
        </p>
        <p>
          AI coding agents have inverted this. When the cost of building drops by 100x, problems that were &ldquo;not worth a developer&apos;s time&rdquo; suddenly become trivially solvable. The long tail of software needs—millions of specific, small, personal use cases—becomes accessible.
        </p>
        <p>
          This is the <strong>democratization</strong> people have been promising for decades. Not through no-code platforms with their own constraints and lock-in, but through actual code that you own, customize, and deploy wherever you want.
        </p>
      </article>

      <LongTailChart />

      <article className="prose">
        <h2>The Quality Curve</h2>
        <p>
          A common objection: &ldquo;AI-generated code is mediocre.&rdquo; That was true in 2024. In 2026, models like Claude Sonnet 4.6 score nearly 80% on SWE-bench—they&apos;re resolving real GitHub issues from production codebases. GPT-5.3 Codex writes code autonomously for hours. Local models like Qwen3-Coder-Next run on consumer hardware with 262K context windows.
        </p>
        <p>
          The quality floor has risen dramatically. You don&apos;t need perfect code for a personal tool. You need code that works, handles your use case, and can be iterated on. Current models deliver that consistently.
        </p>
        <p>
          More importantly, the iteration cycle has compressed. Found a bug? Describe it. Want a new feature? Ask for it. The feedback loop between idea and implementation has gone from weeks to minutes.
        </p>

        <h2>Digitalization Accelerated</h2>
        <p>
          Germany ranks <a href="https://digital-strategy.ec.europa.eu/en/policies/desi-germany" target="_blank" rel="noopener noreferrer">18th in the EU</a> on the Digital Economy and Society Index. Small businesses still run on spreadsheets, paper forms, and &ldquo;the way we&apos;ve always done it.&rdquo;
        </p>
        <p>
          The bottleneck was never willingness—it was cost. When a local craftsman&apos;s shop needs a simple appointment booking system, the choices were: pay €3,000+ for custom development, wrestle with a generic SaaS that&apos;s 90% irrelevant features, or keep using the paper calendar.
        </p>
        <p>
          Now there&apos;s a fourth option: describe what you need and have it built in an afternoon. The software fits the business instead of the business fitting the software.
        </p>
        <p>This scales across every sector where digitalization has lagged:</p>
        <ul>
          <li><strong>Small nonprofits</strong> that need donor management but can&apos;t afford Salesforce</li>
          <li><strong>Local governments</strong> with specific permit workflows that no SaaS covers</li>
          <li><strong>Healthcare practices</strong> wanting custom patient intake flows</li>
          <li><strong>Trades businesses</strong> needing job tracking tailored to their specialty</li>
        </ul>
        <p>
          Each of these represents a digitalization step that was previously blocked by economics. AI coding doesn&apos;t just make developers faster—it unlocks projects that never would have started.
        </p>
      </article>

      <DigitalizationComparison />

      <article className="prose">
        <h2>The Window</h2>
        <p>
          Here&apos;s the part most commentary misses: this is a <strong>transitional period</strong>, and it&apos;s valuable precisely because it&apos;s temporary.
        </p>
        <p>
          Right now, AI coding agents are powerful enough to build useful software but still require human direction—defining requirements, making design decisions, testing, iterating. This means the value flows to the people with domain knowledge: the teacher who knows their grading needs, the business owner who understands their workflow, the coach who knows what match data matters.
        </p>
        <p>
          That window will narrow. As AI systems become capable of not just building software but identifying what software should be built, the role of human direction diminishes. Full automation of the idea-to-deployment pipeline is probably 3–5 years away.
        </p>
        <p>
          But right now? We&apos;re in a golden age where the tools are powerful enough to be transformative but still need human judgment to be useful. The barrier to creating custom software has never been lower, and the people who benefit most aren&apos;t developers—they&apos;re everyone else.
        </p>
      </article>

      <WindowTimeline />

      <article className="prose">
        <h2>What This Means for Builders</h2>
        <p>
          If you&apos;re a developer, this isn&apos;t a threat story—it&apos;s an opportunity story. The market for software isn&apos;t shrinking; it&apos;s exploding. Every small business, every niche workflow, every personal frustration with generic tools is now a potential project.
        </p>
        <p>
          The skill that matters most isn&apos;t writing code anymore. It&apos;s <strong>understanding problems</strong>. Knowing what to build, for whom, and why. That&apos;s always been the hard part of software. The easy part—turning specifications into code—is what&apos;s getting automated.
        </p>
        <p>
          If you&apos;re not a developer, this is your moment. The tools exist today to build exactly the software you need. Not approximately. Not &ldquo;close enough.&rdquo; Exactly. And it costs less than a dinner out.
        </p>
        <p>
          The golden age of personal software is here. It won&apos;t last forever. But while it does, we should make the most of it.
        </p>
      </article>
    </div>
  )
}
