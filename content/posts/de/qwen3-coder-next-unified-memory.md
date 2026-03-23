---
title: "Qwen3-Coder-Next: Der lokale Coding-Agent, der endlich passt"
date: 2026-02-04
excerpt: 80B Parameter, 3B aktiv. Qwens neues Coding-Modell ist für Unified-Memory-Systeme wie Strix Halo, DGX Spark und M4 Macs konzipiert.
category: analysis
---

Alibabas Qwen-Team hat [Qwen3-Coder-Next](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct) am 3. Februar veröffentlicht. Es ist ein 80B-Parameter-Modell, das nur 3B Parameter pro Token aktiviert -- und damit das erste ernsthafte Coding-Agent-Modell, das für den lokalen Betrieb auf Unified-Memory-Hardware konzipiert ist.

Das Timing ist kein Zufall. Strix Halo Mini-PCs werden ausgeliefert, NVIDIAs DGX Spark kommt auf den Markt, und M4 Max Mac Studios sind seit Monaten verfügbar. Alle haben 128GB Unified Memory. Qwen3-Coder-Next ist das Modell, das diese Hardware für echte Coding-Arbeit nutzbar macht.

## Die Architektur

<table>
<thead><tr><th>Spezifikation</th><th>Wert</th></tr></thead>
<tbody>
<tr><td>Gesamtparameter</td><td>80B</td></tr>
<tr><td>Aktive Parameter</td><td>3B (pro Token)</td></tr>
<tr><td>Experten</td><td>512 gesamt, 10 aktiv + 1 geteilt</td></tr>
<tr><td>Schichten</td><td>48</td></tr>
<tr><td>Context Window</td><td>262K nativ, 1M mit YaRN</td></tr>
<tr><td>Attention</td><td>Hybrid: Gated DeltaNet + Gated Attention</td></tr>
<tr><td>Lizenz</td><td>Apache 2.0</td></tr>
</tbody>
</table>

Die Schlüsselinnovation ist der hybride Attention-Mechanismus. Anstatt überall Standard-Self-Attention zu verwenden, wechselt Qwen3-Next zwischen Gated DeltaNet (einer linearen Attention-Variante) und Standard Gated Attention in einem wiederkehrenden 3:1-Muster. Das macht den 262K nativen Kontext auf Consumer-Hardware praktikabel -- lineare Attention hat nicht das quadratische Speicher-Skalierungsproblem.

Multi-Token Prediction (MTP) beschleunigt die Inferenz zusätzlich, indem mehrere Tokens gleichzeitig vorhergesagt werden, was die Anzahl der nötigen Forward Passes reduziert.

## Benchmarks

Für ein Modell mit nur 3B aktiven Parametern sind die Zahlen schwer zu glauben:

<table>
<thead><tr><th>Benchmark</th><th>Qwen3-Coder-Next (80B/3B)</th><th>DeepSeek-V3.2 (671B)</th><th>Qwen3-235B</th></tr></thead>
<tbody>
<tr><td>SWE-Bench Verified</td><td><strong>70,6</strong></td><td>70,2</td><td>--</td></tr>
<tr><td>SWE-Bench Multilingual</td><td><strong>62,8</strong></td><td>--</td><td>--</td></tr>
<tr><td>LiveCodeBench</td><td><strong>56,6</strong></td><td>--</td><td>51,8</td></tr>
<tr><td>MMLU-Pro</td><td>80,6</td><td>--</td><td><strong>83,0</strong></td></tr>
<tr><td>Arena-Hard v2</td><td><strong>82,7</strong></td><td>--</td><td>79,2</td></tr>
</tbody>
</table>

Es erreicht DeepSeek-V3.2 auf SWE-Bench Verified mit **224x weniger aktiven Parametern**. Auf LiveCodeBench und Arena-Hard übertrifft es Qwen3-235B. Die Trainingskosten lagen Berichten zufolge bei 10% von Qwen3-32B, mit 10x Inferenz-Durchsatz bei Kontexten über 32K Tokens.

## Warum Unified Memory wichtig ist

Traditionelle diskrete GPUs sind bei 24GB VRAM (Consumer) oder 48-80GB (Professional) gedeckelt. Ein 80B-Modell passt unabhängig von der Quantisierung nicht in 24GB. Unified Memory ändert die Gleichung komplett -- CPU und GPU teilen sich einen einzelnen Speicherpool, und diese neuen Systeme haben 128GB davon.

Bei Q4-Quantisierung benötigt Qwen3-Coder-Next ungefähr **46GB** Speicher. Das lässt 80GB frei für Kontext, OS-Overhead und andere Prozesse auf einem 128GB-System. Bei Q8 werden etwa 85GB benötigt -- immer noch machbar.

### Die Hardware

Drei Plattformen machen das heute praktikabel:

**AMD Strix Halo (Ryzen AI Max+ 395)**
- 128GB Unified Memory, 256 GB/s Bandbreite
- MoE-Modelle sind ihr Sweet Spot -- 52 tok/s mit Qwen3-30B-A3B in Tests
- ROCm-Stack verbessert sich, aber noch hinter CUDA beim Ökosystem
- Bestes Preis-Leistungs-Verhältnis bei ungefähr dem halben DGX-Spark-Preis
- `llama-server` mit `-fa 1 --no-mmap` Flags verwenden, sonst bricht die Leistung ein

