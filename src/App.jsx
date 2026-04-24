import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Play,
  ShieldAlert,
} from 'lucide-react'
import { Reveal } from './components/Reveal'
import { SectionHeading } from './components/SectionHeading'
import { BrazilMapSection } from './components/sections/BrazilMapSection'
import { DayOnBRsSection } from './components/sections/DayOnBRsSection'
import { SegmentedMetricTabs } from './components/ui/SegmentedMetricTabs'
import { AnimatedCount } from './components/ui/AnimatedCount'
import {
  collisionSteps,
  heroHighlights,
  journey,
  number,
  totals,
  yearlyData,
  yearlyModes,
} from './data/siteContent'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-22% 0px -44% 0px', threshold: [0.2, 0.4, 0.6] },
    )

    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}

function usePageProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return progress
}

function TopProgress({ active, progress }) {
  const index = Math.max(0, journey.findIndex((item) => item.id === active))

  return (
    <header className="topbar">
      <div className="topbar-progress" style={{ width: `${progress}%` }} />
      <div className="container topbar-inner">
        <a href="#abertura" className="brand">
          <span className="brand-dot" />
          BRs em risco
        </a>

        <nav className="topbar-nav" aria-label="Navegação da experiência">
          {journey.map((item, itemIndex) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={item.id === active ? 'active' : itemIndex < index ? 'done' : ''}
            >
              {item.short}
            </a>
          ))}
        </nav>

        <span className="topbar-step">
          {String(index + 1).padStart(2, '0')} / {journey.length}
        </span>
      </div>
    </header>
  )
}

