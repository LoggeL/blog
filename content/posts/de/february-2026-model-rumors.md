---
title: "Februar 2026: Modelle im Blick"
date: 2026-02-07
excerpt: Gerüchte, bestätigte Releases, Abschaltungen und worauf man diesen Monat in der KI-Welt achten sollte.
category: news
---

Der Januar war von chinesischen Laboren dominiert -- Kimi K2.5, Qwen3-Max-Thinking, GLM-4.7-Flash -- alle lieferten, während westliche Labore vergleichsweise ruhig waren. Der Februar sieht anders aus. Hier ist, was gerüchtet, bestätigt und beobachtenswert ist.

## Jetzt bestätigt

### Anthropic -- Claude Opus 4.6 (6. Feb 2026)

Anthropic hat Claude Opus 4.6 am 6. Februar als großes Upgrade der Opus-Reihe veröffentlicht. Es ist in der API als `claude-opus-4-6` verfügbar und löst Opus 4.5 von Ende 2025 ab. Das klärt auch die Reihenfolge: Sonnet 5 ("Fennec") wurde vielfach zuerst erwartet, aber Opus 4.6 kam ihm zuvor.

### Anthropic -- Claude Sonnet 4.6 (17. Feb 2026)

Nur 11 Tage nach Opus 4.6 brachte Anthropic Claude Sonnet 4.6 heraus -- und es ist wohl das bedeutendere Release. Verfügbar als `claude-sonnet-4-6` zum gleichen Sonnet-Preis ($3/$15 pro Million Tokens) liefert es nahezu Opus-Leistung auf ganzer Linie:

- **SWE-bench Verified**: 79,6% (vs Opus 4.6 80,8%, GPT-5.2 80,0%)
- **OSWorld-Verified (Computer Use)**: 72,5% -- fast 5x mehr als die 14,9% beim Computer-Use-Launch im Okt 2024, praktisch gleichauf mit Opus 4.6 (72,7%)
- **GDPval-AA Elo (Büroaufgaben)**: 1633 -- *übertrifft* Opus 4.6 mit 1606
- **Finance Agent v1.1**: 63,3% -- schlägt jedes Modell, einschließlich Opus 4.6

Das Context Window verdoppelt sich auf **1M Tokens** (Beta), wie bei Opus. Claude-Code-Nutzer bevorzugten Sonnet 4.6 gegenüber Sonnet 4.5 zu etwa 70% und sogar gegenüber Opus 4.5 zu 59%. Es ist jetzt das Standardmodell auf claude.ai und im Free Tier.

Die eigentliche Story: Leistung, die zuvor ein $15/$75 Opus-Modell erforderte, ist jetzt für $3/$15 verfügbar. Für Unternehmen mit Millionen agentischer API-Aufrufe pro Tag ist das eine transformative Kostenrechnung.

### OpenAI -- GPT-5.3 Codex (Feb 2026)

OpenAI hat GPT-5.3 Codex im Februar veröffentlicht, die nächste Coding-fokussierte Iteration nach GPT-5.2 Codex. Es ist über Codex CLI mit ChatGPT Plus OAuth verfügbar und bietet einen Full-Auto-Modus für sandboxed autonome Coding-Workflows.

## Bestätigt

### OpenAI stellt GPT-4o, GPT-4.1, o4-mini und GPT-5-Varianten ein (13. Feb)

OpenAI erzwingt die Migration auf GPT-5.2. Am 13. Februar werden GPT-4o, GPT-4.1, o4-mini und frühere GPT-5-Varianten abgeschaltet. Wer noch API-Calls an eines dieser Modelle pinnt, hat Tage zum Migrieren. GPT-5.2 Codex wurde ebenfalls im Januar für den Coding-fokussierten Tier ausgeliefert.

### StepFun -- Step-3.5-Flash (2. Feb)

StepFun hat leise Step-3.5-Flash am 2. Februar veröffentlicht. Ein weiteres chinesisches Labor, eine weitere "Flash"-Variante optimiert für Geschwindigkeit. Das Muster leichtgewichtiger, schneller Inferenz-Modelle aus chinesischen Laboren setzt sich fort.

