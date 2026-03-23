'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('education-2-0')!

export default function Education20Page() {
  const { locale, t } = useLocale()
  const title = locale === 'de' && post.titleDE ? post.titleDE : post.title

  // Normal distribution data for visualization
  const generateNormalDistribution = () => {
    const points = []
    for (let x = -3; x <= 3; x += 0.1) {
      const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
      points.push({ x, y })
    }
    return points
  }

  const distribution = generateNormalDistribution()
  const chartWidth = 500
  const chartHeight = 200
  const padding = { top: 20, right: 30, bottom: 50, left: 30 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  // Scale functions
  const xScale = (x: number) => padding.left + ((x + 3) / 6) * innerWidth
  const yScale = (y: number) => padding.top + innerHeight - (y / 0.45) * innerHeight

  // Create path for the curve
  const curvePath = distribution
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x)},${yScale(p.y)}`)
    .join(' ')

  // Create filled area for center (the "lesson target")
  const centerPoints = distribution.filter(p => p.x >= -0.8 && p.x <= 0.8)
  const centerPath = [
    `M ${xScale(-0.8)},${yScale(0)}`,
    ...centerPoints.map(p => `L ${xScale(p.x)},${yScale(p.y)}`),
    `L ${xScale(0.8)},${yScale(0)}`,
    'Z'
  ].join(' ')

  // Teacher role pie chart data
  const traditionalData = [
    { name: 'Content Delivery', value: 70 },
    { name: 'Social & Mentoring', value: 30 },
  ]

  const education20Data = [
    { name: 'Content Delivery', value: 15 },
    { name: 'Social & Mentoring', value: 85 },
  ]

  const COLORS = ['#a1a1aa', '#d90429']

  // Learning paths data — multiple routes the LLM can choose
  const studentProfiles = [
    { name: 'Student A', color: '#d90429', description: t({ en: 'Loves biology \u2192 explores marine science with LLM guidance', de: 'Liebt Biologie \u2192 erkundet Meereswissenschaft mit LLM-Begleitung' }) },
    { name: 'Student B', color: '#3b82f6', description: t({ en: 'Strong logic skills \u2192 discovers programming together with LLM', de: 'Starke Logikf\u00e4higkeiten \u2192 entdeckt Programmierung zusammen mit LLM' }) },
    { name: 'Student C', color: '#10b981', description: t({ en: 'Creative storyteller \u2192 gravitates toward literature & philosophy', de: 'Kreativer Geschichtenerz\u00e4hler \u2192 tendiert zu Literatur & Philosophie' }) },
  ]

  const [activeStudent, setActiveStudent] = useState(0)

  // Cycle through students automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStudent(prev => (prev + 1) % studentProfiles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [studentProfiles.length])

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">{t({ en: 'Opinion', de: 'Meinung' })}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">{t({ en: 'Outlook', de: 'Ausblick' })}</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {title}
        </h1>
      </header>

      <article className="prose">
        <p>
          {t({
            en: 'What if we reimagined education from first principles? Not incremental improvements to the current system, but a fundamental rethinking of how humans learn and develop skills.',
            de: 'Was w\u00e4re, wenn wir Bildung von Grund auf neu denken? Keine inkrementellen Verbesserungen am aktuellen System, sondern ein fundamentales Umdenken dar\u00fcber, wie Menschen lernen und F\u00e4higkeiten entwickeln.',
          })}
        </p>

        <p>
          {t({ en: 'The core idea: LLMs as primary educators, with human teachers shifting to a purely social function. AI generates and delivers personalized content through text, audio, video, and visualizations. Teachers become mentors, facilitators, and providers of the human connection that machines cannot replicate.', de: 'Die Kernidee: LLMs als prim\u00e4re Lehrende, wobei menschliche Lehrer eine rein soziale Funktion \u00fcbernehmen. KI generiert und vermittelt personalisierte Inhalte \u00fcber Text, Audio, Video und Visualisierungen. Lehrer werden zu Mentoren, Moderatoren und Anbietern der menschlichen Verbindung, die Maschinen nicht replizieren k\u00f6nnen.' })}
        </p>

        <h2>{t({ en: 'The One-Size-Fits-All Problem', de: 'Das Einheitsgr\u00f6\u00dfen-Problem' })}</h2>

        <p>
          {t({
            en: 'Traditional classrooms face an impossible challenge. A teacher prepares a single lesson, but students arrive with vastly different skill levels:',
            de: 'Traditionelle Klassenzimmer stehen vor einer unl\u00f6sbaren Herausforderung. Ein Lehrer bereitet eine einzelne Unterrichtsstunde vor, aber die Sch\u00fcler kommen mit v\u00f6llig unterschiedlichen Wissenst\u00e4nden:',
          })}
        </p>

        {/* Normal Distribution Visualization */}
        <div className="my-8 overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-[500px]">
            {/* Filled area for "lesson target" */}
            <path
              d={centerPath}
              fill="#d90429"
              fillOpacity="0.2"
            />

            {/* The curve */}
            <path
              d={curvePath}
              fill="none"
              stroke="#d90429"
              strokeWidth="2.5"
            />

            {/* X-axis */}
            <line
              x1={padding.left}
              y1={yScale(0)}
              x2={padding.left + innerWidth}
              y2={yScale(0)}
              stroke="#71717a"
              strokeWidth="1"
            />

            {/* Labels */}
            <text x={xScale(-2.5)} y={yScale(0) + 35} textAnchor="middle" className="text-[11px] fill-muted">
              {t({ en: 'Struggling', de: 'Schwach' })}
            </text>
            <text x={xScale(0)} y={yScale(0) + 35} textAnchor="middle" className="text-[11px] fill-muted">
              {t({ en: 'Average', de: 'Durchschnitt' })}
            </text>
            <text x={xScale(2.5)} y={yScale(0) + 35} textAnchor="middle" className="text-[11px] fill-muted">
              {t({ en: 'Advanced', de: 'Fortgeschritten' })}
            </text>

            {/* Annotation for shaded area */}
            <text x={xScale(0)} y={yScale(0.25)} textAnchor="middle" className="text-[10px] fill-primary font-medium">
              {t({ en: 'Lesson Target', de: 'Unterrichtsziel' })}
            </text>
          </svg>

          <p className="text-sm text-muted mt-2 text-center">
            {t({
              en: 'A single lesson targets the middle, leaving struggling students confused and advanced students bored.',
              de: 'Eine einzelne Unterrichtsstunde zielt auf die Mitte ab und l\u00e4sst schw\u00e4chere Sch\u00fcler verwirrt und fortgeschrittene gelangweilt zur\u00fcck.',
            })}
          </p>
        </div>

        <p>
          {t({ en: 'LLMs solve this by providing truly personalized instruction. Each student gets content matched to their current level, learning style, and interests. The struggling student gets more examples and scaffolding. The advanced student gets deeper challenges immediately.', de: 'LLMs l\u00f6sen das durch wirklich personalisierten Unterricht. Jeder Sch\u00fcler erh\u00e4lt Inhalte, die auf sein aktuelles Niveau, seinen Lernstil und seine Interessen abgestimmt sind. Der schw\u00e4chere Sch\u00fcler bekommt mehr Beispiele und Hilfestellungen. Der fortgeschrittene Sch\u00fcler bekommt sofort tiefere Herausforderungen.' })}
        </p>

        <h2>{t({ en: 'Skills, Not Marks', de: 'Kompetenzen statt Noten' })}</h2>

        <p>
          {t({
            en: 'Today\u2019s education measures success with grades\u2014abstract numbers that collapse rich learning into a single dimension. A "B" in mathematics tells you almost nothing about what a student can actually do.',
            de: 'Die heutige Bildung misst Erfolg mit Noten \u2014 abstrakten Zahlen, die reichhaltiges Lernen in eine einzelne Dimension zusammenfalten. Eine \u201e2\u201c in Mathematik sagt fast nichts dar\u00fcber aus, was ein Sch\u00fcler tats\u00e4chlich kann.',
          })}
        </p>

        <p>
          {t({ en: 'Education 2.0 measures skills. Granular, verifiable capabilities:', de: 'Bildung 2.0 misst Kompetenzen. Granulare, \u00fcberpr\u00fcfbare F\u00e4higkeiten:' })}
        </p>

        <ul>
          <li>{t({ en: 'Can solve quadratic equations', de: 'Kann quadratische Gleichungen l\u00f6sen' })}</li>
          <li>{t({ en: 'Can write persuasive essays with proper structure', de: 'Kann \u00fcberzeugende Aufs\u00e4tze mit korrekter Struktur schreiben' })}</li>
          <li>{t({ en: 'Can debug Python code with logical errors', de: 'Kann Python-Code mit logischen Fehlern debuggen' })}</li>
          <li>{t({ en: 'Can analyze primary historical sources for bias', de: 'Kann historische Prim\u00e4rquellen auf Voreingenommenheit analysieren' })}</li>
        </ul>

        <p>
          {t({
            en: 'This transforms hiring. Instead of filtering by "3.5 GPA from accredited university," companies can weight specific skills and get detailed matching scores. A game studio might weight 3D modeling and storytelling high; a bank might weight statistics and communication.',
            de: 'Das transformiert die Personalauswahl. Statt nach \u201e1,5-Schnitt von akkreditierter Universit\u00e4t\u201c zu filtern, k\u00f6nnen Unternehmen spezifische Kompetenzen gewichten und detaillierte Matching-Scores erhalten. Ein Spielestudio w\u00fcrde 3D-Modellierung und Storytelling hoch gewichten; eine Bank eher Statistik und Kommunikation.',
          })}
        </p>

        <table>
          <thead>
            <tr>
              <th>{t({ en: 'Traditional', de: 'Traditionell' })}</th>
              <th>Education 2.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t({ en: 'Grades (A, B, C...)', de: 'Noten (1, 2, 3...)' })}</td>
              <td>{t({ en: 'Verified skill portfolio', de: 'Verifiziertes Kompetenzportfolio' })}</td>
            </tr>
            <tr>
              <td>{t({ en: 'Same curriculum for all', de: 'Gleicher Lehrplan f\u00fcr alle' })}</td>
              <td>{t({ en: 'Personalized learning paths', de: 'Personalisierte Lernpfade' })}</td>
            </tr>
            <tr>
              <td>{t({ en: 'Fixed pace', de: 'Festes Tempo' })}</td>
              <td>{t({ en: 'Mastery-based progression', de: 'Meisterungsbasierter Fortschritt' })}</td>
            </tr>
            <tr>
              <td>{t({ en: 'Teacher as content source', de: 'Lehrer als Inhaltsquelle' })}</td>
              <td>{t({ en: 'Teacher as mentor/facilitator', de: 'Lehrer als Mentor/Moderator' })}</td>
            </tr>
            <tr>
              <td>{t({ en: 'Standardized tests', de: 'Standardisierte Tests' })}</td>
              <td>{t({ en: 'Continuous skill verification', de: 'Kontinuierliche Kompetenz\u00fcberpr\u00fcfung' })}</td>
            </tr>
            <tr>
              <td>{t({ en: 'Career discovery at 18+', de: 'Berufsfindung ab 18+' })}</td>
              <td>{t({ en: 'Early interest exploration', de: 'Fr\u00fche Interessenerkundung' })}</td>
            </tr>
          </tbody>
        </table>

        <h2>{t({ en: 'The New Role of the Teacher', de: 'Die neue Rolle des Lehrers' })}</h2>

        <p>
          {t({
            en: "This isn't about replacing teachers\u2014it's about freeing them from the industrial-age model where one human must somehow deliver content to 30 students simultaneously. That's a task AI can do better. What AI cannot do is be human.",
            de: "Es geht nicht darum, Lehrer zu ersetzen \u2014 sondern sie vom Industriezeitalter-Modell zu befreien, in dem ein Mensch irgendwie 30 Sch\u00fclern gleichzeitig Inhalte vermitteln muss. Das ist eine Aufgabe, die KI besser kann. Was KI nicht kann, ist Mensch sein.",
          })}
        </p>

        {/* Teacher Role Comparison with Recharts */}
        <div className="my-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-muted mb-2">{t({ en: 'Traditional', de: 'Traditionell' })}</p>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={traditionalData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {traditionalData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-primary mb-2">Education 2.0</p>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={education20Data}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {education20Data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#a1a1aa]" />
              <span className="text-xs text-muted">{t({ en: 'Content Delivery', de: 'Inhaltsvermittlung' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#d90429]" />
              <span className="text-xs text-muted">{t({ en: 'Social & Mentoring', de: 'Soziales & Mentoring' })}</span>
            </div>
          </div>
          <p className="text-sm text-muted mt-3 text-center">
            {t({
              en: 'Teacher focus shifts from content delivery to social development and mentorship',
              de: 'Der Fokus der Lehrer verschiebt sich von Inhaltsvermittlung zu sozialer Entwicklung und Mentoring',
            })}
          </p>
        </div>

        <p>
          {t({ en: 'Teachers become social architects. Their job shifts to:', de: 'Lehrer werden zu sozialen Architekten. Ihre Aufgabe verschiebt sich zu:' })}
        </p>

        <ul>
          <li><strong>{t({ en: 'Emotional support:', de: 'Emotionale Unterst\u00fctzung:' })}</strong> {t({ en: 'Noticing when a student is struggling, not with algebra, but with life. Being the trusted adult who asks "how are you really doing?"', de: 'Erkennen, wenn ein Sch\u00fcler Schwierigkeiten hat, nicht mit Algebra, sondern mit dem Leben. Der vertrauensw\u00fcrdige Erwachsene sein, der fragt \u201ewie geht es dir wirklich?\u201c' })}</li>
          <li><strong>{t({ en: 'Social facilitation:', de: 'Soziale Moderation:' })}</strong> {t({ en: 'Designing group activities, mediating conflicts, teaching collaboration through lived experience', de: 'Gruppenaktivit\u00e4ten gestalten, Konflikte moderieren, Zusammenarbeit durch gelebte Erfahrung lehren' })}</li>
          <li><strong>{t({ en: 'Motivation and accountability:', de: 'Motivation und Verantwortung:' })}</strong> {t({ en: 'Helping students push through difficult material, celebrating wins, reframing failures as learning', de: 'Sch\u00fclern helfen, schwieriges Material durchzuarbeiten, Erfolge feiern, Misserfolge als Lerngelegenheit umdeuten' })}</li>
          <li><strong>{t({ en: 'Role modeling:', de: 'Vorbildfunktion:' })}</strong> {t({ en: 'Demonstrating curiosity, resilience, empathy\u2014the human qualities that can only be learned by observing other humans', de: 'Neugier, Resilienz, Empathie vorleben \u2014 die menschlichen Qualit\u00e4ten, die man nur durch Beobachtung anderer Menschen lernen kann' })}</li>
          <li><strong>{t({ en: 'Curation and guidance:', de: 'Kuratierung und Begleitung:' })}</strong> {t({ en: 'While AI personalizes content, teachers help students see the bigger picture, connect disparate subjects, and find meaning', de: 'W\u00e4hrend KI Inhalte personalisiert, helfen Lehrer Sch\u00fclern das gro\u00dfe Ganze zu sehen, verschiedene F\u00e4cher zu verbinden und Sinn zu finden' })}</li>
        </ul>

        <p>
          {t({
            en: "This requires different training. Less focus on lesson planning and content delivery. More focus on child psychology, group dynamics, counseling skills, and facilitation techniques. The teacher of 2030 looks more like a combination of mentor, coach, and therapist than a lecturer.",
            de: "Das erfordert eine andere Ausbildung. Weniger Fokus auf Unterrichtsplanung und Inhaltsvermittlung. Mehr Fokus auf Kinderpsychologie, Gruppendynamik, Beratungskompetenzen und Moderationstechniken. Der Lehrer von 2030 \u00e4hnelt eher einer Kombination aus Mentor, Coach und Therapeut als einem Dozenten.",
          })}
        </p>

        <p>
          {t({ en: 'Critically, this role becomes more important, not less. As AI handles the scalable parts of education, the irreplaceable human elements become the differentiator. A school\'s quality will be measured by the strength of its social environment and mentorship, not its curriculum or test scores.', de: 'Entscheidend: Diese Rolle wird wichtiger, nicht weniger wichtig. Wenn KI die skalierbaren Teile der Bildung \u00fcbernimmt, werden die unersetzlichen menschlichen Elemente zum Differenzierungsmerkmal. Die Qualit\u00e4t einer Schule wird an der St\u00e4rke ihres sozialen Umfelds und Mentorings gemessen, nicht am Lehrplan oder Testergebnissen.' })}
        </p>

        <h2>{t({ en: 'Core Skills + Interest-Driven Paths', de: 'Kernkompetenzen + interessengesteuerte Pfade' })}</h2>

        <p>
          {t({ en: 'Everyone needs fundamentals: reading, writing, basic mathematics, critical thinking. These are non-negotiable base skills that enable everything else. But after that foundation, the student and LLM navigate together. The LLM observes how each student engages with material, identifies where their aptitude and curiosity intersect, and together they chart a unique route through the vast landscape of human knowledge&mdash;shaped by the student\'s interests and real-world market needs.', de: 'Jeder braucht Grundlagen: Lesen, Schreiben, grundlegende Mathematik, kritisches Denken. Das sind nicht verhandelbare Basiskompetenzen, die alles andere erm\u00f6glichen. Aber nach diesem Fundament navigieren Sch\u00fcler und LLM gemeinsam. Das LLM beobachtet, wie jeder Sch\u00fcler mit Material interagiert, identifiziert, wo Begabung und Neugier sich \u00fcberschneiden, und zusammen zeichnen sie eine einzigartige Route durch die weite Landschaft menschlichen Wissens &mdash; gepr\u00e4gt von den Interessen des Sch\u00fclers und realen Marktbed\u00fcrfnissen.' })}
        </p>

        {/* LLM-Directed Learning Paths Visualization */}
        <div className="my-8">
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 mb-4 text-center">
            <p className="font-bold text-primary text-sm">{t({ en: 'CORE SKILLS', de: 'KERNKOMPETENZEN' })}</p>
            <p className="text-xs text-muted mt-1">{t({ en: 'Reading, Writing, Mathematics, Critical Thinking', de: 'Lesen, Schreiben, Mathematik, Kritisches Denken' })}</p>
          </div>

          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1h-2v-1a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H4v-1a3 3 0 0 1 3-3h3V9.4A4 4 0 0 1 12 2z" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="18" cy="19" r="2" />
              </svg>
              <span className="text-xs font-medium text-violet-600">{t({ en: 'Student + LLM co-pilot', de: 'Sch\u00fcler + LLM-Co-Pilot' })}</span>
            </div>
          </div>

          {/* Branching paths SVG */}
          <div className="rounded-lg overflow-hidden border border-border bg-background p-2">
            <svg viewBox="0 0 600 320" className="w-full">
              {/* All possible paths (dimmed) */}
              {/* Left branch group */}
              <path d="M300 30 C300 60, 100 80, 80 110" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M80 110 C80 140, 40 160, 40 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M80 110 C80 140, 120 160, 130 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              {/* Center-left branch */}
              <path d="M300 30 C300 60, 200 80, 200 110" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M200 110 C200 140, 170 160, 160 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M200 110 C200 140, 240 160, 250 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              {/* Center-right branch */}
              <path d="M300 30 C300 60, 400 80, 400 110" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M400 110 C400 140, 360 160, 350 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M400 110 C400 140, 440 160, 450 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              {/* Right branch group */}
              <path d="M300 30 C300 60, 520 80, 520 110" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M520 110 C520 140, 480 160, 470 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              <path d="M520 110 C520 140, 560 160, 560 190" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.15" strokeDasharray="4 3" />
              {/* Third level branches (dimmed) */}
              <path d="M40 190 C40 220, 20 240, 20 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M40 190 C40 220, 60 240, 70 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M130 190 C130 220, 110 240, 110 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M130 190 C130 220, 150 240, 160 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M250 190 C250 220, 230 240, 230 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M250 190 C250 220, 270 240, 280 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M350 190 C350 220, 330 240, 330 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M350 190 C350 220, 370 240, 380 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M450 190 C450 220, 430 240, 430 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M450 190 C450 220, 470 240, 480 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M560 190 C560 220, 540 240, 540 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />
              <path d="M560 190 C560 220, 580 240, 580 270" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.1" strokeDasharray="4 3" />

              {/* Student A highlighted path */}
              <g opacity={activeStudent === 0 ? 1 : 0} style={{ transition: 'opacity 0.6s ease' }}>
                <path d="M300 30 C300 60, 200 80, 200 110" stroke="#d90429" strokeWidth="3" fill="none" />
                <path d="M200 110 C200 140, 170 160, 160 190" stroke="#d90429" strokeWidth="3" fill="none" />
                <path d="M160 190 C160 220, 140 240, 130 270" stroke="#d90429" strokeWidth="3" fill="none" />
                <circle cx="200" cy="110" r="5" fill="#d90429" />
                <circle cx="160" cy="190" r="5" fill="#d90429" />
                <circle cx="130" cy="270" r="5" fill="#d90429" />
                <text x="200" y="102" textAnchor="middle" className="text-[10px] fill-[#d90429] font-medium">{t({ en: 'Sciences', de: 'Naturwiss.' })}</text>
                <text x="160" y="182" textAnchor="middle" className="text-[10px] fill-[#d90429] font-medium">{t({ en: 'Biology', de: 'Biologie' })}</text>
                <text x="130" y="290" textAnchor="middle" className="text-[10px] fill-[#d90429] font-medium">{t({ en: 'Marine Science', de: 'Meereswiss.' })}</text>
              </g>

              {/* Student B highlighted path */}
              <g opacity={activeStudent === 1 ? 1 : 0} style={{ transition: 'opacity 0.6s ease' }}>
                <path d="M300 30 C300 60, 400 80, 400 110" stroke="#3b82f6" strokeWidth="3" fill="none" />
                <path d="M400 110 C400 140, 440 160, 450 190" stroke="#3b82f6" strokeWidth="3" fill="none" />
                <path d="M450 190 C450 220, 470 240, 480 270" stroke="#3b82f6" strokeWidth="3" fill="none" />
                <circle cx="400" cy="110" r="5" fill="#3b82f6" />
                <circle cx="450" cy="190" r="5" fill="#3b82f6" />
                <circle cx="480" cy="270" r="5" fill="#3b82f6" />
                <text x="400" y="102" textAnchor="middle" className="text-[10px] fill-[#3b82f6] font-medium">{t({ en: 'Technology', de: 'Technologie' })}</text>
                <text x="450" y="182" textAnchor="middle" className="text-[10px] fill-[#3b82f6] font-medium">{t({ en: 'Programming', de: 'Programmierung' })}</text>
                <text x="480" y="290" textAnchor="middle" className="text-[10px] fill-[#3b82f6] font-medium">AI &amp; ML</text>
              </g>

              {/* Student C highlighted path */}
              <g opacity={activeStudent === 2 ? 1 : 0} style={{ transition: 'opacity 0.6s ease' }}>
                <path d="M300 30 C300 60, 100 80, 80 110" stroke="#10b981" strokeWidth="3" fill="none" />
                <path d="M80 110 C80 140, 120 160, 130 190" stroke="#10b981" strokeWidth="3" fill="none" />
                <path d="M130 190 C130 220, 150 240, 160 270" stroke="#10b981" strokeWidth="3" fill="none" />
                <circle cx="80" cy="110" r="5" fill="#10b981" />
                <circle cx="130" cy="190" r="5" fill="#10b981" />
                <circle cx="160" cy="270" r="5" fill="#10b981" />
                <text x="80" y="102" textAnchor="middle" className="text-[10px] fill-[#10b981] font-medium">{t({ en: 'Humanities', de: 'Geisteswiss.' })}</text>
                <text x="130" y="182" textAnchor="middle" className="text-[10px] fill-[#10b981] font-medium">{t({ en: 'Literature', de: 'Literatur' })}</text>
                <text x="160" y="290" textAnchor="middle" className="text-[10px] fill-[#10b981] font-medium">{t({ en: 'Philosophy', de: 'Philosophie' })}</text>
              </g>

              {/* Node labels for dimmed nodes */}
              <text x="520" y="102" textAnchor="middle" className="text-[9px] fill-muted" opacity="0.4">Business</text>
              <text x="40" y="182" textAnchor="middle" className="text-[9px] fill-muted" opacity="0.4">{t({ en: 'History', de: 'Geschichte' })}</text>
              <text x="250" y="182" textAnchor="middle" className="text-[9px] fill-muted" opacity="0.4">Data Sci</text>
              <text x="350" y="182" textAnchor="middle" className="text-[9px] fill-muted" opacity="0.4">Robotics</text>
              <text x="470" y="182" textAnchor="middle" className="text-[9px] fill-muted" opacity="0.4">Design</text>
              <text x="560" y="182" textAnchor="middle" className="text-[9px] fill-muted" opacity="0.4">{t({ en: 'Finance', de: 'Finanzen' })}</text>

              {/* Start node */}
              <circle cx="300" cy="30" r="8" fill="#d90429" />
              <text x="300" y="17" textAnchor="middle" className="text-[10px] fill-primary font-bold">{t({ en: 'Core Skills', de: 'Kernkomp.' })}</text>
            </svg>
          </div>

          {/* Student selector */}
          <div className="flex justify-center gap-3 mt-4">
            {studentProfiles.map((student, i) => (
              <button
                key={student.name}
                onClick={() => setActiveStudent(i)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeStudent === i
                    ? 'border-current font-medium'
                    : 'border-border text-muted hover:border-current'
                }`}
                style={{ color: activeStudent === i ? student.color : undefined }}
              >
                {student.name}
              </button>
            ))}
          </div>

          <p className="text-sm text-center mt-3" style={{ color: studentProfiles[activeStudent].color }}>
            {studentProfiles[activeStudent].description}
          </p>

          <p className="text-sm text-muted mt-1 text-center">
            {t({
              en: "The student's talents and interests drive the direction; the LLM suggests, adapts, and opens doors. No two learners follow the same route.",
              de: "Die Talente und Interessen des Sch\u00fclers bestimmen die Richtung; das LLM schl\u00e4gt vor, passt sich an und \u00f6ffnet T\u00fcren. Keine zwei Lernenden folgen demselben Weg.",
            })}
          </p>
        </div>

        <p>
          {t({ en: 'But once you\'ve mastered the required foundations, Education 2.0 opens up&mdash;and this is where the LLM truly shines. It doesn\'t just present a menu of options. It collaborates with the student to find a path that fits their demonstrated talents, interests, and learning patterns&mdash;while factoring in where the world is heading and what skills the market needs. A 12-year-old who lights up during biology labs and asks deep questions about ecosystems? The LLM suggests marine science, weaving in chemistry of seawater and statistical methods for population studies along the way. Another student who excels at logical puzzles discovers programming and formal reasoning. The student has agency; the LLM is the co-pilot, illuminating options at every fork.', de: 'Aber sobald man die geforderten Grundlagen beherrscht, \u00f6ffnet sich Bildung 2.0 &mdash; und hier gl\u00e4nzt das LLM wirklich. Es pr\u00e4sentiert nicht einfach ein Men\u00fc an Optionen. Es arbeitet mit dem Sch\u00fcler zusammen, um einen Pfad zu finden, der zu seinen gezeigten Talenten, Interessen und Lernmustern passt &mdash; unter Ber\u00fccksichtigung, wohin sich die Welt bewegt und welche F\u00e4higkeiten der Markt braucht. Ein 12-J\u00e4hriger, der im Biologieunterricht aufbl\u00fcht und tiefe Fragen zu \u00d6kosystemen stellt? Das LLM schl\u00e4gt Meereswissenschaft vor und verwebt dabei Chemie des Meerwassers und statistische Methoden f\u00fcr Populationsstudien. Ein anderer Sch\u00fcler, der bei logischen R\u00e4tseln gl\u00e4nzt, entdeckt Programmierung und formales Denken. Der Sch\u00fcler hat Eigenverantwortung; das LLM ist der Co-Pilot, der an jeder Gabelung Optionen beleuchtet.' })}
        </p>

        <p>
          {t({ en: 'This produces more motivated workers. Instead of stumbling into careers at 22 after generic degrees, students discover their passions at 14 or 15. They arrive in the workforce with deep domain knowledge and genuine enthusiasm, not just credentials and debt.', de: 'Das produziert motiviertere Arbeitskr\u00e4fte. Statt mit 22 nach generischen Abschl\u00fcssen in Karrieren zu stolpern, entdecken Sch\u00fcler ihre Leidenschaften mit 14 oder 15. Sie kommen mit tiefem Fachwissen und echter Begeisterung in die Arbeitswelt, nicht nur mit Zeugnissen und Schulden.' })}
        </p>

        <h2>{t({ en: 'When Will This Be Possible?', de: 'Wann wird das m\u00f6glich sein?' })}</h2>

        <p>
          {t({
            en: 'The technical foundations are falling into place:',
            de: 'Die technischen Grundlagen f\u00fcgen sich zusammen:',
          })}
        </p>

        <ul>
          <li><strong>{t({ en: 'Text:', de: 'Text:' })}</strong> {t({ en: 'Already solved. LLMs can explain concepts, answer questions, provide feedback.', de: 'Bereits gel\u00f6st. LLMs k\u00f6nnen Konzepte erkl\u00e4ren, Fragen beantworten, Feedback geben.' })}</li>
          <li><strong>{t({ en: 'Image:', de: 'Bild:' })}</strong> {t({ en: 'Nearly there. Image generation will be fully production-ready by late 2026.', de: 'Fast soweit. Bildgenerierung wird Ende 2026 vollst\u00e4ndig produktionsreif sein.' })}</li>
          <li><strong>Video:</strong> {t({ en: 'Expect coherent educational video generation by 2026.', de: 'Koh\u00e4rente Generierung von Lehrvideos wird 2026 erwartet.' })}</li>
          <li><strong>{t({ en: 'Interactive simulations:', de: 'Interaktive Simulationen:' })}</strong> {t({ en: 'The frontier. Probably 2028-2029 for rich, adaptive learning environments.', de: 'Die Grenze. Wahrscheinlich 2028-2029 f\u00fcr reichhaltige, adaptive Lernumgebungen.' })}</li>
        </ul>

        <h2>{t({ en: 'The Social Challenge', de: 'Die soziale Herausforderung' })}</h2>

        <p>
          {t({ en: 'Technology is the easy part. The harder question: how do we maintain social development?', de: 'Technologie ist der einfache Teil. Die schwierigere Frage: Wie erhalten wir die soziale Entwicklung?' })}
        </p>

        <p>
          {t({
            en: "Children need to learn collaboration, conflict resolution, empathy, leadership. These require human interaction\u2014group projects, team sports, unstructured play, disagreements with peers. No AI can teach a child how to navigate a friendship conflict or work with someone they dislike.",
            de: "Kinder m\u00fcssen Zusammenarbeit, Konfliktl\u00f6sung, Empathie und F\u00fchrung lernen. Das erfordert menschliche Interaktion \u2014 Gruppenprojekte, Mannschaftssport, unstrukturiertes Spiel, Meinungsverschiedenheiten mit Gleichaltrigen. Keine KI kann einem Kind beibringen, einen Freundschaftskonflikt zu navigieren oder mit jemandem zusammenzuarbeiten, den es nicht mag.",
          })}
        </p>

        <p>
          {t({ en: 'Education 2.0 requires more investment in social infrastructure, not less:', de: 'Bildung 2.0 erfordert mehr Investition in soziale Infrastruktur, nicht weniger:' })}
        </p>

        <ul>
          <li>{t({ en: 'Dedicated time for collaborative projects with mixed-age groups', de: 'Feste Zeit f\u00fcr kollaborative Projekte mit altersgemischten Gruppen' })}</li>
          <li>{t({ en: 'Teachers trained as social facilitators and mentors', de: 'Lehrer, die als soziale Moderatoren und Mentoren ausgebildet sind' })}</li>
          <li>{t({ en: 'Structured group activities that require genuine cooperation', de: 'Strukturierte Gruppenaktivit\u00e4ten, die echte Zusammenarbeit erfordern' })}</li>
          <li>{t({ en: 'Mental health support integrated into the school day', de: 'Psychische Gesundheitsf\u00f6rderung, integriert in den Schulalltag' })}</li>
        </ul>

        <h2>{t({ en: 'Global Equity Implications', de: 'Globale Gerechtigkeitsimplikationen' })}</h2>

        <p>
          {t({
            en: 'Today, the quality of education you receive depends heavily on geography and wealth. A child in rural Indonesia gets a fundamentally different education than one in Singapore or Stockholm.',
            de: 'Heute h\u00e4ngt die Qualit\u00e4t der Bildung, die man erh\u00e4lt, stark von Geografie und Wohlstand ab. Ein Kind im l\u00e4ndlichen Indonesien bekommt eine grundlegend andere Bildung als eines in Singapur oder Stockholm.',
          })}
        </p>

        <p>
          {t({
            en: 'LLM-based education could democratize access to world-class instruction. With a device and internet connection, any child anywhere could receive personalized, adaptive teaching in their native language. The marginal cost approaches zero.',
            de: 'LLM-basierte Bildung k\u00f6nnte den Zugang zu erstklassigem Unterricht demokratisieren. Mit einem Ger\u00e4t und Internetverbindung k\u00f6nnte jedes Kind \u00fcberall personalisierten, adaptiven Unterricht in seiner Muttersprache erhalten. Die Grenzkosten gehen gegen null.',
          })}
        </p>

        <p>
          {t({
            en: "This doesn't solve infrastructure gaps or socioeconomic barriers overnight. But it removes one critical bottleneck: the availability of skilled teachers.",
            de: "Das l\u00f6st Infrastrukturl\u00fccken oder sozio\u00f6konomische Barrieren nicht \u00fcber Nacht. Aber es beseitigt einen kritischen Engpass: die Verf\u00fcgbarkeit qualifizierter Lehrer.",
          })}
        </p>

        <h2>{t({ en: 'Privacy Concerns', de: 'Datenschutzbedenken' })}</h2>

        <p>
          {t({
            en: "Personalization requires data. To adapt to a student, the system must know what they struggle with, what interests them, how they learn best. This creates detailed learning profiles\u2014potentially for life.",
            de: "Personalisierung erfordert Daten. Um sich an einen Sch\u00fcler anzupassen, muss das System wissen, womit er Schwierigkeiten hat, was ihn interessiert, wie er am besten lernt. Das erzeugt detaillierte Lernprofile \u2014 potenziell ein Leben lang.",
          })}
        </p>

        <p>
          {t({
            en: 'Strong data governance is essential:',
            de: 'Starke Datenverwaltung ist unerl\u00e4sslich:',
          })}
        </p>

        <ul>
          <li>{t({ en: 'Student data ownership and portability', de: 'Dateneigentum und -portabilit\u00e4t der Sch\u00fcler' })}</li>
          <li>{t({ en: 'Clear retention limits', de: 'Klare Aufbewahrungsfristen' })}</li>
          <li>{t({ en: 'Prohibition on commercial use', de: 'Verbot kommerzieller Nutzung' })}</li>
          <li>{t({ en: 'Right to deletion', de: 'Recht auf L\u00f6schung' })}</li>
        </ul>

        <p>
          {t({
            en: 'Get this wrong, and we create a surveillance infrastructure around children. Get it right, and the data enables unprecedented educational outcomes.',
            de: 'Mach das falsch, und wir schaffen eine \u00dcberwachungsinfrastruktur um Kinder. Mach es richtig, und die Daten erm\u00f6glichen beispiellose Bildungsergebnisse.',
          })}
        </p>

        <hr />

        <h2>{t({ en: 'The Path Forward', de: 'Der Weg nach vorn' })}</h2>

        <p>
          {t({
            en: "Education 2.0 won't emerge from traditional institutions. The incentives are wrong\u2014existing systems optimize for credentialing and standardization, not learning.",
            de: "Bildung 2.0 wird nicht aus traditionellen Institutionen hervorgehen. Die Anreize sind falsch \u2014 bestehende Systeme optimieren f\u00fcr Zertifizierung und Standardisierung, nicht f\u00fcr Lernen.",
          })}
        </p>

        <p>
          {t({
            en: 'It will likely start with:',
            de: 'Es wird wahrscheinlich beginnen mit:',
          })}
        </p>

        <ul>
          <li>{t({ en: 'Homeschool families supplementing with AI tutors', de: 'Homeschool-Familien, die mit KI-Tutoren erg\u00e4nzen' })}</li>
          <li>{t({ en: 'Alternative schools experimenting with hybrid models', de: 'Alternativschulen, die mit Hybridmodellen experimentieren' })}</li>
          <li>{t({ en: 'Countries with less entrenched educational bureaucracy', de: 'L\u00e4nder mit weniger eingefahrener Bildungsb\u00fcrokratie' })}</li>
          <li>{t({ en: 'Corporate training programs that need measurable skills', de: 'Firmenschulungen, die messbare Kompetenzen brauchen' })}</li>
        </ul>

        <p>
          {t({
            en: 'The results will speak for themselves. When AI-educated students demonstrably outperform traditional students in both skills and motivation, the pressure for systemic change becomes irresistible.',
            de: 'Die Ergebnisse werden f\u00fcr sich sprechen. Wenn KI-ausgebildete Sch\u00fcler traditionelle Sch\u00fcler nachweislich in Kompetenzen und Motivation \u00fcbertreffen, wird der Druck f\u00fcr systemischen Wandel unwiderstehlich.',
          })}
        </p>

        <p>
          {t({
            en: "We're not just improving education. We're rethinking what it means to prepare humans for a world where knowledge work is increasingly automated. The answer isn't more of the same\u2014it's developing uniquely human capabilities while leveraging AI for everything it does better.",
            de: "Wir verbessern nicht nur Bildung. Wir \u00fcberdenken, was es bedeutet, Menschen auf eine Welt vorzubereiten, in der Wissensarbeit zunehmend automatisiert ist. Die Antwort ist nicht mehr vom Gleichen \u2014 sondern die Entwicklung einzigartig menschlicher F\u00e4higkeiten, w\u00e4hrend KI f\u00fcr alles genutzt wird, was sie besser kann.",
          })}
        </p>
      </article>
    </div>
  )
}
