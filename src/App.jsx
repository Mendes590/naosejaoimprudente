import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPinned,
  Pause,
  Play,
  ShieldAlert,
  Timer,
  Users,
} from 'lucide-react'

const number = new Intl.NumberFormat('pt-BR')
const decimal = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const totals = {
  accidents: 213452,
  fatalAccidents: 15290,
  deaths: 17830,
  seriousInjuries: 59320,
  involved: 555562,
}

const totalDays = 365 + 366 + 365
const totalMinutes = totalDays * 24 * 60

const journey = [
  { id: 'abertura', label: 'Abertura', short: 'Início' },
  { id: 'ritmo', label: 'Ritmo', short: 'Ritmo' },
  { id: 'panorama', label: 'Panorama', short: 'Panorama' },
  { id: 'evolucao', label: 'Evolução', short: 'Evolução' },
  { id: 'riscos', label: 'Padrões', short: 'Padrões' },
  { id: 'humano', label: 'Fator humano', short: 'Humano' },
  { id: 'colisao', label: 'Colisão', short: 'Colisão' },
  { id: 'fechamento', label: 'Fechamento', short: 'Final' },
]

const heroHighlights = [
  'Dados da PRF',
  'Apenas rodovias federais brasileiras',
  'Não representa todo o trânsito do Brasil',
]

const rhythmCards = [
  {
    id: 'accidents',
    label: 'Acidentes por dia',
    value: Math.round(totals.accidents / totalDays),
    kicker: 'Nas BRs analisadas, o problema não para.',
    microcopy: 'Outra viagem interrompida a cada 7 minutos.',
  },
  {
    id: 'fatal',
    label: 'Acidentes fatais por dia',
    value: Math.round(totals.fatalAccidents / totalDays),
    kicker: 'O risco se repete todos os dias.',
    microcopy: `Um acidente fatal a cada ${formatDuration(totalMinutes / totals.fatalAccidents)}.`,
  },
  {
    id: 'deaths',
    label: 'Mortes por dia',
    value: Math.round(totals.deaths / totalDays),
    kicker: 'Há casas esperando por alguém.',
    microcopy: `Uma morte a cada ${formatDuration(totalMinutes / totals.deaths)}.`,
  },
  {
    id: 'serious',
    label: 'Feridos graves por dia',
    value: Math.round(totals.seriousInjuries / totalDays),
    kicker: 'Nem toda vítima morre. Muitas seguem marcadas.',
    microcopy: 'Trauma grave em média 54 vezes por dia.',
  },
]

const panoramaCards = [
  {
    icon: AlertTriangle,
    label: 'Acidentes registrados',
    value: totals.accidents,
    note: 'ocorrências nas BRs entre 2023 e 2025',
  },
  {
    icon: ShieldAlert,
    label: 'Acidentes fatais',
    value: totals.fatalAccidents,
    note: 'casos em que a viagem não terminou igual começou',
  },
  {
    icon: Users,
    label: 'Pessoas envolvidas',
    value: totals.involved,
    note: 'vidas puxadas para a mesma consequência',
  },
  {
    icon: Clock3,
    label: 'Feridos graves',
    value: totals.seriousInjuries,
    note: 'sobreviventes com impacto severo depois da pista',
  },
]

const yearlyModes = {
  accidents: {
    label: 'Acidentes',
    title: 'O volume sobe em 2024 e segue alto em 2025.',
    text: 'Não há alívio real no recorte das BRs monitoradas pela PRF.',
    insight: 'Mesmo olhando só para rodovias federais, a recorrência já assusta.',
    accent: 'gold',
  },
  fatalAccidents: {
    label: 'Acidentes fatais',
    title: 'Dois anos seguidos acima de cinco mil casos fatais.',
    text: 'A morte não aparece como exceção. Ela volta.',
    insight: 'O problema permanece em patamar alto dentro do recorte analisado.',
    accent: 'copper',
  },
  deaths: {
    label: 'Vítimas fatais',
    title: 'Mais de seis mil vidas perdidas em 2024 e 2025.',
    text: 'Cada barra representa ausências reais.',
    insight: 'Mesmo sem representar todo o trânsito nacional, o recorte já é grave demais.',
    accent: 'red',
  },
}

