'use client'

import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { BackLink } from '@/components/BackLink'
import { useLocale } from '@/lib/i18n'

const slug = 'nemoclaw-nvidia-openclaw'
const post = getTsxPostMeta(slug)!

export default function NemoClawPost() {
  const { t } = useLocale()

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <BackLink />
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-3">{post.title}</h1>
        <time className="text-muted text-sm">{formatPostDate(post.date)}</time>
        <div className="flex gap-2 mt-3 flex-wrap">
          {post.tags?.map(tag => (
            <span key={tag} className="text-xs bg-surface-light text-muted px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none space-y-6 text-secondary leading-relaxed">
        <p>
          {t({
            en: 'NVIDIA just open-sourced ',
            de: 'NVIDIA hat ',
          })}
          <strong>NemoClaw</strong>
          {t({
            en: ' — a security sandbox that wraps around ',
            de: ' als Open Source veröffentlicht — eine Security-Sandbox, die sich um ',
          })}
          <a href="https://openclaw.ai" className="text-primary hover:underline">OpenClaw</a>
          {t({
            en: " agents and locks them down with Landlock, seccomp, and network namespace isolation. It's not a competitor to agent frameworks — it's the missing security layer.",
            de: '-Agents legt und sie mit Landlock, seccomp und Network-Namespace-Isolation absichert. Es ist kein Konkurrent zu Agent-Frameworks — sondern die fehlende Security-Schicht.',
          })}
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">{t({ en: 'What NemoClaw Actually Does', de: 'Was NemoClaw tatsächlich macht' })}</h2>
        <p>
          {t({
            en: "NemoClaw installs NVIDIA's OpenShell runtime, creates a sandboxed container, and routes all inference through NVIDIA's cloud. Every network request, file access, and API call is governed by declarative policy. The agent runs free inside its sandbox — but can't escape it.",
            de: 'NemoClaw installiert NVIDIAs OpenShell-Runtime, erstellt einen Sandboxed Container und routet alle Inferenz-Anfragen über NVIDIAs Cloud. Jeder Netzwerk-Request, Dateizugriff und API-Call wird durch deklarative Policies gesteuert. Der Agent agiert frei innerhalb seiner Sandbox — kann aber nicht ausbrechen.',
          })}
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">{t({ en: 'The Security Stack', de: 'Der Security Stack' })}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>{t({ en: 'Network isolation', de: 'Netzwerk-Isolation' })}</strong>
            {t({
              en: ' — declarative egress policies, hot-reloadable at runtime. Unauthorized outbound connections are blocked and surfaced for operator approval.',
              de: ' — deklarative Egress-Policies, zur Laufzeit hot-reloadable. Nicht-autorisierte ausgehende Verbindungen werden blockiert und dem Operator zur Genehmigung vorgelegt.',
            })}
          </li>
          <li>
            <strong>{t({ en: 'Filesystem lockdown', de: 'Dateisystem-Lockdown' })}</strong>
            {t({
              en: ' — agents can only read/write inside ',
              de: ' — Agents können nur innerhalb von ',
            })}
            <code className="bg-surface-light px-1 rounded">/sandbox</code>
            {t({ en: ' and ', de: ' und ' })}
            <code className="bg-surface-light px-1 rounded">/tmp</code>
            {t({
              en: '. No access to host filesystem.',
              de: ' lesen/schreiben. Kein Zugriff auf das Host-Dateisystem.',
            })}
          </li>
          <li>
            <strong>{t({ en: 'Process sandboxing', de: 'Prozess-Sandboxing' })}</strong>
            {t({
              en: ' — privilege escalation and dangerous syscalls blocked via seccomp profiles.',
              de: ' — Privilege Escalation und gefährliche Syscalls werden via seccomp-Profile blockiert.',
            })}
          </li>
          <li>
            <strong>{t({ en: 'Inference routing', de: 'Inferenz-Routing' })}</strong>
            {t({
              en: ' — all model API calls are intercepted and routed through controlled backends.',
              de: ' — alle Model-API-Calls werden abgefangen und über kontrollierte Backends geroutet.',
            })}
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">{t({ en: 'Why This Matters', de: 'Warum das wichtig ist' })}</h2>
        <p>
          {t({
            en: "Running autonomous agents in production is terrifying. They can execute code, access the internet, read files, and make decisions — all without human approval for each step. Most agent frameworks punt on security entirely, relying on \"just don't give it root\" as the security model.",
            de: 'Autonome Agents in Produktion zu betreiben ist beängstigend. Sie können Code ausführen, auf das Internet zugreifen, Dateien lesen und Entscheidungen treffen — alles ohne menschliche Genehmigung für jeden Schritt. Die meisten Agent-Frameworks ignorieren Security komplett und verlassen sich auf „gib ihm einfach keinen Root-Zugang" als Sicherheitsmodell.',
          })}
        </p>
        <p>
          {t({
            en: 'NemoClaw takes the opposite approach: ',
            de: 'NemoClaw geht den umgekehrten Weg: ',
          })}
          <strong>{t({ en: 'default deny everything', de: 'Default Deny für alles' })}</strong>
          {t({
            en: ', then whitelist what the agent needs. Same principle behind container security, Kubernetes network policies, and AWS IAM — applied to AI agents.',
            de: ', dann per Whitelist freigeben was der Agent braucht. Dasselbe Prinzip wie Container-Security, Kubernetes Network Policies und AWS IAM — angewandt auf AI-Agents.',
          })}
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">{t({ en: 'The Operator Approval Flow', de: 'Der Operator-Genehmigungsflow' })}</h2>
        <p>
          {t({
            en: 'When an agent tries to reach an unauthorized host, NemoClaw blocks the request and surfaces it in a TUI for operator approval. This lets you give an agent freedom to explore while maintaining a human in the loop for anything unexpected. Like a firewall with "ask before allowing".',
            de: 'Wenn ein Agent versucht, einen nicht-autorisierten Host zu erreichen, blockiert NemoClaw den Request und zeigt ihn in einer TUI zur Operator-Genehmigung an. So kann man dem Agent Freiheit zum Erkunden geben und trotzdem einen Menschen in der Schleife für alles Unerwartete behalten. Wie eine Firewall mit „erst fragen, dann erlauben".',
          })}
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">{t({ en: "What's Missing", de: 'Was fehlt' })}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t({ en: 'Only NVIDIA Nemotron models via cloud API — no local inference, no Anthropic/OpenAI', de: 'Nur NVIDIA Nemotron-Modelle via Cloud-API — keine lokale Inferenz, kein Anthropic/OpenAI' })}</li>
          <li>{t({ en: 'Linux only (Ubuntu 22.04+)', de: 'Nur Linux (Ubuntu 22.04+)' })}</li>
          <li>{t({ en: 'Single agent per sandbox — no multi-tenant isolation', de: 'Ein Agent pro Sandbox — keine Multi-Tenant-Isolation' })}</li>
          <li>{t({ en: 'No knowledge graph, memory management, or tool framework — purely a security layer', de: 'Kein Knowledge Graph, Memory Management oder Tool-Framework — rein ein Security Layer' })}</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">{t({ en: 'Bottom Line', de: 'Fazit' })}</h2>
        <p>
          {t({
            en: "NemoClaw doesn't make agents smarter. It makes them ",
            de: 'NemoClaw macht Agents nicht klüger. Es macht sie ',
          })}
          <strong>{t({ en: 'safer', de: 'sicherer' })}</strong>
          {t({
            en: '. As agents move from demos to production, "safe by default" will be the difference between a useful tool and a liability.',
            de: '. Wenn Agents von Demos in die Produktion wechseln, wird „Safe by Default" der Unterschied zwischen einem nützlichen Tool und einer Haftungsfalle sein.',
          })}
        </p>
        <p className="mt-6">
          Apache 2.0 {t({ en: 'licensed', de: 'lizenziert' })}:{' '}
          <a href="https://github.com/NVIDIA/NemoClaw" className="text-primary hover:underline">github.com/NVIDIA/NemoClaw</a>
        </p>
      </div>
    </article>
  )
}
