import { motion } from 'framer-motion'
import { ArrowDownRight, ChevronDown, Shield } from 'lucide-react'

export function HeroSection({ content }) {
  return (
    <header className="hero" id="topo">
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-horizon-glow" />
        <div className="hero-road" />
        <div className="hero-road-center" />
        <div className="hero-road-edge hero-road-edge-left" />
        <div className="hero-road-edge hero-road-edge-right" />
        <div className="hero-light-trail hero-light-trail-left" />
        <div className="hero-light-trail hero-light-trail-right" />

        <div className="hero-car hero-car-near">
          <span className="hero-car-roof" />
          <span className="hero-car-lights hero-car-lights-rear" />
        </div>

        <div className="hero-car hero-car-far">
          <span className="hero-car-roof" />
          <span className="hero-car-lights hero-car-lights-front" />
        </div>
      </div>

      <div className="hero-layout">
        <motion.div
          className="hero-copy panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h1 className="hero-title">{content.title}</h1>
          <p className="hero-subtitle">{content.subtitle}</p>
          <p className="hero-body">{content.body}</p>

          <div className="hero-narrative">
            {content.narrative.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <p className="hero-quote">{content.quote}</p>

          <div className="hero-actions">
            <a className="button-primary" href="#dados-centrais">
              {content.ctaPrimary}
              <ArrowDownRight size={16} />
            </a>
            <a className="button-secondary" href="#nao-parece-mas-mata">
              {content.ctaSecondary}
            </a>
          </div>

          <div className="hero-badges">
            {content.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </motion.div>

        <motion.aside
          className="hero-aside panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-aside-head">
            <Shield size={16} />
            <span>{content.asideTitle}</span>
          </div>

          <p>{content.asideText}</p>
          <p className="hero-aside-note">
            Dados da Polícia Rodoviária Federal sobre acidentes em rodovias federais brasileiras
            entre 2023 e 2025.
          </p>

          <div className="hero-highlight-list">
            {content.highlights.map((item) => (
              <div key={item.label} className="hero-highlight">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-aside-footer">
            <p>São ocorrências registradas pela PRF nas rodovias federais. Não representam todo o trânsito do Brasil.</p>
            <a className="hero-scroll" href="#dados-centrais">
              <ChevronDown size={14} />
              Role e percorra a experiência
            </a>
          </div>
        </motion.aside>
      </div>
    </header>
  )
}