const yearlyData = [
  { year: '2023', accidents: 67767, fatalAccidents: 4858, deaths: 5627 },
  { year: '2024', accidents: 73156, fatalAccidents: 5222, deaths: 6160 },
  { year: '2025', accidents: 72529, fatalAccidents: 5209, deaths: 6043 },
]

const riskTabs = {
  causes: {
    label: 'Causas',
    title: 'Muito risco começa antes da batida.',
    text: 'Atenção insuficiente, reação tardia e decisões sem margem aparecem de novo e de novo.',
    insight: 'Em muitos casos, o que faltou foi atenção.',
    unit: 'ocorrências',
    data: [
      { label: 'Reação tardia ou ineficiente do condutor', value: 31574, note: 'atenção que chegou tarde' },
      { label: 'Ausência de reação do condutor', value: 31459, note: 'segundos que não voltam' },
      { label: 'Acessar a via sem observar outros veículos', value: 20380, note: 'entrada sem margem' },
      { label: 'Velocidade incompatível', value: 12675, note: 'mais força, menos chance' },
      { label: 'Ingestão de álcool pelo condutor', value: 11138, note: 'risco assumido ao volante' },
    ],
  },
  types: {
    label: 'Tipos',
    title: 'O que mais acontece não é sempre o que mais mata.',
    text: 'Colisão traseira domina o volume. Colisão frontal carrega peso muito maior.',
    insight: 'Frequência e letalidade não contam a mesma história.',
    unit: 'ocorrências',
    data: [
      { label: 'Colisão traseira', value: 41229, note: 'distância e atenção falharam' },
      { label: 'Saída de leito carroçável', value: 31236, note: 'controle perdido' },
      { label: 'Colisão transversal', value: 27161, note: 'trajetos em choque' },
      { label: 'Colisão frontal', value: 14233, note: 'pouca chance de correção' },
      { label: 'Atropelamento de pedestre', value: 9356, note: 'o lado mais vulnerável da via' },
    ],
  },
  lethality: {
    label: 'Letalidade',
    title: 'Há erros que quase não dão segunda chance.',
    text: 'Contramão, colisão frontal e atropelamentos concentram risco extremo de morte.',
    insight: 'Atravessar a faixa pode atravessar uma família.',
    unit: 'letalidade',
    data: [
      { label: 'Pedestre andava na pista', value: 41.44, note: 'exposição total', percent: true },
      { label: 'Colisão frontal', value: 29.81, note: 'impacto direto', percent: true },
      { label: 'Atropelamento de pedestre', value: 28.97, note: 'corpo contra máquina', percent: true },
      { label: 'Transitar na contramão', value: 28.96, note: 'erro que invade a vida do outro', percent: true },
      { label: 'Ultrapassagem indevida', value: 16.62, note: 'segundos de pressa, anos de dor', percent: true },
    ],
  },
  patterns: {
    label: 'Padrões',
    title: 'A repetição mostra comportamento, não acaso.',
    text: 'Atenção, reação e decisão aparecem como núcleo do problema.',
    insight: 'A estrada não perdoa distrações repetidas.',
    unit: 'ocorrências agrupadas',
    data: [
      { label: 'Falha de atenção ou reação', value: 63033, note: 'tempo perdido quando mais importava' },
      { label: 'Decisão sem margem', value: 32955, note: 'escolha que ignora o outro' },
      { label: 'Risco assumido', value: 23813, note: 'álcool, velocidade ou sono' },
    ],
  },
  territory: {
    label: 'Território',
    title: 'O problema se espalha. Alguns corredores pesam ainda mais.',
    text: 'Não é todo o trânsito brasileiro. Ainda assim, o recorte das BRs já desenha áreas críticas.',
    insight: 'Mesmo nas BRs apenas, a escala já é alarmante.',
    unit: 'vítimas fatais',
    data: [
      { label: 'MG', value: 2285, note: 'Minas Gerais' },
      { label: 'BA', value: 1766, note: 'Bahia' },
      { label: 'PR', value: 1761, note: 'Paraná' },
      { label: 'SC', value: 1214, note: 'Santa Catarina' },
      { label: 'RJ', value: 980, note: 'Rio de Janeiro' },
    ],
  },
}

