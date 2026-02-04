---
title: "February 2026: Models to Watch"
date: 2026-02-04
excerpt: Rumored releases, confirmed retirements, and what to keep an eye on this month in AI.
category: news
---

January was dominated by Chinese labs—Kimi K2.5, Qwen3-Max-Thinking, GLM-4.7-Flash—all shipping while Western labs were comparatively quiet. February looks different. Here's what's rumored, confirmed, and worth watching.

## Confirmed

### OpenAI Retires GPT-4o, GPT-4.1, o4-mini, and GPT-5 Variants (Feb 13)

OpenAI is forcing migration to GPT-5.2. On February 13, GPT-4o, GPT-4.1, o4-mini, and earlier GPT-5 variants go dark. If you're still pinning API calls to any of these, you have days to migrate. GPT-5.2 Codex also shipped in January for those on the coding-focused tier.

### StepFun — Step-3.5-Flash (Feb 2)

StepFun quietly dropped Step-3.5-Flash on February 2. Another Chinese lab, another "Flash" variant optimized for speed. The pattern of lightweight, fast inference models from Chinese labs continues.

## High Probability

### Anthropic — Claude Sonnet 5 ("Fennec")

The most anticipated release this month. Dario Amodei's December 2025 podcast comments pointed to the next major release emphasizing "reliability" and "capabilities that matter for real work." Job postings reference "next-generation model deployment" and "safety testing for advanced capabilities."

A Vertex AI 404 screenshot surfaced showing `claude-sonnet-5@20260203`, but anyone can trigger 404s for nonexistent endpoints—not credible evidence on its own. Still, the timing lines up. Internal testing reportedly involves 1M token context windows.

Expected improvements:
- **SWE-bench Verified**: 83-87% (up from Opus 4.5's 77.2%)
- **Context**: 128K+ tokens at launch, with longer contexts in testing
- **Agentic tool use**: Continued focus on multi-step, multi-tool workflows

The full Opus-class Claude 5 is further out—likely Q2-Q3.

### ByteDance, Alibaba, DeepSeek — February Launches

Multiple reports indicate ByteDance, Alibaba, and DeepSeek are all preparing February model drops. No specific model names yet, but given January's pace from Chinese labs (Kimi K2.5 scoring 0.9 on GPQA, Qwen3-Max-Thinking beating US models on "Humanity's Last Exam"), expect competitive frontier-class releases.

## Worth Watching

### Meta — "Avocado"

Meta's AI unit is testing a frontier model code-named "Avocado" as the successor to the Llama series. With Meta planning $115-135B in AI capex for 2026, this is their most ambitious model yet. February release is possible but unconfirmed—could slip to March.

### Anthropic Labs Division

Anthropic launched a "Labs" division led by Mike Krieger (Instagram co-founder). No product announcements yet, but the formation of this team suggests consumer-facing AI products are coming. Worth tracking for announcements this month.

### Apple x Google — Siri + Gemini

Apple and Google announced a multi-year deal to power next-gen Siri with Google's 1.2T parameter Gemini model, running on Apple's Private Cloud Compute. The timeline for consumer rollout is "this year"—any February developer previews or API details would be significant.

## The Bigger Picture

The story of February 2026 is consolidation and acceleration:

- **Chinese labs aren't slowing down.** January proved they can match or beat Western frontier models on key benchmarks. February will likely reinforce this.
- **OpenAI is cleaning house.** Retiring four model families at once is aggressive. They're betting everything on the GPT-5.2 line.
- **Anthropic is overdue.** Claude Opus 4.5 shipped in late 2025. A Sonnet 5 release would re-establish competitive positioning against GPT-5.2 and the Chinese frontier.
- **MCP is the standard now.** Anthropic's Model Context Protocol hit 97M monthly SDK downloads. Whatever models ship this month, MCP compatibility is table stakes for agentic use cases.

---

*This post reflects publicly available rumors and analysis as of February 4, 2026. Nothing here is confirmed unless explicitly stated.*
