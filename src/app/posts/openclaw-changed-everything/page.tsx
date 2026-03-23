'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { useState } from 'react'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('openclaw-changed-everything')!

/* ── Paradigm shift comparison ── */
const paradigms = [
  {
    old: { en: 'You go to the AI', de: 'Du gehst zur KI' },
    new_: { en: 'The AI lives where you already are', de: 'Die KI lebt dort, wo du schon bist' },
    detail: {
      en: 'Instead of opening a browser tab, you send a voice message. The agent is a permanent resident in your existing messaging stack.',
      de: 'Statt einen Browser-Tab zu öffnen, schickst du eine Sprachnachricht. Der Agent ist ein permanenter Bewohner deines bestehenden Messaging-Stacks.',
    },
  },
  {
    old: { en: 'Stateless — every session starts from zero', de: 'Stateless — jede Session startet bei null' },
    new_: { en: 'Persistent — it remembers what matters', de: 'Persistent — es merkt sich was wichtig ist' },
    detail: {
      en: 'Memory is just files. The agent reads and writes markdown. It curates what to keep long-term. You stop repeating yourself.',
      de: 'Memory sind einfach Dateien. Der Agent liest und schreibt Markdown. Er kuratiert was langfristig behalten wird. Du hörst auf, dich zu wiederholen.',
    },
  },
  {
    old: { en: 'You describe a task, it produces text', de: 'Du beschreibst eine Aufgabe, es produziert Text' },
    new_: { en: 'You describe an intent, it takes action', de: 'Du beschreibst eine Absicht, es handelt' },
    detail: {
      en: 'Shell access, cron scheduling, API calls, git commits — the gap between "describe" and "done" collapses.',
      de: 'Shell-Zugang, Cron-Scheduling, API-Calls, Git Commits — die Lücke zwischen „beschreiben" und „erledigt" kollabiert.',
    },
  },
  {
    old: { en: 'Capabilities defined by the developer', de: 'Fähigkeiten vom Entwickler definiert' },
    new_: { en: 'Capabilities defined at runtime — by you', de: 'Fähigkeiten zur Laufzeit definiert — von dir' },
    detail: {
      en: 'Tools are modular, addable, describable in plain language. You extend the agent the same way you use it: by talking to it.',
      de: 'Tools sind modular, hinzufügbar, in Klartext beschreibbar. Du erweiterst den Agent genauso wie du ihn nutzt: indem du mit ihm redest.',
    },
  },
  {
    old: { en: 'Security through code — rules, middleware, RBAC', de: 'Sicherheit durch Code — Regeln, Middleware, RBAC' },
    new_: { en: 'Security through prompt — intent, judgment, resistance', de: 'Sicherheit durch Prompt — Absicht, Urteilsvermögen, Resistenz' },
    detail: {
      en: 'The model reasons about intent. Prompt-hardened agents have proven more resilient to social engineering than most hand-rolled rule systems.',
      de: 'Das Modell analysiert die Absicht. Prompt-gehärtete Agents haben sich als widerstandsfähiger gegen Social Engineering erwiesen als die meisten manuell geschriebenen Regelsysteme.',
    },
  },
]

/* ── Tool anatomy ── */
const toolLayers = [
  {
    name: { en: 'Personality (soul file)', de: 'Persönlichkeit (Soul File)' },
    desc: {
      en: 'A markdown document. Name, style, values, how it talks, what it refuses. The agent reads this on every session.',
      de: 'Ein Markdown-Dokument. Name, Stil, Werte, wie es spricht, was es ablehnt. Der Agent liest das bei jeder Session.',
    },
    icon: '🧬',
    color: '#818cf8',
  },
  {
    name: { en: 'Memory (markdown files)', de: 'Memory (Markdown-Dateien)' },
    desc: {
      en: 'Daily notes, long-term summaries, per-contact context. Not a database — just files the agent reads and writes itself.',
      de: 'Tägliche Notizen, Langzeit-Zusammenfassungen, Kontext pro Kontakt. Keine Datenbank — einfach Dateien die der Agent selbst liest und schreibt.',
    },
    icon: '🧠',
    color: '#a78bfa',
  },
  {
    name: { en: 'Skills (instruction modules)', de: 'Skills (Instruktionsmodule)' },
    desc: {
      en: 'Domain-specific playbooks. How to handle GitHub, how to talk to a specific API, what to do when X happens. Composable, editable.',
      de: 'Domänenspezifische Playbooks. Wie man GitHub handhabt, wie man mit einer bestimmten API spricht, was zu tun ist wenn X passiert. Komponierbar, editierbar.',
    },
    icon: '📚',
    color: '#c4b5fd',
  },
  {
    name: { en: 'Tools (executable capabilities)', de: 'Tools (ausführbare Fähigkeiten)' },
    desc: {
      en: 'Shell, cron, browser, messaging, APIs. Each tool is a function the agent can call. You add new ones by describing them.',
      de: 'Shell, Cron, Browser, Messaging, APIs. Jedes Tool ist eine Funktion die der Agent aufrufen kann. Neue werden einfach durch Beschreibung hinzugefügt.',
    },
    icon: '🔧',
    color: '#ddd6fe',
  },
  {
    name: { en: 'Channel (where you talk to it)', de: 'Kanal (wo du mit ihm redest)' },
    desc: {
      en: 'Telegram, Signal, Discord, voice — whatever you already use. The agent lives there. You do not go to it.',
      de: 'Telegram, Signal, Discord, Voice — was auch immer du schon nutzt. Der Agent lebt dort. Du gehst nicht zu ihm.',
    },
    icon: '📱',
    color: '#ede9fe',
  },
]

