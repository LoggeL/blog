import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { generatePostMetadata } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

const slug = 'nemoclaw-nvidia-openclaw'
export const metadata: Metadata = generatePostMetadata(slug)
const post = getTsxPostMeta(slug)!

export default function NemoClawPost() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-muted hover:text-primary text-sm mb-8 inline-block">&larr; Back</Link>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-3">{post.title}</h1>
        <time className="text-muted text-sm">{formatPostDate(post.date)}</time>
        <div className="flex gap-2 mt-3 flex-wrap">
          {post.tags?.map(t => (
            <span key={t} className="text-xs bg-surface-light text-muted px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none space-y-6 text-secondary leading-relaxed">
        <p>
          NVIDIA just open-sourced <strong>NemoClaw</strong> — a security sandbox that wraps
          around <a href="https://openclaw.ai" className="text-primary hover:underline">OpenClaw</a> agents and locks them down with
          Landlock, seccomp, and network namespace isolation. It{"'"}s not a competitor to agent
          frameworks — it{"'"}s the missing security layer.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">What NemoClaw Actually Does</h2>
        <p>
          NemoClaw installs NVIDIA{"'"}s <strong>OpenShell</strong> runtime, creates a sandboxed container,
          and routes all inference through NVIDIA{"'"}s cloud. Every network request, file access, and
          API call is governed by declarative policy. The agent runs free inside its sandbox — but
          can{"'"}t escape it.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">The Security Stack</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Network isolation</strong> — declarative egress policies, hot-reloadable at runtime. Unauthorized outbound connections are blocked and surfaced for operator approval.</li>
          <li><strong>Filesystem lockdown</strong> — agents can only read/write inside <code className="bg-surface-light px-1 rounded">/sandbox</code> and <code className="bg-surface-light px-1 rounded">/tmp</code>. No access to host filesystem.</li>
          <li><strong>Process sandboxing</strong> — privilege escalation and dangerous syscalls blocked via seccomp profiles.</li>
          <li><strong>Inference routing</strong> — all model API calls are intercepted and routed through controlled backends.</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">Why This Matters</h2>
        <p>
          Running autonomous agents in production is terrifying. They can execute code, access
          the internet, read files, and make decisions — all without human approval for each step.
          Most agent frameworks punt on security entirely, relying on {'"'}just don{"'"}t give it root{'"'}
          as the security model.
        </p>
        <p>
          NemoClaw takes the opposite approach: <strong>default deny everything</strong>, then
          whitelist what the agent needs. Same principle behind container security,
          Kubernetes network policies, and AWS IAM — applied to AI agents.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">The Operator Approval Flow</h2>
        <p>
          When an agent tries to reach an unauthorized host, NemoClaw blocks the request and
          surfaces it in a TUI for operator approval. This lets you give an agent freedom to explore
          while maintaining a human in the loop for anything unexpected. Like a firewall with
          {'"'}ask before allowing{'"'}.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">What{"'"}s Missing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Only NVIDIA Nemotron models via cloud API — no local inference, no Anthropic/OpenAI</li>
          <li>Linux only (Ubuntu 22.04+)</li>
          <li>Single agent per sandbox — no multi-tenant isolation</li>
          <li>No knowledge graph, memory management, or tool framework — purely a security layer</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-4">Bottom Line</h2>
        <p>
          NemoClaw doesn{"'"}t make agents smarter. It makes them <strong>safer</strong>. As
          agents move from demos to production, {'"'}safe by default{'"'} will be the difference
          between a useful tool and a liability.
        </p>
        <p className="mt-6">
          Apache 2.0 licensed:{' '}
          <a href="https://github.com/NVIDIA/NemoClaw" className="text-primary hover:underline">github.com/NVIDIA/NemoClaw</a>
        </p>
      </div>
    </article>
  )
}
