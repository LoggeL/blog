'use client'

import Link from 'next/link'

export default function Gemini3FlashContextPage() {
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
    <div className="max-w-2xl mx-auto px-6 py-16">
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
          <time className="text-sm text-primary">January 31, 2026</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">TIL</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          Gemini 3 Flash: Perfect Long Context Scores
        </h1>
      </header>

      <article className="prose">
        <p>
          <a href="https://fiction.live/stories/Fiction-liveBench-Jan-30-2026/oQdzQvKHw8JyXbN87">Fiction.LiveBench</a> is a benchmark
          that tests <em>genuine comprehension</em> of long narratives—not just simple retrieval. Based on stories from Fiction.live,
          it evaluates whether models can understand character motivations, track event sequences, and make inferences from implicit information
          across varying context lengths.
        </p>

        <p>
          Looking at the latest results, <strong>Gemini 3 Flash Preview achieves 100% accuracy across ALL context lengths</strong> tested—from 0 to 192k tokens.
        </p>

        <p>
          This is remarkable. Most models show degradation as context length increases. Even GPT-5.2 dips to 96.9% at 192k,
          and Claude Opus 4.5 drops to 80% at the longest contexts.
        </p>

        <h2>The Chart</h2>

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

        <h2>Full Results</h2>
        <table>
          <thead>
            <tr>
              <th>Model</th>
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

        <h2>Why It Matters</h2>
        <p>
          Fiction.LiveBench tests <em>genuine comprehension</em>, not just retrieval. It evaluates:
        </p>
        <ul>
          <li>Theory of mind for characters</li>
          <li>Understanding of event chronology</li>
          <li>Inferences from implicitly stated information</li>
        </ul>
        <p>
          Perfect scores across all context lengths means Gemini 3 Flash maintains full comprehension
          even when processing massive documents. For agentic workflows with long context, this is a significant differentiator.
        </p>
        <p>
          The challenge with long context is the <a href="https://learn.logge.top/en/ai/llm/attention">quadratic memory scaling of attention</a>—doubling
          context length quadruples memory usage. That Gemini 3 Flash maintains perfect comprehension while presumably optimizing for this constraint is impressive engineering.
        </p>

        <h2>Personal Note</h2>
        <p>
          I&apos;m curious how far this 100% retrieval can go. The current benchmark tops out at 192k tokens.
          Will Flash maintain perfect scores at 500k? 1M? At some point, every architecture has limits—I&apos;d love to see where Flash finally drops off.
        </p>

        <hr />

        <p>
          <strong>Source:</strong>{' '}
          <a href="https://fiction.live/stories/Fiction-liveBench-Jan-30-2026/oQdzQvKHw8JyXbN87">
            Fiction.LiveBench (Jan 30, 2026)
          </a>
        </p>
      </article>
    </div>
  )
}
