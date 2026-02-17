---
title: "February 2026: Models to Watch"
date: 2026-02-07
excerpt: Rumored releases, confirmed retirements, and what to keep an eye on this month in AI.
category: news
---

January was dominated by Chinese labs—Kimi K2.5, Qwen3-Max-Thinking, GLM-4.7-Flash—all shipping while Western labs were comparatively quiet. February looks different. Here's what's rumored, confirmed, and worth watching.

## Now Confirmed

### Anthropic — Claude Opus 4.6 (Feb 6, 2026)

Anthropic shipped Claude Opus 4.6 on February 6 as a major upgrade to the Opus line. It's available in the API as `claude-opus-4-6`, succeeding Opus 4.5 from late 2025. This also clarifies sequencing: Sonnet 5 ("Fennec") was widely rumored first, but Opus 4.6 arrived ahead of it.

### Anthropic — Claude Sonnet 4.6 (Feb 17, 2026)

Just 11 days after Opus 4.6, Anthropic dropped Claude Sonnet 4.6—and it's arguably the more impactful release. Available as `claude-sonnet-4-6` at the same Sonnet-tier pricing ($3/$15 per million tokens), it delivers near-Opus performance across the board:

- **SWE-bench Verified**: 79.6% (vs Opus 4.6's 80.8%, GPT-5.2's 80.0%)
- **OSWorld-Verified (computer use)**: 72.5% — nearly 5x the 14.9% when computer use launched in Oct 2024, essentially tied with Opus 4.6's 72.7%
- **GDPval-AA Elo (office tasks)**: 1633 — *surpasses* Opus 4.6's 1606
- **Finance Agent v1.1**: 63.3% — beats every model including Opus 4.6

Context window doubles to **1M tokens** (beta), matching Opus. Claude Code users preferred Sonnet 4.6 over Sonnet 4.5 roughly 70% of the time, and even preferred it over Opus 4.5 59% of the time. It's now the default model on claude.ai and the free tier.

The real story: performance that previously required a $15/$75 Opus model is now available at $3/$15. For enterprises running millions of agentic API calls per day, that's transformational economics.

### OpenAI — GPT-5.3 Codex (Feb 2026)

OpenAI shipped GPT-5.3 Codex in February as the next coding-focused iteration after GPT-5.2 Codex. It's available through Codex CLI with ChatGPT Plus OAuth and adds a full-auto mode for sandboxed autonomous coding workflows.

## Confirmed

### OpenAI Retires GPT-4o, GPT-4.1, o4-mini, and GPT-5 Variants (Feb 13)

OpenAI is forcing migration to GPT-5.2. On February 13, GPT-4o, GPT-4.1, o4-mini, and earlier GPT-5 variants go dark. If you're still pinning API calls to any of these, you have days to migrate. GPT-5.2 Codex also shipped in January for those on the coding-focused tier.

### StepFun — Step-3.5-Flash (Feb 2)

StepFun quietly dropped Step-3.5-Flash on February 2. Another Chinese lab, another "Flash" variant optimized for speed. The pattern of lightweight, fast inference models from Chinese labs continues.

## High Probability

### Anthropic — Claude Sonnet 5 ("Fennec")

Update (Feb 17): With both Opus 4.6 (Feb 6) and Sonnet 4.6 (Feb 17) now shipped, the Sonnet 5 / "Fennec" timeline is increasingly uncertain. Anthropic has delivered two major releases in 11 days—an unprecedented cadence—and Sonnet 4.6 already pushes into territory that was previously Opus-only.

