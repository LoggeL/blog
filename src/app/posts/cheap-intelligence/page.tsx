'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { useState, useEffect, useRef } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('cheap-intelligence')!

/* ── Job Automation Timeline ── */

type JobCategory = 'whiteCollar' | 'blueCollar'

interface JobRole {
  name: string
  start: number
  end: number
  category: JobCategory
}

const jobs: JobRole[] = [
  { name: 'Customer Support', start: 2025, end: 2027, category: 'whiteCollar' },
  { name: 'Translation', start: 2025, end: 2027, category: 'whiteCollar' },
  { name: 'Junior Developers', start: 2025, end: 2028, category: 'whiteCollar' },
  { name: 'Data Analysts', start: 2026, end: 2028, category: 'whiteCollar' },
  { name: 'Paralegals', start: 2026, end: 2029, category: 'whiteCollar' },
  { name: 'Accountants', start: 2026, end: 2029, category: 'whiteCollar' },
  { name: 'Copywriters', start: 2025, end: 2027, category: 'whiteCollar' },
  { name: 'Radiologists', start: 2027, end: 2030, category: 'whiteCollar' },
  { name: 'Warehouse Workers', start: 2028, end: 2031, category: 'blueCollar' },
  { name: 'Delivery Drivers', start: 2028, end: 2032, category: 'blueCollar' },
  { name: 'Assembly Line', start: 2029, end: 2032, category: 'blueCollar' },
  { name: 'Construction', start: 2030, end: 2034, category: 'blueCollar' },
  { name: 'Plumbing/Electrical', start: 2031, end: 2035, category: 'blueCollar' },
  { name: 'Agriculture', start: 2029, end: 2033, category: 'blueCollar' },
]

const TIMELINE_START = 2025
const TIMELINE_END = 2035

