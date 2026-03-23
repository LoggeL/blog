'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('gemini-31-pro-benchmarks')!

export default function GeminiBenchmarksPage() {
  const { t } = useLocale()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          {t({
            en: "Gemini 3.1 Pro is, by many measures, the most capable AI model ever released. It tops 13 out of 16 industry benchmarks. It more than doubled its predecessor's score on ARC-AGI-2. It dominates coding, science, and agentic tasks.",
            de: "Gemini 3.1 Pro ist nach vielen Maßstäben das leistungsfähigste KI-Modell, das je veröffentlicht wurde. Es führt 13 von 16 Branchen-Benchmarks an. Es hat den Score seines Vorgängers bei ARC-AGI-2 mehr als verdoppelt. Es dominiert Coding-, Wissenschafts- und Agenten-Aufgaben.",
          })}
        </p>
        <p>
          {t({
            en: 'And yet, if you ask people which model is "best," you\'ll get five different answers. That\'s not because people are confused. It\'s because benchmarks are broken.',
            de: 'Und doch, fragt man Leute, welches Modell das "beste" ist, bekommt man fünf verschiedene Antworten. Das liegt nicht daran, dass die Menschen verwirrt sind. Es liegt daran, dass Benchmarks kaputt sind.',
          })}
        </p>

        <h2>{t({ en: 'The Benchmark Crisis', de: 'Die Benchmark-Krise' })}</h2>
        <p>
          {t({
            en: "Here's what changed: post-training now eats roughly 80% of total compute. The pre-training phase—where a model ingests the internet and learns general patterns—used to be the whole game. Now it's just the foundation. The real differentiation happens after, when models get fine-tuned, RLHF'd, and optimized for specific domains.",
            de: "Das hat sich verändert: Post-Training verbraucht jetzt etwa 80 % des gesamten Rechenaufwands. Die Pre-Training-Phase – in der ein Modell das Internet aufnimmt und allgemeine Muster lernt – war früher das gesamte Spiel. Jetzt ist es nur noch das Fundament. Die echte Differenzierung passiert danach, wenn Modelle fine-getuned, per RLHF optimiert und auf spezifische Domänen ausgerichtet werden.",
          })}
        </p>
        <p>
          {t({
            en: 'This means a model can be surgically optimized to crush a particular benchmark without becoming generally smarter. Excelling at coding doesn\'t mean excelling at creative writing. Dominating science questions doesn\'t mean dominating real-world enterprise tasks. The correlation between "high benchmark score" and "better model" has quietly decoupled.',
            de: 'Das bedeutet, ein Modell kann chirurgisch optimiert werden, um einen bestimmten Benchmark zu dominieren, ohne generell intelligenter zu werden. Bei Coding zu glänzen bedeutet nicht, bei kreativem Schreiben zu glänzen. Wissenschaftsfragen zu dominieren bedeutet nicht, reale Enterprise-Aufgaben zu dominieren. Die Korrelation zwischen "hoher Benchmark-Score" und "besseres Modell" hat sich still entkoppelt.',
          })}
        </p>
        <p>
          {t({
            en: "The chess example makes this visceral: Opus 4.6 scores around 10% on chess puzzles, while the older Sonnet 4.5 hits 12%. Nobody in their right mind would argue Sonnet 4.5 is a better model than Opus 4.6. But if you judged purely by that benchmark, you'd reach exactly that conclusion. General reasoning ability is no longer uniform across domains—it's lumpy, uneven, and shaped by where training compute was allocated.",
            de: "Das Schach-Beispiel macht das greifbar: Opus 4.6 erzielt etwa 10 % bei Schach-Puzzles, während das ältere Sonnet 4.5 auf 12 % kommt. Niemand bei klarem Verstand würde argumentieren, Sonnet 4.5 sei ein besseres Modell als Opus 4.6. Aber würde man rein nach diesem Benchmark urteilen, käme man genau zu diesem Schluss. Allgemeines Reasoning ist nicht mehr gleichmäßig über Domänen verteilt – es ist uneben, klumpig und davon geprägt, wo das Training-Compute eingesetzt wurde.",
          })}
        </p>

        <h2>{t({ en: 'Gemini 3.1 Pro: Where It Shines', de: 'Gemini 3.1 Pro: Wo es glänzt' })}</h2>
        <p>
          {t({
            en: "Credit where it's due—Gemini 3.1 Pro is genuinely impressive in specific areas.",
            de: "Anerkennung wo sie verdient ist – Gemini 3.1 Pro ist in bestimmten Bereichen wirklich beeindruckend.",
          })}
        </p>
        <table>
          <thead>
            <tr><th>Benchmark</th><th>Gemini 3.1 Pro</th><th>Opus 4.6</th><th>GPT-5.2</th></tr>
          </thead>
          <tbody>
            <tr><td>ARC-AGI-2</td><td><strong>77.1%</strong></td><td>37.6%</td><td>54.2%</td></tr>
            <tr><td>GPQA Diamond</td><td><strong>94.3%</strong></td><td>91.3%</td><td>92.4%</td></tr>
            <tr><td>SWE-Bench Verified</td><td><strong>80.6%</strong></td><td>72.6%</td><td>-</td></tr>
            <tr><td>APEX-Agents</td><td><strong>33.5%</strong></td><td>29.8%</td><td>23.0%</td></tr>
            <tr><td>HLE (no tools)</td><td><strong>44.4%</strong></td><td>41.2%</td><td>34.5%</td></tr>
          </tbody>
        </table>
        <p>
          {t({
            en: "That ARC-AGI-2 jump is staggering—more than double its predecessor's 31.1%. The SWE-Bench score puts it ahead of every competitor on real-world GitHub issue resolution. And it achieves all of this at the same $2/M input token price as Gemini 3 Pro. Performance-per-dollar, nothing else comes close.",
            de: "Der ARC-AGI-2-Sprung ist atemberaubend – mehr als doppelt so hoch wie der 31,1 % des Vorgängers. Der SWE-Bench-Score stellt es bei der Lösung realer GitHub-Issues vor alle Konkurrenten. Und das alles zum gleichen Preis von 2 $/M Input-Token wie Gemini 3 Pro. Performance-pro-Dollar kommt nichts anderes heran.",
          })}
        </p>

        <h2>{t({ en: "Where It Doesn't", de: 'Wo es schwächelt' })}</h2>
        <p>
          {t({
            en: "Now look at what Google didn't lead with.",
            de: "Jetzt schauen wir uns an, womit Google nicht in den Vordergrund getreten ist.",
          })}
        </p>
        <table>
          <thead>
            <tr><th>Benchmark</th><th>Gemini 3.1 Pro</th><th>{t({ en: 'Best Competitor', de: 'Bester Konkurrent' })}</th></tr>
          </thead>
          <tbody>
            <tr><td>HLE (with tools)</td><td>51.4%</td><td><strong>53.1%</strong> (Opus 4.6)</td></tr>
            <tr><td>GDPval-AA</td><td>1317</td><td><strong>1633</strong> (Sonnet 4.6)</td></tr>
            <tr><td>Terminal-Bench 2.0</td><td>68.5%</td><td><strong>77.3%</strong> (GPT-5.3-Codex)</td></tr>
          </tbody>
        </table>
        <p>
          {t({
            en: "The GDPval-AA gap is striking—it's a measure of broad enterprise task performance, and Sonnet 4.6 beats Gemini 3.1 Pro by nearly 300 points. When you give models actual tools to use (HLE with tools), Opus 4.6 edges ahead. And on terminal-based coding tasks, GPT-5.3-Codex still leads comfortably.",
            de: "Die GDPval-AA-Lücke ist auffällig – es ist ein Maß für breite Enterprise-Task-Performance, und Sonnet 4.6 schlägt Gemini 3.1 Pro um fast 300 Punkte. Wenn man Modellen echte Tools zur Verfügung stellt (HLE with tools), setzt sich Opus 4.6 durch. Und bei terminal-basierten Coding-Aufgaben führt GPT-5.3-Codex noch komfortabel.",
          })}
        </p>
        <p>
          {t({
            en: "Then there's the hallucination problem. Gemini 3.1 Pro has improved dramatically—dropping from an 88% hallucination rate (Gemini 3 Pro) to about 50%. But that still means half of its wrong answers are confidently wrong, not uncertain. It doesn't say \"I'm not sure.\" It states falsehoods with conviction. Claude and GLM-5 are notably better at expressing uncertainty when they don't know something.",
            de: "Dann ist da noch das Halluzinationsproblem. Gemini 3.1 Pro hat sich dramatisch verbessert – von einer Halluzinationsrate von 88 % (Gemini 3 Pro) auf etwa 50 %. Aber das bedeutet immer noch, dass die Hälfte seiner falschen Antworten selbstbewusst falsch ist, nicht unsicher. Es sagt nicht \"Ich bin nicht sicher.\" Es behauptet Unwahrheiten mit Überzeugung. Claude und GLM-5 sind merklich besser darin, Unsicherheit auszudrücken, wenn sie etwas nicht wissen.",
          })}
        </p>

        <h2>{t({ en: 'Welcome to the Vibe Era', de: 'Willkommen in der Vibe-Ära' })}</h2>
        <p>
          {t({
            en: "So which model is best? That's the wrong question now.",
            de: "Also, welches Modell ist das beste? Das ist jetzt die falsche Frage.",
          })}
        </p>
        <p>
          {t({
            en: "We've entered what you might call the vibe era of AI evaluation. Every major model excels at something and falls flat at something else. Gemini 3.1 Pro is the best reasoning model. Opus 4.6 is the best tool-using model. Sonnet 4.6 dominates enterprise workflows. GPT-5.3-Codex leads terminal coding. No single benchmark captures any of this.",
            de: "Wir haben das betreten, was man die Vibe-Ära der KI-Evaluation nennen könnte. Jedes große Modell glänzt in etwas und versagt in etwas anderem. Gemini 3.1 Pro ist das beste Reasoning-Modell. Opus 4.6 ist das beste Tool-nutzende Modell. Sonnet 4.6 dominiert Enterprise-Workflows. GPT-5.3-Codex führt beim Terminal-Coding. Kein einzelner Benchmark erfasst davon irgendetwas.",
          })}
        </p>
        <p>
          {t({
            en: "The old framework was simple: bigger model + more data = better at everything. That framework is dead. Post-training specialization has shattered the idea that a single leaderboard can rank models meaningfully. A model that tops 13 of 16 benchmarks can still be the wrong choice for your specific use case.",
            de: "Das alte Framework war einfach: größeres Modell + mehr Daten = besser in allem. Dieses Framework ist tot. Post-Training-Spezialisierung hat die Idee zerschlagen, dass ein einzelnes Leaderboard Modelle sinnvoll ranken kann. Ein Modell, das 13 von 16 Benchmarks anführt, kann trotzdem die falsche Wahl für den spezifischen Anwendungsfall sein.",
          })}
        </p>
        <p>
          {t({
            en: "What should replace benchmarks? Probably nothing universal. The honest answer is: try the models on your actual tasks. The era of trusting a leaderboard number to tell you which AI to use is over. We're going to have to vibe it out.",
            de: "Was soll Benchmarks ersetzen? Wahrscheinlich nichts Universelles. Die ehrliche Antwort lautet: Teste die Modelle auf deinen tatsächlichen Aufgaben. Die Ära, einer Leaderboard-Zahl zu vertrauen, die einem sagt, welche KI man nutzen soll, ist vorbei. Wir müssen es ausprobieren.",
          })}
        </p>

        <hr />

        <p>
          <strong>{t({ en: 'Sources:', de: 'Quellen:' })}</strong>
        </p>
        <ul>
          <li><a href="https://youtu.be/2_DPnzoiHaY">AI Explained: Gemini 3.1 Pro and the Downfall of Benchmarks</a></li>
          <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/">Google: Gemini 3.1 Pro announcement</a></li>
          <li><a href="https://deepmind.google/models/model-cards/gemini-3-1-pro/">Google DeepMind: Gemini 3.1 Pro Model Card</a></li>
        </ul>
      </article>
    </div>
  )
}
