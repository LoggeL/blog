'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { useState } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('golden-age-of-personal-software')!

/* ─────────────────────────────────────────────
   1. Cost comparison slider: 2020 → 2026
───────────────────────────────────────────── */
const costData: Record<number, {
  cost: string
  detail: { en: string; de: string }
  label: { en: string; de: string }
}> = {
  2020: {
    cost: '$50,000',
    detail: { en: 'Senior developer, ~3 months, design + dev + testing', de: 'Senior-Entwickler, ~3 Monate, Design + Entwicklung + Testing' },
    label: { en: 'Agency or freelancer required', de: 'Agentur oder Freelancer erforderlich' },
  },
  2021: {
    cost: '$35,000',
    detail: { en: 'Rise of low-code tools cuts simple projects', de: 'Low-Code-Tools reduzieren Kosten für einfache Projekte' },
    label: { en: 'Webflow/Bubble reduce frontend cost', de: 'Webflow/Bubble senken Frontend-Kosten' },
  },
  2022: {
    cost: '$18,000',
    detail: { en: 'GitHub Copilot speeds up individual devs', de: 'GitHub Copilot beschleunigt einzelne Entwickler' },
    label: { en: 'Copilot era — devs 30% faster', de: 'Copilot-Ära — Entwickler 30 % schneller' },
  },
  2023: {
    cost: '$8,000',
    detail: { en: 'GPT-4 + early coding assistants', de: 'GPT-4 + erste Coding-Assistenten' },
    label: { en: 'AI pair programming goes mainstream', de: 'AI-Pair-Programming wird Mainstream' },
  },
  2024: {
    cost: '$800',
    detail: { en: 'Claude 3.5, Cursor, full-feature scaffolding', de: 'Claude 3.5, Cursor, vollständiges Scaffolding' },
    label: { en: 'Agentic coding emerges', de: 'Agentisches Programmieren entsteht' },
  },
  2025: {
    cost: '$80',
    detail: { en: 'Claude 4, multi-agent pipelines, minimal oversight', de: 'Claude 4, Multi-Agent-Pipelines, minimale Aufsicht' },
    label: { en: 'Autonomous builds become reliable', de: 'Autonome Builds werden zuverlässig' },
  },
  2026: {
    cost: '$20',
    detail: { en: 'API tokens + an afternoon of prompting', de: 'API-Tokens + ein Nachmittag Prompting' },
    label: { en: 'Personal software era', de: 'Ära der persönlichen Software' },
  },
}
const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]

function CostSlider() {
  const { t } = useLocale()
  const [yearIdx, setYearIdx] = useState(0)
  const year = years[yearIdx]
  const data = costData[year]
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
        {t({ en: 'Cost to build a typical small business web app', de: 'Kosten für eine typische kleine Business-Web-App' })}
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
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.4rem' }}>{t(data.detail)}</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--subtle)', lineHeight: 1 }}>
          {year}
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
        <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
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
        {t(data.label)}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   2. Long tail visualization (SVG bar chart)
