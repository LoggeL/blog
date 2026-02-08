'use client'

import Link from 'next/link'
import { useState } from 'react'

type Tier = 'small' | 'medium' | 'large'
type Role = 'engineer' | 'pm'

const tierData: Record<Tier, { label: string; teamSize: string; team: string[]; workflow: string[]; keyInsight: string; color: string }> = {
  small: {
    label: 'Small Projects',
    teamSize: '~1 week traditional effort',
    team: ['1 Project Manager', 'No engineers needed'],
    workflow: [
      'PM takes requirements from stakeholders',
      'PM translates requirements into prompts',
      'AI agent builds the solution end-to-end',
      'AI system evaluates if the problem is truly simple',
      'Back-and-forth Q&A between PM and AI for clarification',
      'PM reviews output and delivers to stakeholders',
    ],
    keyInsight: '"Fail-proof" — simple enough that AI handles it reliably. No deep technical understanding needed from the PM.',
    color: '#10b981',
  },
  medium: {
    label: 'Medium Projects',
    teamSize: 'Weeks to a few months',
    team: ['1 Senior Software Engineer', 'Manager only if many stakeholders'],
    workflow: [
      'Engineer drafts architecture WITH the AI model',
      'AI agent writes all the code — no code written by hand',
      'Engineer reviews, debugs, and steers the AI',
      'If structured input exists + engineer is socially capable → no manager needed',
      'Engineer acts as "AI conductor" — orchestrating the agent',
    ],
    keyInsight: 'The engineer needs a strong understanding of architectures, technology, and infrastructure. They don\'t write code — they direct the AI that does.',
    color: '#f59e0b',
  },
  large: {
    label: 'Large Projects',
    teamSize: 'Months to years',
    team: ['1+ Managers', 'Multiple Senior Engineers'],
    workflow: [
      'Project scoped into distinct sections/modules',
      'Each engineer owns their module and controls their own AI agent',
      'Clean interfaces and communication between modules is critical',
      'Managers coordinate across teams and stakeholders',
      'Engineers need deep understanding of their specific domain',
    ],
    keyInsight: 'The challenge shifts from writing code to defining clean boundaries. The quality of interfaces between modules determines project success.',
    color: '#d90429',
  },
}

const skillsData: Record<Role, { label: string; past: string[]; future: string[] }> = {
  engineer: {
    label: 'Software Engineer',
    past: [
      'Deep coding skills (writing code manually)',
      'Language/framework expertise',
      'Debugging',
      'Version control',
      'Testing',
      'Basic architecture understanding',
    ],
    future: [
      'Architecture expertise (CRITICAL)',
      'AI agent systems & agentic workflows',
      'Code review & debugging (reading, not writing)',
      'System design & infrastructure',
      'Prompt engineering / AI orchestration',
      'Technology landscape awareness',
      'Communication & stakeholder management',
    ],
  },
  pm: {
    label: 'Project Manager',
    past: [
      'Stakeholder management',
      'Timeline/resource planning',
      'Agile/Scrum methodology',
      'Basic technical understanding',
      'Risk management',
    ],
    future: [
      'General understanding of LLM capabilities',
      'Requirements → prompt translation',
      'Quality evaluation of AI output',
      'Stakeholder management (unchanged)',
      'Only handles SMALL projects directly with AI',
      'Does NOT need full technical grasp',
    ],
  },
}

const timelineSteps = [
  { year: 'Now (2026)', desc: 'AI writes code, but humans still do most of the integration, debugging, and architecture. AI is a tool, not a team member.', pct: 15 },
  { year: 'Late 2027', desc: 'Small projects fully AI-driven. Medium projects need one senior engineer as conductor. The restructuring begins.', pct: 55 },
  { year: '2028+', desc: 'Three-tier model is standard. Junior onboarding becomes the critical challenge. Teams are smaller but more senior.', pct: 90 },
]

