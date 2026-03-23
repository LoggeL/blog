'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { useState } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('software-projects-ai-age')!

type Tier = 'small' | 'medium' | 'large'
type Role = 'engineer' | 'pm'

type SkillStatus = 'removed' | 'stays' | 'evolved' | 'new'

interface SkillItem {
  labelEn: string
  labelDe: string
  status: SkillStatus
  noteEn?: string
  noteDe?: string
}

const statusConfig: Record<SkillStatus, { badge: string; badgeDe: string; badgeColor: string; bgColor: string; textClass: string }> = {
  removed: { badge: 'REMOVED', badgeDe: 'ENTFERNT', badgeColor: 'bg-red-500/15 text-red-500', bgColor: 'bg-red-500/5', textClass: 'text-subtle line-through' },
  stays: { badge: 'STAYS', badgeDe: 'BLEIBT', badgeColor: 'bg-surface text-muted', bgColor: 'bg-surface/50', textClass: 'text-foreground' },
  evolved: { badge: 'EVOLVES', badgeDe: 'WANDELT SICH', badgeColor: 'bg-amber-500/15 text-amber-500', bgColor: 'bg-amber-500/5', textClass: 'text-foreground' },
  new: { badge: 'NEW', badgeDe: 'NEU', badgeColor: 'bg-emerald-500/15 text-emerald-500', bgColor: 'bg-emerald-500/5', textClass: 'text-foreground' },
}

