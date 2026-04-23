import { motion } from 'framer-motion'

export function SectionIntro({ eyebrow, title, description, aside }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-4"
      >
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? <p className="max-w-3xl text-base leading-7 text-[var(--color-soft)] sm:text-lg">{description}</p> : null}
      </motion.div>

      {aside ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 text-sm leading-6 text-[var(--color-soft)] shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur"
        >
          {aside}
        </motion.div>
      ) : null}
    </div>
  )
}