export default function SoftwareProjectsAIAgePage() {
  const [selectedTier, setSelectedTier] = useState<Tier>('small')
  const [selectedRole, setSelectedRole] = useState<Role>('engineer')

  const tier = tierData[selectedTier]
  const skills = skillsData[selectedRole]

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
          <time className="text-sm text-primary">February 8, 2026</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">Opinion</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">Outlook</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">AI</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          Software Projects in the AI Age (2027–2028)
        </h1>
      </header>

      <article className="prose">
        <p>
          By late 2027, software development teams will look fundamentally different. Code is written by AI.
          Humans architect, review, and orchestrate. The question isn&apos;t <em>whether</em> this happens — it&apos;s
          how teams restructure around it.
        </p>

        <p>
          This is my prediction for how software projects will be staffed and run in the near future.
          Not hype — a practical, realistic assessment based on where AI capabilities are heading.
        </p>

        <h2>The Three Project Tiers</h2>

        <p>
          Not all projects are equal. The team structure depends entirely on complexity.
          Click each tier to see how it works:
        </p>

        {/* Interactive Tier Selector */}
        <div className="my-8 not-prose">
          <div className="flex gap-2 mb-6">
            {(Object.keys(tierData) as Tier[]).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all border-2 cursor-pointer ${
                  selectedTier === t
                    ? 'border-current text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
                style={selectedTier === t ? { backgroundColor: tierData[t].color, borderColor: tierData[t].color } : {}}
              >
                {tierData[t].label}
              </button>
            ))}
          </div>

          <div
            className="rounded-lg border-2 p-6 transition-all"
            style={{ borderColor: tier.color }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">{tier.label}</h3>
              <span className="text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: tier.color }}>
                {tier.teamSize}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-2 font-medium">Team Composition</p>
                <ul className="space-y-1">
                  {tier.team.map((member, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span style={{ color: tier.color }}>●</span> {member}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-2 font-medium">Workflow</p>
                <ol className="space-y-1">
                  {tier.workflow.map((step, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <span className="text-muted text-xs mt-0.5">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-md bg-zinc-800/50 border border-zinc-700">
              <p className="text-sm text-zinc-300 italic">{tier.keyInsight}</p>
            </div>
          </div>
        </div>

        <h2>Onboarding Junior Engineers: The Hard Part</h2>

        <p>
          If AI writes all the code, how do you train the next generation of senior engineers?
          This is the critical unsolved problem.
        </p>

        <p>
          My answer: <strong>use small projects as training ground</strong>. Instead of throwing juniors into
          large projects where they&apos;d be overwhelmed, a manager pre-scopes requirements and the junior
          engineer implements with AI assistance.
        </p>

        <ul>
          <li>It&apos;s slower for the team — but <em>necessary</em></li>
          <li>Without training juniors, there won&apos;t be future senior engineers</li>
          <li>Think of it as an <strong>apprenticeship model</strong></li>
          <li>Juniors learn architecture, review, and orchestration — not manual coding</li>
        </ul>

        <p>
          Skip this step, and the industry creates a talent cliff. You can&apos;t hire senior engineers
          if nobody ever gets trained up.
        </p>

        <h2>Skills: Past vs AI Age</h2>

        <p>
          The required skillset shifts dramatically. Select a role to compare:
        </p>

        {/* Role Selector + Skills Comparison */}
        <div className="my-8 not-prose">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedRole('engineer')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border-2 cursor-pointer ${
                selectedRole === 'engineer'
                  ? 'border-[#d90429] bg-[#d90429] text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              Software Engineer
            </button>
            <button
              onClick={() => setSelectedRole('pm')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border-2 cursor-pointer ${
                selectedRole === 'pm'
                  ? 'border-[#d90429] bg-[#d90429] text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              Project Manager
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-700 p-5">
              <p className="text-xs uppercase tracking-wider text-muted mb-3 font-medium">
                {skills.label} — Past
              </p>
              <ul className="space-y-2">
                {skills.past.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-zinc-600 mt-0.5">○</span> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border-2 border-[#d90429] p-5">
              <p className="text-xs uppercase tracking-wider text-[#d90429] mb-3 font-medium">
                {skills.label} — AI Age (2027+)
              </p>
              <ul className="space-y-2">
                {skills.future.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-[#d90429] mt-0.5">●</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h2>The Transition Timeline</h2>

        {/* Timeline Visualization */}
        <div className="my-8 not-prose">
          <div className="relative">
            {/* Progress bar background */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-zinc-800 rounded-full" />

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
              % of code written by AI agents (estimated)
            </p>
          </div>
        </div>

        <h2>What This Means</h2>

        <p>
          Teams get smaller but more senior. The role of &quot;software engineer&quot; shifts from
          someone who writes code to someone who understands systems deeply enough to direct AI that writes code.
          Project managers on small projects become direct AI operators.
        </p>

        <p>
          The biggest risk isn&apos;t AI replacing engineers — it&apos;s the industry failing to
          train the next generation. If companies only hire senior engineers to orchestrate AI,
          and never invest in junior training, we&apos;ll face a talent crisis within a decade.
        </p>

        <p>
          The companies that figure out the apprenticeship model first will have a lasting advantage.
          Everyone else will be fighting over a shrinking pool of senior talent.
        </p>

        <hr />

        <p className="text-sm text-muted italic">
          This is an opinion piece reflecting my current thinking. The timeline could shift.
          The specific team structures will vary. But the direction — AI writing code,
          humans architecting and reviewing — feels inevitable. The only question is how fast.
        </p>
      </article>
    </div>
  )
}
