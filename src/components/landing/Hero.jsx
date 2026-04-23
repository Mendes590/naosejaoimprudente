import { motion } from 'framer-motion'
import { AnimatedMetric } from './AnimatedMetric'

export function Hero({ data, summary }) {
  return (
    <header className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-highlight)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            {data.eyebrow}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              {data.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-soft)] sm:text-xl">{data.subtitle}</p>
            <p className="text-xl font-semibold text-[var(--color-highlight)] sm:text-2xl">{data.message}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#conteudo"
              className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#ff7c5d]"
            >
              {data.cta}
            </a>
            <div className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-[var(--color-soft)]">
              Conscientização nas BRs, sem sensacionalismo
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {data.scope.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-[var(--color-soft)]">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="hero-panel panel-glow relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur"
        >
          <div className="hero-orbit absolute left-1/2 top-0 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full opacity-90 blur-xl" />
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-highlight)]">
              Panorama consolidado 2023-2025
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {summary.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.06 }}
                  className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5"
                >
                  <AnimatedMetric value={item.value} className="block text-3xl font-bold text-white sm:text-4xl" />
                  <p className="mt-2 text-sm leading-6 text-[var(--color-soft)]">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-highlight)]">Leitura correta</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-soft)]">
                Estes dados representam ocorrências atendidas pela PRF em rodovias federais. O painel não resume todo o
                trânsito brasileiro.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