const humanSignal = {
  total: 114565,
  percent: 53.67,
  perDay: 105,
}

const storySteps = [
  {
    id: '01',
    title: 'Trajeto comum',
    text: 'Você segue na sua faixa. Tudo parece normal.',
    note: 'Quem está do outro lado do para-brisa também quer chegar em casa.',
  },
  {
    id: '02',
    title: 'Risco no sentido oposto',
    text: 'O erro ainda está longe. Mas ele já existe.',
    note: 'Nem toda vítima controla o perigo que se aproxima.',
  },
  {
    id: '03',
    title: 'Ultrapassagem indevida',
    text: 'Outro motorista invade a sua faixa e leva o risco até você.',
    note: 'Uma decisão errada pode atingir quem não errou.',
  },
  {
    id: '04',
    title: 'Sem tempo',
    text: 'A colisão frontal chega antes de qualquer correção.',
    note: 'Na BR, um segundo pode ser tudo.',
  },
  {
    id: '05',
    title: 'Depois da batida',
    text: 'O impacto termina na pista. A consequência continua fora dela.',
    note: 'A imprudência não para em quem a comete.',
  },
]

function formatDuration(minutes) {
  if (minutes < 60) return `${Math.round(minutes)} min`
  const hours = Math.floor(minutes / 60)
  const remaining = Math.round(minutes % 60)
  return `${hours}h${String(remaining).padStart(2, '0')}`
}

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
      { rootMargin: '-28% 0px -48% 0px', threshold: [0.2, 0.35, 0.55, 0.72] },
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
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ value, percent = false, suffix = '', duration = 1400 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [started, setStarted] = useState(Boolean(reduce))
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setStarted(true)
      setDisplay(value)
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce, value])

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return undefined
    }

    if (!started) {
      setDisplay(0)
      return undefined
    }

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, reduce, started, value])

  const formatted = percent ? decimal.format(display) : number.format(Math.round(display))

  return (
    <span ref={ref} className="count-up-number">
      {formatted}
      {percent ? '%' : suffix}
    </span>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </Reveal>
  )
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
          <span className="eyebrow">PRF · rodovias federais brasileiras · 2023 a 2025</span>
          <h1>Nas BRs, um erro pode mudar várias vidas.</h1>
          <p>
            Dados da Polícia Rodoviária Federal sobre acidentes em rodovias federais brasileiras.
            Não é todo o trânsito do Brasil. E já é grave o bastante.
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
              Sentir o ritmo
              <ArrowRight size={16} />
            </a>
            <a href="#colisao" className="button button-secondary">
              Entender a colisão
            </a>
          </div>

          <div className="hero-note">
            <Clock3 size={18} />
            <span>Em média, 16 pessoas morreram por dia nesse recorte das BRs.</span>
          </div>
        </Reveal>

        <Reveal className="hero-panel" delay={0.08}>
          <span className="panel-kicker">Vidas interrompidas</span>
          <strong className="hero-number">
            <CountUp value={totals.deaths} />
          </strong>
          <p>mortes registradas pela PRF nas rodovias federais brasileiras.</p>

          <div className="hero-panel-grid">
            <article>
              <span>Acidentes</span>
              <strong>
                <CountUp value={totals.accidents} duration={1500} />
              </strong>
            </article>
            <article>
              <span>Fatais</span>
              <strong>
                <CountUp value={totals.fatalAccidents} duration={1500} />
              </strong>
            </article>
          </div>

          <div className="hero-panel-footer">
            <strong>Recorte: BRs brasileiras.</strong>
            <span>Mesmo assim, o cenário já assusta.</span>
          </div>
        </Reveal>

        <a href="#ritmo" className="scroll-cue" aria-label="Ir para o ritmo do problema">
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  )
}

function RhythmSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = rhythmCards[active]

  useEffect(() => {
    if (paused) return undefined

    const timer = setInterval(() => {
      setActive((value) => (value + 1) % rhythmCards.length)
    }, 3600)

    return () => clearInterval(timer)
  }, [paused])

  return (
    <section className="story-section" id="ritmo">
      <div className="container">
        <SectionHeading
          eyebrow="Ritmo do problema"
          title="Isso não acontece às vezes. Acontece todos os dias."
          text="Transformar volume em tempo deixa a repetição mais clara. Nas BRs analisadas, o risco segue rodando."
        />

        <div className="rhythm-layout">
          <Reveal className="feature-panel feature-panel-large">
            <span className="metric-label">{current.label}</span>
            <AnimatePresence mode="wait">
              <motion.strong
                key={current.id}
                className="feature-number"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                <CountUp value={current.value} />
              </motion.strong>
            </AnimatePresence>
            <p className="feature-kicker">{current.kicker}</p>
            <div className="feature-inline">
              <Timer size={16} />
              {current.microcopy}
            </div>
          </Reveal>

          <Reveal className="rhythm-sidebar" delay={0.08}>
            <button type="button" className="toggle-button" onClick={() => setPaused((value) => !value)}>
              {paused ? <Play size={15} /> : <Pause size={15} />}
              {paused ? 'Retomar' : 'Pausar'}
            </button>

            {rhythmCards.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? 'rhythm-card active' : 'rhythm-card'}
                onClick={() => {
                  setActive(index)
                  setPaused(true)
                }}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.microcopy}</p>
              </button>
            ))}
          </Reveal>
        </div>

        <Reveal className="section-quote">
          <strong>Enquanto o tempo passa, a estrada repete o risco.</strong>
          <span>Recorte: ocorrências da PRF nas rodovias federais brasileiras.</span>
        </Reveal>
      </div>
    </section>
  )
}