function SideRail({ active }) {
  const index = Math.max(0, journey.findIndex((item) => item.id === active))

  return (
    <nav className="side-rail" aria-label="Atalhos da experiência">
      <span className="side-rail-line" style={{ height: `${((index + 1) / journey.length) * 100}%` }} />
      {journey.map((item, itemIndex) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={item.id === active ? 'active' : itemIndex < index ? 'done' : ''}
          aria-label={`Ir para ${item.label}`}
        >
          <span className="side-rail-dot" />
          <span className="side-rail-label">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

function JourneyControls({ active }) {
  const index = Math.max(0, journey.findIndex((item) => item.id === active))
  const previous = journey[index - 1]
  const next = journey[index + 1]

  return (
    <nav className="journey-controls" aria-label="Controles da jornada">
      {previous ? (
        <a href={`#${previous.id}`} className="journey-control">
          <ChevronLeft size={15} />
          Voltar
        </a>
      ) : null}
      {next ? (
        <a href={`#${next.id}`} className="journey-control primary">
          Continuar
          <ChevronRight size={15} />
        </a>
      ) : null}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="abertura">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="hero-glow hero-glow-a" />
        <span className="hero-glow hero-glow-b" />
        <span className="hero-road" />
        <span className="hero-road-line" />
      </div>

      <div className="container hero-layout">
        <Reveal className="hero-copy">
          <span className="hero-context">PRF · BRs brasileiras · 2023 a 2025</span>
          <h1>Todos os dias, o risco encontra pessoas reais nas BRs brasileiras.</h1>
          <p>
            Este não é um painel frio. É uma leitura narrativa sobre recorrência, território e consequência humana
            nas rodovias federais brasileiras.
          </p>

          <div className="hero-pill-row">
            {heroHighlights.map((item) => (
              <span key={item} className="hero-pill">
                {item}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <a href="#ritmo" className="button button-primary">
              Seguir a experiência
              <ChevronRight size={16} />
            </a>
            <a href="#colisao" className="button button-secondary">
              Ver a cena
            </a>
          </div>

          <div className="hero-note">
            <Clock3 size={18} />
            <span>Em média, 16 pessoas morreram por dia nesse recorte.</span>
          </div>
        </Reveal>

        <Reveal className="hero-panel" delay={0.08}>
          <div className="hero-panel-top">
            <span className="micro-label">Leitura principal</span>
            <span className="hero-panel-mark">Recorte federal</span>
          </div>

          <strong className="hero-number">
            <AnimatedCount value={totals.deaths} />
          </strong>
          <p>Vidas perdidas nas rodovias federais brasileiras entre 2023 e 2025.</p>

          <div className="hero-panel-grid">
            <article className="mini-stat-card">
              <AlertTriangle size={18} />
              <span>Acidentes</span>
              <strong>{number.format(totals.accidents)}</strong>
            </article>
            <article className="mini-stat-card">
              <ShieldAlert size={18} />
              <span>Acidentes fatais</span>
              <strong>{number.format(totals.fatalAccidents)}</strong>
            </article>
            <article className="mini-stat-card">
              <Clock3 size={18} />
              <span>Feridos graves</span>
              <strong>{number.format(totals.seriousInjuries)}</strong>
            </article>
            <article className="mini-stat-card">
              <span className="mini-stat-kicker">Leitura</span>
              <strong>Isso se repete.</strong>
              <p>Ao longo do dia, em lugares reais, e depois da batida.</p>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function EvolutionSection() {
  const [mode, setMode] = useState('accidents')
  const current = yearlyModes[mode]
  const max = Math.max(...yearlyData.map((item) => item[mode]))
  const firstYear = yearlyData[0][mode]
  const lastYear = yearlyData[yearlyData.length - 1][mode]
  const change = ((lastYear - firstYear) / firstYear) * 100

  const modeItems = Object.entries(yearlyModes).map(([id, item]) => ({ id, tabLabel: item.label }))

  return (
    <section className="story-section" id="evolucao">
      <div className="container">
        <SectionHeading
          eyebrow="Evolução"
          title="Os anos mudam. O alerta continua."
          text="Uma leitura curta para mostrar que o problema segue alto demais dentro do recorte federal."
        />

        <Reveal className="evolution-panel">
          <SegmentedMetricTabs
            items={modeItems}
            activeId={mode}
            onChange={setMode}
            ariaLabel="Métricas anuais"
          />

          <div className="evolution-layout">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                className="evolution-copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
              >
                <span className="micro-label">Leitura direta</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.insight}</strong>

                <div className="evolution-badges">
                  <article>
                    <span>2023</span>
                    <strong>{number.format(firstYear)}</strong>
                  </article>
                  <article>
                    <span>2025</span>
                    <strong>{number.format(lastYear)}</strong>
                  </article>
                  <article>
                    <span>Variação</span>
                    <strong>{`${change >= 0 ? '+' : ''}${change.toFixed(1).replace('.', ',')}%`}</strong>
                  </article>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={`bars bars-${current.accent}`}>
              {yearlyData.map((item, index) => (
                <div key={item.year} className={index === 1 ? 'bar-card bar-card-focus' : 'bar-card'}>
                  <span>{item.year}</span>
                  <div className="bar-shell">
                    <motion.span
                      className="bar-fill"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(item[mode] / max) * 100}%` }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.65, delay: 0.06 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <strong>{number.format(item[mode])}</strong>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TopViewCar({ tone }) {
  return (
    <svg className={`top-car top-car-${tone}`} viewBox="0 0 70 112" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`body-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--car-top)" />
          <stop offset="48%" stopColor="var(--car-mid)" />
          <stop offset="100%" stopColor="var(--car-bottom)" />
        </linearGradient>
        <linearGradient id={`glass-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fb4c4" />
          <stop offset="100%" stopColor="#314554" />
        </linearGradient>
      </defs>
      <path className="top-car-shadow" d="M20 5h30c6 0 11 4 12 10l5 25v32l-5 25c-1 6-6 10-12 10H20c-6 0-11-4-12-10L3 72V40l5-25C9 9 14 5 20 5Z" />
      <path className="top-car-body" fill={`url(#body-${tone})`} d="M20 4h30c6 0 10 4 12 10l5 25v34l-5 25c-2 6-6 10-12 10H20c-6 0-10-4-12-10L3 73V39l5-25C10 8 14 4 20 4Z" />
      <path className="top-car-belt" d="M20 10h30c4 0 7 3 8 7l4 22v34l-4 22c-1 4-4 7-8 7H20c-4 0-7-3-8-7L8 73V39l4-22c1-4 4-7 8-7Z" />
      <path className="top-car-hood" d="M19 13h32c3 0 5 2 6 5l3 16H10l3-16c1-3 3-5 6-5Z" />
      <path className="top-car-trunk" d="M10 78h50l-3 16c-1 3-3 5-6 5H19c-3 0-5-2-6-5l-3-16Z" />
      <path className="top-car-cabin" d="M20 36h30l5 14c1 2-1 4-3 4H18c-2 0-4-2-3-4l5-14Z" fill={`url(#glass-${tone})`} />
      <path className="top-car-rear-glass" d="M18 59h34c2 0 4 2 3 4l-5 14H20l-5-14c-1-2 1-4 3-4Z" fill={`url(#glass-${tone})`} />
      <path className="top-car-roof" d="M23 50h24c3 0 5 2 5 5v7c0 3-2 5-5 5H23c-3 0-5-2-5-5v-7c0-3 2-5 5-5Z" />
      <rect className="top-car-wheel" x="3" y="24" width="6" height="18" rx="3" />
      <rect className="top-car-wheel" x="61" y="24" width="6" height="18" rx="3" />
      <rect className="top-car-wheel" x="3" y="70" width="6" height="18" rx="3" />
      <rect className="top-car-wheel" x="61" y="70" width="6" height="18" rx="3" />
      <path className="top-car-contour" d="M17 30h36M17 82h36M13 40c5 4 12 6 22 6s17-2 22-6M13 72c5-4 12-6 22-6s17 2 22 6" />
      <rect className="top-car-mirror" x="0" y="43" width="7" height="10" rx="3" />
      <rect className="top-car-mirror" x="63" y="43" width="7" height="10" rx="3" />
      <path className="top-car-headlight" d="M17 12h13c2 0 3 1 3 3v1c0 2-1 3-3 3l-13 2c-2 0-3-1-3-3v-1c0-3 1-5 3-5Z" />
      <path className="top-car-headlight" d="M40 12h13c2 0 3 2 3 5v1c0 2-1 3-3 3l-13-2c-2 0-3-1-3-3v-1c0-2 1-3 3-3Z" />
      <path className="top-car-taillight" d="M17 91l13 2c2 0 3 1 3 3v1c0 2-1 3-3 3H17c-2 0-3-2-3-5v-1c0-2 1-3 3-3Z" />
      <path className="top-car-taillight" d="M53 91c2 0 3 1 3 3v1c0 3-1 5-3 5H40c-2 0-3-1-3-3v-1c0-2 1-3 3-3l13-2Z" />
    </svg>
  )
}

function CollisionSection() {
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const current = collisionSteps[active]

  useEffect(() => {
    if (!started || active >= collisionSteps.length - 1) return undefined
    const timer = window.setTimeout(() => setActive((value) => value + 1), 3000)
    return () => window.clearTimeout(timer)
  }, [active, started])

  return (
    <section className="story-section story-section-collision" id="colisao">
      <div className="container">
        <SectionHeading
          eyebrow="Cena de colisão"
          title="Nem toda vítima errou."
          text="Uma cena curta para mostrar como a imprudência de alguém pode atingir quem seguia corretamente."
        />

        <div className="collision-layout">
          <Reveal className="collision-scene-card">
            <div className="drive-scene" data-started={started} data-step={active}>
              <div className="scene-road" />
              <div className="scene-divider" />
              <div className="scene-glow scene-glow-a" />
              <div className="scene-glow scene-glow-b" />
              <div className="scene-invasion" />
              <div className="scene-impact">
                <span className="impact-core" />
                <span className="impact-wave" />
                <span className="impact-wave impact-wave-b" />
                <span className="impact-flash" />
              </div>

              <div className="lane-tag lane-tag-left">Fluxo oposto</div>
              <div className="lane-tag lane-tag-right">Sua faixa</div>

              <div className="car car-user">
                <TopViewCar tone="user" />
              </div>
              <div className="car car-lead">
                <TopViewCar tone="lead" />
              </div>
              <div className="car car-risk">
                <TopViewCar tone="risk" />
              </div>

              {!started ? (
                <button type="button" className="scene-start" onClick={() => setStarted(true)}>
                  <Play size={17} />
                  Iniciar cena
                </button>
              ) : null}

              <div className="scene-caption">
                <span>Etapa {current.id}</span>
                <strong>{current.title}</strong>
              </div>
            </div>
          </Reveal>

          <Reveal className="collision-copy-card" delay={0.08}>
            <div className="story-progress" aria-label={`Etapa ${active + 1} de ${collisionSteps.length}`}>
              <span style={{ width: `${((active + 1) / collisionSteps.length) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                className="collision-copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
              >
                <span className="micro-label">Leitura da cena</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.note}</strong>
              </motion.article>
            </AnimatePresence>

            <div className="scene-stepper">
              {collisionSteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={index === active ? 'active' : ''}
                  onClick={() => {
                    setStarted(true)
                    setActive(index)
                  }}
                >
                  <span>{step.id}</span>
                  {step.title}
                </button>
              ))}
            </div>

            <div className="collision-note">
              <p>A imprudência pode atingir quem fez tudo certo.</p>
              <strong>Do outro lado da faixa, também existe uma vida.</strong>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="story-section" id="fechamento">
      <div className="container">
        <Reveal className="closing-panel">
          <span className="micro-label">Fechamento</span>
          <h2>O problema não é isolado. Ele se repete, ocupa território e continua depois da batida.</h2>
          <p>
            Os dados da PRF mostram um recorte claro: rodovias federais brasileiras entre 2023 e 2025. Mesmo sem
            representar todo o trânsito do país, o peso humano já é grave demais.
          </p>

          <div className="closing-grid">
            <article>
              <strong>Isso afeta vidas reais, todos os dias.</strong>
              <span>Ritmo, mapa e consequência apontam para a mesma verdade.</span>
            </article>
            <article>
              <strong>A prudência ainda é uma decisão de cuidado.</strong>
              <span>No volante, ela protege gente que você conhece e gente que você nunca viu.</span>
            </article>
          </div>

          <div className="closing-actions">
            <a href="#abertura" className="button button-primary">
              Voltar ao início
              <ArrowUp size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const ids = useMemo(() => journey.map((item) => item.id), [])
  const active = useActiveSection(ids)
  const progress = usePageProgress()

  return (
    <div className="site-shell">
      <TopProgress active={active} progress={progress} />
      <SideRail active={active} />
      <JourneyControls active={active} />

      <HeroSection />

      <main>
        <DayOnBRsSection />
        <EvolutionSection />
        <BrazilMapSection />
        <CollisionSection />
        <ClosingSection />
      </main>
    </div>
  )
}
