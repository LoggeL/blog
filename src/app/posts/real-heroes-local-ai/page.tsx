import Link from 'next/link'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'

const post = getTsxPostMeta('real-heroes-local-ai')!

const heroes = [
  {
    name: 'llama.cpp & Georgi Gerganov',
    handle: '@ggerganov',
    url: 'https://github.com/ggerganov/llama.cpp',
    color: '#f59e0b',
  },
  {
    name: 'TheBloke (Tom Jobbins)',
    handle: 'Quantization Pioneer (Retired)',
    url: 'https://huggingface.co/TheBloke',
    color: '#10b981',
  },
  {
    name: 'bartowski',
    handle: 'Quantization Torch-Bearer',
    url: 'https://huggingface.co/bartowski',
    color: '#14b8a6',
  },
  {
    name: 'mradermacher',
    handle: 'Quantization at Scale',
    url: 'https://huggingface.co/mradermacher',
    color: '#06b6d4',
  },
  {
    name: 'vLLM & PagedAttention',
    handle: 'UC Berkeley',
    url: 'https://github.com/vllm-project/vllm',
    color: '#6366f1',
  },
  {
    name: 'Hugging Face',
    handle: 'Model Ecosystem',
    url: 'https://huggingface.co',
    color: '#f97316',
  },
  {
    name: 'Unsloth (Daniel & Michael Han)',
    handle: 'Fine-Tuning Revolution',
    url: 'https://github.com/unslothai/unsloth',
    color: '#8b5cf6',
  },
]

