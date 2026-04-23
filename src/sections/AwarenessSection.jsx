import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CircleAlert } from 'lucide-react'
import { SectionIntro } from '../components/ui/SectionIntro'

export function AwarenessSection({ awareness }) {
  const [activeFactor, setActiveFactor] = useState(awareness.factors[0])
  const { scrollYProgress } = useScroll()
  const markerY = useTransform(scrollYProgress, [0.35, 0.95], [0, 320])
  const activeIndex = awareness.factors.findIndex((item) => item.id === activeFactor.id)

  return (
    <section id="conscientizacao" className="section-stack">
      <SectionIntro
        eyebrow="Jornada de conscientização"
        title={awareness.title}
        description={awareness.subtitle}
        aside={awareness.disclaimer}
      />

      <div className="grid gap-6 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="glass-panel relative hidden overflow-hidden p-6 xl:block">
          <div className="road-column">
            <div className="road-column-line" />
            <motion.div className="road-marker" style={{ y: markerY }} />
            {awareness.factors.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFactor(item)}
                className={`road-stop ${activeIndex === index ? 'active' : ''}`}
                style={{ top: `${36 + index * 18}%` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {awareness.factors.map((factor) => (
              <button
                key={factor.id}
                type="button"
                onClick={() => setActiveFactor(factor)}
                className={`tab-chip ${activeFactor.id === factor.id ? 'active' : ''}`}
              >
                {factor.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeFactor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="awareness-stage"
          >
            <div className="awareness-grid">
              <div className="space-y-5">
                <p className="section-eyebrow">Criticidade observada</p>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{activeFactor.headline}</h3>
                <p className="max-w-2xl text-base leading-8 text-[var(--color-soft)]">{activeFactor.body}</p>
                <div className="inline-flex rounded-full border border-[var(--color-danger-soft)]/35 bg-[var(--color-danger-soft)]/12 px-4 py-2 text-sm font-semibold text-[var(--color-danger-soft)]">
                  {activeFactor.statLabel}
                </div>
              </div>

              <div className="glass-panel min-h-[16rem] bg-black/20 p-6">
                <div className="flex items-center gap-3">
                  <CircleAlert size={18} className="text-[var(--color-highlight)]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)]">Mensagem central</p>
                </div>
                <div className="mt-6 space-y-4">
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {activeFactor.label === 'Contramão' ? 'Contramão não é atalho. É tragédia.' : 'Um segundo pode mudar tudo.'}
                  </p>
                  <p className="text-sm leading-7 text-[var(--color-soft)]">
                    Cada fator aqui foi destacado por aparecer nos dados reais da PRF sobre as BRs federais brasileiras. A escolha ao volante continua sendo humana.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
