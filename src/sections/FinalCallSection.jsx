import { motion } from 'framer-motion'

export function FinalCallSection({ finalCall }) {
  return (
    <section className="section-stack">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="final-panel"
      >
        <div className="final-panel-grid">
          <div className="space-y-5">
            <p className="section-eyebrow">Chamado final</p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              {finalCall.headline}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-soft)] sm:text-lg">{finalCall.body}</p>
          </div>

          <div className="grid gap-3">
            {finalCall.slogans.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                className="final-slogan"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
