'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('gemini-3-flash-context')!

export default function Gemini3FlashContextPage() {
  const { t } = useLocale()

  // Fiction.LiveBench scores by context length (tokens)
  const contextLengths = ['0', '400', '1k', '2k', '4k', '8k', '16k', '32k', '60k', '120k', '192k']

  const models = [
    { name: 'gemini-3-flash-preview', scores: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100], color: '#d90429' },
    { name: 'gpt-5.2', scores: [100, 100, 100, 100, 100, 97.2, 100, 97.2, 97.2, 100, 96.9], color: '#10b981' },
    { name: 'claude-opus-4-5', scores: [87.5, 100, 94.4, 97.2, 91.7, 94.4, 97.2, 93.8, 80], color: '#8b5cf6' },
    { name: 'kimi-k2.5', scores: [100, 100, 100, 88.9, 86.1, 88.9, 89.8, 78.1, 87.5], color: '#f59e0b' },
  ]

  // Auto-scale Y axis based on data
  const allScores = models.flatMap(m => m.scores.slice(0, 9))
  const minScore = Math.floor(Math.min(...allScores) / 5) * 5 // Round down to nearest 5
  const maxScore = 100
  const chartHeight = 200
  const chartWidth = 600
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">TIL</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          <a href="https://fiction.live/stories/Fiction-liveBench-Jan-30-2026/oQdzQvKHw8JyXbN87">Fiction.LiveBench</a>{' '}
          {t({
            en: "is a benchmark that tests genuine comprehension of long narratives—not just simple retrieval. Based on stories from Fiction.live, it evaluates whether models can understand character motivations, track event sequences, and make inferences from implicit information across varying context lengths.",
            de: "ist ein Benchmark, der echtes Verständnis langer Erzählungen testet – nicht nur einfaches Abrufen. Basierend auf Geschichten von Fiction.live bewertet er, ob Modelle Charaktermotivationen verstehen, Ereignissequenzen verfolgen und Schlussfolgerungen aus impliziten Informationen über verschiedene Kontextlängen ziehen können.",
          })}
        </p>

        <p>
          {t({
            en: "Looking at the latest results, Gemini 3 Flash Preview achieves 100% accuracy across ALL context lengths tested—from 0 to 192k tokens.",
            de: "Die neuesten Ergebnisse zeigen: Gemini 3 Flash Preview erreicht 100 % Genauigkeit über ALLE getesteten Kontextlängen – von 0 bis 192k Tokens.",
          })}
        </p>

        <p>
          {t({
            en: "This is remarkable. Most models show degradation as context length increases. Even GPT-5.2 dips to 96.9% at 192k, and Claude Opus 4.5 drops to 80% at the longest contexts.",
            de: "Das ist bemerkenswert. Die meisten Modelle zeigen Leistungsabfall, wenn die Kontextlänge zunimmt. Selbst GPT-5.2 fällt bei 192k auf 96,9 %, und Claude Opus 4.5 sinkt bei den längsten Kontexten auf 80 %.",
          })}
        </p>

        <h2>{t({ en: 'The Chart', de: 'Das Diagramm' })}</h2>

        {/* SVG Chart */}
        <div className="my-8 overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-[600px]">
            {/* Grid lines */}
            {[minScore, minScore + (maxScore - minScore) * 0.25, minScore + (maxScore - minScore) * 0.5, minScore + (maxScore - minScore) * 0.75, maxScore].map((tick) => (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={padding.top + innerHeight * (1 - (tick - minScore) / (maxScore - minScore))}
                  x2={padding.left + innerWidth}
                  y2={padding.top + innerHeight * (1 - (tick - minScore) / (maxScore - minScore))}
                  stroke="#e4e4e7"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding.left - 8}
                  y={padding.top + innerHeight * (1 - (tick - minScore) / (maxScore - minScore)) + 4}
                  textAnchor="end"
                  className="text-[10px] fill-subtle"
                >
                  {Math.round(tick)}%
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {contextLengths.slice(0, 9).map((label, i) => (
              <text
                key={label}
                x={padding.left + (i / 8) * innerWidth}
                y={chartHeight - 10}
                textAnchor="middle"
                className="text-[10px] fill-subtle"
              >
                {label}
              </text>
            ))}

            {/* Lines for each model */}
            {models.map((model) => {
              const points = model.scores.slice(0, 9).map((score, i) => {
                const x = padding.left + (i / 8) * innerWidth
                const y = padding.top + innerHeight * (1 - (score - minScore) / (maxScore - minScore))
                return `${x},${y}`
              }).join(' ')

              return (
                <polyline
                  key={model.name}
                  points={points}
                  fill="none"
                  stroke={model.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            })}

            {/* Dots */}
            {models.map((model) => (
              model.scores.slice(0, 9).map((score, i) => (
                <circle
                  key={`${model.name}-${i}`}
                  cx={padding.left + (i / 8) * innerWidth}
                  cy={padding.top + innerHeight * (1 - (score - minScore) / (maxScore - minScore))}
                  r="3"
                  fill={model.color}
                />
              ))
            ))}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {models.map((model) => (
              <div key={model.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                <span className="text-muted">{model.name}</span>
              </div>
            ))}
          </div>
        </div>

        <h2>{t({ en: 'Full Results', de: 'Vollständige Ergebnisse' })}</h2>
        <table>
          <thead>
            <tr>
              <th>{t({ en: 'Model', de: 'Modell' })}</th>
              <th>0</th>
              <th>1k</th>
              <th>4k</th>
              <th>8k</th>
              <th>16k</th>
              <th>32k</th>
              <th>60k</th>
              <th>120k</th>
              <th>192k</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>gemini-3-flash</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
              <td><strong>100</strong></td>
            </tr>
            <tr>
              <td>gpt-5.2</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>97.2</td>
              <td>100</td>
              <td>97.2</td>
              <td>97.2</td>
              <td>100</td>
              <td>96.9</td>
            </tr>
            <tr>
              <td>gemini-3-pro</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>97.2</td>
              <td>96.6</td>
              <td>94.4</td>
              <td>100</td>
              <td>96.9</td>
              <td>96.9</td>
            </tr>
            <tr>
              <td>claude-opus-4-5</td>
              <td>87.5</td>
              <td>94.4</td>
              <td>97.2</td>
              <td>91.7</td>
              <td>94.4</td>
              <td>97.2</td>
              <td>93.8</td>
              <td>80</td>
              <td>-</td>
            </tr>
            <tr>
              <td>kimi-k2.5</td>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td>88.9</td>
              <td>86.1</td>
              <td>88.9</td>
              <td>89.8</td>
              <td>78.1</td>
              <td>87.5</td>
            </tr>
          </tbody>
        </table>

        <h2>{t({ en: 'Why It Matters', de: 'Warum das wichtig ist' })}</h2>
        <p>
          {t({
            en: "Fiction.LiveBench tests genuine comprehension, not just retrieval. It evaluates:",
            de: "Fiction.LiveBench testet echtes Verständnis, nicht nur Abruf. Es bewertet:",
          })}
        </p>
        <ul>
          <li>{t({ en: 'Theory of mind for characters', de: 'Theory of Mind für Charaktere' })}</li>
          <li>{t({ en: 'Understanding of event chronology', de: 'Verständnis der Ereignischronologie' })}</li>
          <li>{t({ en: 'Inferences from implicitly stated information', de: 'Schlussfolgerungen aus implizit genannten Informationen' })}</li>
        </ul>
        <p>
          {t({
            en: "Perfect scores across all context lengths means Gemini 3 Flash maintains full comprehension even when processing massive documents. For agentic workflows with long context, this is a significant differentiator.",
            de: "Perfekte Scores über alle Kontextlängen bedeuten, dass Gemini 3 Flash volles Verständnis auch bei der Verarbeitung massiver Dokumente beibehält. Für agentische Workflows mit langem Kontext ist das ein erhebliches Unterscheidungsmerkmal.",
          })}
        </p>
        <p>
          {t({
            en: "The challenge with long context is the quadratic memory scaling of attention—doubling context length quadruples memory usage. That Gemini 3 Flash maintains perfect comprehension while presumably optimizing for this constraint is impressive engineering.",
            de: "Die Herausforderung bei langem Kontext ist das quadratische Memory-Scaling der Attention – eine Verdopplung der Kontextlänge vervierfacht den Speicherbedarf. Dass Gemini 3 Flash perfektes Verständnis beibehält und dabei vermutlich für diese Einschränkung optimiert, ist beeindruckendes Engineering.",
          })}
        </p>

        <h2>{t({ en: 'Personal Note', de: 'Persönliche Anmerkung' })}</h2>
        <p>
          {t({
            en: "I'm curious how far this 100% retrieval can go. The current benchmark tops out at 192k tokens. Will Flash maintain perfect scores at 500k? 1M? At some point, every architecture has limits—I'd love to see where Flash finally drops off.",
            de: "Ich bin gespannt, wie weit dieses 100-%-Retrieval geht. Der aktuelle Benchmark endet bei 192k Tokens. Wird Flash perfekte Scores bei 500k beibehalten? 1M? Irgendwann hat jede Architektur Grenzen – ich würde gerne sehen, wo Flash schließlich abfällt.",
          })}
        </p>

        <hr />

        <p>
          <strong>{t({ en: 'Source:', de: 'Quelle:' })}</strong>{' '}
          <a href="https://fiction.live/stories/Fiction-liveBench-Jan-30-2026/oQdzQvKHw8JyXbN87">
            Fiction.LiveBench (Jan 30, 2026)
          </a>
        </p>
      </article>
    </div>
  )
}
