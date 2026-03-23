'use client'
"use client"
import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import Image from 'next/image'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('kimi-k25-breakthrough')!

export default function KimiK25Page() {
  const { t } = useLocale()
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <time className="text-sm text-primary">{formatPostDate(post.date)}{post.modifiedDate && ` · ${t({ en: 'Updated', de: 'Aktualisiert' })} ${formatPostDate(post.modifiedDate)}`}</time>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {post.title}
        </h1>
      </header>

      <article className="prose">
        <p>
          {t({
            en: 'Moonshot AI has released ',
            de: 'Moonshot AI hat ',
          })}<strong>Kimi K2.5</strong>{t({
            en: ' — and the model is genuinely impressive. An open-source model with 1 trillion parameters that ranks ',
            de: ' veröffentlicht — und das Modell ist wirklich beeindruckend. Ein Open-Source-Modell mit 1 Billion Parametern, das auf Artificial Analysis ',
          })}<strong>{t({ en: '#1 among open-source models', de: '#1 unter den Open-Source-Modellen' })}</strong>{t({
            en: " on Artificial Analysis's intelligence ranking, with unique capabilities that set it apart from everything else.",
            de: ' beim Intelligence-Ranking belegt, mit einzigartigen Fähigkeiten die es von allem anderen abheben.',
          })}
        </p>
        <p>{t({ en: "What makes it special.", de: 'Was es besonders macht.' })}</p>

        <h2>{t({ en: 'The Numbers', de: 'Die Zahlen' })}</h2>
        <table>
          <thead>
            <tr><th>{t({ en: 'Metric', de: 'Kennzahl' })}</th><th>{t({ en: 'Value', de: 'Wert' })}</th></tr>
          </thead>
          <tbody>
            <tr><td>{t({ en: 'Total Parameters', de: 'Gesamtparameter' })}</td><td>{t({ en: '1 Trillion', de: '1 Billion' })}</td></tr>
            <tr><td>{t({ en: 'Active Parameters', de: 'Aktive Parameter' })}</td><td>32B (MoE)</td></tr>
            <tr><td>Context Window</td><td>256K Tokens</td></tr>
            <tr><td>{t({ en: 'Intelligence Rank', de: 'Intelligence-Rang' })}</td><td>{t({ en: '#1 / 60 on Artificial Analysis', de: '#1 / 60 auf Artificial Analysis' })}</td></tr>
            <tr><td>{t({ en: 'Speed', de: 'Geschwindigkeit' })}</td><td>113.9 tok/s (#4)</td></tr>
            <tr><td>{t({ en: 'API Cost', de: 'API-Kosten' })}</td><td>$0.60/M Input, $3.00/M Output</td></tr>
          </tbody>
        </table>
        <p>
          {t({
            en: 'K2.5 achieves a score of ',
            de: 'K2.5 erzielt einen Score von ',
          })}<strong>{t({ en: '47 on the Artificial Analysis Intelligence Index', de: '47 im Artificial Analysis Intelligence Index' })}</strong>{t({
            en: ' — well above the average of 24. It is the highest-ranked model on this leaderboard.',
            de: ' — deutlich über dem Durchschnitt von 24. Es ist das am höchsten platzierte Modell in diesem Leaderboard.',
          })}
        </p>

        <h2>{t({ en: 'Video-to-Website Generation', de: 'Video-to-Website-Generierung' })}</h2>
        <p>
          {t({
            en: "This is the headline feature. You record a screen video of a UI interaction — animations, transitions, hover effects — and K2.5 generates the complete code.",
            de: 'Das ist das Headline-Feature. Du nimmst ein Bildschirmvideo einer UI-Interaktion auf — Animationen, Übergänge, Hover-Effekte — und K2.5 generiert den vollständigen Code.',
          })}
        </p>
        <p>
          {t({
            en: 'No detailed description needed. Just: ',
            de: 'Keine detaillierte Beschreibung nötig. Einfach: ',
          })}<em>&quot;{t({ en: 'Clone this website with all UX designs.', de: 'Klon diese Website mit allen UX-Designs.' })}&quot;</em>
        </p>
        <p>
          {t({
            en: 'The model analyzes the video, extracts interaction logic and visual styles, and outputs functional HTML/CSS/JS including animations. In tests it even added details that surpassed the original.',
            de: 'Das Modell analysiert das Video, extrahiert Interaktionslogik und visuelle Stile, und gibt funktionales HTML/CSS/JS inklusive Animationen aus. In Tests hat es sogar Details hinzugefügt, die das Original übertrafen.',
          })}
        </p>
        <p>
          {t({
            en: 'This works because K2.5 is ',
            de: 'Das funktioniert weil K2.5 ',
          })}<strong>{t({ en: 'natively multimodal', de: 'nativ multimodal' })}</strong>{t({
            en: ' — trained from scratch on 15 trillion mixed visual and text tokens, not a text model with a vision module bolted on.',
            de: ' ist — von Grund auf mit 15 Billionen gemischten visuellen und Text-Tokens trainiert, kein Textmodell mit nachträglich angehängtem Vision-Modul.',
          })}
        </p>

        <h2>{t({ en: 'Agent Swarm: 100 Parallel Agents', de: 'Agent Swarm: 100 parallele Agents' })}</h2>
        <Image
          src="/images/agent-swarm.png"
          alt="Agent Swarm Architecture"
          width={800}
          height={400}
          className="rounded-lg border border-border my-6"
        />
        <p>
          {t({
            en: 'K2.5 can spawn up to ',
            de: 'K2.5 kann bis zu ',
          })}<strong>{t({ en: '100 sub-agents', de: '100 Sub-Agents' })}</strong>{t({
            en: ' in parallel, coordinating up to ',
            de: ' parallel spawnen, die bis zu ',
          })}<strong>{t({ en: '1,500 tool calls', de: '1.500 Tool-Calls' })}</strong>{t({
            en: ' without human intervention. No predefined workflows — the orchestrator dynamically creates specialized agents based on the task.',
            de: ' ohne menschliche Intervention koordinieren. Keine vordefinierten Workflows — der Orchestrator erstellt dynamisch spezialisierte Agents basierend auf der Aufgabe.',
          })}
        </p>
        <p>{t({ en: 'Ask it to research a topic, and it might spawn:', de: 'Frag es ein Thema zu recherchieren, und es spawnt möglicherweise:' })}</p>
        <ul>
          <li><code>InferenceStackResearcher</code></li>
          <li><code>QuantizationHardwareResearcher</code></li>
          <li><code>CostControlResearcher</code></li>
          <li><code>FactChecker</code></li>
        </ul>
        <p>
          {t({
            en: 'Each agent uses tools independently — searching, browsing, analyzing — then results are merged at the orchestrator.',
            de: 'Jeder Agent nutzt Tools unabhängig — suchen, browsen, analysieren — dann werden die Ergebnisse beim Orchestrator zusammengeführt.',
          })}
        </p>
        <p>
          <strong>{t({ en: 'Result: 4.5× faster execution', de: 'Ergebnis: 4,5-fach schnellere Ausführung' })}</strong>{t({
            en: ' compared to single-agent approaches.',
            de: ' im Vergleich zu Einzel-Agent-Ansätzen.',
          })}
        </p>
        <p>
          {t({
            en: 'This was trained with ',
            de: 'Das wurde mit ',
          })}<strong>PARL (Parallel-Agent Reinforcement Learning)</strong>{t({
            en: ", which specifically teaches the model to avoid \"Serial Collapse\" — the tendency of multi-agent systems to fall back to sequential execution.",
            de: ' trainiert, das dem Modell speziell beibringt "Serial Collapse" zu vermeiden — die Tendenz von Multi-Agent-Systemen auf sequenzielle Ausführung zurückzufallen.',
          })}
        </p>

        <h2>{t({ en: 'Four Operating Modes', de: 'Vier Betriebsmodi' })}</h2>
        <p>
          {t({
            en: 'Moonshot offers K2.5 in ',
            de: 'Moonshot bietet K2.5 in ',
          })}<strong>{t({ en: 'four modes', de: 'vier Modi' })}</strong>{t({
            en: ' on Kimi.com and the Kimi app:',
            de: ' auf Kimi.com und in der Kimi App an:',
          })}
        </p>
        <ul>
          <li><strong>K2.5 Instant</strong> — {t({ en: 'fast, lightweight responses', de: 'schnelle, leichtgewichtige Antworten' })}</li>
          <li><strong>K2.5 Thinking</strong> — {t({ en: 'extended reasoning with chain-of-thought', de: 'erweitertes Reasoning mit Chain-of-Thought' })}</li>
          <li><strong>K2.5 Agent</strong> — {t({ en: 'single agent with preconfigured tools (search, code interpreter, web browsing)', de: 'Einzel-Agent mit vorkonfigurierten Tools (Suche, Code-Interpreter, Web-Browsing)' })}</li>
          <li><strong>K2.5 Agent Swarm (Beta)</strong> — {t({ en: 'the full parallel orchestration system', de: 'das vollständige parallele Orchestrierungssystem' })}</li>
        </ul>
        <p>
          {t({
            en: "Agent Swarm is currently in beta with free credits for top-tier paying users. The separation makes sense — you pick the complexity level that fits the task instead of paying for orchestration overhead on simple questions.",
            de: 'Agent Swarm ist aktuell in der Beta-Phase mit kostenlosen Credits für Top-Tier-Bezahlnutzer. Die Trennung ist sinnvoll — man wählt die Komplexitätsstufe, die zur Aufgabe passt, anstatt bei einfachen Fragen für Orchestrierungs-Overhead zu zahlen.',
          })}
        </p>

        <h2>{t({ en: 'Kimi Code: Open-Source Coding Assistant', de: 'Kimi Code: Open-Source Coding Assistant' })}</h2>
        <p>
          {t({
            en: 'Alongside K2.5, Moonshot released ',
            de: 'Parallel zu K2.5 hat Moonshot ',
          })}<a href="https://www.kimi.com/code">Kimi Code</a>{t({
            en: ' — an open-source coding assistant that runs in the terminal and integrates with VSCode, Cursor, and Zed.',
            de: ' veröffentlicht — einen Open-Source Coding Assistant, der im Terminal läuft und sich mit VSCode, Cursor und Zed integriert.',
          })}
        </p>
        <p>
          {t({
            en: "What makes it interesting: Kimi Code accepts ",
            de: 'Was es interessant macht: Kimi Code akzeptiert ',
          })}<strong>{t({ en: 'images and videos as input', de: 'Bilder und Videos als Input' })}</strong>{t({
            en: ", leveraging K2.5's native multimodal capabilities. It also automatically detects existing skills and MCPs and migrates them into the workspace.",
            de: ", und nutzt dabei K2.5's native multimodale Fähigkeiten. Es erkennt außerdem automatisch bestehende Skills und MCPs und migriert sie in die Arbeitsumgebung.",
          })}
        </p>
        <p>
          {t({
            en: 'The standout demo feature is ',
            de: 'Das herausragende Demo-Feature ist ',
          })}<strong>{t({ en: 'autonomous visual debugging', de: 'autonomes visuelles Debugging' })}</strong>{t({
            en: ". K2.5 generates UI code, visually inspects its own output, looks up documentation, and iterates — all without human intervention. In one example it translated the aesthetics of Matisse's ",
            de: ". K2.5 generiert UI-Code, inspiziert die eigene Ausgabe visuell, schlägt Dokumentation nach und iteriert — alles ohne menschliche Intervention. In einem Beispiel hat es die Ästhetik von Matisses ",
          })}<em>La Danse</em>{t({
            en: ' into a fully designed webpage — start to finish.',
            de: ' in eine vollständig gestaltete Webseite übersetzt — von Anfang bis Ende.',
          })}
        </p>
        <p>
          {t({
            en: 'Pricing: $15–$200/month depending on usage tier, cached input tokens at $0.10/M.',
            de: 'Preise: $15–$200/Monat je nach Nutzungsstufe, gecachte Input-Tokens zu $0,10/M.',
          })}
        </p>

        <h2>{t({ en: 'Office Productivity', de: 'Office-Produktivität' })}</h2>
        <p>
          {t({
            en: 'K2.5 Agent can ',
            de: 'K2.5 Agent kann ',
          })}<strong>{t({ en: 'handle extensive office work end-to-end', de: 'umfangreiche Office-Arbeit vollständig abwickeln' })}</strong>{t({
            en: ' — documents, spreadsheets, PDFs, and presentations generated directly through conversation.',
            de: ' — Dokumente, Tabellen, PDFs und Präsentationen werden direkt per Konversation generiert.',
          })}
        </p>
        <p>
          {t({
            en: "On Moonshot's internal benchmarks, K2.5 shows a ",
            de: 'Auf Moonshoots internen Benchmarks zeigt K2.5 eine ',
          })}<strong>{t({ en: '59.3% improvement', de: 'Verbesserung von 59,3 %' })}</strong>{t({
            en: ' on the AI Office Benchmark and ',
            de: ' auf dem AI Office Benchmark und ',
          })}<strong>{t({ en: '24.3%', de: '24,3 %' })}</strong>{t({
            en: ' on the General Agent Benchmark vs. K2 Thinking. Specific capabilities:',
            de: ' auf dem General Agent Benchmark im Vergleich zu K2 Thinking. Spezifische Fähigkeiten:',
          })}
        </p>
        <ul>
          <li>{t({ en: 'Insert annotations in Word documents', de: 'Anmerkungen in Word-Dokumenten einfügen' })}</li>
          <li>{t({ en: 'Build financial models with pivot tables', de: 'Finanzmodelle mit Pivot Tables erstellen' })}</li>
          <li>{t({ en: 'Write LaTeX equations in PDFs', de: 'LaTeX-Gleichungen in PDFs schreiben' })}</li>
          <li>{t({ en: 'Generate 10,000-word articles or 100-page documents', de: '10.000-Wort-Artikel oder 100-seitige Dokumente generieren' })}</li>
        </ul>
        <p>
          {t({
            en: 'Tasks that used to take hours or days are now done in minutes. These are internal benchmarks, so treat them with appropriate skepticism — but the direction is clear: K2.5 is positioned as a knowledge worker, not just a chatbot.',
            de: 'Aufgaben, die früher Stunden oder Tage brauchten, werden jetzt in Minuten erledigt. Das sind interne Benchmarks, also mit entsprechender Skepsis zu betrachten — aber die Richtung ist klar: K2.5 wird als Knowledge Worker positioniert, nicht nur als Chatbot.',
          })}
        </p>

        <h2>{t({ en: 'Context Stability', de: 'Kontextstabilität' })}</h2>
        <p>
          {t({
            en: 'K2.5 achieves ',
            de: 'K2.5 erreicht ',
          })}<strong>{t({ en: '69.4% on LongBench-V2', de: '69,4 % auf LongBench-V2' })}</strong>{t({
            en: ' with 128K context, outperforming GPT-5.2 (54.5%) and Gemini 3 Pro (68.2%).',
            de: ' mit 128K Context, übertrifft GPT-5.2 (54,5 %) und Gemini 3 Pro (68,2 %).',
          })}
        </p>
        <p>
          {t({
            en: 'The 256K-token context window handles complex long-horizon tasks with stable tool use across 200–300 sequential calls. When the context fills up, K2.5 fades out earlier tool outputs to stay within the limit.',
            de: 'Das 256K-Token-Context-Window bewältigt komplexe Long-Horizon-Aufgaben mit stabiler Tool-Nutzung über 200–300 sequenzielle Calls. Wenn der Context voll wird, blendet K2.5 frühere Tool-Outputs aus, um im Limit zu bleiben.',
          })}
        </p>
        <p>
          {t({
            en: 'K2.5 also performs well on ',
            de: 'K2.5 schneidet auch gut auf ',
          })}<a href="https://fiction.live/stories/Fiction-liveBench-Jan-30-2026/oQdzQvKHw8JyXbN87">Fiction.LiveBench</a>{t({
            en: " — a benchmark that tests real narrative comprehension, not just simple retrieval. Unlike 'Needle in a Haystack' tests, it evaluates theory of mind, event chronology, and implicit inferences across long stories.",
            de: ' ab — einem Benchmark der echtes narratives Verständnis testet, nicht nur einfaches Retrieval. Im Gegensatz zu "Needle in a Haystack"-Tests bewertet er Theory of Mind, Ereignischronologie und implizite Schlussfolgerungen über lange Geschichten.',
          })}
        </p>
        <table>
          <thead>
            <tr><th>{t({ en: 'Model', de: 'Modell' })}</th><th>0</th><th>1k</th><th>4k</th><th>8k</th><th>16k</th><th>32k</th><th>60k</th><th>120k</th><th>192k</th></tr>
          </thead>
          <tbody>
            <tr><td>gpt-5.2</td><td>100</td><td>100</td><td>100</td><td>97.2</td><td>100</td><td>97.2</td><td>97.2</td><td>100</td><td>96.9</td></tr>
            <tr><td><strong>kimi-k2.5</strong></td><td><strong>100</strong></td><td><strong>100</strong></td><td><strong>100</strong></td><td><strong>88.9</strong></td><td><strong>86.1</strong></td><td><strong>88.9</strong></td><td><strong>89.8</strong></td><td><strong>78.1</strong></td><td><strong>87.5</strong></td></tr>
            <tr><td>gemini-3-pro</td><td>100</td><td>100</td><td>100</td><td>97.2</td><td>96.6</td><td>94.4</td><td>100</td><td>96.9</td><td>96.9</td></tr>
            <tr><td>claude-opus-4-5</td><td>87.5</td><td>100</td><td>94.4</td><td>97.2</td><td>91.7</td><td>94.4</td><td>97.2</td><td>93.8</td><td>80.0</td></tr>
          </tbody>
        </table>
        <p>
          {t({
            en: 'K2.5 holds strong scores across all context lengths, with 87.5% at 192K tokens. This matters for agentic tasks where coherent understanding across long sessions is critical.',
            de: 'K2.5 hält starke Scores über alle Context-Längen, mit 87,5 % bei 192K Tokens. Das ist entscheidend für agentische Aufgaben, bei denen kohärentes Verständnis über lange Sessions wichtig ist.',
          })}
        </p>

        <h2>{t({ en: 'Cost Efficiency', de: 'Kosteneffizienz' })}</h2>
        <Image
          src="/images/token-cost.png"
          alt="Cost vs Performance"
          width={800}
          height={400}
          className="rounded-lg border border-border my-6"
        />
        <p>{t({ en: 'K2.5 is dramatically cheaper than the competition at comparable performance:', de: 'K2.5 ist bei vergleichbarer Leistung dramatisch günstiger als die Konkurrenz:' })}</p>
        <ul>
          <li><strong>{t({ en: '5.1× savings', de: '5,1-fache Ersparnis' })}</strong> {t({ en: 'on SWE-Verified vs. GPT-5.2', de: 'auf SWE-Verified vs. GPT-5.2' })}</li>
          <li><strong>{t({ en: '21.1× savings', de: '21,1-fache Ersparnis' })}</strong> {t({ en: 'on BrowseComp', de: 'auf BrowseComp' })}</li>
          <li><strong>{t({ en: '10.1× savings', de: '10,1-fache Ersparnis' })}</strong> {t({ en: 'on HLE Benchmark', de: 'auf HLE Benchmark' })}</li>
        </ul>
        <p>
          {t({
            en: 'At $0.60 per million input tokens it is approximately ',
            de: 'Bei $0,60 pro Million Input-Tokens ist es ca. ',
          })}<strong>{t({ en: '9× cheaper than Claude Opus 4.5', de: '9-mal günstiger als Claude Opus 4.5' })}</strong>.
        </p>

        <h2>{t({ en: 'The Catch: VRAM Requirements', de: 'Der Haken: VRAM-Anforderungen' })}</h2>
        <p>
          {t({
            en: "Here's the reality check. Although the MoE architecture only activates 32B parameters per token, ",
            de: 'Hier der Reality-Check. Obwohl die MoE-Architektur pro Token nur 32B Parameter aktiviert, ',
          })}<strong>{t({ en: 'the entire 1T model must remain in memory', de: 'muss das gesamte 1T-Modell im Speicher bleiben' })}</strong>{t({
            en: ' for token routing.',
            de: ' für das Token-Routing.',
          })}
        </p>
        <table>
          <thead>
            <tr><th>{t({ en: 'Quantization', de: 'Quantisierung' })}</th><th>{t({ en: 'Required VRAM', de: 'Benötigter VRAM' })}</th></tr>
          </thead>
          <tbody>
            <tr><td>FP16</td><td>~2 TB</td></tr>
            <tr><td>Q8</td><td>~1.09 TB</td></tr>
            <tr><td>Q4_K_M</td><td>~621 GB</td></tr>
            <tr><td>2-bit</td><td>~374 GB</td></tr>
            <tr><td>1.58-bit</td><td>~240 GB</td></tr>
          </tbody>
        </table>
        <p>
          {t({
            en: 'Even the most aggressive quantization requires ',
            de: 'Selbst die aggressivste Quantisierung erfordert ',
          })}<strong>{t({ en: '240 GB+ RAM', de: '240 GB+ RAM' })}</strong>{t({
            en: ' for local deployment. That means either enterprise hardware (4× H100) or massive system RAM with CPU offloading.',
            de: ' für lokales Deployment. Das bedeutet entweder Enterprise-Hardware (4× H100) oder massives System-RAM mit CPU-Offloading.',
          })}
        </p>
        <p>{t({ en: 'For most people the API at $0.60/M tokens is the practical choice.', de: 'Für die meisten ist die API zu $0,60/M Tokens die praktische Wahl.' })}</p>

        <h2>{t({ en: 'When to Use K2.5', de: 'Wann K2.5 einsetzen' })}</h2>
        <p><strong>{t({ en: 'K2.5 shines at:', de: 'K2.5 glänzt bei:' })}</strong></p>
        <ul>
          <li>{t({ en: 'Agentic automation and multi-step workflows', de: 'Agentischer Automatisierung und mehrstufigen Workflows' })}</li>
          <li>{t({ en: 'Vision-to-code tasks (screenshots, videos)', de: 'Vision-to-Code-Aufgaben (Screenshots, Videos)' })}</li>
          <li>{t({ en: 'Web browsing and research (74.9 on BrowseComp)', de: 'Web-Browsing und Recherche (74,9 auf BrowseComp)' })}</li>
          <li>{t({ en: 'Cost-sensitive production deployments', de: 'Kostensensiblen Produktions-Deployments' })}</li>
        </ul>
        <p><strong>{t({ en: 'Look elsewhere for:', de: 'Besser woanders schauen für:' })}</strong></p>
        <ul>
          <li>{t({ en: 'Pure code quality (Claude Opus 4.5 still leads on SWE-Bench)', de: 'Reine Code-Qualität (Claude Opus 4.5 führt noch auf SWE-Bench)' })}</li>
          <li>{t({ en: 'Maximum reasoning capability (GPT-5.2 has slight advantages)', de: 'Maximale Reasoning-Fähigkeit (GPT-5.2 hat leichte Vorteile)' })}</li>
          <li>{t({ en: 'Local operation without enterprise hardware', de: 'Lokalen Betrieb ohne Enterprise-Hardware' })}</li>
        </ul>

        <h2>{t({ en: 'Conclusion', de: 'Fazit' })}</h2>
        <p>
          {t({
            en: 'Kimi K2.5 marks a genuine step forward for open-source models. The combination of native multimodality, agent orchestration, and competitive benchmark scores — at a fraction of proprietary prices — makes it a serious option for agentic workflows.',
            de: 'Kimi K2.5 markiert einen echten Fortschritt bei Open-Source-Modellen. Die Kombination aus nativer Multimodalität, Agent-Orchestrierung und wettbewerbsfähigen Benchmark-Scores — zu einem Bruchteil der proprietären Preise — macht es zu einer ernsthaften Option für agentische Workflows.',
          })}
        </p>
        <p>{t({ en: "Just don't expect to run it on your laptop.", de: 'Nur nicht damit rechnen, es auf dem Laptop laufen zu lassen.' })}</p>

        <hr />

        <p><strong>{t({ en: 'Links:', de: 'Links:' })}</strong></p>
        <ul>
          <li><a href="https://huggingface.co/moonshotai/Kimi-K2.5">{t({ en: 'Kimi K2.5 on Hugging Face', de: 'Kimi K2.5 auf Hugging Face' })}</a></li>
          <li><a href="https://www.kimi.com/blog/kimi-k2-5.html">{t({ en: 'Official Technical Report', de: 'Offizieller Technical Report' })}</a></li>
          <li><a href="https://artificialanalysis.ai/models/kimi-k2-5">{t({ en: 'Artificial Analysis Profile', de: 'Artificial Analysis Profil' })}</a></li>
          <li><a href="https://platform.moonshot.ai">Kimi API</a></li>
        </ul>
      </article>
    </div>
  )
}