function PanoramaSection() {
  return (
    <section className="story-section story-section-muted" id="panorama">
      <div className="container">
        <SectionHeading
          eyebrow="Panorama geral"
          title="Poucos números bastam para sentir o peso."
          text="Recorte: BRs brasileiras, 2023 a 2025. Não é todo o trânsito nacional."
        />

        <div className="panorama-layout">
          <Reveal className="impact-panel">
            <span className="impact-kicker">Vítimas fatais</span>
            <strong className="impact-number">
              <CountUp value={totals.deaths} duration={1600} />
            </strong>
            <p>Não são só ocorrências. São viagens interrompidas.</p>
          </Reveal>

          <div className="stats-grid">
            {panoramaCards.map((item, index) => (
              <Reveal key={item.label} className="stat-card" delay={0.06 + index * 0.05}>
                <item.icon size={18} />
                <span>{item.label}</span>
                <strong>
                  <CountUp value={item.value} duration={1500} />
                </strong>
                <p>{item.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EvolutionSection() {
  const [mode, setMode] = useState('accidents')
  const current = yearlyModes[mode]
  const max = Math.max(...yearlyData.map((item) => item[mode]))

  return (
    <section className="story-section" id="evolucao">
      <div className="container">
        <SectionHeading
          eyebrow="Evolução anual"
          title="Os anos mudam. O cenário segue pesado."
          text="Série anual das BRs monitoradas pela PRF. Leitura rápida, sem excesso."
        />

        <Reveal className="evolution-panel">
          <div className="tab-row" role="tablist" aria-label="Métricas anuais">
            {Object.entries(yearlyModes).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={key === mode ? 'active' : ''}
                onClick={() => setMode(key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="evolution-layout">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                className="evolution-copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="eyebrow">Leitura direta</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.insight}</strong>
              </motion.div>
            </AnimatePresence>

            <div className={`bars bars-${current.accent}`}>
              {yearlyData.map((item) => (
                <div key={item.year} className="bar-card">
                  <div className="bar-shell">
                    <span className="bar-fill" style={{ height: `${(item[mode] / max) * 100}%` }} />
                  </div>
                  <strong>{number.format(item[mode])}</strong>
                  <span>{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Ranking({ data, unit }) {
  const max = Math.max(...data.map((item) => item.value))

  return (
    <div className="ranking-list">
      {data.map((item, index) => (
        <article key={item.label} className="ranking-item">
          <div className="ranking-copy">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{item.label}</strong>
              <p>{item.note}</p>
            </div>
            <em>{item.percent ? `${decimal.format(item.value)}%` : number.format(item.value)}</em>
          </div>
          <div className="ranking-track" aria-label={`${item.label}: ${item.value} ${unit}`}>
            <span style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </article>
      ))}
    </div>
  )
}

function RiskSection() {
  const [active, setActive] = useState('causes')
  const current = riskTabs[active]

  return (
    <section className="story-section story-section-muted" id="riscos">
      <div className="container">
        <SectionHeading
          eyebrow="O que mais pesa"
          title="Ver padrões ajuda a entender onde o risco cresce."
          text="Causas, tipos, letalidade, padrões e território. Tudo em leitura curta e direta."
        />

        <Reveal className="risk-panel">
          <div className="tab-row tab-row-wrap" role="tablist" aria-label="Leituras de risco">
            {Object.entries(riskTabs).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={key === active ? 'active' : ''}
                onClick={() => setActive(key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="risk-layout">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="risk-copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="eyebrow">Leitura ativa</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.insight}</strong>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-ranking`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.24 }}
              >
                <Ranking data={current.data} unit={current.unit} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function HumanSection() {
  return (
    <section className="story-section" id="humano">
      <div className="container">
        <SectionHeading
          eyebrow="Fator humano"
          title="Quando atenção, reação e decisão aparecem tanto, o alerta é inevitável."
          text="Leitura analítica para conscientização. Não substitui a classificação oficial da PRF."
        />

        <div className="human-layout">
          <Reveal className="human-ring-card">
            <div className="ring-shell" style={{ '--ring-end': `${humanSignal.percent * 3.6}deg` }}>
              <strong>
                <CountUp value={humanSignal.percent} percent />
              </strong>
            </div>
            <div className="human-copy">
              <span className="eyebrow">Forte sinal humano</span>
              <h3>Mais da metade do recorte entra nessa leitura.</h3>
              <p>
                Grupo com sinais recorrentes de atenção insuficiente, reação tardia ou decisão imprudente.
              </p>
            </div>
          </Reveal>

          <div className="human-cards">
            <Reveal className="human-card" delay={0.06}>
              <span>Volume</span>
              <strong>
                <CountUp value={humanSignal.total} />
              </strong>
              <p>acidentes com forte sinal de falha humana.</p>
            </Reveal>

            <Reveal className="human-card" delay={0.1}>
              <span>Ritmo diário</span>
              <strong>
                <CountUp value={humanSignal.perDay} />
              </strong>
              <p>casos por dia, em média.</p>
            </Reveal>

            <Reveal className="human-card human-card-accent" delay={0.14}>
              <span>Mensagem</span>
              <strong>Dirigir com prudência ainda é uma das maiores proteções.</strong>
              <p>Não é juridiquês. É cuidado real na estrada.</p>
            </Reveal>
          </div>
        </div>
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
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(0)
  const current = storySteps[active]

  useEffect(() => {
    if (!started || active >= storySteps.length - 1) return undefined
    const timer = setTimeout(() => setActive((value) => value + 1), 2600)
    return () => clearTimeout(timer)
  }, [active, started])

  return (
    <section className="story-section story-section-muted" id="colisao">
      <div className="container">
        <SectionHeading
          eyebrow="Experiência narrativa"
          title="Nem toda vítima errou."
          text="Uma cena curta para lembrar algo simples: a imprudência de alguém pode atingir quem estava no caminho certo."
        />

        <Reveal className="collision-layout">
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
                <Play size={18} />
                Iniciar cena
              </button>
            ) : null}

            <div className="scene-caption">
              <span>Etapa {current.id}</span>
              <strong>{current.title}</strong>
            </div>
          </div>

          <div className="collision-copy">
            <div className="story-progress" aria-label={`Etapa ${active + 1} de ${storySteps.length}`}>
              <span style={{ width: `${((active + 1) / storySteps.length) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                className="story-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="eyebrow">Leitura da cena</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.note}</strong>
              </motion.article>
            </AnimatePresence>

            <div className="story-step-buttons">
              {storySteps.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === active ? 'active' : ''}
                  onClick={() => {
                    setStarted(true)
                    setActive(index)
                  }}
                >
                  <span>{item.id}</span>
                  {item.title}
                </button>
              ))}
            </div>

            <div className="story-cta">
              <button
                type="button"
                className="button button-secondary"
                disabled={active === 0}
                onClick={() => setActive((value) => Math.max(0, value - 1))}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              <button
                type="button"
                className="button button-primary"
                disabled={active === storySteps.length - 1}
                onClick={() => {
                  setStarted(true)
                  setActive((value) => Math.min(storySteps.length - 1, value + 1))
                }}
              >
                Próxima
                <ChevronRight size={16} />
              </button>
            </div>

            <div className={active === storySteps.length - 1 ? 'manifesto manifesto-final' : 'manifesto'}>
              <p>Uma ultrapassagem indevida pode atingir quem fez tudo certo.</p>
              <strong>{active === storySteps.length - 1 ? 'NÃO SEJA O IMPRUDENTE.' : 'Dirigir com prudência protege mais do que a sua rota.'}</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="story-section" id="fechamento">
      <div className="container">
        <Reveal className="closing-panel">
          <span className="eyebrow">Fechamento</span>
          <h2>Dirija com mais prudência.</h2>
          <p>Nas BRs, um erro pode mudar várias vidas. Não seja o imprudente.</p>

          <div className="closing-statements">
            <article>
              <strong>Em casa, sempre tem alguém esperando.</strong>
              <span>Voltar em segurança também é um ato de cuidado.</span>
            </article>
            <article>
              <strong>Não é todo o trânsito brasileiro.</strong>
              <span>É apenas o recorte das BRs monitoradas pela PRF. E já é grave o bastante.</span>
            </article>
          </div>

          <details className="methodology">
            <summary>
              <MapPinned size={16} />
              Fonte e recorte
            </summary>
            <div className="methodology-content">
              <p>Fonte: Polícia Rodoviária Federal.</p>
              <p>Recorte: acidentes em rodovias federais brasileiras entre 2023 e 2025.</p>
              <p>Este site não representa todo o trânsito do Brasil.</p>
              <p>A leitura do fator humano é analítica e voltada à conscientização.</p>
            </div>
          </details>

          <a href="#abertura" className="button button-primary closing-button">
            Voltar ao início
            <ArrowUp size={16} />
          </a>
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
        <RhythmSection />
        <PanoramaSection />
        <EvolutionSection />
        <RiskSection />
        <HumanSection />
        <CollisionSection />
        <ClosingSection />
      </main>
    </div>
  )
}
