---
title: "Qwen3-Coder-Next: The Local Coding Agent That Actually Fits"
date: 2026-02-04
excerpt: 80B parameters, 3B active. Qwen's new coding model is built for unified memory systems like Strix Halo, DGX Spark, and M4 Macs.
category: analysis
---

Alibaba's Qwen team dropped [Qwen3-Coder-Next](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct) on February 3. It's an 80B parameter model that only activates 3B parameters per token, making it the first serious coding agent model designed to run locally on unified memory hardware.

The timing isn't coincidental. Strix Halo mini PCs are shipping, NVIDIA's DGX Spark is arriving, and M4 Max Mac Studios have been out for months. All of them have 128GB of unified memory. Qwen3-Coder-Next is the model that makes that hardware useful for real coding work.

## The Architecture

<table>
<thead><tr><th>Spec</th><th>Value</th></tr></thead>
<tbody>
<tr><td>Total Parameters</td><td>80B</td></tr>
<tr><td>Active Parameters</td><td>3B (per token)</td></tr>
<tr><td>Experts</td><td>512 total, 10 active + 1 shared</td></tr>
<tr><td>Layers</td><td>48</td></tr>
<tr><td>Context Window</td><td>262K native, 1M with YaRN</td></tr>
<tr><td>Attention</td><td>Hybrid: Gated DeltaNet + Gated Attention</td></tr>
<tr><td>License</td><td>Apache 2.0</td></tr>
</tbody>
</table>

The key innovation is the hybrid attention mechanism. Instead of standard self-attention everywhere, Qwen3-Next alternates between Gated DeltaNet (a linear attention variant) and standard Gated Attention in a repeating 3:1 pattern. This is what makes the 262K native context practical on consumer hardware—linear attention doesn't have the quadratic memory scaling problem.

Multi-Token Prediction (MTP) further accelerates inference by predicting multiple tokens at once, reducing the number of forward passes needed.

## Benchmarks

For a model with only 3B active parameters, the numbers are hard to believe:

<table>
<thead><tr><th>Benchmark</th><th>Qwen3-Coder-Next (80B/3B)</th><th>DeepSeek-V3.2 (671B)</th><th>Qwen3-235B</th></tr></thead>
<tbody>
<tr><td>SWE-Bench Verified</td><td><strong>70.6</strong></td><td>70.2</td><td>—</td></tr>
<tr><td>SWE-Bench Multilingual</td><td><strong>62.8</strong></td><td>—</td><td>—</td></tr>
<tr><td>LiveCodeBench</td><td><strong>56.6</strong></td><td>—</td><td>51.8</td></tr>
<tr><td>MMLU-Pro</td><td>80.6</td><td>—</td><td><strong>83.0</strong></td></tr>
<tr><td>Arena-Hard v2</td><td><strong>82.7</strong></td><td>—</td><td>79.2</td></tr>
</tbody>
</table>

It matches DeepSeek-V3.2 on SWE-Bench Verified while using **224x fewer active parameters**. On LiveCodeBench and Arena-Hard it outperforms Qwen3-235B. The training cost was reportedly 10% of Qwen3-32B, with 10x inference throughput on contexts over 32K tokens.

## Why Unified Memory Matters

Traditional discrete GPUs cap out at 24GB VRAM (consumer) or 48-80GB (professional). You can't fit an 80B model in 24GB regardless of quantization. Unified memory changes the equation entirely—CPU and GPU share a single memory pool, and these new systems have 128GB of it.

At Q4 quantization, Qwen3-Coder-Next needs roughly **46GB** of memory. That leaves 80GB free for context, OS overhead, and other processes on a 128GB system. At Q8, you need about 85GB—still feasible.

### The Hardware

Three platforms make this practical today:

**AMD Strix Halo (Ryzen AI Max+ 395)**
- 128GB unified memory, 256 GB/s bandwidth
- MoE models are its sweet spot—52 tok/s on Qwen3-30B-A3B in testing
- ROCm stack improving but still behind CUDA in ecosystem maturity
- Best value proposition at roughly half the DGX Spark price
- Use `llama-server` with `-fa 1 --no-mmap` flags or performance tanks