The Vertex AI leak (`claude-sonnet-5@20260203`) is still real, and the "Fennec" codename has been [widely reported](https://www.marc0.dev/en/blog/claude-sonnet-5-fennec-leak-what-the-vertex-ai-logs-actually-show-1770048662320). But the February 3 date in the model ID has come and gone without a launch. One [prediction market analysis](https://mlq.ai/prediction/brief/ai/claude-sonnet-5-launch-reshapes-ai-model-leadershipanthropic-dominates-february--2026-02-15/) claims Fennec already launched on Feb 3 with 82.1% SWE-bench—but there's been no official Anthropic announcement, and this contradicts the actual Sonnet 4.6 launch today.

**Will Sonnet 5 still ship in February?** Unlikely at this point. Anthropic just burned their February release momentum on Sonnet 4.6 and won't want to cannibalize its launch window. More probable scenarios:
- **March 2026**: Fennec ships as the true next-gen Sonnet, leapfrogging 4.6 with rumored 128K+ native context and SWE-bench scores in the 83-87% range
- **Rebranding**: Sonnet 4.6's dramatic performance jump may have absorbed some of what was planned for Fennec, and the "5" designation gets reserved for a larger architectural shift

The full Opus-class Claude 5 remains further out—likely Q2-Q3.

### DeepSeek V4 (~Feb 17)

The big one from China. [The Information](https://www.theinformation.com/articles/bytedance-alibaba-launch-new-models-race-ai-supremacy-china) reports DeepSeek is targeting mid-February for V4, likely around February 17—timed with Lunar New Year, the same strategy they used with R1's January 2025 launch.

What we know:
- **Engram Memory**: A conditional memory system (paper published Jan 13) enabling efficient retrieval from contexts exceeding 1M tokens. This means processing entire codebases in a single pass.
- **mHC Architecture**: A new framework co-authored by founder Liang Wenfeng that enables "aggressive parameter expansion" by bypassing GPU memory constraints. Published January 1.
- **Coding focus**: Leaked internal benchmarks claim V4 exceeds Claude and GPT-5 series on SWE-bench. Unverified, but DeepSeek has a track record of delivering on bold claims.
- **Hardware accessibility**: MoE architecture reportedly allows dual RTX 4090s or a single RTX 5090 to run "GPT-5 class" performance locally. Expect a "V4-Lite" or "Coder-33B" variant for single consumer GPUs shortly after.
- **Open source expected**: DeepSeek has consistently open-sourced flagship models under permissive licenses. V4 is expected to follow.

GitHub updates revealed a new architecture identifier "MODEL1," widely interpreted as V4's technical foundation. If the performance claims hold, this is the release most likely to move markets—R1 triggered a [$1 trillion tech sell-off](https://gigazine.net/gsc_news/en/20260114-deepseek-next-flagship-ai-model-v4/) last year.

### Alibaba — Qwen 3.5 (~mid-Feb)

Alibaba is preparing [Qwen 3.5](https://www.digitimes.com/news/a20260203VL204/bytedance-alibaba-flagship-competition-qwen.html), optimized for complex reasoning, math, and coding. This follows the rapid-fire Qwen3 series that dominated January (Qwen3-Max-Thinking topped "Humanity's Last Exam," Qwen3-Coder-Next matched DeepSeek-V3.2 on SWE-bench with 3B active params).

The timing is Lunar New Year—same window as DeepSeek. Alibaba recently connected Qwen to its e-commerce platforms, travel services, and Ant Group payments, positioning the chatbot as a comprehensive life assistant with 100M+ monthly active users. Qwen 3.5 likely powers that next step.

### ByteDance — Doubao 2.0, Seeddream 5.0, Seeddance 2.0 (~mid-Feb)

ByteDance is going wide with [three simultaneous launches](https://pandaily.com/byte-dance-and-alibaba-may-launch-new-ai-models-in-mid-february):
- **Doubao 2.0**: Next-gen LLM powering their Doubao chatbot (163M monthly active users as of December, integrated into Douyin/TikTok China)
- **Seeddream 5.0**: Image generation model
- **Seeddance 2.0**: Video generation model

ByteDance leads China's consumer AI space by user count. The multi-modal triple launch suggests they're betting on an integrated text-image-video pipeline rather than competing on LLM benchmarks alone.

### Zhipu AI — GLM-5 (timing unclear, likely Q1)

Zhipu AI's founder Tang Jie [announced GLM-5](https://news.futunn.com/en/post/67090241/zhipu-was-listed-today-and-tang-jie-s-internal-letter) in an internal letter on the day of their stock listing (January 8), promising it "will soon be unveiled" with "further scaling and numerous innovative technical improvements." Three stated technical directions: novel architecture design, a more universal RL paradigm, and continuous learning with autonomous evolution.

Context: GLM-4.7 already scored 84.9% on LiveCodeBench (beating Claude Sonnet 4.5) and 73.8% on SWE-bench Verified—highest among open-source models at the time. GLM-4.7-Flash dropped January 19 with a 30B MoE / ~3B active design. GLM-5 should be a significant step up.

Zhipu also shipped [GLM-Image](https://www.theregister.com/2026/01/15/zhipu_glm_image_huawei_hardware/) in January—notable because it was trained entirely on Huawei Ascend hardware, proving the viability of a fully domestic Chinese AI stack independent of NVIDIA.

## Worth Watching

### GLM/Zhipu — "Pony Alpha" Stealth Model on OpenRouter (Feb 7)

A new stealth model called **"Pony Alpha"** appeared on [OpenRouter](https://openrouter.ai/) on February 7—free to use, 200K context window, optimized for speed and reasoning with a focus on agentic and coding workflows. The lab behind it isn't officially named, but the description—"a specialized evolution of one of the most beloved open-source models from a global lab"—points strongly to **GLM/Zhipu AI**.

This fits: GLM-4.7 already leads open-source models on coding benchmarks, and Zhipu has been [iterating rapidly](https://news.futunn.com/en/post/67090241/zhipu-was-listed-today-and-tang-jie-s-internal-letter) on their model line. A stealth launch on OpenRouter would let them gather real-world feedback ahead of the GLM-5 announcement. The 200K context and agentic specialization align with the "continuous learning with autonomous evolution" direction Tang Jie outlined.

Sources: [Kilo AI](https://blog.kilo.ai/p/announcing-a-deep-thinking-new-stealth), [TipRanks](https://www.tipranks.com/news/private-companies/openrouter-highlights-new-free-stealth-ai-model-aimed-at-agentic-workflows)

### Meta — "Avocado"

Meta's AI unit is testing a frontier model code-named "Avocado" as the successor to the Llama series. With Meta planning $115-135B in AI capex for 2026, this is their most ambitious model yet. February release is possible but unconfirmed—could slip to March.

### Anthropic Labs Division

Anthropic launched a "Labs" division led by Mike Krieger (Instagram co-founder). No product announcements yet, but the formation of this team suggests consumer-facing AI products are coming. Worth tracking for announcements this month.

### Apple x Google — Siri + Gemini

Apple and Google announced a multi-year deal to power next-gen Siri with Google's 1.2T parameter Gemini model, running on Apple's Private Cloud Compute. The timeline for consumer rollout is "this year"—any February developer previews or API details would be significant.

## The Bigger Picture

The story of February 2026 is consolidation and acceleration:

- **Chinese labs are coordinating a Lunar New Year blitz.** DeepSeek V4, Qwen 3.5, Doubao 2.0, and potentially GLM-5—all targeting the same mid-February window. This isn't coincidental; the holiday captive audience is a strategic launch window, and each lab is racing to define the narrative before the others.
- **OpenAI is cleaning house.** Retiring four model families at once is aggressive. They're betting everything on the GPT-5.2 line.
- **Anthropic is overdue.** Claude Opus 4.5 shipped in late 2025. A Sonnet 5 release would re-establish competitive positioning against GPT-5.2 and the Chinese frontier.
- **MCP is the standard now.** Anthropic's Model Context Protocol hit 97M monthly SDK downloads. Whatever models ship this month, MCP compatibility is table stakes for agentic use cases.

---

*Originally published February 4, 2026. Updated February 7 with confirmed releases (Claude Opus 4.6, GPT-5.3 Codex) and GLM/Zhipu's "Pony Alpha" stealth model on OpenRouter. Updated February 17 with Claude Sonnet 4.6 release and revised Sonnet 5 "Fennec" timeline analysis. Rumor analysis sections remain time-stamped to the original publication unless noted.*
