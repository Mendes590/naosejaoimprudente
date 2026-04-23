import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertOctagon, ArrowRightLeft, Flame } from 'lucide-react'
import { SectionIntro } from '../components/ui/SectionIntro'
import { formatMetric } from '../utils/formatters'

const views = [
  { id: 'causes', label: 'Causas' },
  { id: 'types', label: 'Tipos de acidente' },
]

function ComparisonBars({ items, tone }) {
  const max = Math.max(...items.map((item) => item.value))

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const width = `${(item.value / max) * 100}%`

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
            className="space-y-2"
          >
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-[72%] text-sm leading-6 text-[var(--color-soft)]">{item.label}</p>
              <strong className="text-sm text-white">{formatMetric(item.value, item.format)}</strong>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
              <div className={`bar-fill ${tone}`} style={{ width }} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function CauseVsLethalitySection({ comparisons }) {
  const [activeView, setActiveView] = useState('causes')
  const dataset = useMemo(() => comparisons[activeView], [activeView, comparisons])

  return (
    <section id="causas" className="section-stack">
      <SectionIntro
        eyebrow="Frequência x letalidade"
        title="Nem sempre o que mais acontece é o que mais mata."
        description="Nesta comparação, o visitante percebe o contraste entre presença e destruição. Contramão, atropelamento e colisão frontal são exemplos de eventos cuja gravidade explode quando acontecem nas BRs."
        aside="Dados da PRF em BRs federais. A comparação abaixo cruza volume de ocorrência com letalidade observada dentro do recorte analisado."
      />

      <div className="flex flex-wrap items-center gap-3">
        {views.map((view) => (
          <button
            key={view.id}
            type="button"
            onClick={() => setActiveView(view.id)}
            className={`tab-chip ${activeView === view.id ? 'active' : ''}`}
          >
            {view.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_18rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeView}-frequency`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-panel p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="metric-icon text-[var(--color-warning)]">
                <ArrowRightLeft size={18} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Mais frequentes</p>
                <p className="text-sm text-[var(--color-muted)]">O que mais aparece no recorte PRF/BRs</p>
              </div>
            </div>
            <ComparisonBars items={dataset.frequency} tone="from-warning" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeView}-lethality`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-panel p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="metric-icon text-[var(--color-danger-soft)]">
                <Flame size={18} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Mais letais</p>
                <p className="text-sm text-[var(--color-muted)]">O que carrega maior proporção de fatalidade</p>
              </div>
            </div>
            <ComparisonBars items={dataset.lethality} tone="from-danger" />
          </motion.div>
        </AnimatePresence>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="story-card"
          >
            <div className="mb-3 flex items-center gap-3">
              <AlertOctagon size={18} className="text-[var(--color-danger-soft)]" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)]">Alerta central</p>
            </div>
            <p className="text-sm leading-7 text-[var(--color-soft)]">{dataset.spotlight}</p>
          </motion.div>

          {comparisons.footnotes.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
              className="story-card"
            >
              <p className="text-sm leading-7 text-[var(--color-soft)]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
