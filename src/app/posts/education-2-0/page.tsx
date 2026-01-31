'use client'

import Link from 'next/link'

export default function Education20Page() {
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
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">Opinion</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">Outlook</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          Education 2.0: LLMs Teaching Children
        </h1>
      </header>

      <article className="prose">
        <p>
          What if we reimagined education from first principles? Not incremental improvements to the current system,
          but a fundamental rethinking of how humans learn and develop skills.
        </p>

        <p>
          The core idea: <strong>LLMs as primary educators</strong>, with human teachers shifting to a purely social function.
          AI generates and delivers personalized content through text, audio, video, and visualizations.
          Teachers become mentors, facilitators, and providers of the human connection that machines cannot replicate.
        </p>

        <h2>The One-Size-Fits-All Problem</h2>

        <p>
          Traditional classrooms face an impossible challenge. A teacher prepares a single lesson,
          but students arrive with vastly different skill levels:
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
              Struggling
            </text>
            <text x={xScale(0)} y={yScale(0) + 35} textAnchor="middle" className="text-[11px] fill-muted">
              Average
            </text>
            <text x={xScale(2.5)} y={yScale(0) + 35} textAnchor="middle" className="text-[11px] fill-muted">
              Advanced
            </text>

            {/* Annotation for shaded area */}
            <text x={xScale(0)} y={yScale(0.25)} textAnchor="middle" className="text-[10px] fill-primary font-medium">
              Lesson Target
            </text>
          </svg>

          <p className="text-sm text-muted mt-2 text-center">
            A single lesson targets the middle, leaving struggling students confused and advanced students bored.
          </p>
        </div>

        <p>
          LLMs solve this by providing <strong>truly personalized instruction</strong>. Each student gets content
          matched to their current level, learning style, and interests. The struggling student gets more examples
          and scaffolding. The advanced student gets deeper challenges immediately.
        </p>

        <h2>Skills, Not Marks</h2>

        <p>
          Today&apos;s education measures success with grades&mdash;abstract numbers that collapse rich learning into a single dimension.
          A &quot;B&quot; in mathematics tells you almost nothing about what a student can actually do.
        </p>

        <p>
          Education 2.0 measures <strong>skills</strong>. Granular, verifiable capabilities:
        </p>

        <ul>
          <li>Can solve quadratic equations</li>
          <li>Can write persuasive essays with proper structure</li>
          <li>Can debug Python code with logical errors</li>
          <li>Can analyze primary historical sources for bias</li>
        </ul>

        <p>
          This transforms hiring. Instead of filtering by &quot;3.5 GPA from accredited university,&quot;
          companies can weight specific skills and get detailed matching scores.
          A game studio might weight 3D modeling and storytelling high;
          a bank might weight statistics and communication.
        </p>

        <table>
          <thead>
            <tr>
              <th>Traditional</th>
              <th>Education 2.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Grades (A, B, C...)</td>
              <td>Verified skill portfolio</td>
            </tr>
            <tr>
              <td>Same curriculum for all</td>
              <td>Personalized learning paths</td>
            </tr>
            <tr>
              <td>Fixed pace</td>
              <td>Mastery-based progression</td>
            </tr>
            <tr>
              <td>Teacher as content source</td>
              <td>Teacher as mentor/facilitator</td>
            </tr>
            <tr>
              <td>Standardized tests</td>
              <td>Continuous skill verification</td>
            </tr>
            <tr>
              <td>Career discovery at 18+</td>
              <td>Early interest exploration</td>
            </tr>
          </tbody>
        </table>

        <h2>The New Role of the Teacher</h2>

        <p>
          This isn&apos;t about replacing teachers&mdash;it&apos;s about freeing them from the industrial-age model
          where one human must somehow deliver content to 30 students simultaneously.
          That&apos;s a task AI can do better. What AI cannot do is be human.
        </p>

        {/* Teacher Role Comparison */}
        <div className="my-8 overflow-x-auto">
          <svg viewBox="0 0 500 200" className="w-full max-w-[500px]">
            {/* Traditional side */}
            <rect x="20" y="20" width="200" height="160" rx="8" fill="#71717a" fillOpacity="0.05" stroke="#71717a" strokeWidth="1" />
            <text x="120" y="45" textAnchor="middle" className="text-[12px] fill-muted font-bold">Traditional</text>

            {/* Pie chart - Traditional (mostly content) */}
            <circle cx="120" cy="110" r="50" fill="#71717a" fillOpacity="0.2" />
            <path d="M 120 110 L 120 60 A 50 50 0 0 1 165 135 Z" fill="#d90429" fillOpacity="0.3" />

            <text x="100" y="100" className="text-[8px] fill-muted">Content</text>
            <text x="100" y="110" className="text-[8px] fill-muted">Delivery</text>
            <text x="140" y="130" className="text-[8px] fill-primary">Social</text>

            {/* Arrow */}
            <path d="M 230 100 L 270 100" stroke="#d90429" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#d90429" />
              </marker>
            </defs>

            {/* Education 2.0 side */}
            <rect x="280" y="20" width="200" height="160" rx="8" fill="#d90429" fillOpacity="0.05" stroke="#d90429" strokeWidth="1" />
            <text x="380" y="45" textAnchor="middle" className="text-[12px] fill-primary font-bold">Education 2.0</text>

            {/* Pie chart - Education 2.0 (mostly social) */}
            <circle cx="380" cy="110" r="50" fill="#d90429" fillOpacity="0.2" />
            <path d="M 380 110 L 380 60 A 50 50 0 0 0 335 135 Z" fill="#71717a" fillOpacity="0.3" />

            <text x="400" y="100" className="text-[8px] fill-primary">Social</text>
            <text x="400" y="110" className="text-[8px] fill-primary">& Mentor</text>
            <text x="350" y="130" className="text-[8px] fill-muted">Guide</text>
          </svg>
          <p className="text-sm text-muted mt-2 text-center">
            Teacher focus shifts from content delivery to social development and mentorship
          </p>
        </div>

        <p>
          Teachers become <strong>social architects</strong>. Their job shifts to:
        </p>

        <ul>
          <li><strong>Emotional support:</strong> Noticing when a student is struggling, not with algebra, but with life.
            Being the trusted adult who asks &quot;how are you really doing?&quot;</li>
          <li><strong>Social facilitation:</strong> Designing group activities, mediating conflicts,
            teaching collaboration through lived experience</li>
          <li><strong>Motivation and accountability:</strong> Helping students push through difficult material,
            celebrating wins, reframing failures as learning</li>
          <li><strong>Role modeling:</strong> Demonstrating curiosity, resilience, empathy&mdash;the human qualities
            that can only be learned by observing other humans</li>
          <li><strong>Curation and guidance:</strong> While AI personalizes content, teachers help students
            see the bigger picture, connect disparate subjects, and find meaning</li>
        </ul>

        <p>
          This requires different training. Less focus on lesson planning and content delivery.
          More focus on child psychology, group dynamics, counseling skills, and facilitation techniques.
          The teacher of 2030 looks more like a combination of mentor, coach, and therapist than a lecturer.
        </p>

        <p>
          Critically, this role becomes <em>more</em> important, not less. As AI handles the scalable parts of education,
          the irreplaceable human elements become the differentiator. A school&apos;s quality will be measured
          by the strength of its social environment and mentorship, not its curriculum or test scores.
        </p>

        <h2>Core Skills + Interest-Driven Paths</h2>

        <p>
          Everyone needs fundamentals: reading, writing, basic mathematics, critical thinking.
          These are non-negotiable base skills that enable everything else.
        </p>

        {/* Skill Tree Visualization */}
        <div className="my-8 overflow-x-auto">
          <svg viewBox="0 0 500 280" className="w-full max-w-[500px]">
            {/* Core Skills Box */}
            <rect x="175" y="10" width="150" height="50" rx="8" fill="#d90429" fillOpacity="0.1" stroke="#d90429" strokeWidth="2" />
            <text x="250" y="30" textAnchor="middle" className="text-[10px] fill-primary font-bold">CORE SKILLS</text>
            <text x="250" y="45" textAnchor="middle" className="text-[9px] fill-muted">Reading, Math, Writing, Logic</text>

            {/* Connecting lines from core */}
            <path d="M 200 60 L 200 90 L 80 90 L 80 110" stroke="#71717a" strokeWidth="1.5" fill="none" />
            <path d="M 250 60 L 250 110" stroke="#71717a" strokeWidth="1.5" fill="none" />
            <path d="M 300 60 L 300 90 L 420 90 L 420 110" stroke="#71717a" strokeWidth="1.5" fill="none" />

            {/* Branch 1: Sciences */}
            <rect x="20" y="110" width="120" height="40" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
            <text x="80" y="135" textAnchor="middle" className="text-[10px] fill-foreground font-medium">Sciences</text>

            {/* Branch 2: Arts & Humanities */}
            <rect x="190" y="110" width="120" height="40" rx="6" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="250" y="135" textAnchor="middle" className="text-[10px] fill-foreground font-medium">Arts & Humanities</text>

            {/* Branch 3: Technology */}
            <rect x="360" y="110" width="120" height="40" rx="6" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="420" y="135" textAnchor="middle" className="text-[10px] fill-foreground font-medium">Technology</text>

            {/* Sub-branches from Sciences */}
            <path d="M 50 150 L 50 170" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M 80 150 L 80 170" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M 110 150 L 110 170" stroke="#71717a" strokeWidth="1" fill="none" />

            <rect x="20" y="170" width="60" height="30" rx="4" fill="#10b981" fillOpacity="0.05" stroke="#10b981" strokeWidth="1" />
            <text x="50" y="188" textAnchor="middle" className="text-[8px] fill-muted">Biology</text>

            <rect x="50" y="205" width="60" height="30" rx="4" fill="#10b981" fillOpacity="0.05" stroke="#10b981" strokeWidth="1" />
            <text x="80" y="223" textAnchor="middle" className="text-[8px] fill-muted">Physics</text>

            <rect x="80" y="240" width="60" height="30" rx="4" fill="#10b981" fillOpacity="0.05" stroke="#10b981" strokeWidth="1" />
            <text x="110" y="258" textAnchor="middle" className="text-[8px] fill-muted">Chemistry</text>

            {/* Sub-branches from Arts */}
            <path d="M 220 150 L 220 170" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M 250 150 L 250 170" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M 280 150 L 280 170" stroke="#71717a" strokeWidth="1" fill="none" />

            <rect x="190" y="170" width="60" height="30" rx="4" fill="#8b5cf6" fillOpacity="0.05" stroke="#8b5cf6" strokeWidth="1" />
            <text x="220" y="188" textAnchor="middle" className="text-[8px] fill-muted">History</text>

            <rect x="220" y="205" width="60" height="30" rx="4" fill="#8b5cf6" fillOpacity="0.05" stroke="#8b5cf6" strokeWidth="1" />
            <text x="250" y="223" textAnchor="middle" className="text-[8px] fill-muted">Music</text>

            <rect x="250" y="240" width="60" height="30" rx="4" fill="#8b5cf6" fillOpacity="0.05" stroke="#8b5cf6" strokeWidth="1" />
            <text x="280" y="258" textAnchor="middle" className="text-[8px] fill-muted">Literature</text>

            {/* Sub-branches from Technology */}
            <path d="M 390 150 L 390 170" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M 420 150 L 420 170" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M 450 150 L 450 170" stroke="#71717a" strokeWidth="1" fill="none" />

            <rect x="360" y="170" width="60" height="30" rx="4" fill="#f59e0b" fillOpacity="0.05" stroke="#f59e0b" strokeWidth="1" />
            <text x="390" y="188" textAnchor="middle" className="text-[8px] fill-muted">Coding</text>

            <rect x="390" y="205" width="60" height="30" rx="4" fill="#f59e0b" fillOpacity="0.05" stroke="#f59e0b" strokeWidth="1" />
            <text x="420" y="223" textAnchor="middle" className="text-[8px] fill-muted">Robotics</text>

            <rect x="420" y="240" width="60" height="30" rx="4" fill="#f59e0b" fillOpacity="0.05" stroke="#f59e0b" strokeWidth="1" />
            <text x="450" y="258" textAnchor="middle" className="text-[8px] fill-muted">Data Sci</text>
          </svg>
          <p className="text-sm text-muted mt-2 text-center">
            After mastering core skills, students branch into areas of genuine interest
          </p>
        </div>

        <p>
          But once you&apos;ve mastered the required foundations, Education 2.0 opens up.
          The system guides you toward subjects that genuinely interest you.
          A 12-year-old fascinated by marine biology can dive deep&mdash;literally learning about ocean ecosystems,
          chemistry of seawater, statistical methods for population studies.
        </p>

        <p>
          This produces <strong>more motivated workers</strong>. Instead of stumbling into careers at 22
          after generic degrees, students discover their passions at 14 or 15.
          They arrive in the workforce with deep domain knowledge and genuine enthusiasm,
          not just credentials and debt.
        </p>

        <h2>When Will This Be Possible?</h2>

        <p>
          The technical foundations are falling into place:
        </p>

        {/* AI Readiness Timeline */}
        <div className="my-8 overflow-x-auto">
          <svg viewBox="0 0 500 180" className="w-full max-w-[500px]">
            {/* Timeline line */}
            <line x1="50" y1="80" x2="450" y2="80" stroke="#e4e4e7" strokeWidth="3" />

            {/* Progress fill */}
            <line x1="50" y1="80" x2="150" y2="80" stroke="#d90429" strokeWidth="3" />

            {/* Milestones */}
            {/* Text - Now */}
            <circle cx="100" cy="80" r="12" fill="#d90429" />
            <text x="100" y="85" textAnchor="middle" className="text-[10px] fill-white font-bold">✓</text>
            <text x="100" y="110" textAnchor="middle" className="text-[11px] fill-foreground font-medium">Text</text>
            <text x="100" y="125" textAnchor="middle" className="text-[9px] fill-muted">Now</text>

            {/* Image - 2026 */}
            <circle cx="200" cy="80" r="12" fill="#f59e0b" />
            <text x="200" y="110" textAnchor="middle" className="text-[11px] fill-foreground font-medium">Image</text>
            <text x="200" y="125" textAnchor="middle" className="text-[9px] fill-muted">2026</text>

            {/* Video - 2027 */}
            <circle cx="300" cy="80" r="12" fill="#e4e4e7" stroke="#71717a" strokeWidth="2" />
            <text x="300" y="110" textAnchor="middle" className="text-[11px] fill-foreground font-medium">Video</text>
            <text x="300" y="125" textAnchor="middle" className="text-[9px] fill-muted">2027</text>

            {/* Simulations - 2028-29 */}
            <circle cx="400" cy="80" r="12" fill="#e4e4e7" stroke="#71717a" strokeWidth="2" />
            <text x="400" y="110" textAnchor="middle" className="text-[11px] fill-foreground font-medium">Simulations</text>
            <text x="400" y="125" textAnchor="middle" className="text-[9px] fill-muted">2028-29</text>

            {/* Legend */}
            <circle cx="70" cy="155" r="6" fill="#d90429" />
            <text x="85" y="158" className="text-[9px] fill-muted">Ready</text>
            <circle cx="150" cy="155" r="6" fill="#f59e0b" />
            <text x="165" y="158" className="text-[9px] fill-muted">Nearly ready</text>
            <circle cx="260" cy="155" r="6" fill="#e4e4e7" stroke="#71717a" strokeWidth="1" />
            <text x="275" y="158" className="text-[9px] fill-muted">In development</text>
          </svg>
          <p className="text-sm text-muted mt-2 text-center">
            AI content generation capabilities timeline for education
          </p>
        </div>

        <h2>The Social Challenge</h2>

        <p>
          Technology is the easy part. The harder question: <strong>how do we maintain social development?</strong>
        </p>

        <p>
          Children need to learn collaboration, conflict resolution, empathy, leadership.
          These require human interaction&mdash;group projects, team sports, unstructured play, disagreements with peers.
          No AI can teach a child how to navigate a friendship conflict or work with someone they dislike.
        </p>

        <p>
          Education 2.0 requires <em>more</em> investment in social infrastructure, not less:
        </p>

        <ul>
          <li>Dedicated time for collaborative projects with mixed-age groups</li>
          <li>Teachers trained as social facilitators and mentors</li>
          <li>Structured group activities that require genuine cooperation</li>
          <li>Mental health support integrated into the school day</li>
        </ul>

        <h2>Global Equity Implications</h2>

        <p>
          Today, the quality of education you receive depends heavily on geography and wealth.
          A child in rural Indonesia gets a fundamentally different education than one in Singapore or Stockholm.
        </p>

        <p>
          LLM-based education could democratize access to world-class instruction.
          With a device and internet connection, any child anywhere could receive personalized,
          adaptive teaching in their native language. The marginal cost approaches zero.
        </p>

        <p>
          This doesn&apos;t solve infrastructure gaps or socioeconomic barriers overnight.
          But it removes one critical bottleneck: the availability of skilled teachers.
        </p>

        <h2>Privacy Concerns</h2>

        <p>
          Personalization requires data. To adapt to a student, the system must know what they struggle with,
          what interests them, how they learn best. This creates detailed learning profiles&mdash;potentially
          for life.
        </p>

        <p>
          Strong data governance is essential:
        </p>

        <ul>
          <li>Student data ownership and portability</li>
          <li>Clear retention limits</li>
          <li>Prohibition on commercial use</li>
          <li>Right to deletion</li>
        </ul>

        <p>
          Get this wrong, and we create a surveillance infrastructure around children.
          Get it right, and the data enables unprecedented educational outcomes.
        </p>

        <hr />

        <h2>The Path Forward</h2>

        <p>
          Education 2.0 won&apos;t emerge from traditional institutions. The incentives are wrong&mdash;existing
          systems optimize for credentialing and standardization, not learning.
        </p>

        <p>
          It will likely start with:
        </p>

        <ul>
          <li>Homeschool families supplementing with AI tutors</li>
          <li>Alternative schools experimenting with hybrid models</li>
          <li>Countries with less entrenched educational bureaucracy</li>
          <li>Corporate training programs that need measurable skills</li>
        </ul>

        <p>
          The results will speak for themselves. When AI-educated students demonstrably outperform
          traditional students in both skills and motivation, the pressure for systemic change becomes irresistible.
        </p>

        <p>
          We&apos;re not just improving education. We&apos;re rethinking what it means to prepare humans
          for a world where knowledge work is increasingly automated. The answer isn&apos;t more of the same&mdash;it&apos;s
          developing uniquely human capabilities while leveraging AI for everything it does better.
        </p>
      </article>
    </div>
  )
}
