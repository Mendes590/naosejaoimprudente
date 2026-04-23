import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionIntro } from '../components/SectionIntro'

const beats = [
  {
    id: 'routine',
    label: '01',
    title: 'Trajeto comum',
    text: 'Voce dirige com atencao, mantem sua faixa e segue por uma rodovia federal a noite.',
    reflection: 'Nada nessa cena sugere erro da sua parte.',
    sceneTitle: 'Voce segue corretamente.',
    sceneText: 'Sua faixa esta livre. O risco ainda parece distante.',
  },
  {
    id: 'opposite-flow',
    label: '02',
    title: 'Fluxo oposto',
    text: 'No sentido contrario, um carro segue a frente e outro vem atras.',
    reflection: 'O risco ainda nasce do outro lado da pista.',
    sceneTitle: 'No fluxo oposto, o carro preto vai a frente.',
    sceneText: 'O carro laranja vem atras.',
  },
  {
    id: 'overtake',
    label: '03',
    title: 'Ultrapassagem indevida',
    text: 'O motorista que vinha atras decide ultrapassar o carro a frente mesmo sem margem de seguranca.',
    reflection: 'Ao fazer isso, o carro laranja invade a faixa de quem seguia corretamente.',
    sceneTitle: 'O carro laranja sai para ultrapassar.',
    sceneText: 'A manobra leva o perigo para a sua faixa.',
  },
  {
    id: 'no-reaction',
    label: '04',
    title: 'Sem tempo para reagir',
    text: 'O carro laranja agora esta exatamente na sua trajetoria. A distancia diminui e a colisao se torna inevitavel.',
    reflection: 'Quem dirige corretamente tambem pode ser atingido pelo erro de outra pessoa.',
    sceneTitle: 'A invasao da sua faixa torna o choque inevitavel.',
    sceneText: 'O risco agora esta exatamente a sua frente.',
  },
  {
    id: 'collision',
    label: '05',
    title: 'Colisao frontal',
    text: 'Sem tempo para reagir, voce e atingido pelo carro que saiu de tras de outro veiculo para ultrapassar indevidamente.',
    reflection: 'Voce nao causou o acidente. O choque veio da imprudencia do carro laranja.',
    sceneTitle: 'A colisao frontal acontece.',
    sceneText: 'Ultrapassagens indevidas e contramao matam.',
  },
  {
    id: 'aftermath',
    label: '06',
    title: 'Consequencia humana',
    text: 'Depois do impacto, a cena deixa de ser apenas transito. Ela passa a falar de vidas inocentes atingidas por um erro evitavel.',
    reflection: 'A imprudencia pode destruir a vida de quem nao errou.',
    sceneTitle: 'Voce sofreu um acidente por imprudencia de outra pessoa.',
    sceneText: 'Uma escolha irresponsavel atingiu quem seguia corretamente.',
  },
]

