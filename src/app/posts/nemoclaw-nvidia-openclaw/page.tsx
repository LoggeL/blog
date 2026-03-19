import { generatePostMetadata } from '@/lib/posts'
import { PostLayout } from '@/components/PostLayout'
import type { Metadata } from 'next'

const slug = 'nemoclaw-nvidia-openclaw'
export const metadata: Metadata = generatePostMetadata(slug)

export default function NemoClawPost() {
  return (
    <PostLayout slug={slug}>
      <p>
        NVIDIA just open-sourced <strong>NemoClaw</strong> — a security sandbox that wraps
        around <a href="https://openclaw.ai">OpenClaw</a> agents and locks them down with
        Landlock, seccomp, and network namespace isolation. It{"'"}s not a competitor to agent
        frameworks — it{"'"}s the missing security layer.
      </p>

      <h2>What NemoClaw Actually Does</h2>
      <p>
        NemoClaw installs NVIDIA{"'"}s <strong>OpenShell</strong> runtime, creates a sandboxed container,
        and routes all inference through NVIDIA{"'"}s cloud. Every network request, file access, and
        API call is governed by declarative policy. The agent runs free inside its sandbox — but
        can{"'"}t escape it.
      </p>

      <h2>The Security Stack</h2>
      <ul>
        <li><strong>Network isolation</strong> — declarative egress policies, hot-reloadable at runtime. Unauthorized outbound connections are blocked and surfaced for operator approval.</li>
        <li><strong>Filesystem lockdown</strong> — agents can only read/write inside <code>/sandbox</code> and <code>/tmp</code>. No access to host filesystem.</li>
        <li><strong>Process sandboxing</strong> — privilege escalation and dangerous syscalls blocked via seccomp profiles.</li>
        <li><strong>Inference routing</strong> — all model API calls are intercepted and routed through controlled backends. The agent never talks to an LLM directly.</li>
      </ul>

      <h2>Why This Matters</h2>
      <p>
        Running autonomous agents in production is terrifying. They can execute code, access
        the internet, read files, and make decisions — all without human approval for each step.
        Most agent frameworks punt on security entirely, relying on {"\""}just don{"'"}t give it root{"\""}
        as the security model.
      </p>
      <p>
        NemoClaw takes the opposite approach: <strong>default deny everything</strong>, then
        whitelist what the agent needs. It{"'"}s the same principle behind container security,
        Kubernetes network policies, and AWS IAM — applied to AI agents.
      </p>

      <h2>The Operator Approval Flow</h2>
      <p>
        When an agent tries to reach an unauthorized host, NemoClaw blocks the request and
        surfaces it in a TUI for operator approval. This is huge — it means you can let an
        agent explore and discover what it needs, while maintaining a human in the loop for
        anything unexpected.
      </p>
      <p>
        Think of it like a firewall with {"\""}ask before allowing{"\""}. The agent gets a clean
        deny, and the operator sees exactly what was requested and can approve or reject in
        real time.
      </p>

      <h2>What{"'"}s Missing</h2>
      <p>
        NemoClaw is alpha software. Some limitations:
      </p>
      <ul>
        <li>Only supports NVIDIA Nemotron models via their cloud API — no local inference, no Anthropic/OpenAI</li>
        <li>Linux only (Ubuntu 22.04+)</li>
        <li>Single agent per sandbox — no multi-tenant isolation</li>
        <li>No knowledge graph, no memory management, no tool framework — it{"'"}s purely a security layer</li>
      </ul>

      <h2>How It Compares to Rolling Your Own</h2>
      <p>
        You could build similar isolation with Docker + AppArmor + iptables. But NemoClaw
        gives you a polished CLI, hot-reloadable policies, operator approval workflows,
        and tight OpenClaw integration out of the box. That{"'"}s months of security engineering
        you don{"'"}t have to do.
      </p>

      <h2>Bottom Line</h2>
      <p>
        NemoClaw doesn{"'"}t make agents smarter. It makes them <strong>safer</strong>. And as
        agents move from demos to production, {"\""}safe by default{"\""}  will be the difference
        between a useful tool and a liability.
      </p>
      <p>
        The project is Apache 2.0 licensed and available at{' '}
        <a href="https://github.com/NVIDIA/NemoClaw">github.com/NVIDIA/NemoClaw</a>.
      </p>
    </PostLayout>
  )
}
