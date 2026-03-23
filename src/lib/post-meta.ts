// Client-safe post metadata — single source of truth
// This file has NO Node.js dependencies (no fs, path, etc.)

import type { Category } from './types'

export interface TsxPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: Category
  tags?: string[]
  isPage?: boolean
  icon?: string
  ogImage?: string
  modifiedDate?: string
  titleDE?: string
  excerptDE?: string
}

export const SITE_NAME = 'LMF Blog'
export const SITE_URL = 'https://blog.logge.top'

export const tsxPosts: TsxPostMeta[] = [
  {
    slug: 'golden-age-of-personal-software',
    title: 'The Golden Age of Personal Software',
    date: '2026-03-23',
    excerpt: 'Code is getting cheaper by the month. Before full automation reshapes the industry, we\'re entering a window where custom software becomes accessible to everyone.',
    category: 'analysis',
    tags: ['AI', 'Software', 'Outlook', 'Personal'],
    isPage: true,
    icon: 'code',
    titleDE: 'Das goldene Zeitalter persönlicher Software',
    excerptDE: 'Code wird von Monat zu Monat günstiger. Bevor vollständige Automatisierung die Branche umkrempelt, erleben wir eine Phase, in der maßgeschneiderte Software für alle zugänglich wird.',
  },
  {
    slug: 'nemoclaw-nvidia-openclaw',
    title: 'NemoClaw: NVIDIA\'s Security Sandbox for AI Agents',
    date: '2026-03-19',
    excerpt: 'NVIDIA open-sourced NemoClaw — a Landlock + seccomp sandbox for OpenClaw agents with declarative network policies and operator approval flows. Not a framework, but the missing security layer.',
    category: 'analysis',
    tags: ['AI', 'Security', 'Agents', 'NVIDIA', 'Open Source'],
    isPage: true,
    icon: 'shield',
    titleDE: 'NemoClaw: NVIDIAs Sicherheits-Sandbox für KI-Agenten',
    excerptDE: 'NVIDIA hat NemoClaw als Open Source veröffentlicht — eine Landlock + seccomp Sandbox für OpenClaw-Agenten mit deklarativen Netzwerk-Policies und Operator-Freigabe-Workflows. Kein Framework, sondern die fehlende Sicherheitsschicht.',
  },
  {
    slug: 'openclaw-changed-everything',
    title: 'How Free-Roaming Agents Are Changing the Meta',
    date: '2026-03-04',
    excerpt:
      'Give a language model a shell, persistent memory, and modular tools — then let it run. A look at how the agent-as-infrastructure pattern is changing how developers actually work.',
    category: 'opinion',
    tags: ['AI', 'Agents', 'Paradigm', 'Personal'],
    isPage: true,
    icon: 'zap',
    ogImage: '/images/og/openclaw-changed-everything.png',
    titleDE: 'Wie frei agierende Agenten das Spiel verändern',
    excerptDE: 'Gib einem Sprachmodell eine Shell, persistenten Speicher und modulare Tools — und lass es laufen. Ein Blick darauf, wie das Agent-as-Infrastructure-Muster die Arbeitsweise von Entwicklern verändert.',
  },
  {
    slug: 'gemini-31-pro-benchmarks',
    title: 'Gemini 3.1 Pro and the Downfall of Benchmarks',
    date: '2026-02-22',
    excerpt: 'Gemini 3.1 Pro is an incredible model — but it exposes a deeper problem: benchmarks no longer tell us which AI is best. Welcome to the vibe era.',
    category: 'analysis',
    tags: ['AI', 'Benchmarks', 'Gemini'],
    isPage: true,
    icon: 'microscope',
    titleDE: 'Gemini 3.1 Pro und der Niedergang der Benchmarks',
    excerptDE: 'Gemini 3.1 Pro ist ein beeindruckendes Modell — aber es legt ein tieferes Problem offen: Benchmarks sagen uns nicht mehr, welche KI die beste ist. Willkommen in der Vibe-Ära.',
  },
  {
    slug: 'seedance-2',
    title: 'Seedance 2.0: Stock Footage Is Dead',
    date: '2026-02-11',
    excerpt: 'Seedance 2.0 doesn\'t just beat Sora, Veo, and Kling — it makes them look like last year\'s tech. The real story is what this means for video production, VFX jobs, and trust in visual media.',
    category: 'opinion',
    tags: ['AI', 'Video', 'Outlook'],
    isPage: true,
    icon: 'video',
    ogImage: '/images/og/default.png',
    titleDE: 'Seedance 2.0: Stock-Footage ist tot',
    excerptDE: 'Seedance 2.0 schlägt nicht nur Sora, Veo und Kling — es lässt sie wie Technik von gestern aussehen. Die eigentliche Geschichte ist, was das für Videoproduktion, VFX-Jobs und das Vertrauen in visuelle Medien bedeutet.',
  },
  {
    slug: 'secure-your-agents',
    title: 'How to Secure Your Agents',
    date: '2026-02-11',
    excerpt: 'A practical guide to securing AI agents — from prompt hardening to honey pot tools. Seven defense layers for every threat model.',
    category: 'tutorial',
    tags: ['Security', 'AI', 'Agents'],
    isPage: true,
    icon: 'shield',
    titleDE: 'So sicherst du deine Agenten ab',
    excerptDE: 'Ein praktischer Leitfaden zur Absicherung von KI-Agenten — von Prompt-Härtung bis zu Honeypot-Tools. Sieben Verteidigungsschichten für jedes Bedrohungsmodell.',
  },
  {
    slug: 'cheap-intelligence',
    title: 'When Intelligence Becomes Dirt Cheap',
    date: '2026-02-10',
    excerpt: 'What happens to society when the cost of thinking approaches zero. White collar, blue collar, education, and the three possible futures.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'globe',
    ogImage: '/images/og/cheap-intelligence.png',
    titleDE: 'Wenn Intelligenz spottbillig wird',
    excerptDE: 'Was passiert mit der Gesellschaft, wenn die Kosten des Denkens gegen null gehen. Büroarbeit, Handwerk, Bildung und drei mögliche Zukünfte.',
  },
  {
    slug: 'real-heroes-local-ai',
    title: 'The Real Heroes of Local AI',
    date: '2026-02-09',
    excerpt: 'The engineers and projects doing the actual work that makes running LLMs on consumer hardware possible — and why they deserve more credit.',
    category: 'opinion',
    tags: ['AI', 'Open Source'],
    isPage: true,
    icon: 'hero',
    ogImage: '/images/og/real-heroes-local-ai.png',
    titleDE: 'Die wahren Helden der lokalen KI',
    excerptDE: 'Die Ingenieure und Projekte, die die eigentliche Arbeit leisten, damit LLMs auf Consumer-Hardware laufen — und warum sie mehr Anerkennung verdienen.',
  },
  {
    slug: 'software-projects-ai-age',
    title: 'Software Projects in the AI Age (2027–2028)',
    date: '2026-02-08',
    excerpt: 'How software teams will restructure around AI agents: three project tiers, shifting skills, and the junior engineer problem.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'code',
    ogImage: '/images/og/software-projects-ai-age.png',
    titleDE: 'Softwareprojekte im KI-Zeitalter (2027–2028)',
    excerptDE: 'Wie sich Software-Teams um KI-Agenten herum neu organisieren: drei Projektstufen, sich wandelnde Fähigkeiten und das Junior-Engineer-Problem.',
  },
  {
    slug: 'kimi-k25-breakthrough',
    title: 'Kimi K2.5: 1T Open-Source Model with Agent Swarms',
    date: '2026-01-30',
    modifiedDate: '2026-02-10',
    excerpt: "Moonshot AI's 1 trillion parameter model with video-to-code, agent orchestration, and strong benchmark scores.",
    category: 'analysis',
    isPage: true,
    icon: 'microscope',
    ogImage: '/images/og/kimi-k25-breakthrough.png',
    titleDE: 'Kimi K2.5: 1T Open-Source-Modell mit Agent Swarms',
    excerptDE: 'Moonshot AIs 1-Billionen-Parameter-Modell mit Video-to-Code, Agent-Orchestrierung und starken Benchmark-Ergebnissen.',
  },
  {
    slug: 'education-2-0',
    title: 'Education 2.0: LLMs Teaching Children',
    date: '2026-01-28',
    excerpt: 'Reimagining education with AI tutors, skill-based assessment, and teachers as social mentors.',
    category: 'opinion',
    tags: ['Outlook', 'AI'],
    isPage: true,
    icon: 'graduation',
    ogImage: '/images/og/education-2-0.png',
    titleDE: 'Bildung 2.0: LLMs unterrichten Kinder',
    excerptDE: 'Bildung neu gedacht mit KI-Tutoren, kompetenzbasierter Bewertung und Lehrern als soziale Mentoren.',
  },
  {
    slug: 'gemini-3-flash-context',
    title: 'Gemini 3 Flash: Perfect Long Context Scores',
    date: '2026-01-24',
    excerpt: "Gemini 3 Flash Preview achieves 100% on Fiction.LiveBench across all context lengths up to 192k tokens.",
    category: 'til',
    isPage: true,
    icon: 'sparkles',
    ogImage: '/images/og/gemini-3-flash-context.png',
    titleDE: 'Gemini 3 Flash: Perfekte Long-Context-Ergebnisse',
    excerptDE: 'Gemini 3 Flash Preview erreicht 100% auf Fiction.LiveBench über alle Kontextlängen bis 192k Tokens.',
  },
]

/** Get metadata for a TSX post by slug */
export function getTsxPostMeta(slug: string): TsxPostMeta | undefined {
  return tsxPosts.find(p => p.slug === slug)
}

/** Format a date string (YYYY-MM-DD) to a human-readable format */
export function formatPostDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