export default function SoftwareProjectsAIAgePage() {
  const [selectedTier, setSelectedTier] = useState<Tier>('small')
  const [selectedRole, setSelectedRole] = useState<Role>('engineer')
  const { t, locale } = useLocale()

  const tierData: Record<Tier, { labelEn: string; labelDe: string; icon: string; teamSizeEn: string; teamSizeDe: string; teamEn: string[]; teamDe: string[]; workflowEn: string[]; workflowDe: string[]; keyInsightEn: string; keyInsightDe: string; color: string }> = {
    small: {
      labelEn: 'Small Projects',
      labelDe: 'Kleine Projekte',
      icon: '⚡',
      teamSizeEn: '~1 week traditional effort',
      teamSizeDe: '~1 Woche traditioneller Aufwand',
      teamEn: ['1 Project Manager', 'No engineers needed'],
      teamDe: ['1 Project Manager', 'Kein Engineer nötig'],
      workflowEn: [
        'PM takes requirements from stakeholders',
        'PM translates requirements into prompts',
        'AI agent builds the solution end-to-end',
        'AI system evaluates if the problem is truly simple',
        'Back-and-forth Q&A between PM and AI for clarification',
        'PM reviews output and delivers to stakeholders',
      ],
      workflowDe: [
        'PM nimmt Anforderungen von Stakeholdern auf',
        'PM übersetzt Anforderungen in Prompts',
        'AI-Agent baut die Lösung von Anfang bis Ende',
        'AI-System prüft, ob das Problem wirklich einfach ist',
        'Iterativer Austausch zwischen PM und AI zur Klärung',
        'PM prüft Ergebnis und liefert es an Stakeholder',
      ],
      keyInsightEn: '"Fail-proof" — simple enough that AI handles it reliably. No deep technical understanding needed from the PM.',
      keyInsightDe: '"Fail-proof" — einfach genug, dass die AI es zuverlässig umsetzt. Der PM braucht kein tiefes technisches Verständnis.',
      color: '#10b981',
    },
    medium: {
      labelEn: 'Medium Projects',
      labelDe: 'Mittlere Projekte',
      icon: '🔧',
      teamSizeEn: 'Weeks to a few months',
      teamSizeDe: 'Wochen bis wenige Monate',
      teamEn: ['1 Senior Software Engineer', 'Manager only if many stakeholders'],
      teamDe: ['1 Senior Software Engineer', 'Manager nur bei vielen Stakeholdern'],
      workflowEn: [
        'Engineer drafts architecture WITH the AI model',
        'AI agent writes all the code — no code written by hand',
        'Engineer reviews, debugs, and steers the AI',
        'If structured input exists + engineer is socially capable → no manager needed',
        'Engineer acts as "AI conductor" — orchestrating the agent',
      ],
      workflowDe: [
        'Engineer entwirft Architektur gemeinsam mit dem AI-Modell',
        'AI-Agent schreibt den gesamten Code — kein Code per Hand',
        'Engineer reviewed, debuggt und steuert die AI',
        'Bei strukturiertem Input + kommunikativem Engineer → kein Manager nötig',
        'Engineer als „AI-Dirigent" — orchestriert den Agenten',
      ],
      keyInsightEn: "The engineer needs a strong understanding of architectures, technology, and infrastructure. They don't write code — they direct the AI that does.",
      keyInsightDe: 'Der Engineer braucht ein tiefes Verständnis von Architekturen, Technologie und Infrastruktur. Er schreibt keinen Code — er dirigiert die AI, die es tut.',
      color: '#f59e0b',
    },
    large: {
      labelEn: 'Large Projects',
      labelDe: 'Große Projekte',
      icon: '🏗️',
      teamSizeEn: 'Months to years',
      teamSizeDe: 'Monate bis Jahre',
      teamEn: ['1+ Managers', 'Multiple Senior Engineers'],
      teamDe: ['1+ Manager', 'Mehrere Senior Engineers'],
      workflowEn: [
        'Project scoped into distinct sections/modules',
        'Each engineer owns their module and controls their own AI agent',
        'Clean interfaces and communication between modules is critical',
        'Managers coordinate across teams and stakeholders',
        'Engineers need deep understanding of their specific domain',
      ],
      workflowDe: [
        'Projekt wird in klar abgegrenzte Module aufgeteilt',
        'Jeder Engineer verantwortet sein Modul und steuert seinen AI-Agenten',
        'Saubere Schnittstellen und Kommunikation zwischen Modulen sind entscheidend',
        'Manager koordinieren über Teams und Stakeholder hinweg',
        'Engineers brauchen tiefes Verständnis ihres spezifischen Bereichs',
      ],
      keyInsightEn: 'The challenge shifts from writing code to defining clean boundaries. The quality of interfaces between modules determines project success.',
      keyInsightDe: 'Die Herausforderung verlagert sich vom Code-Schreiben zum Definieren sauberer Grenzen. Die Qualität der Schnittstellen entscheidet über den Projekterfolg.',
      color: '#d90429',
    },
  }

  const skillsTransition: Record<Role, { labelEn: string; labelDe: string; skills: SkillItem[] }> = {
    engineer: {
      labelEn: 'Software Engineer',
      labelDe: 'Software Engineer',
      skills: [
        { labelEn: 'Deep coding skills (writing code manually)', labelDe: 'Tiefe Coding-Kenntnisse (Code manuell schreiben)', status: 'removed' },
        { labelEn: 'Language/framework expertise (as primary skill)', labelDe: 'Sprach-/Framework-Expertise (als Kernkompetenz)', status: 'removed' },
        { labelEn: 'Debugging', labelDe: 'Debugging', status: 'stays' },
        { labelEn: 'Version control', labelDe: 'Versionskontrolle', status: 'stays' },
        { labelEn: 'Testing', labelDe: 'Testing', status: 'stays' },
        { labelEn: 'Code review & reading comprehension', labelDe: 'Code-Review & Leseverständnis', status: 'stays' },
        { labelEn: 'Broad technological overview', labelDe: 'Breiter technologischer Überblick', status: 'evolved', noteEn: '→ Must understand the full stack', noteDe: '→ Muss den gesamten Stack verstehen' },
        { labelEn: 'Basic architecture understanding', labelDe: 'Grundlegendes Architekturverständnis', status: 'evolved', noteEn: '→ Architecture expertise (CRITICAL)', noteDe: '→ Architektur-Expertise (KRITISCH)' },
        { labelEn: 'AI agent systems & agentic workflows', labelDe: 'AI-Agentensysteme & agentische Workflows', status: 'new' },
        { labelEn: 'Prompt engineering / AI orchestration', labelDe: 'Prompt Engineering / AI-Orchestrierung', status: 'new' },
        { labelEn: 'System design & infrastructure (elevated)', labelDe: 'Systemdesign & Infrastruktur (erweitert)', status: 'new' },
        { labelEn: 'Technology landscape awareness', labelDe: 'Überblick über die Technologielandschaft', status: 'new' },
        { labelEn: 'Communication & stakeholder management', labelDe: 'Kommunikation & Stakeholder-Management', status: 'new' },
      ],
    },
    pm: {
      labelEn: 'Project Manager',
      labelDe: 'Project Manager',
      skills: [
        { labelEn: 'Agile/Scrum methodology (traditional form)', labelDe: 'Agile/Scrum-Methodik (klassische Form)', status: 'removed' },
        { labelEn: 'Detailed timeline/resource planning', labelDe: 'Detaillierte Zeit-/Ressourcenplanung', status: 'removed', noteEn: 'AI is faster', noteDe: 'AI ist schneller' },
        { labelEn: 'Stakeholder management', labelDe: 'Stakeholder-Management', status: 'stays' },
        { labelEn: 'Risk management', labelDe: 'Risikomanagement', status: 'stays' },
        { labelEn: 'Basic technical understanding', labelDe: 'Grundlegendes technisches Verständnis', status: 'stays' },
        { labelEn: 'Understanding of LLM capabilities', labelDe: 'Verständnis von LLM-Fähigkeiten', status: 'new' },
        { labelEn: 'Requirements → prompt translation', labelDe: 'Anforderungen → Prompt-Übersetzung', status: 'new' },
        { labelEn: 'Task orchestration (non-linear workflows)', labelDe: 'Aufgaben-Orchestrierung (nicht-lineare Workflows)', status: 'new' },
        { labelEn: 'Quality evaluation of AI output', labelDe: 'Qualitätsbewertung von AI-Output', status: 'new' },
      ],
    },
  }

  const timelineSteps = [
    {
      year: t({ en: 'Now (2026)', de: 'Jetzt (2026)' }),
      desc: t({ en: 'AI writes code, but humans still do most of the integration, debugging, and architecture. AI is a tool, not a team member.', de: 'AI schreibt Code, aber Menschen übernehmen noch den Großteil der Integration, des Debuggings und der Architektur. AI ist ein Werkzeug, kein Teammitglied.' }),
      pct: 15,
    },
    {
      year: t({ en: 'Late 2027', de: 'Ende 2027' }),
      desc: t({ en: 'Small projects fully AI-driven. Medium projects need one senior engineer as conductor. The restructuring begins.', de: 'Kleine Projekte vollständig AI-getrieben. Mittlere Projekte brauchen einen Senior Engineer als Dirigenten. Die Umstrukturierung beginnt.' }),
      pct: 55,
    },
    {
      year: t({ en: '2028+', de: '2028+' }),
      desc: t({ en: 'Three-tier model is standard. Junior onboarding becomes the critical challenge. Teams are smaller but more senior.', de: 'Das Drei-Stufen-Modell ist Standard. Junior-Onboarding wird zur entscheidenden Herausforderung. Teams sind kleiner, aber erfahrener.' }),
      pct: 90,
    },
  ]

  const tier = tierData[selectedTier]
  const roleData = skillsTransition[selectedRole]

  const tierTeam = locale === 'de' ? tier.teamDe : tier.teamEn
  const tierWorkflow = locale === 'de' ? tier.workflowDe : tier.workflowEn

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
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          {t({
            en: "By late 2027, software development teams will look fundamentally different. Code is written by AI. Humans architect, review, and orchestrate. The question isn't whether this happens — it's how teams restructure around it.",
            de: 'Ende 2027 werden Software-Entwicklungsteams grundlegend anders aussehen. Code wird von AI geschrieben. Menschen entwerfen Architekturen, reviewen und orchestrieren. Die Frage ist nicht ob das passiert — sondern wie Teams sich darauf einstellen.',
          })}
        </p>

        <p>
          {t({
            en: 'This is my prediction for how software projects will be staffed and run in the near future. Not hype — a practical, realistic assessment based on where AI capabilities are heading.',
            de: 'Das ist meine Einschätzung, wie Software-Projekte in naher Zukunft besetzt und geführt werden. Kein Hype — eine nüchterne, realistische Analyse auf Basis der Entwicklung von AI-Fähigkeiten.',
          })}
        </p>

        <h2>{t({ en: 'The Three Project Tiers', de: 'Die drei Projektstufen' })}</h2>

        <p>
          {t({
            en: 'Not all projects are equal. The team structure depends entirely on complexity. Click each tier to see how it works:',
            de: 'Nicht alle Projekte sind gleich. Die Teamstruktur hängt vollständig von der Komplexität ab. Klicke auf eine Stufe, um zu sehen, wie sie funktioniert:',
          })}
        </p>

        {/* Interactive Tier Selector */}
        <div className="my-8 not-prose">
          <div className="flex gap-2 mb-6">
            {(Object.keys(tierData) as Tier[]).map((tierKey) => (
              <button
                key={tierKey}
                onClick={() => setSelectedTier(tierKey)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 border-2 cursor-pointer ${
                  selectedTier === tierKey
                    ? 'border-current text-white shadow-lg scale-[1.02]'
                    : 'border-border text-muted hover:border-subtle hover:text-foreground'
                }`}
                style={selectedTier === tierKey ? { backgroundColor: tierData[tierKey].color, borderColor: tierData[tierKey].color } : {}}
              >
                <span className="mr-1.5">{tierData[tierKey].icon}</span>
                {t({ en: tierData[tierKey].labelEn, de: tierData[tierKey].labelDe })}
              </button>
            ))}
          </div>

          <div
            className="rounded-xl border-2 p-6 transition-all duration-300"
            style={{ borderColor: tier.color }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-primary">
                <span className="mr-2">{tier.icon}</span>
                {t({ en: tier.labelEn, de: tier.labelDe })}
              </h3>
              <span className="text-xs px-3 py-1 rounded-full text-white font-medium" style={{ backgroundColor: tier.color }}>
                {t({ en: tier.teamSizeEn, de: tier.teamSizeDe })}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-3 font-medium">{t({ en: 'Team Composition', de: 'Teamzusammensetzung' })}</p>
                <ul className="space-y-2">
                  {tierTeam.map((member, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tier.color }} /> {member}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-3 font-medium">{t({ en: 'Workflow', de: 'Workflow' })}</p>
                <ol className="space-y-2">
                  {tierWorkflow.map((step, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <span className="text-xs font-mono mt-0.5 w-4 flex-shrink-0" style={{ color: tier.color }}>{i + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div
              className="p-4 rounded-lg border transition-all duration-300"
              style={{
                backgroundColor: `${tier.color}10`,
                borderColor: `${tier.color}30`,
              }}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg leading-none mt-0.5">💡</span>
                <p className="text-sm text-foreground font-medium leading-relaxed">{t({ en: tier.keyInsightEn, de: tier.keyInsightDe })}</p>
              </div>
            </div>
          </div>
        </div>

        <h2>{t({ en: 'Onboarding Junior Engineers: The Hard Part', de: 'Junior Engineers einarbeiten: Die schwierige Frage' })}</h2>

        <p>
          {t({
            en: 'If AI writes all the code, how do you train the next generation of senior engineers? This is the critical unsolved problem.',
            de: 'Wenn AI den gesamten Code schreibt — wie bildet man dann die nächste Generation von Senior Engineers aus? Das ist das entscheidende ungelöste Problem.',
          })}
        </p>

        <p>
          {t({
            en: 'My answer: ',
            de: 'Meine Antwort: ',
          })}<strong>{t({ en: 'use small projects as training ground', de: 'kleine Projekte als Trainingsfeld nutzen' })}</strong>{t({
            en: '. Instead of throwing juniors into large projects where they\'d be overwhelmed, a manager pre-scopes requirements and the junior engineer implements with AI assistance.',
            de: '. Anstatt Juniors in große Projekte zu werfen, wo sie überfordert wären, grenzt ein Manager die Anforderungen vorab ein und der Junior Engineer setzt sie mit AI-Unterstützung um.',
          })}
        </p>

        <ul>
          <li>{t({ en: "It's slower for the team — but ", de: 'Es ist langsamer für das Team — aber ' })}<em>{t({ en: 'necessary', de: 'notwendig' })}</em></li>
          <li>{t({ en: "Without training juniors, there won't be future senior engineers", de: 'Ohne Junior-Ausbildung gibt es keine zukünftigen Senior Engineers' })}</li>
          <li>{t({ en: 'Think of it as an ', de: 'Zu verstehen als ' })}<strong>{t({ en: 'apprenticeship model', de: 'Ausbildungsmodell' })}</strong></li>
          <li>{t({ en: 'Juniors learn architecture, review, and orchestration — not manual coding', de: 'Juniors lernen Architektur, Review und Orchestrierung — kein manuelles Coding' })}</li>
        </ul>

        <p>
          {t({
            en: "Skip this step, and the industry creates a talent cliff. You can't hire senior engineers if nobody ever gets trained up.",
            de: 'Wer diesen Schritt überspringt, riskiert einen Talentmangel. Man kann keine Senior Engineers einstellen, wenn niemand mehr ausgebildet wird.',
          })}
        </p>

        <h2>{t({ en: 'Skills: Past vs AI Age', de: 'Skills: Früher vs. AI-Zeitalter' })}</h2>

        <p>
          {t({
            en: 'The required skillset shifts dramatically. Select a role to see what changes:',
            de: 'Das benötigte Skillset verschiebt sich erheblich. Wähle eine Rolle, um zu sehen, was sich ändert:',
          })}
        </p>

        {/* Role Selector + Skills Transition */}
        <div className="my-8 not-prose">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedRole('engineer')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 border-2 cursor-pointer ${
                selectedRole === 'engineer'
                  ? 'border-[#d90429] bg-[#d90429] text-white shadow-lg'
                  : 'border-border text-muted hover:border-subtle hover:text-foreground'
              }`}
            >
              🛠️ Software Engineer
            </button>
            <button
              onClick={() => setSelectedRole('pm')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 border-2 cursor-pointer ${
                selectedRole === 'pm'
                  ? 'border-[#d90429] bg-[#d90429] text-white shadow-lg'
                  : 'border-border text-muted hover:border-subtle hover:text-foreground'
              }`}
            >
              📋 Project Manager
            </button>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface">
              <h3 className="text-sm font-semibold text-primary">
                {t({ en: roleData.labelEn, de: roleData.labelDe })} — {t({ en: 'Skill Transition', de: 'Skill-Wandel' })}
              </h3>
            </div>

            <div className="divide-y divide-border">
              {roleData.skills.map((skill, i) => {
                const config = statusConfig[skill.status]
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-5 py-3 transition-all duration-300 ${config.bgColor}`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${config.badgeColor}`}>
                      {t({ en: config.badge, de: config.badgeDe })}
                    </span>
                    <span className={`text-sm ${config.textClass}`}>
                      {t({ en: skill.labelEn, de: skill.labelDe })}
                    </span>
                    {(skill.noteEn || skill.noteDe) && (
                      <span className="text-xs text-amber-500 ml-auto flex-shrink-0">
                        {t({ en: skill.noteEn ?? '', de: skill.noteDe ?? '' })}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500/50" /> {t({ en: 'No longer needed', de: 'Nicht mehr benötigt' })}</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-500/50" /> {t({ en: 'Carries over', de: 'Bleibt erhalten' })}</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500/50" /> {t({ en: 'Evolves', de: 'Wandelt sich' })}</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500/50" /> {t({ en: 'New skill needed', de: 'Neuer Skill erforderlich' })}</span>
          </div>
        </div>

        <h2>{t({ en: 'The Transition Timeline', de: 'Der Übergangszeitraum' })}</h2>

        {/* Timeline Visualization */}
        <div className="my-8 not-prose">
          <div className="relative">
            {/* Progress bar background */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-border rounded-full" />

            <div className="relative flex justify-between">
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: '30%' }}>
                  {/* Dot */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 mb-3"
                    style={{
                      backgroundColor: i === 0 ? '#71717a' : i === 1 ? '#f59e0b' : '#d90429',
                    }}
                  >
                    {step.pct}%
                  </div>
                  <p className="text-sm font-medium text-primary text-center">{step.year}</p>
                  <p className="text-xs text-muted text-center mt-1 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Label */}
            <p className="text-xs text-muted text-center mt-6">
              {t({ en: '% of code written by AI agents (estimated)', de: '% des von AI-Agenten geschriebenen Codes (geschätzt)' })}
            </p>
          </div>
        </div>

        <h2>{t({ en: 'What This Means', de: 'Was das bedeutet' })}</h2>

        <p>
          {t({
            en: 'Teams get smaller but more senior. The role of "software engineer" shifts from someone who writes code to someone who understands systems deeply enough to direct AI that writes code. Project managers on small projects become direct AI operators.',
            de: 'Teams werden kleiner, aber erfahrener. Die Rolle des „Software Engineers" verändert sich: von jemandem, der Code schreibt, zu jemandem, der Systeme tief genug versteht, um die AI zu dirigieren, die den Code schreibt. Project Manager bei kleinen Projekten werden zu direkten AI-Operatoren.',
          })}
        </p>

        <p>
          {t({
            en: 'The junior engineer problem is real — but it\'s conditional. If AI agents keep improving at their current pace, they may eventually replace the need for junior roles entirely. In that scenario, the apprenticeship pipeline becomes irrelevant because the profession itself transforms beyond recognition.',
            de: 'Das Junior-Engineer-Problem ist real — aber es hängt von Bedingungen ab. Wenn AI-Agenten in ihrem aktuellen Tempo weiter besser werden, könnten sie den Bedarf an Junior-Rollen irgendwann vollständig ersetzen. In diesem Szenario wird die Ausbildungspipeline irrelevant, weil sich der Beruf selbst unkenntlich verändert.',
          })}
        </p>

        <p>
          {t({
            en: 'But if agents plateau — capable enough to write code but not enough to fully own projects — then the industry ',
            de: 'Wenn Agenten aber ein Plateau erreichen — gut genug, um Code zu schreiben, aber nicht gut genug, um Projekte vollständig zu verantworten — dann ',
          })}<em>{t({ en: 'must', de: 'muss' })}</em>{t({
            en: ' invest in junior training or face a talent crisis within a decade. The companies that figure out the apprenticeship model first will have a lasting advantage. Everyone else will be fighting over a shrinking pool of senior talent.',
            de: ' die Branche in Junior-Ausbildung investieren — oder in einem Jahrzehnt vor einer Talentskrise stehen. Die Unternehmen, die das Ausbildungsmodell zuerst lösen, werden einen dauerhaften Vorsprung haben. Alle anderen kämpfen um einen schrumpfenden Pool an Senior-Talenten.',
          })}
        </p>

        <hr />

        <p className="text-sm text-muted italic">
          {t({
            en: 'This is an opinion piece reflecting my current thinking. The timeline could shift. The specific team structures will vary. But the direction — AI writing code, humans architecting and reviewing — feels inevitable. The only question is how fast.',
            de: 'Dies ist ein Meinungsbeitrag, der meinen aktuellen Denkstand widerspiegelt. Der Zeitplan kann sich verschieben. Die konkreten Teamstrukturen werden variieren. Aber die Richtung — AI schreibt Code, Menschen entwerfen Architekturen und reviewen — fühlt sich unausweichlich an. Die einzige Frage ist: wie schnell.',
          })}
        </p>
      </article>
    </div>
  )
}