## Hohe Wahrscheinlichkeit

### Anthropic -- Claude Sonnet 5 ("Fennec")

Update (17. Feb): Da nun sowohl Opus 4.6 (6. Feb) als auch Sonnet 4.6 (17. Feb) erschienen sind, ist der Sonnet 5 / "Fennec"-Zeitplan zunehmend unsicher. Anthropic hat in 11 Tagen zwei große Releases geliefert -- eine beispiellose Kadenz -- und Sonnet 4.6 dringt bereits in Regionen vor, die zuvor nur Opus vorbehalten waren.

Der Vertex AI Leak (`claude-sonnet-5@20260203`) ist nach wie vor real, und der Codename "Fennec" wurde [vielfach berichtet](https://www.marc0.dev/en/blog/claude-sonnet-5-fennec-leak-what-the-vertex-ai-logs-actually-show-1770048662320). Aber das Datum vom 3. Februar in der Model-ID ist ohne Launch verstrichen. Eine [Prediction-Market-Analyse](https://mlq.ai/prediction/brief/ai/claude-sonnet-5-launch-reshapes-ai-model-leadershipanthropic-dominates-february--2026-02-15/) behauptet, Fennec sei am 3. Feb mit 82,1% SWE-bench gelauncht -- aber es gibt keine offizielle Anthropic-Ankündigung, und das widerspricht dem heutigen Sonnet 4.6 Launch.

**Kommt Sonnet 5 noch im Februar?** Unwahrscheinlich zu diesem Zeitpunkt. Anthropic hat gerade ihr Februar-Release-Momentum für Sonnet 4.6 verbraucht und wird dessen Launch-Fenster nicht kannibalisieren wollen. Wahrscheinlichere Szenarien:
- **März 2026**: Fennec erscheint als echtes Next-Gen-Sonnet, überholt 4.6 mit gemunkeltem 128K+ nativem Kontext und SWE-bench-Scores im Bereich 83-87%
- **Rebranding**: Sonnet 4.6s dramatischer Leistungssprung könnte Teile dessen absorbiert haben, was für Fennec geplant war, und die "5"-Bezeichnung wird für einen größeren Architekturwechsel reserviert

Das vollständige Opus-Klasse Claude 5 liegt weiter entfernt -- wahrscheinlich Q2-Q3.

### DeepSeek V4 (~17. Feb)

Der große Wurf aus China. [The Information](https://www.theinformation.com/articles/bytedance-alibaba-launch-new-models-race-ai-supremacy-china) berichtet, dass DeepSeek Mitte Februar anpeilt, wahrscheinlich um den 17. Februar -- passend zum Mondneujahr, dieselbe Strategie wie beim R1-Launch im Januar 2025.

Was wir wissen:
- **Engram Memory**: Ein konditionales Gedächtnissystem (Paper veröffentlicht am 13. Jan), das effizientes Retrieval aus Kontexten über 1M Tokens ermöglicht. Das bedeutet: ganze Codebases in einem Durchgang verarbeiten.
- **mHC-Architektur**: Ein neues Framework, mitentwickelt von Gründer Liang Wenfeng, das "aggressive Parametererweiterung" ermöglicht, indem GPU-Speicherbeschränkungen umgangen werden. Veröffentlicht am 1. Januar.
- **Coding-Fokus**: Geleakte interne Benchmarks behaupten, V4 übertreffe Claude und die GPT-5-Serie auf SWE-bench. Unbestätigt, aber DeepSeek hat eine Erfolgsbilanz bei der Einlösung ambitionierter Versprechen.
- **Hardware-Zugänglichkeit**: Die MoE-Architektur soll es ermöglichen, mit zwei RTX 4090s oder einer einzelnen RTX 5090 "GPT-5-Klasse"-Leistung lokal zu erzielen. Kurz nach Launch ist eine "V4-Lite"- oder "Coder-33B"-Variante für einzelne Consumer-GPUs zu erwarten.
- **Open Source erwartet**: DeepSeek hat Flagship-Modelle konsequent unter permissiven Lizenzen open-sourced. Bei V4 wird dasselbe erwartet.

GitHub-Updates enthüllten eine neue Architektur-Kennung "MODEL1", die weithin als V4s technisches Fundament interpretiert wird. Wenn die Leistungsversprechen halten, ist dies das Release, das am ehesten die Märkte bewegen wird -- R1 löste letztes Jahr einen [$1-Billionen-Einbruch im Techsektor](https://gigazine.net/gsc_news/en/20260114-deepseek-next-flagship-ai-model-v4/) aus.

### Alibaba -- Qwen 3.5 (~Mitte Feb)

Alibaba bereitet [Qwen 3.5](https://www.digitimes.com/news/a20260203VL204/bytedance-alibaba-flagship-competition-qwen.html) vor, optimiert für komplexes Reasoning, Mathematik und Coding. Dies folgt auf die Schnellfeuer-Qwen3-Serie, die den Januar dominierte (Qwen3-Max-Thinking setzte sich bei "Humanity's Last Exam" an die Spitze, Qwen3-Coder-Next erreichte DeepSeek-V3.2-Niveau auf SWE-bench mit nur 3B aktiven Parametern).

Das Timing ist Mondneujahr -- dasselbe Fenster wie bei DeepSeek. Alibaba hat kürzlich Qwen mit seinen E-Commerce-Plattformen, Reisediensten und Ant Group Payments verbunden und positioniert den Chatbot als umfassenden Lebensassistenten mit über 100M monatlich aktiven Nutzern. Qwen 3.5 dürfte den nächsten Schritt antreiben.

### ByteDance -- Doubao 2.0, Seeddream 5.0, Seeddance 2.0 (~Mitte Feb)

ByteDance geht mit [drei simultanen Launches](https://pandaily.com/byte-dance-and-alibaba-may-launch-new-ai-models-in-mid-february) in die Breite:
- **Doubao 2.0**: Next-Gen LLM hinter dem Doubao-Chatbot (163M monatlich aktive Nutzer per Dezember, integriert in Douyin/TikTok China)
- **Seeddream 5.0**: Bildgenerierungsmodell
- **Seeddance 2.0**: Videogenerierungsmodell

ByteDance führt Chinas Consumer-KI-Markt nach Nutzerzahlen an. Der multimodale Dreifach-Launch deutet darauf hin, dass sie auf eine integrierte Text-Bild-Video-Pipeline setzen, statt auf dem LLM-Benchmark-Feld zu konkurrieren.

### Zhipu AI -- GLM-5 (Zeitplan unklar, wahrscheinlich Q1)

Zhipu AIs Gründer Tang Jie [kündigte GLM-5](https://news.futunn.com/en/post/67090241/zhipu-was-listed-today-and-tang-jie-s-internal-letter) in einem internen Brief am Tag des Börsengangs (8. Januar) an und versprach, es werde "bald enthüllt" mit "weiterer Skalierung und zahlreichen innovativen technischen Verbesserungen." Drei genannte technische Richtungen: neuartiges Architekturdesign, ein universelleres RL-Paradigma und kontinuierliches Lernen mit autonomer Evolution.

Kontext: GLM-4.7 erzielte bereits 84,9% auf LiveCodeBench (besser als Claude Sonnet 4.5) und 73,8% auf SWE-bench Verified -- höchste Werte unter Open-Source-Modellen zu dem Zeitpunkt. GLM-4.7-Flash erschien am 19. Januar mit einem 30B MoE / ~3B aktiven Design. GLM-5 sollte ein deutlicher Sprung nach vorn sein.

Zhipu veröffentlichte im Januar auch [GLM-Image](https://www.theregister.com/2026/01/15/zhipu_glm_image_huawei_hardware/) -- bemerkenswert, weil es vollständig auf Huawei Ascend Hardware trainiert wurde, was die Machbarkeit eines komplett chinesischen KI-Stacks unabhängig von NVIDIA belegt.

## Beobachtenswert

### GLM/Zhipu -- "Pony Alpha" Stealth Model auf OpenRouter (7. Feb)

Ein neues Stealth-Modell namens **"Pony Alpha"** tauchte am 7. Februar auf [OpenRouter](https://openrouter.ai/) auf -- kostenlos nutzbar, 200K Context Window, optimiert für Geschwindigkeit und Reasoning mit Fokus auf agentische und Coding-Workflows. Das Labor dahinter ist nicht offiziell benannt, aber die Beschreibung -- "eine spezialisierte Evolution eines der beliebtesten Open-Source-Modelle eines globalen Labors" -- deutet stark auf **GLM/Zhipu AI** hin.

Das passt: GLM-4.7 führt bereits die Open-Source-Modelle bei Coding-Benchmarks an, und Zhipu hat [schnell iteriert](https://news.futunn.com/en/post/67090241/zhipu-was-listed-today-and-tang-jie-s-internal-letter). Ein Stealth-Launch auf OpenRouter würde ihnen ermöglichen, Real-World-Feedback vor der GLM-5-Ankündigung zu sammeln. Der 200K-Kontext und die agentische Spezialisierung passen zur Richtung "kontinuierliches Lernen mit autonomer Evolution", die Tang Jie skizzierte.

Quellen: [Kilo AI](https://blog.kilo.ai/p/announcing-a-deep-thinking-new-stealth), [TipRanks](https://www.tipranks.com/news/private-companies/openrouter-highlights-new-free-stealth-ai-model-aimed-at-agentic-workflows)

### Meta -- "Avocado"

Metas KI-Einheit testet ein Frontier-Modell mit dem Codenamen "Avocado" als Nachfolger der Llama-Reihe. Mit Metas geplantem KI-Capex von $115-135 Mrd. für 2026 ist dies ihr bisher ambitioniertestes Modell. Ein Februar-Release ist möglich, aber unbestätigt -- könnte sich in den März verschieben.

### Anthropic Labs Division

Anthropic hat eine "Labs"-Abteilung unter der Leitung von Mike Krieger (Instagram-Mitgründer) gestartet. Noch keine Produktankündigungen, aber die Gründung dieses Teams deutet auf kommende verbraucherorientierte KI-Produkte hin. Lohnt sich, diesen Monat auf Ankündigungen zu achten.

### Apple x Google -- Siri + Gemini

Apple und Google haben einen Mehrjahresvertrag angekündigt, um die nächste Siri-Generation mit Googles 1,2T Parameter Gemini-Modell auf Apples Private Cloud Compute zu betreiben. Der Zeitplan für den Consumer-Rollout ist "dieses Jahr" -- Developer Previews oder API-Details im Februar wären bedeutsam.

## Das große Bild

Die Geschichte des Februar 2026 ist Konsolidierung und Beschleunigung:

- **Chinesische Labore koordinieren eine Mondneujahr-Offensive.** DeepSeek V4, Qwen 3.5, Doubao 2.0 und möglicherweise GLM-5 -- alle zielen auf dasselbe Fenster Mitte Februar. Das ist kein Zufall; das Feiertags-Publikum ist ein strategisches Launch-Fenster, und jedes Labor will das Narrativ definieren, bevor die anderen es tun.
- **OpenAI räumt auf.** Vier Modellfamilien gleichzeitig einzustellen ist aggressiv. Sie setzen alles auf die GPT-5.2-Linie.
- **Anthropic ist überfällig.** Claude Opus 4.5 erschien Ende 2025. Ein Sonnet 5 Release würde die Wettbewerbsposition gegenüber GPT-5.2 und der chinesischen Frontier wiederherstellen.
- **MCP ist der Standard.** Anthropics Model Context Protocol erreichte 97M monatliche SDK-Downloads. Welche Modelle auch im Februar erscheinen, MCP-Kompatibilität ist Pflicht für agentische Anwendungsfälle.

---

*Ursprünglich veröffentlicht am 4. Februar 2026. Aktualisiert am 7. Februar mit bestätigten Releases (Claude Opus 4.6, GPT-5.3 Codex) und GLM/Zhipus "Pony Alpha" Stealth Model auf OpenRouter. Aktualisiert am 17. Februar mit dem Claude Sonnet 4.6 Release und überarbeiteter Sonnet 5 "Fennec" Zeitplan-Analyse. Analysen zu Gerüchten bleiben auf das ursprüngliche Veröffentlichungsdatum datiert, sofern nicht anders vermerkt.*
