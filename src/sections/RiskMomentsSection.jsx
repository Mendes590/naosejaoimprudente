import { motion } from 'framer-motion'
import { MoonStar, Clock3, CalendarRange, Route } from 'lucide-react'
import { SectionIntro } from '../components/SectionIntro'

const icons = [CalendarRange, Clock3, MoonStar, Route]

export function RiskMomentsSection({ content }) {
  return (
    <section className="content-section">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="risk-grid">
        {content.panels.map((panel, index) => {
          const Icon = icons[index % icons.length]

          return (
            <motion.article
              key={panel.title}
              className="risk-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
            >
              <span className="mini-label">{panel.label}</span>
              <div className="risk-card-icon">
                <Icon size={18} />
              </div>
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
            </motion.article>
          )
        })}
      </div>

      <div className="risk-context-grid">
        <article className="risk-context panel">
          <span className="mini-label">Pista simples x pista dupla</span>
          <h3>{content.roadType.title}</h3>
          <p>{content.roadType.text}</p>

          <div className="roadtype-bars">
            {content.roadType.bars.map((bar, index) => (
              <div key={bar.label} className="roadtype-row">
                <div className="roadtype-head">
                  <div>
                    <strong>{bar.label}</strong>
                    <span>{bar.support}</span>
                  </div>
                  <strong>{bar.value.toFixed(2).replace('.', ',')}%</strong>
                </div>
                <div className="comparison-track">
                  <motion.div
                    className={`comparison-fill ${index === 0 ? 'comparison-fill-hot' : 'comparison-fill-soft'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(bar.value / 10) * 100}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="second-panel panel">
          <span className="mini-label">1 segundo</span>
          <h3>{content.second.title}</h3>
          <p>{content.second.text}</p>

          <div className="second-timeline">
            {content.second.labels.map((label, index) => (
              <div key={label} className="second-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