export default function RealHeroesLocalAIPage() {
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
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">AI</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">Open Source</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          Local AI is booming. Millions of people run large language models on their laptops, their phones,
          even their Raspberry Pis. It feels like magic. But when people talk about <em>how</em> this became
          possible, they usually credit the wrong projects.
        </p>

        <p>
          The real heroes don&apos;t have slick landing pages or VC funding announcements.
          They work in the shadows — writing C++, inventing memory management tricks,
          and quantizing models at 3 AM so that you can run a 70-billion-parameter model
          on hardware that costs less than a used car.
        </p>

        <p>
          This is their story.
        </p>

        {/* Hero cards */}
        <div className="my-10 not-prose grid grid-cols-2 md:grid-cols-4 gap-3">
          {heroes.map((h) => (
            <a
              key={h.name}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border p-4 hover:shadow-lg transition-all duration-300 group"
              style={{ borderLeftWidth: 3, borderLeftColor: h.color }}
            >
              <p className="text-sm font-semibold text-primary group-hover:underline">{h.name}</p>
              <p className="text-xs text-muted mt-1">{h.handle}</p>
            </a>
          ))}
        </div>

        <h2>llama.cpp: The Engine That Started Everything</h2>

        <p>
          In March 2023, a Bulgarian engineer named{' '}
          <a href="https://github.com/ggerganov" target="_blank" rel="noopener noreferrer">Georgi Gerganov</a>{' '}
          did something that changed the trajectory of AI. He took Meta&apos;s freshly leaked LLaMA weights and got
          them running in pure C/C++ — no Python, no PyTorch, no CUDA toolkit, no dependencies. Just a single
          binary that you could compile and run on practically anything.
        </p>

        <p>
          That project,{' '}
          <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">llama.cpp</a>,
          single-handedly kickstarted the local LLM revolution. It runs on your MacBook via Metal, on your
          gaming PC via CUDA and Vulkan, on your phone via ARM NEON, and even in your browser via WebAssembly.
          Gerganov also created the <strong>GGUF format</strong>, which became the de facto standard for distributing
          quantized models for local inference.
        </p>

        <p>
          The optimization work is staggering. Every major hardware acceleration path — Metal, CUDA, Vulkan,
          AVX-512, ARM NEON — has been hand-tuned. The result is inference performance that commercial products
          struggle to match, from a project run by open-source contributors.
        </p>

        <h3>The Elephant in the Room</h3>

        <p>
          Let&apos;s talk about <a href="https://ollama.com" target="_blank" rel="noopener noreferrer">Ollama</a>.
          It&apos;s a fantastic product. Beautiful CLI, dead-simple model management, one-line installs.
          Millions of people use it as their gateway to local AI.
        </p>

        <p>
          But underneath that polish? It&apos;s{' '}
          <a href="https://github.com/ollama/ollama/tree/main/llama" target="_blank" rel="noopener noreferrer">llama.cpp</a>.
          The inference engine, the model loading, the quantization support — that&apos;s all Gerganov&apos;s work
          and the llama.cpp community&apos;s contributions. Ollama has built a great UX layer on top, but the engine
          that actually runs your models was written by someone else. And you&apos;d be hard-pressed to find that
          acknowledged prominently on Ollama&apos;s marketing or homepage.
        </p>

        <p>
          This isn&apos;t to diminish Ollama. Good UX matters enormously — it&apos;s why normal people can run local
          models at all. But the <em>engineering foundation</em> deserves equal billing, and it rarely gets it.
        </p>

        <h2>The Quantization Wizards</h2>

        <p>
          Here&apos;s a number that explains why quantization matters: a 70B parameter model at FP16 precision
          requires <strong>140 GB of VRAM</strong>. That&apos;s more than any consumer GPU. At 4-bit quantization,
          it needs roughly <strong>35 GB</strong>. That&apos;s the difference between &quot;physically impossible on
          consumer hardware&quot; and &quot;runs on a Mac Studio.&quot;
        </p>

        <p>
          Without quantization, local AI simply does not exist.
        </p>

        {/* Quantization comparison */}
        <div className="my-8 not-prose">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface">
              <h3 className="text-sm font-semibold text-primary">70B Model Memory Requirements</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { format: 'FP16 (original)', mem: '140 GB', feasibility: 'Server-only', color: '#ef4444' },
                { format: 'Q8 (8-bit)', mem: '70 GB', feasibility: 'High-end workstation', color: '#f59e0b' },
                { format: 'Q5_K_M', mem: '~48 GB', feasibility: 'Mac Studio / dual GPU', color: '#eab308' },
                { format: 'Q4_K_M (4-bit)', mem: '~35 GB', feasibility: 'Mac Studio / 48GB Mac', color: '#22c55e' },
                { format: 'Q2_K (2-bit)', mem: '~22 GB', feasibility: 'Gaming laptop', color: '#10b981' },
              ].map((row) => (
                <div key={row.format} className="flex items-center gap-4 px-5 py-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                  <span className="text-sm font-mono text-foreground w-36">{row.format}</span>
                  <span className="text-sm text-primary font-semibold w-20">{row.mem}</span>
                  <span className="text-xs text-muted">{row.feasibility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p>
          <a href="https://huggingface.co/TheBloke" target="_blank" rel="noopener noreferrer"><strong>TheBloke</strong></a>{' '}
          (Tom Jobbins) was the unsung distribution hero of the local AI movement. He took hundreds of models and
          quantized them into every format imaginable — GGUF, GPTQ, AWQ — so that normal people could actually
          download and run them. Before TheBloke, getting a quantized model meant doing it yourself, which required
          significant technical knowledge and compute. He turned it into &quot;click download.&quot;
        </p>

        <p>
          In early 2024, TheBloke went quiet. No announcement, no farewell — his HuggingFace uploads simply
          stopped around January 2024, and his presence in the llama.cpp community faded. The LocalLLaMA
          community noticed almost immediately. Whatever his reasons, the gap he left was enormous — and it
          spoke volumes about how much one person had been carrying the ecosystem on their back.
        </p>

        <p>
          But the community didn&apos;t collapse. Others picked up the torch.{' '}
          <a href="https://huggingface.co/bartowski" target="_blank" rel="noopener noreferrer"><strong>bartowski</strong></a>{' '}
          became the new go-to name for high-quality GGUF quantizations, quickly earning a reputation for
          being first to quantize popular new releases with careful attention to quality settings.{' '}
          <a href="https://huggingface.co/mradermacher" target="_blank" rel="noopener noreferrer"><strong>mradermacher</strong></a>{' '}
          took a different approach — building automated pipelines that quantize models at massive scale,
          including importance-matrix (imatrix) quants that squeeze out better quality. He started precisely
          because TheBloke had vanished and he needed quants for himself. That&apos;s the open-source spirit
          in a nutshell.
        </p>

        <p>
          TheBloke was a legend. Full stop. The people who followed him would be the first to say so.
          But the fact that the community found new heroes when it needed them — that&apos;s the real
          strength of open source. It doesn&apos;t depend on any single person.
        </p>

        <p>
          <a href="https://github.com/turboderp/exllamav2" target="_blank" rel="noopener noreferrer"><strong>turboderp</strong></a>{' '}
          pushed the boundaries further with ExLlamaV2, a GPTQ/EXL2 inference engine that squeezed every last
          drop of performance out of NVIDIA GPUs. The EXL2 format introduced per-layer quantization — different
          parts of the model quantized at different bit rates based on their sensitivity — producing better
          quality at the same file size.
        </p>

        <p>
          And behind all of these are the research teams who developed the quantization methods themselves:{' '}
          <a href="https://github.com/IST-DASLab/gptq" target="_blank" rel="noopener noreferrer">GPTQ</a>,{' '}
          <a href="https://github.com/mit-han-lab/llm-awq" target="_blank" rel="noopener noreferrer">AWQ</a>,
          and the GGUF quantization schemes built into llama.cpp. Each with different tradeoffs between speed,
          quality, and compatibility — but all serving the same mission: making large models fit on small hardware.
        </p>

        <h2>vLLM and PagedAttention: Making Serving Work</h2>

        <p>
          Running a model for yourself is one thing. Serving it to hundreds of concurrent users is another
          problem entirely. The{' '}
          <a href="https://github.com/vllm-project/vllm" target="_blank" rel="noopener noreferrer">vLLM</a>{' '}
          project from UC Berkeley solved this by applying a concept from operating systems to AI inference.
        </p>

        <p>
          Their key insight, called <strong>PagedAttention</strong>, treats the key-value cache (the memory
          that grows as the model generates tokens) like virtual memory pages in an OS. Instead of pre-allocating
          huge contiguous memory blocks for each request, vLLM allocates small pages on demand and manages
          them dynamically. This eliminates massive memory waste and enables far more concurrent requests
          on the same hardware.
        </p>

        <p>
          vLLM was open source from day one, production-grade from early on, and is now the backbone of
          countless self-hosted AI deployments. The team published their research, released the code,
          and built a community around it — the right way to do open-source AI infrastructure.
        </p>

        <h2>The Format and Ecosystem Builders</h2>

        <p>
          <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer"><strong>Hugging Face</strong></a>{' '}
          became the GitHub of AI models. Their model hub hosts tens of thousands of models in open formats,
          and their <code>safetensors</code> format solved real security issues with pickle-based model files.
          Without a centralized, open platform for model distribution, the local AI ecosystem would be
          fragmented beyond usefulness.
        </p>

        <p>
          <a href="https://simonwillison.net" target="_blank" rel="noopener noreferrer"><strong>Simon Willison</strong></a>{' '}
          built the{' '}
          <a href="https://github.com/simonw/llm" target="_blank" rel="noopener noreferrer">llm CLI tool</a>{' '}
          and tirelessly documented the entire local AI space. His blog posts and tools turned complex
          technical concepts into accessible knowledge. In an ecosystem that moves at breakneck speed,
          having someone who methodically explains what&apos;s happening and why it matters is invaluable.
        </p>

        <p>
          <a href="https://github.com/karpathy" target="_blank" rel="noopener noreferrer"><strong>Andrej Karpathy</strong></a>{' '}
          — through projects like{' '}
          <a href="https://github.com/karpathy/nanoGPT" target="_blank" rel="noopener noreferrer">nanoGPT</a>{' '}
          and{' '}
          <a href="https://github.com/karpathy/llm.c" target="_blank" rel="noopener noreferrer">llm.c</a>{' '}
          — made transformer architectures genuinely understandable. His educational work created an entire
          generation of engineers who actually understand how these models work under the hood, rather than
          treating them as black boxes.
        </p>

        <h2>Unsloth: Fine-Tuning for the Rest of Us</h2>

        <p>
          Running models locally is one thing. <em>Training</em> them — or fine-tuning them to do what you
          actually need — has traditionally been something else entirely. Fine-tuning a 7B model used to
          require 40+ GB of VRAM and hours of patience. For most people with a single consumer GPU, the
          answer was simply: you can&apos;t.
        </p>

        <p>
          Then two brothers from Australia changed the equation.{' '}
          <a href="https://github.com/unslothai/unsloth" target="_blank" rel="noopener noreferrer"><strong>Daniel and Michael Han</strong></a>{' '}
          built <a href="https://unsloth.ai" target="_blank" rel="noopener noreferrer">Unsloth</a>, an
          open-source library that makes LLM fine-tuning 2–5x faster while using up to 80% less memory.
          They achieved this by manually rewriting backpropagation kernels in Triton — not wrapping existing
          libraries, not slapping a UI on top of someone else&apos;s work, but going deep into the math and
          rewriting the actual gradient computations to be more memory-efficient.
        </p>

        <p>
          The impact has been enormous. Suddenly, fine-tuning a 7B model fits on a single RTX 3060.
          A 70B model can be fine-tuned on hardware that previously couldn&apos;t even load it for inference.
          Unsloth supports LoRA, QLoRA, and full fine-tuning across virtually every popular architecture —
          Llama, Mistral, Gemma, Qwen, DeepSeek — and has expanded into reinforcement learning with GRPO,
          500K-context fine-tuning, and even text-to-speech model training.
        </p>

        <p>
          By late 2025, NVIDIA partnered with Unsloth for their RTX AI Garage program, showing developers
          how to fine-tune models locally on RTX PCs and the new DGX Spark. The project has tens of thousands
          of GitHub stars and has become the default recommendation whenever someone asks &quot;how do I
          fine-tune a model on my own GPU?&quot;
        </p>

        <p>
          What makes Unsloth special isn&apos;t just the performance — it&apos;s the philosophy. The Hans
          kept the core library open source and focused on making fine-tuning <em>accessible</em> rather than
          just possible. They didn&apos;t build a platform that locks you in. They built a tool that gives
          you superpowers and gets out of your way. That&apos;s the open-source ethos at its best.
        </p>

        <h2>The Attribution Problem</h2>

        <p>
          This brings us to the uncomfortable part.
        </p>

        <p>
          Several projects have built beautiful, polished interfaces on top of llama.cpp and market themselves
          as &quot;the easy way to run AI locally.&quot; They have landing pages with testimonials, download
          counters, and funding rounds. And if you look at their homepages, you&apos;d think they built the
          whole thing from scratch.
        </p>

        <p>
          This isn&apos;t unique to AI. The entire history of open source is littered with companies that
          build commercial products on top of volunteer labor without adequate credit. It&apos;s the
          <a href="https://en.wikipedia.org/wiki/Tragedy_of_the_commons" target="_blank" rel="noopener noreferrer">{' '}tragedy of the commons</a>,
          applied to software.
        </p>

        <p>
          But it matters here because of the stakes. These engineers — Gerganov, TheBloke, turboderp,
          the vLLM team — many of them work for free or on minimal funding. They do the hard, unglamorous
          work of making bits move faster through silicon. When a wrapper project raises millions and
          gets all the attention, while the engine underneath gets a footnote in a LICENSE file, something
          is wrong.
        </p>

        <p>
          The fix isn&apos;t complicated. <strong>Cite your dependencies.</strong> Put &quot;Powered by
          llama.cpp&quot; on your homepage. Link to the projects that make yours possible. Credit the engine,
          not just the paint job.
        </p>

        <hr />

        <h2>The Craft Over the Credit</h2>

        <p>
          Next time you marvel at running a 70-billion-parameter model on your laptop — at watching it
          generate coherent text, write code, answer questions, all without sending a single byte to
          the cloud — remember this:
        </p>

        <p>
          That magic was built by a handful of engineers who cared more about the craft than the credit.
          Who spent their nights optimizing matrix multiplications, inventing memory management schemes,
          and quantizing models so that the rest of us could experience something that felt impossible
          just two years ago.
        </p>

        <p>
          They are the real heroes of local AI. And they deserve to be known.
        </p>

        <hr />

        <p className="text-sm text-muted italic">
          This is an opinion piece. I have no affiliation with any of the projects mentioned.
          Links go to the actual repositories and profiles — go give them a star.
        </p>
      </article>
    </div>
  )
}