function JobTimeline() {
  const [filter, setFilter] = useState<'all' | JobCategory>('all')
  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.category === filter)
  const range = TIMELINE_END - TIMELINE_START
  const { t } = useLocale()

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
        <div className="hidden sm:flex border-b border-border bg-surface px-4 py-2">
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
              className={`px-3 sm:px-4 py-2 ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Mobile: stacked layout */}
              <div className="sm:hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-foreground font-medium">{job.name}</span>
                  <span className="text-[10px] text-muted font-mono">{job.start}–{job.end}</span>
                </div>
                <div className="relative h-4 bg-surface rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full transition-all duration-500"
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 8)}%`,
                      backgroundColor: color,
                      opacity: 0.8,
                    }}
                  />
                </div>
              </div>
              {/* Desktop: inline layout */}
              <div className="hidden sm:flex items-center">
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
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted mt-3 text-center">
        {t({
          en: 'Estimated timeline for significant automation impact (not full replacement)',
          de: 'Geschätzte Zeitleiste für signifikante Automatisierungseffekte (kein vollständiger Ersatz)',
        })}
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
  const { t } = useLocale()
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
          {t({
            en: 'Cycle repeats — faster each iteration',
            de: 'Zyklus wiederholt sich — jede Iteration schneller',
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */

export default function CheapIntelligencePage() {
  const { locale, t } = useLocale()
  const title = locale === 'de' && post.titleDE ? post.titleDE : post.title

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">{t({ en: 'Opinion', de: 'Meinung' })}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">{t({ en: 'Outlook', de: 'Ausblick' })}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">AI</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {title}
        </h1>
      </header>

      <article className="prose">
        <p>
{t({ en: 'Electricity made physical power cheap. The internet made information cheap. LLMs are making ', de: 'Elektrizität machte physische Kraft billig. Das Internet machte Information billig. LLMs machen ' })}<em>{t({ en: 'intelligence', de: 'Intelligenz' })}</em>{t({ en: ' cheap. And we are not ready for what happens next.', de: ' billig. Und wir sind nicht bereit für das, was als Nächstes kommt.' })}
        </p>

        <p>
          {t({
            en: "This isn't a gradual shift. The cost of cognitive work is collapsing right now — not in some speculative future, but quarter by quarter, benchmark by benchmark. What took a junior analyst a week now takes an AI 30 seconds and costs less than a coffee. Multiply that across every knowledge worker on the planet and you start to see the scale of what's coming.",
            de: "Das ist kein gradueller Wandel. Die Kosten kognitiver Arbeit brechen gerade zusammen — nicht in irgendeiner spekulativen Zukunft, sondern Quartal für Quartal, Benchmark für Benchmark. Was ein Junior Analyst eine Woche brauchte, erledigt eine KI in 30 Sekunden für weniger als einen Kaffee. Multipliziert man das über jeden Wissensarbeiter auf dem Planeten, beginnt man die Dimension des Kommenden zu erahnen.",
          })}
        </p>

        <h2>{t({ en: 'The Intelligence Price Crash', de: 'Der Preisverfall der Intelligenz' })}</h2>

        <p>
          {t({
            en: 'Every major economic revolution follows the same pattern: something expensive becomes cheap, and society restructures around the new reality.',
            de: 'Jede große ökonomische Revolution folgt demselben Muster: Etwas Teures wird billig, und die Gesellschaft reorganisiert sich um die neue Realität.',
          })}
        </p>

        <ul>
          <li><strong>{t({ en: 'Electricity:', de: 'Elektrizität:' })}</strong> {t({ en: 'Physical labor went from human/animal power to machines. Entire industries appeared. Others vanished.', de: 'Physische Arbeit ging von Mensch/Tier auf Maschinen über. Ganze Industrien entstanden. Andere verschwanden.' })}</li>
          <li><strong>{t({ en: 'Internet:', de: 'Internet:' })}</strong> {t({ en: 'Information distribution went from expensive to free. Media, retail, communication — all transformed beyond recognition.', de: 'Informationsverteilung ging von teuer zu kostenlos. Medien, Einzelhandel, Kommunikation — alles bis zur Unkenntlichkeit verändert.' })}</li>
          <li><strong>LLMs:</strong> {t({ en: 'Cognitive work is going from expensive to nearly free. Analysis, writing, coding, reasoning, planning — all approaching marginal cost zero.', de: 'Kognitive Arbeit geht von teuer zu nahezu kostenlos. Analyse, Schreiben, Coding, Reasoning, Planung — alles nähert sich Grenzkosten null.' })}</li>
        </ul>

        <p>
          {t({
            en: "The pattern is clear, but people keep making the same mistake: assuming their industry, their job, their skill is somehow exempt. It wasn't true for factory workers in 1900. It wasn't true for travel agents in 2005. And it won't be true for knowledge workers in 2026.",
            de: "Das Muster ist klar, aber die Leute machen immer wieder denselben Fehler: anzunehmen, dass ihre Branche, ihr Job, ihre Fähigkeit irgendwie ausgenommen ist. Das stimmte nicht für Fabrikarbeiter 1900. Es stimmte nicht für Reisebüros 2005. Und es wird nicht für Wissensarbeiter 2026 stimmen.",
          })}
        </p>

        <h2>{t({ en: 'White Collar Falls First', de: 'White Collar fällt zuerst' })}</h2>

        <p>
          {t({
            en: "This isn't a prediction. It's already happening.",
            de: "Das ist keine Prognose. Es passiert bereits.",
          })}
        </p>

        <p>
          {t({
            en: "Klarna replaced 700 customer service agents with AI and reported better satisfaction scores. Duolingo laid off contractors because AI handles translation and content generation. Law firms are using AI to do document review that previously required teams of paralegals. Accounting firms are automating audit procedures. Marketing agencies are cutting copywriting teams.",
            de: "Klarna ersetzte 700 Kundenservice-Mitarbeiter durch KI und meldete bessere Zufriedenheitswerte. Duolingo entließ Auftragnehmer, weil KI Übersetzung und Content-Erstellung übernimmt. Anwaltskanzleien nutzen KI für Dokumentenprüfung, die zuvor ganze Teams von Rechtsanwaltsgehilfen erforderte. Wirtschaftsprüfer automatisieren Prüfverfahren. Marketing-Agenturen bauen Texter-Teams ab.",
          })}
        </p>

        <p>
          {t({
            en: 'The roles getting hit first share common traits: they involve processing information, following established patterns, and producing structured output. In other words — exactly what LLMs are good at.',
            de: 'Die zuerst betroffenen Rollen teilen gemeinsame Merkmale: Sie beinhalten Informationsverarbeitung, folgen etablierten Mustern und produzieren strukturierte Ergebnisse. Mit anderen Worten — genau das, was LLMs gut können.',
          })}
        </p>

        <ul>
          <li><strong>{t({ en: 'Analysts', de: 'Analysten' })}</strong> — {t({ en: 'AI can process data, find patterns, and write reports', de: 'KI kann Daten verarbeiten, Muster finden und Berichte schreiben' })}</li>
          <li><strong>{t({ en: 'Junior developers', de: 'Junior-Entwickler' })}</strong> — {t({ en: 'AI writes code, runs tests, fixes bugs', de: 'KI schreibt Code, führt Tests aus, behebt Bugs' })}</li>
          <li><strong>{t({ en: 'Translators', de: 'Übersetzer' })}</strong> — {t({ en: 'already largely automated for most use cases', de: 'für die meisten Anwendungsfälle bereits weitgehend automatisiert' })}</li>
          <li><strong>{t({ en: 'Paralegals', de: 'Rechtsanwaltsgehilfen' })}</strong> — {t({ en: 'document review, contract analysis, legal research', de: 'Dokumentenprüfung, Vertragsanalyse, juristische Recherche' })}</li>
          <li><strong>{t({ en: 'Accountants', de: 'Buchhalter' })}</strong> — {t({ en: 'bookkeeping, tax prep, financial reporting', de: 'Buchhaltung, Steuervorbereitung, Finanzberichterstattung' })}</li>
          <li><strong>{t({ en: 'Support agents', de: 'Support-Mitarbeiter' })}</strong> — {t({ en: 'chatbots that actually work now', de: 'Chatbots, die jetzt tatsächlich funktionieren' })}</li>
        </ul>

        <p>
          {t({
            en: "The uncomfortable truth: most white-collar work is pattern matching. And pattern matching is precisely what AI does better, faster, and cheaper than humans. The jobs that survive are the ones that require judgment in genuinely novel situations, deep relationship trust, or physical presence. That's a much smaller number than people think.",
            de: "Die unbequeme Wahrheit: Der Großteil der Büroarbeit ist Mustererkennung. Und Mustererkennung ist genau das, was KI besser, schneller und billiger kann als Menschen. Die Jobs, die überleben, sind diejenigen, die Urteilsvermögen in wirklich neuartigen Situationen erfordern, tiefes Beziehungsvertrauen oder physische Präsenz. Das ist eine viel kleinere Zahl, als die Leute denken.",
          })}
        </p>

        <h2>{t({ en: 'The Blue Collar Illusion', de: 'Die Blue-Collar-Illusion' })}</h2>

        <p>
          {t({
            en: '"Sure, AI can write emails, but it can\'t lay bricks."',
            de: '\u201eKlar, KI kann E-Mails schreiben, aber keine Ziegel legen.\u201c',
          })}
        </p>

        <p>
          {t({
            en: "This is the most dangerous form of complacency right now. Blue-collar workers see white-collar jobs getting automated and feel safe. After all, plumbing requires hands, construction requires physical presence, and logistics requires navigating the real world.",
            de: "Das ist die gefährlichste Form der Selbstzufriedenheit gerade. Handwerker sehen, wie Bürojobs automatisiert werden, und fühlen sich sicher. Schließlich erfordert Klempnerei Hände, Bauwesen physische Präsenz und Logistik Navigation in der echten Welt.",
          })}
        </p>

        <p>
          {t({
            en: "They're right — for now. But they're missing the acceleration spiral.",
            de: "Sie haben recht — vorerst. Aber sie übersehen die Beschleunigungsspirale.",
          })}
        </p>

        <AccelerationSpiral />

        <p>
          {t({ en: 'Here\'s the key insight: when you automate the engineers who build robots, robot development goes exponential. Right now, the bottleneck for humanoid robots isn\'t hardware — it\'s the intelligence to make them useful. LLMs are solving that bottleneck.', de: 'Hier ist die Kernerkenntnis: Wenn man die Ingenieure automatisiert, die Roboter bauen, wird die Roboterentwicklung exponentiell. Aktuell ist der Engpass bei humanoiden Robotern nicht die Hardware — es ist die Intelligenz, um sie nützlich zu machen. LLMs lösen diesen Engpass.' })}
        </p>

        <p>
          {t({
            en: "Look at what's already in motion:",
            de: "Schau dir an, was bereits in Bewegung ist:",
          })}
        </p>

        <ul>
          <li><strong>Figure</strong> — {t({ en: "humanoid robots doing warehouse work, backed by OpenAI's models", de: "humanoide Roboter für Lagerarbeit, unterstützt durch OpenAIs Modelle" })}</li>
          <li><strong>Tesla Optimus</strong> — {t({ en: "general-purpose humanoid, iterating fast with Tesla's manufacturing scale", de: "universeller Humanoid, schnelle Iteration dank Teslas Fertigungskapazität" })}</li>
          <li><strong>Boston Dynamics</strong> — {t({ en: "Atlas doing complex physical tasks, now paired with LLM reasoning", de: "Atlas bewältigt komplexe physische Aufgaben, jetzt kombiniert mit LLM-Reasoning" })}</li>
          <li><strong>1X</strong> — {t({ en: "EVE and NEO robots designed for homes and workplaces", de: "EVE- und NEO-Roboter für Zuhause und Arbeitsplatz" })}</li>
          <li><strong>Agility Robotics</strong> — {t({ en: "Digit already deployed in Amazon warehouses", de: "Digit bereits in Amazon-Lagern im Einsatz" })}</li>
        </ul>

        <p>
          {t({
            en: "The timeline isn't decades. It's years. White collar automation is ramping up now (2025-2028). Blue collar automation follows 1-2 years behind, once AI-designed robots reach production scale. By 2030-2032, very few jobs will be untouchable.",
            de: "Die Zeitlinie umfasst keine Jahrzehnte. Es sind Jahre. Die Automatisierung der Büroarbeit läuft jetzt hoch (2025-2028). Die Automatisierung im Handwerk folgt 1-2 Jahre später, sobald KI-designte Roboter Serienreife erreichen. Bis 2030-2032 werden nur wenige Jobs unangreifbar sein.",
          })}
        </p>

        <JobTimeline />

        <h2>{t({ en: 'Education System Collapse', de: 'Zusammenbruch des Bildungssystems' })}</h2>

        <p>
          {t({
            en: "The current education model is built on a simple deal: invest 3-5 years learning a niche skill, then extract value from the job market for decades. The skill depreciates slowly enough that the investment pays off.",
            de: "Das aktuelle Bildungsmodell basiert auf einem einfachen Deal: Investiere 3-5 Jahre in eine Nischenkompetenz, dann schöpfe jahrzehntelang Wert auf dem Arbeitsmarkt ab. Die Kompetenz verliert langsam genug an Wert, damit sich die Investition lohnt.",
          })}
        </p>

        <p>
          {t({
            en: "That deal is broken.",
            de: "Dieser Deal ist geplatzt.",
          })}
        </p>

        <p>
          {t({
            en: "When entire professions get automated in 2-3 years, what happens to the student halfway through a 4-year accounting degree? Or the law student who takes on $200k in debt for a career that AI is already disrupting? They graduate into a job market that no longer needs their specific skills.",
            de: "Wenn ganze Berufe in 2-3 Jahren automatisiert werden, was passiert mit dem Studenten mitten im 4-jährigen BWL-Studium? Oder dem Jurastudenten, der 200.000 $ Schulden für eine Karriere aufnimmt, die KI bereits disrupted? Sie schließen ab in einen Arbeitsmarkt, der ihre spezifischen Fähigkeiten nicht mehr braucht.",
          })}
        </p>

        <p>
          {t({
            en: "Student debt for skills that are worthless by graduation. That's not a dystopian fantasy — it's the math of automation speed vs education length.",
            de: "Studienkredit für Fähigkeiten, die zum Abschluss wertlos sind. Das ist keine dystopische Fantasie — es ist die Mathematik von Automatisierungsgeschwindigkeit vs. Ausbildungsdauer.",
          })}
        </p>

        <p>
          {t({
            en: "What replaces the current model? Probably some combination of:",
            de: "Was ersetzt das aktuelle Modell? Wahrscheinlich eine Kombination aus:",
          })}
        </p>

        <ul>
          <li><strong>{t({ en: 'Continuous learning:', de: 'Kontinuierliches Lernen:' })}</strong> {t({ en: 'Short bursts of skill acquisition, not front-loaded degrees', de: 'Kurze Lernsprints statt vorgelagerter Abschlüsse' })}</li>
          <li><strong>Micro-Credentials:</strong> {t({ en: 'Prove you can do X, not that you sat in a room for 4 years', de: 'Beweise, dass du X kannst — nicht, dass du 4 Jahre in einem Raum gesessen hast' })}</li>
          <li><strong>Learn-by-doing:</strong> {t({ en: 'Apprenticeship models where you learn alongside AI, not instead of it', de: 'Lehrmodelle, bei denen du neben KI lernst, nicht statt ihr' })}</li>
          <li><strong>Meta-Skills:</strong> {t({ en: 'Learning how to learn, how to evaluate AI output, how to orchestrate agents', de: 'Lernen, wie man lernt, KI-Output bewertet und Agenten orchestriert' })}</li>
        </ul>

        <p>
          {t({
            en: "Universities that don't adapt will become the Blockbusters of education — charging premium prices for a product that's available better and cheaper elsewhere.",
            de: "Universitäten, die sich nicht anpassen, werden die Blockbusters der Bildung — Premiumpreise für ein Produkt, das anderswo besser und billiger verfügbar ist.",
          })}
        </p>

        <h2>{t({ en: 'Three Scenarios', de: 'Drei Szenarien' })}</h2>

        <p>
          {t({
            en: "Nobody knows exactly how this plays out. But the range of outcomes is wide, and the path we take depends on choices being made right now — by governments, companies, and individuals.",
            de: "Niemand weiß genau, wie das ausgeht. Aber die Bandbreite der Ergebnisse ist groß, und der Weg hängt von Entscheidungen ab, die jetzt getroffen werden — von Regierungen, Unternehmen und Einzelpersonen.",
          })}
        </p>

        <ScenarioExplorer />

        <p>
          {t({
            en: "My honest read? We'll get something between dystopian and transition, depending on the country. Scandinavian countries with strong social safety nets will manage. The US, with its worship of unregulated markets, will probably let a lot of people fall through the cracks before fixing anything. Developing nations could go either way — they could leapfrog with cheap AI, or get crushed by having nothing to export when labor is worthless.",
            de: "Meine ehrliche Einschätzung? Wir landen irgendwo zwischen Dystopie und Übergang, je nach Land. Skandinavische Länder mit starken sozialen Sicherungsnetzen werden es schaffen. Die USA mit ihrer Verehrung unregulierter Märkte werden wahrscheinlich viele Leute durchs Netz fallen lassen, bevor sie etwas reparieren. Entwicklungsländer könnten es in beide Richtungen schaffen — sie könnten mit billiger KI einen Sprung machen oder untergehen, wenn sie nichts mehr zu exportieren haben, weil Arbeitskraft wertlos ist.",
          })}
        </p>

        <p>
          {t({
            en: "The utopian scenario is possible but requires political will that doesn't currently exist. Post-scarcity is a technical possibility. Whether we distribute that abundance fairly is a political question — and history doesn't give great odds.",
            de: "Das utopische Szenario ist möglich, erfordert aber politischen Willen, der aktuell nicht existiert. Post-Scarcity ist eine technische Möglichkeit. Ob wir diesen Überfluss gerecht verteilen, ist eine politische Frage — und die Geschichte gibt keine guten Quoten.",
          })}
        </p>

        <h2>{t({ en: 'What To Do Now', de: 'Was jetzt zu tun ist' })}</h2>

        <p>
          {t({
            en: "This isn't a call to panic. It's a call to adapt — quickly and honestly.",
            de: "Das ist kein Aufruf zur Panik. Es ist ein Aufruf zur Anpassung — schnell und ehrlich.",
          })}
        </p>

        <ul>
          <li>
            <strong>{t({ en: 'Be the human in the loop.', de: 'Sei der Mensch in der Schleife.' })}</strong> {t({ en: "Learn to steer AI, not compete with it. The person who can prompt, review, and direct AI output is infinitely more valuable than the person who does what AI can do, just slower.", de: "Lerne, KI zu steuern, nicht mit ihr zu konkurrieren. Die Person, die prompten, prüfen und KI-Output lenken kann, ist unendlich wertvoller als die Person, die tut, was KI kann — nur langsamer." })}
          </li>
          <li>
            <strong>{t({ en: 'Own the stack, not the skill.', de: 'Besitze den Stack, nicht die Fähigkeit.' })}</strong> {t({ en: 'Orchestrating multiple AI agents to solve complex problems > doing one task well. Think conductor, not violinist.', de: 'Mehrere KI-Agenten für komplexe Probleme orchestrieren > eine Aufgabe gut erledigen. Denke Dirigent, nicht Geiger.' })}
          </li>
          <li>
            <strong>{t({ en: 'Build capital, not just career.', de: 'Baue Kapital auf, nicht nur Karriere.' })}</strong> {t({ en: "When labor is devalued, owning assets matters more than earning a salary. Equity, property, investments — anything that generates returns independent of your time.", de: "Wenn Arbeitskraft entwertet wird, ist Vermögen wichtiger als Gehalt. Anteile, Immobilien, Investments — alles, was Renditen unabhängig von deiner Zeit generiert." })}
          </li>
          <li>
            <strong>{t({ en: 'Relationships and trust.', de: 'Beziehungen und Vertrauen.' })}</strong> {t({ en: "The one thing AI genuinely can't replicate. Your network, your reputation, the trust people place in you — that's your moat.", de: "Das Einzige, was KI wirklich nicht replizieren kann. Dein Netzwerk, dein Ruf, das Vertrauen, das Menschen in dich setzen — das ist dein Burggraben." })}
          </li>
          <li>
            <strong>{t({ en: 'Stay adaptable.', de: 'Bleib anpassungsfähig.' })}</strong> {t({ en: "No 5-year plans. Think in quarters. The world is changing fast enough that long-term career planning is a fiction. Be ready to pivot.", de: "Keine 5-Jahres-Pläne. Denke in Quartalen. Die Welt verändert sich schnell genug, dass langfristige Karriereplanung Fiktion ist. Sei bereit umzuschwenken." })}
          </li>
          <li>
            <strong>{t({ en: 'Political engagement.', de: 'Politisches Engagement.' })}</strong> {t({ en: "UBI, AI taxation, education reform, labor protections — none of this happens by itself. The decisions being made right now will determine which scenario we land in. If you're not at the table, you're on the menu.", de: "UBI, KI-Besteuerung, Bildungsreform, Arbeitnehmerschutz — nichts davon passiert von allein. Die Entscheidungen, die jetzt getroffen werden, bestimmen, in welchem Szenario wir landen. Wer nicht am Tisch sitzt, steht auf der Speisekarte." })}
          </li>
        </ul>

        <hr />

        <p>
          {t({ en: 'The intelligence revolution is here. Not coming — here. The cost of thinking has crashed, and everything built on the assumption that human cognition is scarce and valuable is about to be repriced. The question isn\'t whether society changes. It\'s whether we shape that change, or just get hit by it.', de: 'Die Intelligenz-Revolution ist da. Nicht kommend — da. Die Kosten des Denkens sind eingebrochen, und alles, was auf der Annahme aufgebaut ist, dass menschliche Kognition knapp und wertvoll ist, wird gerade neu bepreist. Die Frage ist nicht, ob sich die Gesellschaft verändert. Sondern ob wir diesen Wandel gestalten oder nur davon getroffen werden.' })}
        </p>

        <p className="text-sm text-muted italic">
          {t({
            en: "The future isn't something that happens to you. It's something you either build or get buried by.",
            de: "Die Zukunft ist nichts, das dir passiert. Es ist etwas, das du entweder baust oder unter dem du begraben wirst.",
          })}
        </p>
      </article>
    </div>
  )
}
