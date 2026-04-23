import { motion } from 'framer-motion'
import { SectionIntro } from '../components/SectionIntro'
import { formatNumber, formatPercent } from '../utils/formatters'

export function RiskContextSection({ contexts }) {
  const maxDeaths = Math.max(...contexts.roadTypes.map((item) => item.deaths))

  return (
    <section className="content-section">
      <SectionIntro eyebrow={contexts.eyebrow} title={contexts.title} text={contexts.subtitle} />

      <div className="context-grid">
        {contexts.items.map((item, index) => (
          <motion.article
            key={item.title}
            className="context-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
          >
            <p className="context-kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="road-risk-card"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <div className="road-risk-copy">
          <p className="section-eyebrow">Tipo de pista</p>
          <h3>Pista simples é muito mais letal do que pista dupla.</h3>
          <p>{contexts.closing}</p>
        </div>

        <div className="road-risk-bars">
          {contexts.roadTypes.map((item) => (
            <div key={item.label} className="road-risk-row">
              <div className="road-risk-head">
                <span>{item.label}</span>
                <strong>{formatNumber(item.deaths)} vítimas fatais</strong>
              </div>
              <div className="road-risk-track">
                <div className="road-risk-fill" style={{ width: `${(item.deaths / maxDeaths) * 100}%` }} />
              </div>
              <p className="road-risk-detail">Taxa fatal: {formatPercent(item.rate)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