───────────────────────────────────────────── */
const longTailSegments = [
  { label: { en: 'ERP / CRM', de: 'ERP / CRM' }, size: 95, served: true, example: { en: 'SAP, Salesforce, Oracle', de: 'SAP, Salesforce, Oracle' } },
  { label: { en: 'E-commerce', de: 'E-Commerce' }, size: 80, served: true, example: { en: 'Shopify, WooCommerce', de: 'Shopify, WooCommerce' } },
  { label: { en: 'Collaboration', de: 'Kollaboration' }, size: 70, served: true, example: { en: 'Notion, Slack, Teams', de: 'Notion, Slack, Teams' } },
  { label: { en: 'HR & Payroll', de: 'HR & Lohnbuchhaltung' }, size: 60, served: true, example: { en: 'Workday, BambooHR', de: 'Workday, BambooHR' } },
  { label: { en: 'Accounting', de: 'Buchhaltung' }, size: 50, served: true, example: { en: 'QuickBooks, Xero', de: 'QuickBooks, Xero' } },
  { label: { en: 'Niche CRM', de: 'Nischen-CRM' }, size: 35, served: false, example: { en: '5-person consulting firm intake', de: 'Aufnahme-Tool für 5-köpfige Beratungsfirma' } },
  { label: { en: 'Club mgmt', de: 'Vereinsverwaltung' }, size: 25, served: false, example: { en: 'Amateur rugby lineout tracker', de: 'Einwurf-Tracker für Amateur-Rugby' } },
  { label: { en: 'Custom reports', de: 'Custom Reports' }, size: 18, served: false, example: { en: 'Coach match analysis tool', de: 'Spielanalyse-Tool für Trainer' } },
  { label: { en: 'Shop tools', de: 'Handwerks-Tools' }, size: 12, served: false, example: { en: 'Craftsman appointment booking', de: 'Terminbuchung für Handwerker' } },
  { label: { en: 'Personal ops', de: 'Persönliche Workflows' }, size: 8, served: false, example: { en: 'Teacher grading rubric app', de: 'Bewertungsraster-App für Lehrer' } },
  { label: { en: 'One-offs', de: 'Einzel-Tools' }, size: 4, served: false, example: { en: 'Household inventory, event planner', de: 'Haushaltsinventar, Event-Planer' } },
]

function LongTailChart() {
  const { t } = useLocale()
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
        {t({ en: 'The software long tail', de: 'Der Long Tail der Software' })}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
        {t({ en: 'Big SaaS serves the head. AI coding unlocks the long tail.', de: 'Großes SaaS bedient die Spitze. AI Coding erschließt den Long Tail.' })}
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

      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '0.75rem' }} />

      {hovered !== null ? (
        <div style={{
          padding: '0.6rem 0.875rem',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          fontSize: '0.8rem',
        }}>
          <strong style={{ color: 'var(--foreground)' }}>{t(longTailSegments[hovered].label)}</strong>
          <span style={{ color: 'var(--subtle)', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
            {longTailSegments[hovered].served
              ? t({ en: '✓ Covered by SaaS', de: '✓ Von SaaS abgedeckt' })
              : t({ en: '→ Now accessible via AI coding', de: '→ Jetzt via AI Coding zugänglich' })}
          </span>
          <div style={{ color: 'var(--muted)', marginTop: '0.2rem' }}>{t(longTailSegments[hovered].example)}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--subtle)' }} />
            {t({ en: 'Served by existing SaaS', de: 'Von bestehendem SaaS abgedeckt' })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--primary)' }} />
            {t({ en: 'Newly accessible (hover to explore)', de: 'Neu zugänglich (hover zum Erkunden)' })}
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
    label: { en: 'Too Expensive', de: 'Zu teuer' },
    period: '~2020',
    desc: { en: 'Custom software requires professional developers. Only enterprises and well-funded startups can afford it.', de: 'Custom Software erfordert professionelle Entwickler. Nur Konzerne und gut finanzierte Startups können sich das leisten.' },
    state: 'past',
    isNow: false,
  },
  {
    label: { en: 'Transition', de: 'Übergangsphase' },
    period: '2022–2024',
    desc: { en: 'Copilot, GPT-4, early agents. Faster for developers, but still requires technical knowledge.', de: 'Copilot, GPT-4, frühe Agents. Schneller für Entwickler, aber weiterhin technisches Wissen nötig.' },
    state: 'transition',
    isNow: false,
  },
  {
    label: { en: 'Golden Age', de: 'Goldenes Zeitalter' },
    period: '2025–2027',
    desc: { en: 'AI agents build software from description. Human direction is the bottleneck — not code.', de: 'AI-Agents bauen Software aus Beschreibungen. Menschliche Richtungsvorgabe ist der Engpass — nicht Code.' },
    state: 'now',
    isNow: true,
  },
  {
    label: { en: 'Full Automation', de: 'Vollautomatisierung' },
    period: '2028+',
    desc: { en: 'AI identifies what software should be built and builds it. Human direction becomes optional.', de: 'AI erkennt was gebaut werden sollte und baut es. Menschliche Steuerung wird optional.' },
    state: 'future',
    isNow: false,
  },
]

function WindowTimeline() {
  const { t } = useLocale()

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
    }}>
      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '1.25rem' }}>
        {t({ en: 'The transitional window', de: 'Das Übergangsfenster' })}
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
              {t(phase.label)}
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
                  {t({ en: 'NOW', de: 'JETZT' })}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--subtle)', marginBottom: '0.4rem' }}>{phase.period}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.5 }}>{t(phase.desc)}</div>
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
    sector: { en: 'Local craftsman', de: 'Handwerksbetrieb' },
    need: { en: 'Appointment booking', de: 'Terminbuchung' },
    before: { en: '€3,000+ custom dev or wrestle with generic SaaS', de: '€3.000+ Custom-Entwicklung oder Kämpfen mit generischem SaaS' },
    now: { en: 'Describe the workflow, get a working app in an afternoon', de: 'Workflow beschreiben, fertige App an einem Nachmittag' },
  },
  {
    sector: { en: 'Small nonprofit', de: 'Kleine NGO' },
    need: { en: 'Donor management', de: 'Spenderverwaltung' },
    before: { en: 'Salesforce (too expensive) or spreadsheets', de: 'Salesforce (zu teuer) oder Tabellen' },
    now: { en: 'Custom donor tracker, exactly their workflow, ~$20', de: 'Maßgeschneiderter Spender-Tracker, genau ihr Workflow, ~$20' },
  },
  {
    sector: { en: 'Local government', de: 'Kommunalverwaltung' },
    need: { en: 'Permit workflows', de: 'Genehmigungsprozesse' },
    before: { en: "Years-long procurement, generic systems that don't fit", de: 'Jahrelange Beschaffung, generische Systeme die nicht passen' },
    now: { en: 'Specific permit flow built by someone who knows the process', de: 'Spezifischer Genehmigungsablauf, gebaut von jemandem der den Prozess kennt' },
  },
  {
    sector: { en: 'Teacher', de: 'Lehrkraft' },
    need: { en: 'Grading tool', de: 'Bewertungstool' },
    before: { en: 'Excel with manual formulas or expensive LMS', de: 'Excel mit manuellen Formeln oder teures LMS' },
    now: { en: 'Custom rubric app, exactly their grading system', de: 'Maßgeschneiderte Rubrik-App, genau ihr Bewertungssystem' },
  },
  {
    sector: { en: 'Coach', de: 'Trainer' },
    need: { en: 'Match analysis', de: 'Spielanalyse' },
    before: { en: 'Paper notes or expensive sports software', de: 'Papiernotizen oder teure Sportanalysesoftware' },
    now: { en: 'Video-to-report tool, built for their exact metrics', de: 'Video-zu-Report-Tool, für ihre exakten Metriken gebaut' },
  },
]

