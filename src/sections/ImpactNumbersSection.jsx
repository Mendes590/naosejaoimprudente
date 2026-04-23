import { motion } from 'framer-motion'
import { SectionIntro } from '../components/SectionIntro'
import { MetricCard } from '../components/MetricCard'

export function ImpactNumbersSection({ content }) {
  return (
    <section className="content-section" id="dados-centrais">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="impact-layout">
        <motion.article
          className="impact-spotlight panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mini-label">{content.spotlight.kicker}</span>
          <h3>{content.spotlight.title}</h3>
          <p>{content.spotlight.text}</p>
        </motion.article>

        <div className="metrics-grid metrics-grid-compact">
          {content.cards.map((item, index) => (
            <MetricCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="footnote-row">
        {content.footnotes.map((note) => (
          <span key={note}>{note}</span>
        ))}
      </div>
    </section>
  )
}