/* ── Journey phases ── */
const phases = [
  {
    label: { en: 'Day 1', de: 'Tag 1' },
    title: { en: 'It feels like a chatbot', de: 'Es fühlt sich wie ein Chatbot an' },
    text: {
      en: 'You give it a system prompt, it answers questions. Useful. Unremarkable. You think you understand what it is.',
      de: 'Du gibst ihm einen System-Prompt, es beantwortet Fragen. Nützlich. Unspektakulär. Du denkst, du verstehst was es ist.',
    },
  },
  {
    label: { en: 'Week 1', de: 'Woche 1' },
    title: { en: 'It starts remembering things', de: 'Es fängt an, sich Dinge zu merken' },
    text: {
      en: 'You mentioned a project once. It brings it up unprompted three days later with the right context. Something shifts.',
      de: 'Du hast einmal ein Projekt erwähnt. Es bringt es drei Tage später von selbst mit dem richtigen Kontext auf. Etwas verändert sich.',
    },
  },
  {
    label: { en: 'Week 2', de: 'Woche 2' },
    title: { en: 'It does things while you sleep', de: 'Es erledigt Dinge während du schläfst' },
    text: {
      en: 'You set up a morning check. You wake up to a voice summary of what is broken. You wrote zero cron jobs.',
      de: 'Du richtest einen Morgen-Check ein. Du wachst mit einer Sprach-Zusammenfassung auf, was kaputt ist. Du hast null Cron-Jobs geschrieben.',
    },
  },
  {
    label: { en: 'Week 3', de: 'Woche 3' },
    title: { en: 'It builds its own extensions', de: 'Es baut seine eigenen Erweiterungen' },
    text: {
      en: 'You describe a new capability. It reads its own skill format, writes the file, and starts using it — same session.',
      de: 'Du beschreibst eine neue Fähigkeit. Es liest sein eigenes Skill-Format, schreibt die Datei und fängt an sie zu nutzen — gleiche Session.',
    },
  },
  {
    label: { en: 'Week 6', de: 'Woche 6' },
    title: { en: 'The unit of work has changed', de: 'Die Arbeitseinheit hat sich verändert' },
    text: {
      en: 'You no longer think in tasks. You think in intentions. The gap between "I want X" and "X is done" is mostly conversation.',
      de: 'Du denkst nicht mehr in Aufgaben. Du denkst in Absichten. Die Lücke zwischen „Ich will X" und „X ist erledigt" ist meistens Konversation.',
    },
  },
]