const stageStates = [
  {
    victim: { x: 0, y: 0, rotate: 0, scale: 1 },
    lead: { x: 0, y: 0, rotate: 0, scale: 1 },
    aggressor: { x: 0, y: 0, rotate: 0, scale: 1 },
    path: { opacity: 0, x: 0, y: 0, rotate: 0, scaleY: 0.5 },
    warning: { opacity: 0, scale: 0.86 },
    flash: { opacity: 0, scale: 0.88 },
    ring: { opacity: 0, scale: 0.84 },
    dim: 0,
    aftermath: { opacity: 0, y: 18 },
  },
  {
    victim: { x: 0, y: -8, rotate: 0, scale: 1 },
    lead: { x: 0, y: 0, rotate: 0, scale: 1 },
    aggressor: { x: 0, y: 0, rotate: 0, scale: 1 },
    path: { opacity: 0.05, x: 0, y: 24, rotate: 0, scaleY: 0.62 },
    warning: { opacity: 0.14, scale: 0.94 },
    flash: { opacity: 0, scale: 0.88 },
    ring: { opacity: 0, scale: 0.84 },
    dim: 0,
    aftermath: { opacity: 0, y: 18 },
  },
  {
    victim: { x: 0, y: -14, rotate: 0, scale: 1 },
    lead: { x: 0, y: 10, rotate: 0, scale: 1 },
    aggressor: { x: 66, y: 86, rotate: 0, scale: 1.01 },
    path: { opacity: 0.92, x: 44, y: 118, rotate: 0, scaleY: 1.02 },
    warning: { opacity: 0.56, scale: 1.02 },
    flash: { opacity: 0, scale: 0.88 },
    ring: { opacity: 0, scale: 0.84 },
    dim: 0,
    aftermath: { opacity: 0, y: 18 },
  },
  {
    victim: { x: 0, y: -52, rotate: -1, scale: 1 },
    lead: { x: 0, y: 20, rotate: 0, scale: 1 },
    aggressor: { x: 106, y: 170, rotate: 0, scale: 1.02 },
    path: { opacity: 1, x: 68, y: 186, rotate: 0, scaleY: 1.16 },
    warning: { opacity: 0.9, scale: 1.08 },
    flash: { opacity: 0, scale: 0.88 },
    ring: { opacity: 0, scale: 0.84 },
    dim: 0.02,
    aftermath: { opacity: 0, y: 18 },
  },
  {
    victim: { x: -6, y: -86, rotate: -6, scale: 0.995 },
    lead: { x: 0, y: 28, rotate: 0, scale: 1 },
    aggressor: { x: 106, y: 212, rotate: 0, scale: 1.02 },
    path: { opacity: 1, x: 68, y: 196, rotate: 0, scaleY: 1.2 },
    warning: { opacity: 1, scale: 1.12 },
    flash: { opacity: 1, scale: 1 },
    ring: { opacity: 0.96, scale: 1 },
    dim: 0.1,
    aftermath: { opacity: 0, y: 18 },
  },
  {
    victim: { x: -12, y: -90, rotate: -14, scale: 0.99 },
    lead: { x: 0, y: 30, rotate: 0, scale: 1 },
    aggressor: { x: 108, y: 214, rotate: 4, scale: 1.02 },
    path: { opacity: 0.16, x: 68, y: 198, rotate: 0, scaleY: 1.2 },
    warning: { opacity: 0.2, scale: 1.14 },
    flash: { opacity: 0.14, scale: 1.04 },
    ring: { opacity: 0.22, scale: 1.02 },
    dim: 0.68,
    aftermath: { opacity: 1, y: 0 },
  },
]

