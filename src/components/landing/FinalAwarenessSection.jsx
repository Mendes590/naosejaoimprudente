import { motion } from 'framer-motion'

export function FinalAwarenessSection({ consciousMode, onToggle, messages }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="panel-glow relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,73,0.16),rgba(255,255,255,0.05))] px-6 py-8 md:px-8"
    >
      <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-highlight)]">Conscientização final</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dirigir bem ainda é a forma mais simples de não virar parte desta estatística.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-soft)]">
            São dados da PRF sobre acidentes nas rodovias federais brasileiras. O recado é direto: atenção, sobriedade e
            responsabilidade ao volante salvam vidas.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onToggle}
              className="rounded-full border border-white/15 bg-black/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-black/35"
            >
              {consciousMode ? 'Ver mensagem da imprudência' : 'Voltar para direção consciente'}
            </button>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-highlight)]">
              {consciousMode ? 'Direção consciente' : 'Imprudência'}
            </p>
            <p className="mt-3 text-lg leading-8 text-white">
              {consciousMode ? messages.conscious : messages.reckless}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {messages.slogans.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-5 text-lg font-semibold text-white">
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