function DigitalizationComparison() {
  const { t } = useLocale()
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
        {t({ en: 'Before vs. now', de: 'Früher vs. heute' })}
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
            {t(c.sector)}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
        {t({ en: 'Need:', de: 'Bedarf:' })} <strong style={{ color: 'var(--foreground)' }}>{t(comp.need)}</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{
          padding: '0.875rem',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
        }}>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginBottom: '0.5rem' }}>
            {t({ en: 'Before', de: 'Früher' })}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t(comp.before)}</div>
        </div>
        <div style={{
          padding: '0.875rem',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--primary)',
          borderRadius: '8px',
        }}>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t({ en: 'Now', de: 'Heute' })}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--foreground)', lineHeight: 1.6 }}>{t(comp.now)}</div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function PostPage() {
  const { locale, t } = useLocale()
  const title = locale === 'de' && post.titleDE ? post.titleDE : post.title
  const excerpt = locale === 'de' && post.excerptDE ? post.excerptDE : post.excerpt

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <time className="text-sm text-subtle">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-foreground mt-2">{title}</h1>
        <p className="text-muted mt-3 text-base leading-relaxed">{excerpt}</p>
      </header>

      <article className="prose">
        <p>
          {t({
            en: "There's a narrative dominating AI discourse right now: coding jobs are dying, developers are being replaced, the sky is falling. And yes, that future is coming—eventually. But between now and then, something genuinely exciting is happening that deserves more attention.",
            de: 'Es gibt gerade eine Erzählung, die den KI-Diskurs dominiert: Programmier-Jobs sterben aus, Entwickler werden ersetzt, die Welt geht unter. Ja, diese Zukunft kommt — irgendwann. Aber zwischen jetzt und dann passiert etwas wirklich Spannendes, das mehr Aufmerksamkeit verdient.',
          })}
        </p>
        <p>
          <strong>{t({ en: 'Software is becoming personal.', de: 'Software wird persönlich.' })}</strong>
        </p>

        <h2>{t({ en: 'The Economics Have Flipped', de: 'Die Wirtschaftlichkeit hat sich umgekehrt' })}</h2>
        <p>
          {t({
            en: 'Building a custom web app in 2023 meant hiring a developer for $5,000–50,000, or spending months learning to code yourself. In 2026, the same app costs $20 in API tokens and an afternoon of prompting.',
            de: 'Eine Custom-Web-App in 2023 zu bauen bedeutete, einen Entwickler für $5.000–50.000 zu engagieren, oder monatelang selbst programmieren zu lernen. 2026 kostet dieselbe App $20 an API-Tokens und einen Nachmittag Prompting.',
          })}
        </p>
        <p>
          {t({
            en: "This isn't theoretical. I've watched non-technical people build and deploy functional applications in hours:",
            de: 'Das ist nicht theoretisch. Ich habe beobachtet, wie nicht-technische Menschen in Stunden funktionale Anwendungen gebaut und deployed haben:',
          })}
        </p>
        <ul>
          <li>{t({ en: 'A teacher building a custom grading tool tailored to their exact rubric', de: 'Eine Lehrkraft, die ein maßgeschneidertes Bewertungstool für ihr eigenes Bewertungsschema baut' })}</li>
          <li>{t({ en: 'A small business owner creating an inventory system that matches their specific workflow', de: 'Ein Kleinunternehmer, der ein Inventarsystem erstellt, das genau seinem Workflow entspricht' })}</li>
          <li>{t({ en: 'A coach generating match analysis reports from video recordings', de: 'Ein Trainer, der Spielanalyse-Berichte aus Videoaufnahmen generiert' })}</li>
        </ul>
        <p>
          {t({
            en: 'None of these people would have commissioned custom software before. The cost-benefit math never worked out. Off-the-shelf tools were close enough, and \u201cclose enough\u201d was all they could afford. That equation has changed.',
            de: 'Keiner dieser Menschen hätte früher Custom-Software in Auftrag gegeben. Die Kosten-Nutzen-Rechnung ging nie auf. Fertige Tools waren nah genug dran, und „nah genug" war alles was sie sich leisten konnten. Diese Gleichung hat sich geändert.',
          })}
        </p>

        <h2>{t({ en: 'Small Problems, Finally Worth Solving', de: 'Kleine Probleme, endlich lösenswert' })}</h2>
        <p>
          {t({
            en: "The enterprise software world optimizes for the largest possible market. Salesforce doesn't build features for a 5-person consulting firm's specific client intake process. Notion doesn't ship a template for tracking your amateur rugby team's lineout statistics.",
            de: 'Die Enterprise-Software-Welt optimiert für den größtmöglichen Markt. Salesforce baut keine Features für den spezifischen Aufnahmeprozess einer 5-köpfigen Beratungsfirma. Notion liefert kein Template für die Einwurf-Statistik deines Amateur-Rugby-Teams.',
          })}
        </p>
        <p>
          {t({
            en: "These are real problems. They're just too small for traditional software economics.",
            de: 'Das sind echte Probleme. Sie sind einfach zu klein für die traditionelle Software-Wirtschaft.',
          })}
        </p>
        <p>
          {t({
            en: 'AI coding agents have inverted this. When the cost of building drops by 100x, problems that were \u201cnot worth a developer\u2019s time\u201d suddenly become trivially solvable. The long tail of software needs\u2014millions of specific, small, personal use cases\u2014becomes accessible.',
            de: 'AI Coding Agents haben das umgekehrt. Wenn die Baukosten um den Faktor 100 sinken, werden Probleme die „eines Entwicklers Zeit nicht wert waren" plötzlich trivial lösbar. Der Long Tail an Software-Bedürfnissen — Millionen spezifischer, kleiner, persönlicher Anwendungsfälle — wird zugänglich.',
          })}
        </p>
        <p>
          {t({
            en: 'This is the ',
            de: 'Das ist die ',
          })}
          <strong>{t({ en: 'democratization', de: 'Demokratisierung' })}</strong>
          {t({
            en: ' people have been promising for decades. Not through no-code platforms with their own constraints and lock-in, but through actual code that you own, customize, and deploy wherever you want.',
            de: ' die man seit Jahrzehnten verspricht. Nicht durch No-Code-Plattformen mit ihren eigenen Einschränkungen und Lock-in, sondern durch echten Code, den du besitzt, anpasst und überall deployen kannst.',
          })}
        </p>
      </article>

      <LongTailChart />

      <article className="prose">
        <h2>{t({ en: 'The Quality Curve', de: 'Die Qualitätskurve' })}</h2>
        <p>
          {t({
            en: 'A common objection: \u201cAI-generated code is mediocre.\u201d That was true in 2024. In 2026, models like Claude Sonnet 4.6 score nearly 80% on SWE-bench\u2014they\u2019re resolving real GitHub issues from production codebases. GPT-5.3 Codex writes code autonomously for hours. Local models like Qwen3-Coder-Next run on consumer hardware with 262K context windows.',
            de: 'Ein häufiger Einwand: „KI-generierter Code ist mittelmäßig." Das stimmte 2024. 2026 erzielen Modelle wie Claude Sonnet 4.6 fast 80 % auf SWE-bench — sie lösen echte GitHub Issues aus Produktions-Codebases. GPT-5.3 Codex schreibt stundenlang autonom Code. Lokale Modelle wie Qwen3-Coder-Next laufen auf Consumer-Hardware mit 262K Context Windows.',
          })}
        </p>
        <p>
          {t({
            en: 'The quality floor has risen dramatically. You don\u2019t need perfect code for a personal tool. You need code that works, handles your use case, and can be iterated on. Current models deliver that consistently.',
            de: 'Das Qualitätsniveau ist dramatisch gestiegen. Für ein persönliches Tool braucht man keinen perfekten Code. Man braucht Code der funktioniert, den eigenen Anwendungsfall abdeckt und iterierbar ist. Aktuelle Modelle liefern das zuverlässig.',
          })}
        </p>
        <p>
          {t({
            en: 'More importantly, the iteration cycle has compressed. Found a bug? Describe it. Want a new feature? Ask for it. The feedback loop between idea and implementation has gone from weeks to minutes.',
            de: 'Noch wichtiger: der Iterationszyklus hat sich drastisch verkürzt. Bug gefunden? Beschreibe ihn. Neues Feature gewünscht? Einfach fragen. Der Feedback-Loop zwischen Idee und Umsetzung ist von Wochen auf Minuten geschrumpft.',
          })}
        </p>

        <h2>{t({ en: 'Digitalization Accelerated', de: 'Digitalisierung auf der Überholspur' })}</h2>
        <p>
          {t({ en: 'Germany ranks ', de: 'Deutschland belegt ' })}
          <a href="https://digital-strategy.ec.europa.eu/en/policies/desi-germany" target="_blank" rel="noopener noreferrer">
            {t({ en: '18th in the EU', de: 'Platz 18 in der EU' })}
          </a>
          {t({
            en: ' on the Digital Economy and Society Index. Small businesses still run on spreadsheets, paper forms, and \u201cthe way we\u2019ve always done it.\u201d',
            de: ' im Digital Economy and Society Index. Kleine Unternehmen arbeiten noch mit Tabellen, Papierformularen und „so wie wir es immer gemacht haben".',
          })}
        </p>
        <p>
          {t({
            en: 'The bottleneck was never willingness\u2014it was cost. When a local craftsman\u2019s shop needs a simple appointment booking system, the choices were: pay \u20ac3,000+ for custom development, wrestle with a generic SaaS that\u2019s 90% irrelevant features, or keep using the paper calendar.',
            de: 'Der Engpass war nie der Wille — sondern die Kosten. Wenn ein Handwerksbetrieb ein einfaches Terminbuchungssystem braucht, waren die Optionen: über 3.000 € für Custom-Entwicklung zahlen, mit einem generischen SaaS kämpfen das zu 90 % irrelevante Features hat, oder den Papierkalender weiter nutzen.',
          })}
        </p>
        <p>
          {t({
            en: 'Now there\u2019s a fourth option: describe what you need and have it built in an afternoon. The software fits the business instead of the business fitting the software.',
            de: 'Jetzt gibt es eine vierte Option: Beschreibe was du brauchst und lass es an einem Nachmittag bauen. Die Software passt sich dem Betrieb an, anstatt dass sich der Betrieb der Software anpassen muss.',
          })}
        </p>
        <p>{t({ en: 'This scales across every sector where digitalization has lagged:', de: 'Das skaliert über alle Branchen, in denen die Digitalisierung hinterherhinkt:' })}</p>
        <ul>
          <li>
            <strong>{t({ en: 'Small nonprofits', de: 'Kleine NGOs' })}</strong>{' '}
            {t({ en: "that need donor management but can't afford Salesforce", de: 'die Spenderverwaltung brauchen, sich aber Salesforce nicht leisten können' })}
          </li>
          <li>
            <strong>{t({ en: 'Local governments', de: 'Kommunalverwaltungen' })}</strong>{' '}
            {t({ en: 'with specific permit workflows that no SaaS covers', de: 'mit spezifischen Genehmigungsabläufen, die kein SaaS abdeckt' })}
          </li>
          <li>
            <strong>{t({ en: 'Healthcare practices', de: 'Arztpraxen' })}</strong>{' '}
            {t({ en: 'wanting custom patient intake flows', de: 'die individuelle Patientenaufnahme-Prozesse wollen' })}
          </li>
          <li>
            <strong>{t({ en: 'Trades businesses', de: 'Handwerksbetriebe' })}</strong>{' '}
            {t({ en: 'needing job tracking tailored to their specialty', de: 'die auf ihr Gewerk zugeschnittenes Auftragsmanagement brauchen' })}
          </li>
        </ul>
        <p>
          {t({
            en: 'Each of these represents a digitalization step that was previously blocked by economics. AI coding doesn\u2019t just make developers faster\u2014it unlocks projects that never would have started.',
            de: 'Jedes dieser Beispiele steht für einen Digitalisierungsschritt, der bisher an der Wirtschaftlichkeit scheiterte. AI Coding macht Entwickler nicht nur schneller — es erschließt Projekte, die sonst nie gestartet wären.',
          })}
        </p>
      </article>

      <DigitalizationComparison />

      <article className="prose">
        <h2>{t({ en: 'The Window', de: 'Das Zeitfenster' })}</h2>
        <p>
          {t({ en: "Here's the part most commentary misses: this is a ", de: 'Das ist der Teil, den die meisten Kommentatoren übersehen: Das ist eine ' })}
          <strong>{t({ en: 'transitional period', de: 'Übergangsphase' })}</strong>
          {t({ en: ", and it's valuable precisely because it's temporary.", de: ', und sie ist genau deshalb wertvoll, weil sie vorübergehend ist.' })}
        </p>
        <p>
          {t({
            en: 'Right now, AI coding agents are powerful enough to build useful software but still require human direction\u2014defining requirements, making design decisions, testing, iterating. This means the value flows to the people with domain knowledge: the teacher who knows their grading needs, the business owner who understands their workflow, the coach who knows what match data matters.',
            de: 'Aktuell sind AI Coding Agents mächtig genug, um nützliche Software zu bauen, benötigen aber noch menschliche Führung — Anforderungen definieren, Design-Entscheidungen treffen, testen, iterieren. Das bedeutet: Der Wert fließt zu den Menschen mit Domain-Wissen: die Lehrkraft, die ihre Bewertungsanforderungen kennt, der Unternehmer, der seinen Workflow versteht, der Trainer, der weiß welche Spieldaten zählen.',
          })}
        </p>
        <p>
          {t({
            en: 'That window will narrow. As AI systems become capable of not just building software but identifying what software should be built, the role of human direction diminishes. Full automation of the idea-to-deployment pipeline is probably 3\u20135 years away.',
            de: 'Dieses Fenster wird sich schließen. Wenn AI-Systeme nicht nur Software bauen, sondern auch erkennen können, welche Software gebaut werden sollte, schwindet die Rolle menschlicher Richtungsvorgabe. Die vollständige Automatisierung der Idee-bis-Deployment-Pipeline ist wahrscheinlich 3–5 Jahre entfernt.',
          })}
        </p>
        <p>
          {t({
            en: "But right now? We\u2019re in a golden age where the tools are powerful enough to be transformative but still need human judgment to be useful. The barrier to creating custom software has never been lower, and the people who benefit most aren\u2019t developers\u2014they\u2019re everyone else.",
            de: 'Aber jetzt gerade? Wir befinden uns in einem goldenen Zeitalter, in dem die Tools mächtig genug sind, um transformativ zu sein, aber noch menschliches Urteilsvermögen benötigen. Die Hürde zur Erstellung individueller Software war noch nie niedriger, und die größten Nutznießer sind keine Entwickler — sondern alle anderen.',
          })}
        </p>
      </article>

      <WindowTimeline />

      <article className="prose">
        <h2>{t({ en: 'What This Means for Builders', de: 'Was das für Entwickler bedeutet' })}</h2>
        <p>
          {t({
            en: "If you\u2019re a developer, this isn\u2019t a threat story\u2014it\u2019s an opportunity story. The market for software isn\u2019t shrinking; it\u2019s exploding. Every small business, every niche workflow, every personal frustration with generic tools is now a potential project.",
            de: 'Wenn du Entwickler bist, ist das keine Bedrohungsgeschichte — sondern eine Chancengeschichte. Der Markt für Software schrumpft nicht; er explodiert. Jeder Kleinbetrieb, jeder Nischen-Workflow, jede persönliche Frustration mit generischen Tools ist jetzt ein potenzielles Projekt.',
          })}
        </p>
        <p>
          {t({ en: "The skill that matters most isn\u2019t writing code anymore. It\u2019s ", de: 'Die wichtigste Fähigkeit ist nicht mehr Code schreiben. Es ist ' })}
          <strong>{t({ en: 'understanding problems', de: 'Probleme verstehen' })}</strong>
          {t({
            en: '. Knowing what to build, for whom, and why. That\u2019s always been the hard part of software. The easy part\u2014turning specifications into code\u2014is what\u2019s getting automated.',
            de: '. Wissen was man baut, für wen und warum. Das war schon immer der schwierige Teil von Software. Der einfache Teil — Spezifikationen in Code übersetzen — ist das, was automatisiert wird.',
          })}
        </p>
        <p>
          {t({
            en: "If you\u2019re not a developer, this is your moment. The tools exist today to build exactly the software you need. Not approximately. Not \u201cclose enough.\u201d Exactly. And it costs less than a dinner out.",
            de: 'Wenn du kein Entwickler bist, ist das dein Moment. Die Tools existieren heute, um genau die Software zu bauen, die du brauchst. Nicht ungefähr. Nicht „nah genug". Genau. Und es kostet weniger als ein Restaurantbesuch.',
          })}
        </p>
        <p>
          {t({
            en: "The golden age of personal software is here. It won\u2019t last forever. But while it does, we should make the most of it.",
            de: 'Das goldene Zeitalter der persönlichen Software ist da. Es wird nicht ewig dauern. Aber solange es besteht, sollten wir es nutzen.',
          })}
        </p>
      </article>
    </div>
  )
}