function Car({ tone = 'victim' }) {
  const bodyStops =
    tone === 'victim'
      ? ['#f0ede7', '#a7a095']
      : tone === 'lead'
        ? ['#6f7883', '#171c22']
        : ['#d08a5d', '#8d4f30']

  const topLights = tone === 'victim' ? '#fff1c6' : '#bf5548'
  const bottomLights = tone === 'victim' ? '#bf5548' : '#fff1c6'

  return (
    <svg viewBox="0 0 92 176" className={`narrative-car-svg narrative-car-svg-${tone}`} aria-hidden="true">
      <defs>
        <linearGradient id={`car-body-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bodyStops[0]} />
          <stop offset="100%" stopColor={bodyStops[1]} />
        </linearGradient>
        <linearGradient id={`car-cabin-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#98aec2" />
          <stop offset="100%" stopColor="#405364" />
        </linearGradient>
      </defs>
      <path
        d="M28 8h36c9 0 16 5 19 13l7 18c2 4 2 8 2 12v71c0 4 0 8-2 12l-7 21c-3 8-10 13-19 13H28c-9 0-16-5-19-13l-7-21c-2-4-2-8-2-12V51c0-4 0-8 2-12l7-18C12 13 19 8 28 8Z"
        fill={`url(#car-body-${tone})`}
      />
      <path
        d="M25 28h42c8 0 14 6 14 14v90c0 8-6 14-14 14H25c-8 0-14-6-14-14V42c0-8 6-14 14-14Z"
        fill="#141b22"
        opacity="0.82"
      />
      <rect x="24" y="36" width="44" height="28" rx="12" fill={`url(#car-cabin-${tone})`} />
      <rect x="24" y="112" width="44" height="28" rx="12" fill={`url(#car-cabin-${tone})`} />
      <rect x="17" y="34" width="5" height="108" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="70" y="34" width="5" height="108" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="18" y="18" width="13" height="14" rx="6" fill={topLights} />
      <rect x="61" y="18" width="13" height="14" rx="6" fill={topLights} />
      <rect x="18" y="144" width="13" height="14" rx="6" fill={bottomLights} />
      <rect x="61" y="144" width="13" height="14" rx="6" fill={bottomLights} />
    </svg>
  )
}

export function DriveExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentBeat = beats[activeIndex]
  const stage = stageStates[activeIndex]

  return (
    <section className="content-section" id="experiencia">
      <SectionIntro
        eyebrow="Narrativa visual"
        title="O risco vem do outro lado da pista."
        text="Uma leitura guiada sobre como uma ultrapassagem indevida em uma BR de pista simples pode atingir quem seguia corretamente."
      />

      <div className="story-shell panel story-shell-rebuilt">
        <div className="narrative-layout">
          <div className="narrative-scene-wrap">
            <div className="narrative-scene-head">
              <span className="mini-label">BR federal - pista simples - noite</span>
              <p>A cena mostra o carro branco subindo na faixa da direita, o carro preto a frente no fluxo oposto e o carro laranja atras dele, fazendo um deslocamento curto para a direita antes de seguir reto para a colisao.</p>
            </div>

            <div className="narrative-scene">
              <div className="narrative-sky-glow" />
              <div className="narrative-road" />
              <div className="narrative-road-core" />
              <div className="narrative-shoulder narrative-shoulder-left" />
              <div className="narrative-shoulder narrative-shoulder-right" />
              <div className="narrative-center-line" />
              <div className="narrative-edge-dash narrative-edge-dash-left" />
              <div className="narrative-edge-dash narrative-edge-dash-right" />
              <div className="narrative-beam narrative-beam-victim" />
              <div className="narrative-beam narrative-beam-opposite" />
              <div className="narrative-chip narrative-chip-victim">Sua faixa</div>
              <div className="narrative-chip narrative-chip-opposite">Fluxo oposto</div>
              <motion.div
                className="narrative-danger-pulse"
                animate={stage.warning}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.div
                className="narrative-cross-path"
                animate={stage.path}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.div
                className="narrative-car narrative-car-victim"
                animate={stage.victim}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <Car tone="victim" />
              </motion.div>

              <motion.div
                className="narrative-car narrative-car-lead"
                animate={stage.lead}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <Car tone="lead" />
              </motion.div>

              <motion.div
                className="narrative-car narrative-car-aggressor"
                animate={stage.aggressor}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <Car tone="aggressor" />
              </motion.div>

              <motion.div
                className="narrative-impact-flash"
                animate={stage.flash}
                transition={{ duration: 0.24 }}
              />

              <motion.div
                className="narrative-impact-ring"
                animate={stage.ring}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="narrative-scene-dim"
                animate={{ opacity: stage.dim }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="narrative-aftermath-copy"
                animate={stage.aftermath}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>Depois do impacto</span>
                <strong>Uma ultrapassagem indevida atinge quem seguia corretamente e interrompe destinos inocentes.</strong>
              </motion.div>

              <motion.div
                className="narrative-scene-message"
                key={currentBeat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <span>{currentBeat.sceneTitle}</span>
                <strong>{currentBeat.sceneText}</strong>
              </motion.div>
            </div>
          </div>

          <div className="narrative-copy">
            <div className="narrative-steps" aria-label="Etapas da narrativa">
              {beats.map((beat, index) => (
                <button
                  key={beat.id}
                  type="button"
                  className={index === activeIndex ? 'narrative-step narrative-step-active' : 'narrative-step'}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ir para ${beat.title}`}
                >
                  <span>{beat.label}</span>
                  <strong>{beat.title}</strong>
                </button>
              ))}
            </div>

            <article className="narrative-panel">
              <span className="mini-label">Leitura da cena</span>
              <span className="narrative-panel-step">{currentBeat.label}</span>
              <h3>{currentBeat.title}</h3>
              <p>{currentBeat.text}</p>
              <strong>{currentBeat.reflection}</strong>
            </article>

            <article className="narrative-manifesto">
              <p>Voce seguia corretamente. O erro foi do carro laranja, que saiu de tras do carro preto para ultrapassar onde nao havia seguranca.</p>
              <strong>Voce sofreu um acidente por imprudencia de outra pessoa. Ultrapassagens indevidas e contramao matam. A imprudencia pode destruir a vida de quem nao errou. NAO SEJA O IMPRUDENTE.</strong>
            </article>

            <div className="story-actions">
              <button
                type="button"
                className="story-nav-button"
                onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
                disabled={activeIndex === 0}
              >
                <ChevronLeft size={14} />
                Etapa anterior
              </button>
              <button
                type="button"
                className="story-nav-button story-nav-button-primary"
                onClick={() => setActiveIndex((current) => Math.min(beats.length - 1, current + 1))}
                disabled={activeIndex === beats.length - 1}
              >
                Proxima etapa
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
