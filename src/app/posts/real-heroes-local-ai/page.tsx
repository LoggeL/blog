'use client'
import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

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
  const { t } = useLocale()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">{t({ en: 'Opinion', de: 'Meinung' })}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">AI</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">Open Source</span>
        </div>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          {t({
            en: 'Local AI is booming. Millions of people run large language models on their laptops, their phones, even their Raspberry Pis. It feels like magic. But when people talk about ',
            de: 'Local AI boomt. Millionen Menschen laufen lassen große Sprachmodelle auf ihren Laptops, Smartphones, sogar auf Raspberry Pis. Es fühlt sich wie Magie an. Aber wenn Leute darüber reden, ',
          })}<em>{t({ en: 'how', de: 'wie' })}</em>{t({
            en: ' this became possible, they usually credit the wrong projects.',
            de: ' das möglich wurde, loben sie meistens die falschen Projekte.',
          })}
        </p>

        <p>
          {t({
            en: "The real heroes don't have slick landing pages or VC funding announcements. They work in the shadows — writing C++, inventing memory management tricks, and quantizing models at 3 AM so that you can run a 70-billion-parameter model on hardware that costs less than a used car.",
            de: 'Die echten Helden haben keine schicken Landing Pages oder VC-Finanzierungsankündigungen. Sie arbeiten im Verborgenen – schreiben C++, erfinden Memory-Management-Tricks und quantisieren Modelle um 3 Uhr morgens, damit du ein Modell mit 70 Milliarden Parametern auf Hardware betreiben kannst, die weniger kostet als ein Gebrauchtwagen.',
          })}
        </p>

        <p>
          {t({
            en: 'This is their story.',
            de: 'Das ist ihre Geschichte.',
          })}
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

        <h2>{t({ en: 'llama.cpp: The Engine That Started Everything', de: 'llama.cpp: Die Engine, die alles startete' })}</h2>

        <p>
          {t({
            en: 'In March 2023, a Bulgarian engineer named ',
            de: 'Im März 2023 tat ein bulgarischer Ingenieur namens ',
          })}{' '}
          <a href="https://github.com/ggerganov" target="_blank" rel="noopener noreferrer">Georgi Gerganov</a>{' '}
          {t({
            en: "did something that changed the trajectory of AI. He took Meta's freshly leaked LLaMA weights and got them running in pure C/C++ — no Python, no PyTorch, no CUDA toolkit, no dependencies. Just a single binary that you could compile and run on practically anything.",
            de: 'etwas, das die Richtung der KI veränderte. Er nahm Metas frisch geleakte LLaMA-Gewichte und brachte sie in reinem C/C++ zum Laufen – kein Python, kein PyTorch, kein CUDA Toolkit, keine Abhängigkeiten. Nur ein einzelnes Binary, das man auf praktisch allem kompilieren und ausführen konnte.',
          })}
        </p>

        <p>
          {t({ en: 'That project, ', de: 'Dieses Projekt, ' })}{' '}
          <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer">llama.cpp</a>,
          {t({
            en: " single-handedly kickstarted the local LLM revolution. It runs on your MacBook via Metal, on your gaming PC via CUDA and Vulkan, on your phone via ARM NEON, and even in your browser via WebAssembly. Gerganov also created the ",
            de: ' hat im Alleingang die Local-LLM-Revolution gestartet. Es läuft auf deinem MacBook via Metal, auf deinem Gaming-PC via CUDA und Vulkan, auf deinem Smartphone via ARM NEON und sogar im Browser via WebAssembly. Gerganov hat auch das ',
          })}<strong>GGUF-Format</strong>{t({
            en: ', which became the de facto standard for distributing quantized models for local inference.',
            de: ' entwickelt, das zum De-facto-Standard für die Verteilung quantisierter Modelle für lokale Inferenz wurde.',
          })}
        </p>

        <p>
          {t({
            en: 'The optimization work is staggering. Every major hardware acceleration path — Metal, CUDA, Vulkan, AVX-512, ARM NEON — has been hand-tuned. The result is inference performance that commercial products struggle to match, from a project run by open-source contributors.',
            de: 'Die Optimierungsarbeit ist beeindruckend. Jeder wichtige Hardware-Beschleunigungspfad – Metal, CUDA, Vulkan, AVX-512, ARM NEON – wurde manuell optimiert. Das Ergebnis ist Inferenzleistung, mit der kommerzielle Produkte kämpfen, aus einem Projekt von Open-Source-Beiträgern.',
          })}
        </p>

        <h3>{t({ en: 'The Elephant in the Room', de: 'Das Elefant im Raum' })}</h3>

        <p>
          {t({ en: "Let's talk about ", de: 'Reden wir über ' })}<a href="https://ollama.com" target="_blank" rel="noopener noreferrer">Ollama</a>{t({
            en: ". It's a fantastic product. Beautiful CLI, dead-simple model management, one-line installs. Millions of people use it as their gateway to local AI.",
            de: '. Es ist ein fantastisches Produkt. Schöne CLI, todleichte Modellverwaltung, Ein-Zeilen-Installation. Millionen Menschen nutzen es als Einstieg in Local AI.',
          })}
        </p>

        <p>
          {t({ en: "But underneath that polish? It's ", de: 'Aber unter dieser Politur? Es ist ' })}{' '}
          <a href="https://github.com/ollama/ollama/tree/main/llama" target="_blank" rel="noopener noreferrer">llama.cpp</a>{t({
            en: ". The inference engine, the model loading, the quantization support — that's all Gerganov's work and the llama.cpp community's contributions. Ollama has built a great UX layer on top, but the engine that actually runs your models was written by someone else. And you'd be hard-pressed to find that acknowledged prominently on Ollama's marketing or homepage.",
            de: '. Die Inferenz-Engine, das Laden von Modellen, die Quantisierungs-Unterstützung – das ist alles Gerganovs Arbeit und die Beiträge der llama.cpp-Community. Ollama hat eine großartige UX-Schicht obendrauf gebaut, aber die Engine, die deine Modelle tatsächlich ausführt, wurde von jemand anderem geschrieben. Und auf Ollamas Marketing oder Homepage findest du das kaum prominent erwähnt.',
          })}
        </p>

        <p>
          {t({
            en: "This isn't to diminish Ollama. Good UX matters enormously — it's why normal people can run local models at all. But the ",
            de: 'Das soll Ollama nicht kleinreden. Gute UX ist enorm wichtig – deshalb können normale Menschen überhaupt lokale Modelle betreiben. Aber das ',
          })}<em>{t({ en: 'engineering foundation', de: 'technische Fundament' })}</em>{t({
            en: ' deserves equal billing, and it rarely gets it.',
            de: ' verdient gleiche Anerkennung, und bekommt sie selten.',
          })}
        </p>

        <h2>{t({ en: 'The Quantization Wizards', de: 'Die Quantisierungszauberer' })}</h2>

        <p>
          {t({
            en: "Here's a number that explains why quantization matters: a 70B parameter model at FP16 precision requires ",
            de: 'Hier ist eine Zahl, die erklärt, warum Quantisierung wichtig ist: Ein 70B-Parameter-Modell in FP16-Präzision braucht ',
          })}<strong>{t({ en: '140 GB of VRAM', de: '140 GB VRAM' })}</strong>{t({
            en: ". That's more than any consumer GPU. At 4-bit quantization, it needs roughly ",
            de: '. Das ist mehr als jede Consumer-GPU hat. Bei 4-Bit-Quantisierung braucht es ungefähr ',
          })}<strong>{t({ en: '35 GB', de: '35 GB' })}</strong>{t({
            en: '. That\'s the difference between "physically impossible on consumer hardware" and "runs on a Mac Studio."',
            de: '. Das ist der Unterschied zwischen „physisch unmöglich auf Consumer-Hardware" und „läuft auf einem Mac Studio".',
          })}
        </p>

        <p>
          {t({
            en: 'Without quantization, local AI simply does not exist.',
            de: 'Ohne Quantisierung existiert Local AI schlicht nicht.',
          })}
        </p>

        {/* Quantization comparison */}
        <div className="my-8 not-prose">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface">
              <h3 className="text-sm font-semibold text-primary">{t({ en: '70B Model Memory Requirements', de: '70B Modell Speicherbedarf' })}</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { format: 'FP16 (original)', mem: '140 GB', feasibility: t({ en: 'Server-only', de: 'Nur Server' }), color: '#ef4444' },
                { format: 'Q8 (8-bit)', mem: '70 GB', feasibility: t({ en: 'High-end workstation', de: 'High-End-Workstation' }), color: '#f59e0b' },
                { format: 'Q5_K_M', mem: '~48 GB', feasibility: t({ en: 'Mac Studio / dual GPU', de: 'Mac Studio / Dual-GPU' }), color: '#eab308' },
                { format: 'Q4_K_M (4-bit)', mem: '~35 GB', feasibility: t({ en: 'Mac Studio / 48GB Mac', de: 'Mac Studio / 48GB Mac' }), color: '#22c55e' },
                { format: 'Q2_K (2-bit)', mem: '~22 GB', feasibility: t({ en: 'Gaming laptop', de: 'Gaming-Laptop' }), color: '#10b981' },
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
          {t({
            en: '(Tom Jobbins) was the unsung distribution hero of the local AI movement. He took hundreds of models and quantized them into every format imaginable — GGUF, GPTQ, AWQ — so that normal people could actually download and run them. Before TheBloke, getting a quantized model meant doing it yourself, which required significant technical knowledge and compute. He turned it into "click download."',
            de: '(Tom Jobbins) war der unbesungene Distributions-Held der Local-AI-Bewegung. Er nahm hunderte Modelle und quantisierte sie in jedes vorstellbare Format – GGUF, GPTQ, AWQ – damit normale Menschen sie tatsächlich herunterladen und ausführen konnten. Vor TheBloke bedeutete ein quantisiertes Modell zu bekommen, es selbst zu machen, was erhebliches technisches Wissen und Rechenleistung erforderte. Er machte daraus „auf Download klicken".',
          })}
        </p>

        <p>
          {t({
            en: 'In early 2024, TheBloke went quiet. No announcement, no farewell — his HuggingFace uploads simply stopped around January 2024, and his presence in the llama.cpp community faded. The LocalLLaMA community noticed almost immediately. Whatever his reasons, the gap he left was enormous — and it spoke volumes about how much one person had been carrying the ecosystem on their back.',
            de: 'Anfang 2024 wurde TheBloke still. Keine Ankündigung, kein Abschied – seine HuggingFace-Uploads hörten einfach etwa im Januar 2024 auf, und seine Präsenz in der llama.cpp-Community verblasste. Die LocalLLaMA-Community bemerkte es fast sofort. Was auch immer seine Gründe waren, die Lücke, die er hinterließ, war enorm – und sprach Bände darüber, wie viel eine einzelne Person das Ökosystem auf ihren Schultern getragen hatte.',
          })}
        </p>

        <p>
          {t({ en: "But the community didn't collapse. Others picked up the torch. ", de: 'Aber die Community kollabierte nicht. Andere übernahmen die Fackel. ' })}{' '}
          <a href="https://huggingface.co/bartowski" target="_blank" rel="noopener noreferrer"><strong>bartowski</strong></a>{' '}
          {t({
            en: 'became the new go-to name for high-quality GGUF quantizations, quickly earning a reputation for being first to quantize popular new releases with careful attention to quality settings.',
            de: 'wurde zum neuen Anlaufpunkt für hochwertige GGUF-Quantisierungen und erwarb sich schnell den Ruf, beliebte neue Releases als Erster mit sorgfältiger Qualitätseinstellung zu quantisieren.',
          })}{' '}
          <a href="https://huggingface.co/mradermacher" target="_blank" rel="noopener noreferrer"><strong>mradermacher</strong></a>{' '}
          {t({
            en: "took a different approach — building automated pipelines that quantize models at massive scale, including importance-matrix (imatrix) quants that squeeze out better quality. He started precisely because TheBloke had vanished and he needed quants for himself. That's the open-source spirit in a nutshell.",
            de: 'verfolgte einen anderen Ansatz – er baute automatisierte Pipelines, die Modelle in massivem Maßstab quantisieren, einschließlich Importance-Matrix-(imatrix-)Quants, die bessere Qualität herausholen. Er fing genau deshalb an, weil TheBloke verschwunden war und er selbst Quants brauchte. Das ist der Open-Source-Geist in einer Nussschale.',
          })}
        </p>

        <p>
          {t({
            en: "TheBloke was a legend. Full stop. The people who followed him would be the first to say so. But the fact that the community found new heroes when it needed them — that's the real strength of open source. It doesn't depend on any single person.",
            de: 'TheBloke war eine Legende. Punkt. Die Menschen, die ihm folgten, wären die Ersten, das zu sagen. Aber die Tatsache, dass die Community neue Helden fand, als sie sie brauchte – das ist die echte Stärke von Open Source. Es hängt nicht von einer einzelnen Person ab.',
          })}
        </p>

        <p>
          <a href="https://github.com/turboderp/exllamav2" target="_blank" rel="noopener noreferrer"><strong>turboderp</strong></a>{' '}
          {t({
            en: 'pushed the boundaries further with ExLlamaV2, a GPTQ/EXL2 inference engine that squeezed every last drop of performance out of NVIDIA GPUs. The EXL2 format introduced per-layer quantization — different parts of the model quantized at different bit rates based on their sensitivity — producing better quality at the same file size.',
            de: 'schob die Grenzen weiter mit ExLlamaV2, einer GPTQ/EXL2-Inferenz-Engine, die jeden letzten Tropfen Leistung aus NVIDIA-GPUs herausholte. Das EXL2-Format führte layer-spezifische Quantisierung ein – verschiedene Teile des Modells werden je nach ihrer Empfindlichkeit mit unterschiedlichen Bitraten quantisiert – und produziert bei gleicher Dateigröße bessere Qualität.',
          })}
        </p>

        <p>
          {t({
            en: 'And behind all of these are the research teams who developed the quantization methods themselves: ',
            de: 'Und hinter all dem stehen die Forschungsteams, die die Quantisierungsmethoden selbst entwickelt haben: ',
          })}{' '}
          <a href="https://github.com/IST-DASLab/gptq" target="_blank" rel="noopener noreferrer">GPTQ</a>,{' '}
          <a href="https://github.com/mit-han-lab/llm-awq" target="_blank" rel="noopener noreferrer">AWQ</a>,
          {t({
            en: ' and the GGUF quantization schemes built into llama.cpp. Each with different tradeoffs between speed, quality, and compatibility — but all serving the same mission: making large models fit on small hardware.',
            de: ' und die GGUF-Quantisierungsschemata in llama.cpp. Jedes mit unterschiedlichen Abwägungen zwischen Geschwindigkeit, Qualität und Kompatibilität – aber alle derselben Mission dienend: große Modelle auf kleine Hardware zu bringen.',
          })}
        </p>

        <h2>{t({ en: 'vLLM and PagedAttention: Making Serving Work', de: 'vLLM und PagedAttention: Serving zum Laufen bringen' })}</h2>

        <p>
          {t({
            en: 'Running a model for yourself is one thing. Serving it to hundreds of concurrent users is another problem entirely. The ',
            de: 'Ein Modell für sich selbst zu betreiben ist eine Sache. Es für hunderte gleichzeitige Nutzer bereitzustellen ist ein völlig anderes Problem. Das ',
          })}{' '}
          <a href="https://github.com/vllm-project/vllm" target="_blank" rel="noopener noreferrer">vLLM</a>{' '}
          {t({
            en: 'project from UC Berkeley solved this by applying a concept from operating systems to AI inference.',
            de: 'Projekt der UC Berkeley löste dies, indem es ein Konzept aus Betriebssystemen auf KI-Inferenz anwandte.',
          })}
        </p>

        <p>
          {t({
            en: 'Their key insight, called ',
            de: 'Ihre zentrale Erkenntnis, ',
          })}<strong>PagedAttention</strong>{t({
            en: ', treats the key-value cache (the memory that grows as the model generates tokens) like virtual memory pages in an OS. Instead of pre-allocating huge contiguous memory blocks for each request, vLLM allocates small pages on demand and manages them dynamically. This eliminates massive memory waste and enables far more concurrent requests on the same hardware.',
            de: ' genannt, behandelt den Key-Value-Cache (den Speicher, der wächst, während das Modell Tokens generiert) wie virtuelle Speicherseiten in einem Betriebssystem. Statt riesige zusammenhängende Speicherblöcke für jede Anfrage vorzureservieren, weist vLLM kleine Seiten bei Bedarf zu und verwaltet sie dynamisch. Das eliminiert massiven Speicherverschwendung und ermöglicht deutlich mehr parallele Anfragen auf derselben Hardware.',
          })}
        </p>

        <p>
          {t({
            en: 'vLLM was open source from day one, production-grade from early on, and is now the backbone of countless self-hosted AI deployments. The team published their research, released the code, and built a community around it — the right way to do open-source AI infrastructure.',
            de: 'vLLM war von Anfang an Open Source, früh produktionsreif und ist heute das Rückgrat unzähliger selbst gehosteter KI-Deployments. Das Team veröffentlichte ihre Forschung, den Code und baute eine Community darum auf – der richtige Weg für Open-Source-KI-Infrastruktur.',
          })}
        </p>

        <h2>{t({ en: 'The Format and Ecosystem Builders', de: 'Die Format- und Ökosystem-Erbauer' })}</h2>

        <p>
          <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer"><strong>Hugging Face</strong></a>{' '}
          {t({
            en: 'became the GitHub of AI models. Their model hub hosts tens of thousands of models in open formats, and their ',
            de: 'wurde das GitHub der KI-Modelle. Ihr Model-Hub hostet zehntausende Modelle in offenen Formaten, und ihr ',
          })}<code>safetensors</code>{t({
            en: ' format solved real security issues with pickle-based model files. Without a centralized, open platform for model distribution, the local AI ecosystem would be fragmented beyond usefulness.',
            de: '-Format löste echte Sicherheitsprobleme mit pickle-basierten Modelldateien. Ohne eine zentrale, offene Plattform für Modellverteilung wäre das Local-AI-Ökosystem zu fragmentiert, um nützlich zu sein.',
          })}
        </p>

        <p>
          <a href="https://simonwillison.net" target="_blank" rel="noopener noreferrer"><strong>Simon Willison</strong></a>{' '}
          {t({ en: 'built the ', de: 'baute das ' })}{' '}
          <a href="https://github.com/simonw/llm" target="_blank" rel="noopener noreferrer">{t({ en: 'llm CLI tool', de: 'llm CLI-Tool' })}</a>{' '}
          {t({
            en: "and tirelessly documented the entire local AI space. His blog posts and tools turned complex technical concepts into accessible knowledge. In an ecosystem that moves at breakneck speed, having someone who methodically explains what's happening and why it matters is invaluable.",
            de: 'und dokumentierte unermüdlich den gesamten Local-AI-Bereich. Seine Blogbeiträge und Tools wandelten komplexe technische Konzepte in zugängliches Wissen um. In einem Ökosystem, das sich mit halsbrecherischer Geschwindigkeit bewegt, ist jemand, der methodisch erklärt, was passiert und warum es wichtig ist, unschätzbar.',
          })}
        </p>

        <p>
          <a href="https://github.com/karpathy" target="_blank" rel="noopener noreferrer"><strong>Andrej Karpathy</strong></a>{' '}
          {t({ en: '— through projects like ', de: '– durch Projekte wie ' })}{' '}
          <a href="https://github.com/karpathy/nanoGPT" target="_blank" rel="noopener noreferrer">nanoGPT</a>{' '}
          {t({ en: 'and ', de: 'und ' })}{' '}
          <a href="https://github.com/karpathy/llm.c" target="_blank" rel="noopener noreferrer">llm.c</a>{' '}
          {t({
            en: '— made transformer architectures genuinely understandable. His educational work created an entire generation of engineers who actually understand how these models work under the hood, rather than treating them as black boxes.',
            de: '– machte Transformer-Architekturen wirklich verständlich. Seine Bildungsarbeit schuf eine ganze Generation von Ingenieuren, die tatsächlich verstehen, wie diese Modelle unter der Haube funktionieren, anstatt sie als Black Boxes zu behandeln.',
          })}
        </p>

        <h2>{t({ en: 'Unsloth: Fine-Tuning for the Rest of Us', de: 'Unsloth: Fine-Tuning für alle' })}</h2>

        <p>
          {t({
            en: 'Running models locally is one thing. ',
            de: 'Modelle lokal zu betreiben ist eine Sache. ',
          })}<em>{t({ en: 'Training', de: 'Trainieren' })}</em>{t({
            en: ' them — or fine-tuning them to do what you actually need — has traditionally been something else entirely. Fine-tuning a 7B model used to require 40+ GB of VRAM and hours of patience. For most people with a single consumer GPU, the answer was simply: you can\'t.',
            de: ' oder sie auf das Fine-Tunen, was man tatsächlich braucht – war traditionell etwas völlig anderes. Ein 7B-Modell zu fine-tunen erforderte früher 40+ GB VRAM und stundenlange Geduld. Für die meisten Menschen mit einer einzelnen Consumer-GPU lautete die Antwort schlicht: geht nicht.',
          })}
        </p>

        <p>
          {t({ en: 'Then two brothers from Australia changed the equation. ', de: 'Dann veränderten zwei Brüder aus Australien die Gleichung. ' })}{' '}
          <a href="https://github.com/unslothai/unsloth" target="_blank" rel="noopener noreferrer"><strong>Daniel and Michael Han</strong></a>{' '}
          {t({ en: 'built ', de: 'bauten ' })}<a href="https://unsloth.ai" target="_blank" rel="noopener noreferrer">Unsloth</a>{t({
            en: ', an open-source library that makes LLM fine-tuning 2–5x faster while using up to 80% less memory. They achieved this by manually rewriting backpropagation kernels in Triton — not wrapping existing libraries, not slapping a UI on top of someone else\'s work, but going deep into the math and rewriting the actual gradient computations to be more memory-efficient.',
            de: ', eine Open-Source-Bibliothek, die LLM-Fine-Tuning 2–5x schneller macht und bis zu 80% weniger Speicher benötigt. Sie erreichten dies, indem sie Backpropagation-Kernels in Triton manuell neu schrieben – nicht indem sie bestehende Bibliotheken umhüllten, nicht indem sie eine UI über die Arbeit anderer stülpten, sondern indem sie tief in die Mathematik einstiegen und die eigentlichen Gradientenberechnungen speichereffizienter neu schrieben.',
          })}
        </p>

        <p>
          {t({
            en: 'The impact has been enormous. Suddenly, fine-tuning a 7B model fits on a single RTX 3060. A 70B model can be fine-tuned on hardware that previously couldn\'t even load it for inference. Unsloth supports LoRA, QLoRA, and full fine-tuning across virtually every popular architecture — Llama, Mistral, Gemma, Qwen, DeepSeek — and has expanded into reinforcement learning with GRPO, 500K-context fine-tuning, and even text-to-speech model training.',
            de: 'Der Impact war enorm. Plötzlich passt das Fine-Tuning eines 7B-Modells auf eine einzelne RTX 3060. Ein 70B-Modell kann auf Hardware fine-getunt werden, die es zuvor nicht einmal für Inferenz laden konnte. Unsloth unterstützt LoRA, QLoRA und vollständiges Fine-Tuning über praktisch jede populäre Architektur – Llama, Mistral, Gemma, Qwen, DeepSeek – und hat sich auf Reinforcement Learning mit GRPO, 500K-Kontext-Fine-Tuning und sogar Text-to-Speech-Modelltraining ausgeweitet.',
          })}
        </p>

        <p>
          {t({
            en: 'By late 2025, NVIDIA partnered with Unsloth for their RTX AI Garage program, showing developers how to fine-tune models locally on RTX PCs and the new DGX Spark. The project has tens of thousands of GitHub stars and has become the default recommendation whenever someone asks "how do I fine-tune a model on my own GPU?"',
            de: 'Ende 2025 kooperierte NVIDIA mit Unsloth für ihr RTX AI Garage Programm, um Entwicklern zu zeigen, wie man Modelle lokal auf RTX-PCs und dem neuen DGX Spark fine-tuned. Das Projekt hat zehntausende GitHub-Sterne und ist zur Standard-Empfehlung geworden, wenn jemand fragt: „Wie fine-tune ich ein Modell auf meiner eigenen GPU?"',
          })}
        </p>

        <p>
          {t({
            en: "What makes Unsloth special isn't just the performance — it's the philosophy. The Hans kept the core library open source and focused on making fine-tuning ",
            de: 'Was Unsloth besonders macht, ist nicht nur die Leistung – es ist die Philosophie. Die Hans hielten die Kernbibliothek Open Source und konzentrierten sich darauf, Fine-Tuning ',
          })}<em>{t({ en: 'accessible', de: 'zugänglich' })}</em>{t({
            en: " rather than just possible. They didn't build a platform that locks you in. They built a tool that gives you superpowers and gets out of your way. That's the open-source ethos at its best.",
            de: ' zu machen, nicht nur möglich. Sie bauten keine Plattform, die einen einschließt. Sie bauten ein Werkzeug, das Superkräfte verleiht und sich dann aus dem Weg räumt. Das ist der Open-Source-Ethos in seiner besten Form.',
          })}
        </p>

        <h2>{t({ en: 'The Attribution Problem', de: 'Das Attributionsproblem' })}</h2>

        <p>
          {t({
            en: 'This brings us to the uncomfortable part.',
            de: 'Das bringt uns zum unbequemen Teil.',
          })}
        </p>

        <p>
          {t({
            en: 'Several projects have built beautiful, polished interfaces on top of llama.cpp and market themselves as "the easy way to run AI locally." They have landing pages with testimonials, download counters, and funding rounds. And if you look at their homepages, you\'d think they built the whole thing from scratch.',
            de: 'Mehrere Projekte haben schöne, polierte Oberflächen auf llama.cpp gebaut und vermarkten sich als „der einfache Weg, KI lokal auszuführen". Sie haben Landing Pages mit Testimonials, Download-Zählern und Finanzierungsrunden. Und wenn man sich ihre Homepages anschaut, würde man denken, sie hätten alles von Grund auf neu gebaut.',
          })}
        </p>

        <p>
          {t({
            en: "This isn't unique to AI. The entire history of open source is littered with companies that build commercial products on top of volunteer labor without adequate credit. It's the ",
            de: 'Das ist nicht spezifisch für KI. Die gesamte Geschichte von Open Source ist gepflastert mit Unternehmen, die kommerzielle Produkte auf Freiwilligenarbeit aufbauen ohne angemessene Anerkennung. Es ist die ',
          })}<a href="https://en.wikipedia.org/wiki/Tragedy_of_the_commons" target="_blank" rel="noopener noreferrer">{t({ en: ' tragedy of the commons', de: 'Tragödie der Allmende' })}</a>
          {t({ en: ', applied to software.', de: ', angewandt auf Software.' })}
        </p>

        <p>
          {t({
            en: 'But it matters here because of the stakes. These engineers — Gerganov, TheBloke, turboderp, the vLLM team — many of them work for free or on minimal funding. They do the hard, unglamorous work of making bits move faster through silicon. When a wrapper project raises millions and gets all the attention, while the engine underneath gets a footnote in a LICENSE file, something is wrong.',
            de: 'Aber hier spielt es eine Rolle wegen der Einsätze. Diese Ingenieure – Gerganov, TheBloke, turboderp, das vLLM-Team – viele von ihnen arbeiten kostenlos oder mit minimaler Finanzierung. Sie leisten die harte, unglanzvolle Arbeit, Bits schneller durch Silizium zu bewegen. Wenn ein Wrapper-Projekt Millionen einsammelt und die ganze Aufmerksamkeit bekommt, während die darunter liegende Engine eine Fußnote in einer LICENSE-Datei bekommt, stimmt etwas nicht.',
          })}
        </p>

        <p>
          {t({
            en: "The fix isn't complicated. ",
            de: 'Die Lösung ist nicht kompliziert. ',
          })}<strong>{t({ en: 'Cite your dependencies.', de: 'Nennt eure Abhängigkeiten.' })}</strong>{t({
            en: ' Put "Powered by llama.cpp" on your homepage. Link to the projects that make yours possible. Credit the engine, not just the paint job.',
            de: ' Schreibt „Powered by llama.cpp" auf eure Homepage. Verlinkt die Projekte, die eures möglich machen. Würdigt die Engine, nicht nur den Lack.',
          })}
        </p>

        <hr />

        <h2>{t({ en: 'The Craft Over the Credit', de: 'Das Handwerk über die Anerkennung' })}</h2>

        <p>
          {t({
            en: 'Next time you marvel at running a 70-billion-parameter model on your laptop — at watching it generate coherent text, write code, answer questions, all without sending a single byte to the cloud — remember this:',
            de: 'Wenn du das nächste Mal staunst, ein 70-Milliarden-Parameter-Modell auf deinem Laptop auszuführen – wie es kohärenten Text generiert, Code schreibt, Fragen beantwortet, ohne ein einziges Byte in die Cloud zu senden – dann erinnere dich daran:',
          })}
        </p>

        <p>
          {t({
            en: 'That magic was built by a handful of engineers who cared more about the craft than the credit. Who spent their nights optimizing matrix multiplications, inventing memory management schemes, and quantizing models so that the rest of us could experience something that felt impossible just two years ago.',
            de: 'Diese Magie wurde von einer Handvoll Ingenieure gebaut, denen das Handwerk wichtiger war als die Anerkennung. Die ihre Nächte damit verbrachten, Matrizenmultiplikationen zu optimieren, Memory-Management-Schemata zu erfinden und Modelle zu quantisieren, damit wir alle etwas erleben konnten, das vor zwei Jahren noch unmöglich schien.',
          })}
        </p>

        <p>
          {t({
            en: 'They are the real heroes of local AI. And they deserve to be known.',
            de: 'Sie sind die echten Helden von Local AI. Und sie verdienen es, bekannt zu sein.',
          })}
        </p>

        <hr />

        <p className="text-sm text-muted italic">
          {t({
            en: 'This is an opinion piece. I have no affiliation with any of the projects mentioned. Links go to the actual repositories and profiles — go give them a star.',
            de: 'Das ist ein Meinungsbeitrag. Ich habe keine Verbindung zu einem der genannten Projekte. Die Links führen zu den echten Repositories und Profilen – gebt ihnen einen Stern.',
          })}
        </p>
      </article>
    </div>
  )
}