**NVIDIA DGX Spark (Grace Blackwell GB10)**
- 128GB unified memory, 273 GB/s bandwidth
- Prompt processing is dramatically faster: 1,723 tok/s vs Strix Halo's 339 tok/s for initial context ingestion
- CUDA ecosystem, pre-configured AI environment out of the box
- Roughly 2x the cost of Strix Halo
- Better for workflows involving both LLMs and image generation

**Apple Mac Studio (M4 Max)**
- 128GB unified memory, **546 GB/s bandwidth**—double the competition
- Best raw memory bandwidth for token generation
- Mature `llama.cpp` Metal support
- The most polished overall experience, but Apple Silicon has limited fine-tuning support

### Bandwidth Is the Bottleneck

For autoregressive token generation, memory bandwidth is the limiting factor—not compute. Each token requires reading the active model weights from memory. With 3B active parameters at Q4, that's roughly 1.5GB per token. At 256 GB/s (Strix Halo), theoretical peak is ~170 tok/s. At 546 GB/s (M4 Max), it's ~364 tok/s.

In practice, you won't hit these peaks, but the M4 Max's 2x bandwidth advantage over Strix Halo and DGX Spark translates directly to faster token generation for MoE models.

## Use Cases

### Always-On Coding Agent

The real value of running Qwen3-Coder-Next locally isn't saving API costs—it's latency and availability. A local model has zero network round-trip, no rate limits, and no downtime. For agentic coding workflows that make hundreds of tool calls per session, eliminating API latency compounds into massive time savings.

With 262K native context and 3B active parameters, you can keep an entire codebase in context while maintaining fast token generation. This is the "Claude Code but local" use case.

### Private Codebases

If you're working on proprietary code that can't leave your machine, local inference is the only option. Qwen3-Coder-Next's SWE-Bench scores make it the first local model that's genuinely competitive with cloud API models for real-world coding tasks.

### Fine-Tuning for Your Stack

Apache 2.0 license means you can fine-tune it. LoRA fine-tuning on Strix Halo or Mac Studio is practical with 128GB unified memory. Train it on your company's codebase, coding standards, and internal APIs. This creates a coding assistant that understands your stack in ways no general model can.

### Offline Development

Flights, trains, coffee shops with bad WiFi. With a Strix Halo mini PC or a MacBook Pro (M4 Max, 128GB), you have a SWE-Bench-competitive coding agent that works anywhere.

## The Catch

Qwen3-Coder-Next runs in non-thinking mode only—no chain-of-thought reasoning blocks. This makes it fast but means it won't deliberate on complex architectural decisions the way a thinking model would. For straightforward coding tasks, completions, refactoring, and bug fixes, this is fine. For novel algorithm design or complex system architecture, you'll still want a thinking model.

The 3B active parameter count also means it trades some raw capability for efficiency. On MMLU-Pro (80.6 vs 83.0), it lags behind the full Qwen3-235B. For coding-specific tasks, the gap disappears or reverses.

## Bottom Line

Qwen3-Coder-Next is the first model where "run it locally" isn't a compromise—it's a genuine advantage. The MoE architecture was designed for exactly the kind of hardware that's now available in desktop form factors. If you have a 128GB unified memory system, this is the coding model to run on it.

---

*Model: [Qwen3-Next-80B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct) / [Qwen3-Coder-Next](https://www.marktechpost.com/2026/02/03/qwen-team-releases-qwen3-coder-next-an-open-weight-language-model-designed-specifically-for-coding-agents-and-local-development/). Hardware comparisons sourced from [StarryHope](https://www.starryhope.com/minipcs/strix-halo-local-llm-inference-2026/) and [Remio](https://www.remio.ai/post/nvidia-dgx-spark-vs-amd-strix-halo-the-128gb-local-ai-showdown).*
