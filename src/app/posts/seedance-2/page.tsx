'use client'

import Link from 'next/link'
import { BackLink } from '@/components/BackLink'
import { getTsxPostMeta, formatPostDate } from '@/lib/post-meta'
import { useLocale } from '@/lib/i18n'

const post = getTsxPostMeta('seedance-2')!

/* ── Video Component ── */

function Video({ src, caption, portrait }: { src: string; caption: string; portrait?: boolean }) {
  return (
    <figure className="my-8 not-prose flex flex-col items-center">
      <div style={{ width: '100%', maxWidth: portrait ? '300px' : '720px' }}>
        <video
          src={src}
          controls
          autoPlay
          muted
          loop
          playsInline
          style={{ aspectRatio: portrait ? '9/16' : '16/9' }}
          className="w-full rounded-xl border border-border shadow-lg"
        />
        <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>
      </div>
    </figure>
  )
}

/* ── Side-by-Side Videos ── */

function VideoCompare({ left, right, captionLeft, captionRight, leftPortrait }: {
  left: string; right: string; captionLeft: string; captionRight: string; leftPortrait?: boolean
}) {
  return (
    <div className="my-8 not-prose grid grid-cols-1 md:grid-cols-2 gap-4 items-start justify-items-center">
      <figure style={{ maxWidth: leftPortrait ? '300px' : '100%', width: '100%' }}>
        <video
          src={left} controls autoPlay muted loop playsInline
          style={{ aspectRatio: leftPortrait ? '9/16' : '16/9' }}
          className="w-full rounded-xl border border-border shadow-lg"
        />
        <figcaption className="mt-2 text-center text-sm text-muted">{captionLeft}</figcaption>
      </figure>
      <figure style={{ width: '100%' }}>
        <video
          src={right} controls autoPlay muted loop playsInline
          style={{ aspectRatio: '16/9' }}
          className="w-full rounded-xl border border-border shadow-lg"
        />
        <figcaption className="mt-2 text-center text-sm text-muted">{captionRight}</figcaption>
      </figure>
    </div>
  )
}