**NVIDIA DGX Spark (Grace Blackwell GB10)**
- 128GB Unified Memory, 273 GB/s Bandbreite
- Prompt Processing ist dramatisch schneller: 1.723 tok/s vs. Strix Halos 339 tok/s für initiale Kontextverarbeitung
- CUDA-Ökosystem, vorkonfigurierte KI-Umgebung out of the box
- Ungefähr 2x der Preis von Strix Halo
- Besser für Workflows mit sowohl LLMs als auch Bildgenerierung

**Apple Mac Studio (M4 Max)**
- 128GB Unified Memory, **546 GB/s Bandbreite** -- das Doppelte der Konkurrenz
- Beste reine Speicherbandbreite für Token-Generierung
- Ausgereifter `llama.cpp` Metal Support
- Das polierteste Gesamterlebnis, aber Apple Silicon hat eingeschränkten Fine-Tuning-Support

### Bandbreite ist der Engpass

Für autoregressive Token-Generierung ist Speicherbandbreite der limitierende Faktor -- nicht Rechenleistung. Jeder Token erfordert das Lesen der aktiven Modellgewichte aus dem Speicher. Mit 3B aktiven Parametern bei Q4 sind das ungefähr 1,5GB pro Token. Bei 256 GB/s (Strix Halo) liegt der theoretische Peak bei ~170 tok/s. Bei 546 GB/s (M4 Max) bei ~364 tok/s.

In der Praxis erreicht man diese Peaks nicht, aber der 2x-Bandbreitenvorteil des M4 Max gegenüber Strix Halo und DGX Spark übersetzt sich direkt in schnellere Token-Generierung für MoE-Modelle.

## Anwendungsfälle

### Always-On Coding Agent

Der wahre Wert von Qwen3-Coder-Next lokal sind nicht die eingesparten API-Kosten -- es ist Latenz und Verfügbarkeit. Ein lokales Modell hat null Netzwerk-Roundtrip, keine Rate Limits und keine Ausfallzeiten. Für agentische Coding-Workflows mit Hunderten von Tool Calls pro Session summieren sich die eingesparten API-Latenzen zu massiven Zeitersparnissen.

Mit 262K nativem Kontext und 3B aktiven Parametern kann man eine gesamte Codebase im Kontext halten und gleichzeitig schnelle Token-Generierung beibehalten. Das ist der "Claude Code, aber lokal"-Anwendungsfall.

### Private Codebases

Wenn du an proprietärem Code arbeitest, der deine Maschine nicht verlassen darf, ist lokale Inferenz die einzige Option. Qwen3-Coder-Nexts SWE-Bench-Scores machen es zum ersten lokalen Modell, das wirklich mit Cloud-API-Modellen bei echten Coding-Aufgaben konkurrieren kann.

### Fine-Tuning für deinen Stack

Die Apache 2.0 Lizenz ermöglicht Fine-Tuning. LoRA Fine-Tuning auf Strix Halo oder Mac Studio ist mit 128GB Unified Memory praktikabel. Trainiere es auf deiner Firmen-Codebase, deinen Coding-Standards und internen APIs. Das schafft einen Coding-Assistenten, der deinen Stack in einer Weise versteht, wie es kein generelles Modell kann.

### Offline-Entwicklung

Flüge, Züge, Cafes mit schlechtem WLAN. Mit einem Strix Halo Mini-PC oder einem MacBook Pro (M4 Max, 128GB) hast du einen SWE-Bench-kompetitiven Coding-Agenten, der überall funktioniert.

## Der Haken

Qwen3-Coder-Next läuft nur im Non-Thinking-Modus -- keine Chain-of-Thought-Reasoning-Blöcke. Das macht es schnell, bedeutet aber, dass es nicht über komplexe Architekturentscheidungen deliberiert, wie es ein Thinking-Modell tun würde. Für alltägliche Coding-Aufgaben, Completions, Refactoring und Bugfixes ist das kein Problem. Für neuartiges Algorithmendesign oder komplexe Systemarchitektur braucht man weiterhin ein Thinking-Modell.

Die 3B aktiven Parameter bedeuten auch, dass es etwas Rohleistung gegen Effizienz eintauscht. Auf MMLU-Pro (80,6 vs. 83,0) liegt es hinter dem vollen Qwen3-235B. Bei coding-spezifischen Aufgaben verschwindet der Abstand oder kehrt sich um.

## Fazit

Qwen3-Coder-Next ist das erste Modell, bei dem "lokal laufen" kein Kompromiss ist -- es ist ein echter Vorteil. Die MoE-Architektur wurde genau für die Art von Hardware konzipiert, die jetzt in Desktop-Formfaktoren verfügbar ist. Wenn du ein 128GB Unified-Memory-System hast, ist dies das Coding-Modell, das du darauf laufen lassen solltest.

---

*Modell: [Qwen3-Next-80B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct) / [Qwen3-Coder-Next](https://www.marktechpost.com/2026/02/03/qwen-team-releases-qwen3-coder-next-an-open-weight-language-model-designed-specifically-for-coding-agents-and-local-development/). Hardware-Vergleiche basierend auf [StarryHope](https://www.starryhope.com/minipcs/strix-halo-local-llm-inference-2026/) und [Remio](https://www.remio.ai/post/nvidia-dgx-spark-vs-amd-strix-halo-the-128gb-local-ai-showdown).*
