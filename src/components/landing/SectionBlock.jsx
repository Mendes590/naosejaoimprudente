import { motion } from 'framer-motion'

export function SectionBlock({ eyebrow, title, description, children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`panel-glow relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 px-6 py-8 backdrop-blur md:px-8 ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-highlight)]">{eyebrow}</p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        {description ? <p className="text-base leading-7 text-[var(--color-soft)]">{description}</p> : null}
      </div>
      {children}
    </motion.section>
  )
}