export default function SeedancePage() {
  const { locale, t } = useLocale()
  const title = locale === 'de' && post.titleDE ? post.titleDE : post.title

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackLink />

      <header className="mb-12">
        <time className="text-sm text-primary">{formatPostDate(post.date)}</time>
        <h1 className="text-3xl font-semibold text-primary mt-2">
          {title}
        </h1>
      </header>

      <article className="prose">
        <p>
          {t({ en: 'ByteDance just dropped Seedance 2.0, and it\'s not a marginal improvement. It\'s the kind of leap that makes Sora, Veo 3, and Kling look like they need a full generational rebuild to even compete. The clips coming out of this model are — let me be honest — unreasonably good.', de: 'ByteDance hat gerade Seedance 2.0 ver\u00f6ffentlicht, und es ist keine marginale Verbesserung. Es ist der Sprung, der Sora, Veo 3 und Kling so aussehen l\u00e4sst, als br\u00e4uchten sie einen kompletten Generationswechsel, um \u00fcberhaupt mitzuhalten. Die Clips, die aus diesem Modell kommen, sind — ehrlich gesagt — unverschämt gut.' })}
        </p>

        <p>
          {t({
            en: 'Before we talk implications, watch this. Ten seconds, 1080p, single prompt:',
            de: 'Bevor wir \u00fcber die Implikationen sprechen, schau dir das an. Zehn Sekunden, 1080p, ein einziger Prompt:',
          })}
        </p>

        <Video
          src="/videos/seedance/demo1.mp4"
          caption={t({ en: 'Chase scene \u2014 1080p, 10 seconds, single generation', de: 'Verfolgungsjagd \u2014 1080p, 10 Sekunden, einzelne Generierung' })}
        />

        <blockquote>
          <strong>Prompt:</strong> &ldquo;{t({
            en: 'A man flees from a pursuing crowd through a market. He knocks over a fruit stand, scattering oranges. Close-up of his panicked face. Handheld camera, motion blur, natural lighting.',
            de: 'Ein Mann flieht vor einer verfolgenden Menge durch einen Markt. Er st\u00f6\u00dft einen Obststand um, Orangen kullern. Nahaufnahme seines panischen Gesichts. Handkamera, Bewegungsunsch\u00e4rfe, nat\u00fcrliches Licht.',
          })}&rdquo;
        </blockquote>

        <p>
          {t({ en: 'The physics of the falling fruit, the camera shake, the motion blur on the crowd — this isn\'t “pretty good for AI.” This is indistinguishable from a real shoot at casual viewing distance. A year ago, AI video meant warped fingers and melting faces. Now it\'s producing B-roll that would pass review at any production house.', de: 'Die Physik der fallenden Fr\u00fcchte, das Kamerawackeln, die Bewegungsunsch\u00e4rfe der Menge — das ist nicht \u201eganz gut f\u00fcr KI\u201c. Das ist bei normalem Betrachtungsabstand nicht von einem echten Dreh zu unterscheiden. Vor einem Jahr bedeutete KI-Video verzerrte Finger und schmelzende Gesichter. Jetzt produziert es B-Roll, die bei jeder Produktionsfirma die Pr\u00fcfung bestehen w\u00fcrde.' })}
        </p>

        <h2>{t({ en: 'Everyday Scenes, Cinematic Quality', de: 'Alltagsszenen, filmische Qualit\u00e4t' })}</h2>

        <Video
          src="/videos/seedance/demo2.mp4"
          caption={t({ en: 'Golden hour laundry scene \u2014 720p, 8 seconds', de: 'W\u00e4scheszene bei goldenem Licht \u2014 720p, 8 Sekunden' })}
        />

        <blockquote>
          <strong>Prompt:</strong> &ldquo;{t({
            en: 'A girl elegantly hangs up laundry. Once she has finished, she takes the next item of clothing from the bucket and shakes it out vigorously.',
            de: 'Ein M\u00e4dchen h\u00e4ngt elegant W\u00e4sche auf. Sobald sie fertig ist, nimmt sie das n\u00e4chste Kleidungsst\u00fcck aus dem Eimer und sch\u00fcttelt es kr\u00e4ftig aus.',
          })}&rdquo;
        </blockquote>

        <p>
          {t({ en: 'A mundane domestic scene — laundry on a balcony at golden hour — rendered with the kind of cinematic warmth you\'d expect from a European art film. The fabric physics, the light, the subtle camera movement. This is what “photorealistic” actually means when it\'s not just a buzzword.', de: 'Eine banale h\u00e4usliche Szene — W\u00e4sche auf einem Balkon bei goldenem Licht — gerendert mit der filmischen W\u00e4rme, die man von einem europ\u00e4ischen Kunstfilm erwartet. Die Stoffphysik, das Licht, die subtile Kamerabewegung. Das ist, was \u201efotorealistisch\u201c tats\u00e4chlich bedeutet, wenn es nicht nur ein Buzzword ist.' })}
        </p>

        <h2>{t({ en: 'Camera Control \u2014 The Quiet Revolution', de: 'Kamerasteuerung \u2014 die stille Revolution' })}</h2>

        <p>
          {t({ en: 'What separates Seedance 2.0 from everything else isn\'t just visual quality — it\'s controllability. You can feed it a reference camera movement and it replicates the motion in generated footage:', de: 'Was Seedance 2.0 von allem anderen unterscheidet, ist nicht nur visuelle Qualit\u00e4t — es ist die Steuerbarkeit. Man kann eine Referenz-Kamerabewegung einspeisen und es repliziert die Bewegung im generierten Material:' })}
        </p>

        <VideoCompare
          left="/videos/seedance/demo3.mp4"
          right="/videos/seedance/demo4.mp4"
          captionLeft={t({ en: 'Portrait mode demo', de: 'Hochformat-Demo' })}
          captionRight={t({ en: 'Dark forest \u2014 flashlight through trees, found-footage aesthetic', de: 'Dunkler Wald \u2014 Taschenlampe durch B\u00e4ume, Found-Footage-\u00c4sthetik' })}
          leftPortrait
        />

        <p>
          {t({ en: 'This is what directors actually need. Not just “generate me a pretty clip” but “give me this exact camera move on this subject.” That\'s the difference between a toy and a tool.', de: 'Das ist, was Regisseure wirklich brauchen. Nicht nur \u201egeneriere mir einen h\u00fcbschen Clip\u201c, sondern \u201egib mir genau diese Kamerabewegung auf dieses Motiv\u201c. Das ist der Unterschied zwischen Spielzeug und Werkzeug.' })}
        </p>

        <h2>{t({ en: "The Cola Ad That Shouldn't Exist", de: 'Die Cola-Werbung, die nicht existieren sollte' })}</h2>

        <Video
          src="/videos/seedance/demo5.mp4"
          caption={t({ en: 'Cola commercial \u2014 Mona Lisa grabs a can, 720p, 15 seconds', de: 'Cola-Werbespot \u2014 Mona Lisa greift nach einer Dose, 720p, 15 Sekunden' })}
        />

        <blockquote>
          <strong>Prompt:</strong> &ldquo;{t({
            en: 'A character inside a Renaissance painting reaches out and grabs a Cola can from outside the frame. A cowboy leans in and steals it. Cinematic lighting, shallow depth of field.',
            de: 'Eine Figur in einem Renaissance-Gem\u00e4lde greift nach drau\u00dfen und schnappt sich eine Cola-Dose. Ein Cowboy lehnt sich herein und stiehlt sie. Filmisches Licht, geringe Tiefensch\u00e4rfe.',
          })}&rdquo;
        </blockquote>

        <p>
          {t({ en: 'This is an ad concept. A creative director at an agency would pitch exactly this kind of thing, and it would take a VFX team two weeks and $50k to produce. Seedance spat it out in minutes.', de: 'Das ist ein Werbekonzept. Ein Creative Director in einer Agentur w\u00fcrde genau so etwas pitchen, und ein VFX-Team br\u00e4uchte zwei Wochen und 50.000 $ f\u00fcr die Produktion. Seedance hat es in Minuten ausgespuckt.' })}
        </p>

        <p>
          {t({ en: 'Mandatory honesty: These are cherry-picked demos. ByteDance is showing their best outputs, not               the average case. Every AI lab does this. The average generation is worse than what you see here. But even               accounting for cherry-picking, the ceiling has moved dramatically.', de: 'Pflichtehrlichkeit: Das sind die besten Demos. ByteDance zeigt seine besten Ergebnisse, nicht               den Durchschnitt. Jedes KI-Labor macht das. Die durchschnittliche Generierung ist schlechter als das, was man hier sieht. Aber selbst               unter Ber\u00fccksichtigung der Selektion hat sich die Obergrenze dramatisch verschoben.' })}
        </p>

        <h2>{t({ en: 'Who Dies, Who Thrives', de: 'Wer stirbt, wer profitiert' })}</h2>

        <p>
          {t({
            en: "Let's stop dancing around it. Here's what Seedance-level AI video actually kills:",
            de: "H\u00f6ren wir auf, um den hei\u00dfen Brei zu reden. Das ist, was KI-Video auf Seedance-Niveau tats\u00e4chlich erledigt:",
          })}
        </p>

        <h3>{t({ en: 'Stock Footage Is Dead', de: 'Stock-Footage ist tot' })}</h3>

        <p>
          {t({ en: 'Shutterstock, Getty, Adobe Stock — their video licensing business is walking dead. Why pay $200 for a “business team in meeting room” clip when you can generate exactly what you need, with exact framing, exact lighting, exact mood? The stock footage industry survived AI image generation because video was still hard. That moat just evaporated.', de: 'Shutterstock, Getty, Adobe Stock — ihr Video-Lizenzgesch\u00e4ft ist ein wandelnder Toter. Warum 200 $ f\u00fcr einen \u201eBusiness-Team im Meetingraum\u201c-Clip zahlen, wenn man genau das generieren kann, was man braucht, mit exaktem Bildausschnitt, exakter Beleuchtung, exakter Stimmung? Die Stock-Footage-Industrie hat die KI-Bildgenerierung \u00fcberlebt, weil Video noch schwierig war. Dieser Burggraben ist gerade verdampft.' })}
        </p>

        <h3>{t({ en: 'VFX Gets Restructured', de: 'VFX wird umstrukturiert' })}</h3>

        <p>
          {t({ en: 'Entry-level VFX compositing, rotoscoping, basic motion graphics — these jobs are going to compress hard. But senior creative directors, people with taste and vision? They\'re about to become 10x more productive. The bottleneck shifts from “can we produce this?” to “should we produce this?”', de: 'Einstiegs-VFX-Compositing, Rotoscoping, einfache Motion Graphics — diese Jobs werden stark komprimiert. Aber Senior Creative Directors, Menschen mit Geschmack und Vision? Die werden 10x produktiver. Der Engpass verschiebt sich von \u201eK\u00f6nnen wir das produzieren?\u201c zu \u201eSollten wir das produzieren?\u201c' })}
        </p>

        <h3>{t({ en: 'Solo Creators Get Superpowers', de: 'Solo-Kreative bekommen Superkr\u00e4fte' })}</h3>

        <p>
          {t({
            en: "What took a 10-person team \u2014 director, DP, gaffer, grip, editor, colorist, VFX artist, sound designer, producer, PA \u2014 a solo creator with good taste and good prompts can now approximate. Not replace entirely. But approximate well enough for YouTube, social media, and indie projects.",
            de: "Was ein 10-Personen-Team brauchte \u2014 Regisseur, Kameramann, Beleuchter, Grip, Editor, Colorist, VFX-K\u00fcnstler, Sounddesigner, Produzent, Produktionsassistent \u2014 kann ein Solo-Kreativer mit gutem Geschmack und guten Prompts jetzt ann\u00e4hern. Nicht komplett ersetzen. Aber gut genug f\u00fcr YouTube, Social Media und Indie-Projekte.",
          })}
        </p>

        <h3>{t({ en: 'Advertising Costs Collapse', de: 'Werbekosten brechen ein' })}</h3>

        <p>
          {t({ en: 'A 30-second commercial that cost $500k in production? The production part drops to near-zero. The creative direction, strategy, and media buy stay expensive. But the actual making of the video becomes trivially cheap. Agencies that charged for production will need to charge for ideas instead.', de: 'Ein 30-Sekunden-Werbespot, der 500.000 $ in der Produktion kostete? Der Produktionsteil f\u00e4llt auf nahe null. Die kreative Leitung, Strategie und der Mediaeinkauf bleiben teuer. Aber das eigentliche Erstellen des Videos wird trivial billig. Agenturen, die f\u00fcr Produktion kassierten, m\u00fcssen stattdessen f\u00fcr Ideen kassieren.' })}
        </p>

        <h3>{t({ en: 'Corporate Video Goes DIY', de: 'Unternehmensvideos werden Selbstbedienung' })}</h3>

        <p>
          {t({
            en: "Training videos, product demos, onboarding content, internal comms \u2014 no more booking a camera crew for B-roll. Marketing teams will generate it at their desks. The corporate video production industry ($20B+) is about to get compressed into a software subscription.",
            de: "Schulungsvideos, Produktdemos, Onboarding-Inhalte, interne Kommunikation \u2014 kein Kamerateam mehr f\u00fcr B-Roll buchen. Marketing-Teams werden es an ihren Schreibtischen generieren. Die Unternehmens-Videoproduktionsbranche (20 Mrd. $+) wird gerade in ein Software-Abo komprimiert.",
          })}
        </p>

        <h3>{t({ en: 'Film Previs Becomes Film', de: 'Film-Previs wird zum Film' })}</h3>

        <p>
          {t({ en: 'Directors currently storyboard with sketches or basic 3D previs. When you can storyboard with actual video \u2014 photorealistic, with camera control \u2014 the line between previs and final output blurs. For some shots, the AI generation is the final output.', de: 'Regisseure erstellen derzeit Storyboards mit Skizzen oder einfachem 3D-Previs. Wenn man mit echtem Video storyboarden kann \u2014 fotorealistisch, mit Kamerasteuerung \u2014 verschwimmt die Grenze zwischen Previs und Endprodukt. F\u00fcr manche Einstellungen ist die KI-Generierung das Endprodukt.' })}
        </p>

        <h2>{t({ en: 'The New Bottleneck: Taste', de: 'Der neue Engpass: Geschmack' })}</h2>

        <p>
          {t({ en: 'When production capacity is infinite and free, the only thing that matters is creative direction. Knowing what to make. Having the taste to recognize good from great. Understanding story, composition, pacing \u2014 the stuff that can\'t be prompted.', de: 'Wenn Produktionskapazit\u00e4t unendlich und kostenlos ist, z\u00e4hlt nur noch kreative Leitung. Zu wissen, was man machen soll. Den Geschmack zu haben, gut von gro\u00dfartig zu unterscheiden. Story, Komposition, Pacing verstehen \u2014 die Dinge, die man nicht prompten kann.' })}
        </p>

        <p>
          {t({
            en: 'This is the great equalizer and the great filter at the same time. Everyone gets the same tools. The people who win are the ones who know what to build with them.',
            de: 'Das ist der gro\u00dfe Gleichmacher und der gro\u00dfe Filter zugleich. Alle bekommen dieselben Tools. Diejenigen, die gewinnen, sind die, die wissen, was man damit baut.',
          })}
        </p>

        <h2>{t({ en: 'The Trust Problem', de: 'Das Vertrauensproblem' })}</h2>

        <p>
          {t({ en: 'Here\'s the part nobody in AI video wants to talk about: when generated clips are indistinguishable from reality, every video becomes suspect.', de: 'Hier ist der Teil, \u00fcber den niemand im KI-Video-Bereich reden will: Wenn generierte Clips nicht von der Realit\u00e4t zu unterscheiden sind, wird jedes Video verd\u00e4chtig.' })}
        </p>

        <p>
          {t({
            en: "We already can't trust images. We're about to not be able to trust video either. That chase scene at the top of this post? It could be a real protest. It could be a deepfake of a political event that never happened. You genuinely cannot tell.",
            de: "Wir k\u00f6nnen Bildern bereits nicht mehr trauen. Bald k\u00f6nnen wir auch Videos nicht mehr trauen. Die Verfolgungsszene am Anfang dieses Beitrags? K\u00f6nnte ein echter Protest sein. K\u00f6nnte ein Deepfake eines politischen Ereignisses sein, das nie stattgefunden hat. Man kann es wirklich nicht unterscheiden.",
          })}
        </p>

        <p>
          {t({
            en: "Content provenance standards (C2PA and friends) exist but adoption is glacial. We're racing toward a world where seeing is no longer believing, and the infrastructure for verification isn't ready. This isn't a theoretical concern \u2014 it's a 2026 problem.",
            de: "Content-Provenance-Standards (C2PA und Co.) existieren, aber die Adoption ist schleppend. Wir rasen auf eine Welt zu, in der Sehen nicht mehr Glauben bedeutet, und die Infrastruktur zur Verifizierung ist nicht bereit. Das ist kein theoretisches Problem \u2014 es ist ein 2026-Problem.",
          })}
        </p>

        <h2>{t({ en: 'The Scoreboard', de: 'Die Rangliste' })}</h2>

        <p>
          {t({ en: 'Let me be direct, since most coverage won\'t be: Seedance 2.0 is the best video generation model available right now. It\'s not close. Sora feels like a tech demo by comparison. Veo 3 has good audio sync but worse visual quality. Kling 2.0 is respectable but a tier below.', de: 'Lass mich direkt sein, da die meiste Berichterstattung es nicht sein wird: Seedance 2.0 ist das beste verf\u00fcgbare Videogenerierungsmodell gerade. Es ist nicht knapp. Sora f\u00fchlt sich im Vergleich wie eine Tech-Demo an. Veo 3 hat guten Audio-Sync, aber schlechtere visuelle Qualit\u00e4t. Kling 2.0 ist respektabel, aber eine Stufe darunter.' })}
        </p>

        <p>
          {t({
            en: 'The other labs need a full new iteration to match this \u2014 not a point release, a generational leap. ByteDance has pulled ahead decisively, and they did it with a model that also offers camera control, which none of the competitors have at this level.',
            de: 'Die anderen Labs brauchen eine komplett neue Iteration, um das zu matchen \u2014 kein Point Release, ein Generationssprung. ByteDance hat sich entscheidend abgesetzt, und das mit einem Modell, das auch Kamerasteuerung bietet, die keiner der Wettbewerber auf diesem Niveau hat.',
          })}
        </p>

        <p>
          {t({
            en: "The gap will close \u2014 it always does. But right now, if you're doing anything with AI video, Seedance 2.0 is the benchmark everyone else is chasing.",
            de: "Die L\u00fccke wird sich schlie\u00dfen \u2014 das tut sie immer. Aber gerade jetzt, wenn du irgendetwas mit KI-Video machst, ist Seedance 2.0 der Benchmark, den alle anderen jagen.",
          })}
        </p>
      </article>
    </div>
  )
}