export default function PostPage() {
  const { t } = useLocale()
  const [activeParadigm, setActiveParadigm] = useState<number | null>(null)
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [activePhase, setActivePhase] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <time className="text-sm text-subtle">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-foreground mt-2">{post.title}</h1>
        <p className="mt-3 text-muted">{post.excerpt}</p>
      </header>

      <article className="prose">
        <p>
          {t({
            en: 'This is not a product review. It is about a way of working — a paradigm — that I stumbled into and that I cannot easily unstumble from. The specific tool does not matter much. What matters is the pattern.',
            de: 'Das ist kein Produkttest. Es geht um eine Arbeitsweise — ein Paradigma — in das ich hineingestolpert bin und aus dem ich nicht so leicht wieder herauskomme. Das spezifische Tool ist nicht so wichtig. Was zählt, ist das Muster.',
          })}
        </p>

        <p>
          {t({
            en: 'The pattern is this: ',
            de: 'Das Muster ist: ',
          })}
          <strong>{t({
            en: 'give a language model a shell, a persistent identity, a memory system, and modular tools — then let it roam.',
            de: 'Gib einem Sprachmodell eine Shell, eine persistente Identität, ein Memory-System und modulare Tools — dann lass es frei laufen.',
          })}</strong>
          {t({
            en: ' Do not put it behind a chat widget. Do not wrap it in a workflow builder. Let it live in your existing environment and act on your behalf between conversations.',
            de: ' Sperr es nicht hinter ein Chat-Widget. Pack es nicht in einen Workflow-Builder. Lass es in deiner bestehenden Umgebung leben und zwischen Gesprächen in deinem Namen handeln.',
          })}
        </p>

        <p>
          {t({
            en: 'Once you have done that, something changes that is hard to articulate until it happens to you.',
            de: 'Sobald du das getan hast, verändert sich etwas, das schwer zu beschreiben ist, bis es dir passiert.',
          })}
        </p>

        <h2>{t({ en: 'What \u201cfree-roaming\u201d actually means', de: 'Was „frei laufend" wirklich bedeutet' })}</h2>

        <p>
          {t({
            en: 'Most AI tooling is reactive. You open a tab, you type, it responds, you close the tab. The model is a function you call. Between calls, nothing happens.',
            de: 'Die meisten KI-Tools sind reaktiv. Du öffnest einen Tab, tippst, es antwortet, du schließt den Tab. Das Modell ist eine Funktion die du aufrufst. Zwischen den Aufrufen passiert nichts.',
          })}
        </p>

        <p>
          {t({
            en: 'A free-roaming agent is different. It wakes up on a schedule. It notices things. It follows through on things you mentioned last week. It has context that persists not because of a database schema someone designed, but because it reads and writes files the same way you would take notes.',
            de: 'Ein frei laufender Agent ist anders. Er wacht nach Zeitplan auf. Er bemerkt Dinge. Er verfolgt Sachen weiter, die du letzte Woche erwähnt hast. Er hat Kontext der bestehen bleibt — nicht wegen eines Datenbankschemas, sondern weil er Dateien liest und schreibt, so wie du Notizen machen würdest.',
          })}
        </p>

        <p>
          {t({
            en: 'This is not magic — it is just a model with a cron job and a folder of markdown files. But the behavioral difference is enormous.',
            de: 'Das ist keine Magie — es ist nur ein Modell mit einem Cron-Job und einem Ordner voller Markdown-Dateien. Aber der Verhaltensunterschied ist enorm.',
          })}
        </p>

        {/* Paradigm shifts */}
        <div className="not-prose my-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">{t({ en: 'Five shifts — tap each one', de: 'Fünf Paradigmenwechsel — tippe auf jeden' })}</p>
          {paradigms.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveParadigm(activeParadigm === i ? null : i)}
              className="w-full rounded-lg border border-border bg-surface-elevated p-4 text-left transition-all hover:border-indigo-500/40"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] text-subtle line-through">{t(p.old)}</span>
                    <span className="text-[9px] text-subtle">↓</span>
                    <span className="text-xs font-medium text-indigo-400">{t(p.new_)}</span>
                  </div>
                </div>
              </div>
              {activeParadigm === i && (
                <p className="mt-3 text-sm text-muted leading-relaxed border-t border-border pt-3">{t(p.detail)}</p>
              )}
            </button>
          ))}
        </div>

        <h2>{t({ en: 'The anatomy of the thing', de: 'Die Anatomie des Ganzen' })}</h2>

        <p>
          {t({
            en: 'Strip away any specific implementation and what you are left with is a stack of four or five layers. Each layer is editable. Each layer is described in plain text. That is the core of the paradigm.',
            de: 'Entferne jede spezifische Implementierung und was übrig bleibt ist ein Stack aus vier oder fünf Schichten. Jede Schicht ist editierbar. Jede Schicht wird in Klartext beschrieben. Das ist der Kern des Paradigmas.',
          })}
        </p>

        {/* Tool anatomy */}
        <div className="not-prose my-8 space-y-2">
          {toolLayers.map((layer, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
              className="w-full rounded-lg p-4 text-left transition-all"
              style={{
                backgroundColor: activeLayer === i ? layer.color + '18' : layer.color + '0a',
                borderLeft: `3px solid ${layer.color}`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{layer.icon}</span>
                <span className="text-sm font-medium text-foreground">{t(layer.name)}</span>
              </div>
              {activeLayer === i && (
                <p className="mt-2 text-xs text-muted leading-relaxed pl-8">{t(layer.desc)}</p>
              )}
            </button>
          ))}
        </div>

        <p>
          {t({
            en: 'The key thing about this stack: ',
            de: 'Das Entscheidende an diesem Stack: ',
          })}
          <strong>{t({
            en: 'you extend it the same way you use it.',
            de: 'du erweiterst ihn genauso wie du ihn nutzt.',
          })}</strong>
          {t({
            en: ' Want to add a new capability? Describe it. The agent reads its own skill format, writes the file, and starts using it. The interface for configuring the system is identical to the interface for using the system.',
            de: ' Neue Fähigkeit hinzufügen? Beschreib sie. Der Agent liest sein eigenes Skill-Format, schreibt die Datei und fängt an sie zu nutzen. Die Schnittstelle zur Konfiguration des Systems ist identisch mit der Schnittstelle zur Nutzung des Systems.',
          })}
        </p>

        <h2>{t({ en: 'The security thing no one expects', de: 'Die Sicherheitssache, die niemand erwartet' })}</h2>

        <p>
          {t({
            en: 'Giving an AI shell access on a production server sounds irresponsible. And maybe it is. But here is what I found when I tested it seriously: prompt-hardened agents are more resistant to social engineering than most rule-based systems.',
            de: 'Einer KI Shell-Zugang auf einem Produktionsserver zu geben klingt unverantwortlich. Und vielleicht ist es das. Aber hier ist was ich herausgefunden habe, als ich es ernsthaft getestet habe: Prompt-gehärtete Agents sind widerstandsfähiger gegen Social Engineering als die meisten regelbasierten Systeme.',
          })}
        </p>

        <p>
          {t({
            en: 'I ran an informal red team. Five technically competent people, trying everything — prompt injection, persona replacement, fake authority claims, roleplay framings designed to slip past filters. None of them got through. Not because of middleware. Because the model reasoned about intent and found the attempts implausible given the context it had built up over weeks of legitimate interaction.',
            de: 'Ich habe ein informelles Red Team durchgeführt. Fünf technisch kompetente Leute, die alles versucht haben — Prompt Injection, Persona-Ersetzung, gefälschte Autoritätsansprüche, Roleplay-Framings die darauf ausgelegt waren, an Filtern vorbeizukommen. Keiner kam durch. Nicht wegen Middleware. Weil das Modell die Absicht analysiert hat und die Versuche für unplausibel hielt — basierend auf dem Kontext, den es über Wochen legitimer Interaktion aufgebaut hatte.',
          })}
        </p>

        <p>
          {t({
            en: 'The frontier models have been trained on exactly these attack patterns. A rule system can be circumvented by finding the edge case it does not cover. A model that reasons about intent does not have clean edges to exploit in the same way.',
            de: 'Die Frontier-Modelle wurden genau auf diese Angriffsmuster trainiert. Ein Regelsystem kann umgangen werden, indem man den Edge Case findet, den es nicht abdeckt. Ein Modell das über Absichten nachdenkt hat keine sauberen Kanten, die auf die gleiche Weise ausgenutzt werden können.',
          })}
        </p>

        <p>
          {t({
            en: 'This is still a bet, not a proof. But it is a more interesting bet than I expected.',
            de: 'Das ist noch eine Wette, kein Beweis. Aber es ist eine interessantere Wette als ich erwartet hatte.',
          })}
        </p>

        <h2>{t({ en: 'How it changes — click each phase', de: 'Wie es sich verändert — klick auf jede Phase' })}</h2>

        {/* Journey phases */}
        <div className="not-prose my-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {phases.map((phase, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(activePhase === i ? null : i)}
                className={`shrink-0 rounded-lg border px-4 py-2 text-xs font-medium transition-all
                  ${activePhase === i
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                    : 'border-border bg-surface-elevated text-muted hover:border-indigo-500/40'
                  }`}
              >
                {t(phase.label)}
              </button>
            ))}
          </div>
          {activePhase !== null && (
            <div className="mt-4 rounded-xl border border-border bg-surface-elevated p-5">
              <h3 className="text-sm font-semibold text-foreground">{t(phases[activePhase].title)}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{t(phases[activePhase].text)}</p>
            </div>
          )}
        </div>

        <h2>{t({ en: 'The thing that compounds', de: 'Was sich aufbaut' })}</h2>

        <p>
          {t({
            en: 'The reason this paradigm is hard to go back from is compounding. Every week the agent gets slightly better at working with you specifically — because its memory files accumulate context specific to your projects, your contacts, your preferred way of communicating.',
            de: 'Der Grund warum man von diesem Paradigma schwer zurückgeht ist der Compounding-Effekt. Jede Woche wird der Agent etwas besser darin, speziell mit dir zu arbeiten — weil seine Memory-Dateien Kontext ansammeln, der spezifisch für deine Projekte, deine Kontakte und deine bevorzugte Kommunikationsweise ist.',
          })}
        </p>

        <p>
          {t({
            en: 'A generic chatbot that you use intermittently stays flat. An agent that runs persistently, builds memory, and evolves its toolset grows with you. The gap between the two widens every week.',
            de: 'Ein generischer Chatbot den du gelegentlich nutzt bleibt flach. Ein Agent der persistent läuft, Memory aufbaut und sein Toolset weiterentwickelt wächst mit dir. Der Abstand zwischen beiden wird jede Woche größer.',
          })}
        </p>

        <h2>{t({ en: 'What is still missing', de: 'Was noch fehlt' })}</h2>

        <p>
          {t({
            en: 'The honest answer: observability. When an agent runs autonomously — checking things, spawning sub-agents, executing tasks while you sleep — you lose the ability to easily see what happened and why. The output lands in your messages. The reasoning stays invisible.',
            de: 'Die ehrliche Antwort: Observability. Wenn ein Agent autonom läuft — Dinge überprüft, Sub-Agents spawnt, Aufgaben ausführt während du schläfst — verlierst du die Fähigkeit, einfach zu sehen was passiert ist und warum. Die Ausgabe landet in deinen Nachrichten. Das Reasoning bleibt unsichtbar.',
          })}
        </p>

        <p>
          {t({
            en: 'What I want: activity dashboards, cost tracking, a timeline of what ran and what it decided. Not to control the agent more tightly — but to build the kind of trust that lets you give it more autonomy with confidence. Visibility and autonomy are not opposites. They are prerequisites for each other.',
            de: 'Was ich will: Activity-Dashboards, Kosten-Tracking, eine Timeline was gelaufen ist und was es entschieden hat. Nicht um den Agent strenger zu kontrollieren — sondern um das Vertrauen aufzubauen, das es einem erlaubt, ihm mit Zuversicht mehr Autonomie zu geben. Sichtbarkeit und Autonomie sind keine Gegensätze. Sie sind Voraussetzungen füreinander.',
          })}
        </p>

        <h2>{t({ en: 'Should you do this?', de: 'Solltest du das machen?' })}</h2>

        <p>
          {t({
            en: 'If you are comfortable with a terminal, yes. The setup is an afternoon. The payoff is ongoing. Start small — one channel, one skill, one scheduled check. Let the memory accumulate. Add tools as you need them.',
            de: 'Wenn du mit einem Terminal zurechtkommst, ja. Das Setup ist ein Nachmittag. Der Nutzen ist fortlaufend. Fang klein an — ein Kanal, ein Skill, ein geplanter Check. Lass das Memory sich aufbauen. Füg Tools hinzu wenn du sie brauchst.',
          })}
        </p>

        <p>
          {t({
            en: 'The specific implementation does not matter as much as you might think. What matters is the pattern: a persistent identity, a memory system, modular tools, and the channel already open in your pocket. Once those four things are in place, the agent stops feeling like software you use and starts feeling like infrastructure you run.',
            de: 'Die spezifische Implementierung ist nicht so wichtig wie man denken könnte. Was zählt ist das Muster: eine persistente Identität, ein Memory-System, modulare Tools und der Kanal, der schon in deiner Tasche offen ist. Sobald diese vier Dinge stehen, fühlt sich der Agent nicht mehr wie Software an die du benutzt, sondern wie Infrastruktur die du betreibst.',
          })}
        </p>

        <p>
          {t({
            en: 'That is the shift. It is smaller than it sounds, and larger than it seems.',
            de: 'Das ist der Paradigmenwechsel. Er ist kleiner als er klingt und größer als er scheint.',
          })}
        </p>

        <hr />

        <p className="text-subtle text-sm">
          {t({
            en: 'The setup described here is running on ',
            de: 'Das beschriebene Setup läuft auf ',
          })}
          <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">OpenClaw</a>
          {t({
            en: ', an open-source personal AI gateway. Community at ',
            de: ', einem Open-Source Personal-AI-Gateway. Community auf ',
          })}
          <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer">discord.gg/clawd</a>.
          {t({
            en: ' But the pattern works with any framework that gives a model persistent memory, real tools, and a channel.',
            de: ' Aber das Muster funktioniert mit jedem Framework, das einem Modell persistentes Memory, echte Tools und einen Kanal gibt.',
          })}
        </p>
      </article>
    </div>
  )
}
