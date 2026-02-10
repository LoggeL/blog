'use client'

import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, Treemap } from 'recharts'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('education-2-0')!

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

  // Skill tree data for Treemap
  const skillTreeData = [
    {
      name: 'Sciences',
      children: [
        { name: 'Biology', size: 100 },
        { name: 'Physics', size: 100 },
        { name: 'Chemistry', size: 100 },
        { name: 'Earth Science', size: 80 },
      ],
    },
    {
      name: 'Arts & Humanities',
      children: [
        { name: 'History', size: 100 },
        { name: 'Literature', size: 100 },
        { name: 'Music', size: 90 },
        { name: 'Philosophy', size: 80 },
      ],
    },
    {
      name: 'Technology',
      children: [
        { name: 'Programming', size: 120 },
        { name: 'Robotics', size: 100 },
        { name: 'Data Science', size: 110 },
        { name: 'Design', size: 90 },
      ],
    },
    {
      name: 'Business',
      children: [
        { name: 'Economics', size: 100 },
        { name: 'Marketing', size: 80 },
        { name: 'Finance', size: 90 },
      ],
    },
  ]

  const TREE_COLORS: Record<string, string> = {
    'Sciences': '#10b981',
    'Arts & Humanities': '#8b5cf6',
    'Technology': '#f59e0b',
    'Business': '#3b82f6',
  }

  interface TreemapContentProps {
    x: number
    y: number
    width: number
    height: number
    name: string
    root?: { name: string }
    depth: number
  }

  const CustomTreemapContent = ({ x, y, width, height, name, root, depth }: TreemapContentProps) => {
    if (depth === 1) return null

    const parentName = root?.name || ''
    const baseColor = TREE_COLORS[parentName] || '#71717a'

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: baseColor,
            fillOpacity: 0.7,
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        {width > 50 && height > 25 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: Math.min(12, width / 8),
              fill: '#fff',
              fontWeight: 500,
            }}
          >
            {name}
          </text>
        )}
      </g>
    )
  }

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
          <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">Opinion</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">Outlook</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
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

        {/* Teacher Role Comparison with Recharts */}
        <div className="my-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-muted mb-2">Traditional</p>
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
              <span className="text-xs text-muted">Content Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#d90429]" />
              <span className="text-xs text-muted">Social & Mentoring</span>
            </div>
          </div>
          <p className="text-sm text-muted mt-3 text-center">
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

        {/* Core Skills Header */}
        <div className="my-8">
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 mb-4 text-center">
            <p className="font-bold text-primary text-sm">CORE SKILLS</p>
            <p className="text-xs text-muted mt-1">Reading, Writing, Mathematics, Critical Thinking</p>
          </div>

          <div className="flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d90429" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>

          {/* Skill Tree with Treemap */}
          <div className="h-[250px] rounded-lg overflow-hidden border border-border">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={skillTreeData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={<CustomTreemapContent x={0} y={0} width={0} height={0} name="" depth={0} />}
              />
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {Object.entries(TREE_COLORS).map(([name, color]) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted">{name}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted mt-3 text-center">
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

        <ul>
          <li><strong>Text:</strong> Already solved. LLMs can explain concepts, answer questions, provide feedback.</li>
          <li><strong>Image:</strong> Nearly there. Image generation will be fully production-ready by late 2026.</li>
          <li><strong>Video:</strong> Expect coherent educational video generation by 2027.</li>
          <li><strong>Interactive simulations:</strong> The frontier. Probably 2028-2029 for rich, adaptive learning environments.</li>
        </ul>

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
