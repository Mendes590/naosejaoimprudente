import { motion } from 'framer-motion'
import { SectionIntro } from '../components/SectionIntro'

export function FinalReflectionSection({ content }) {
  return (
    <section className="content-section">
      <div className="final-panel panel">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} align="center" />

        <div className="final-statements">
          {content.statements.map((statement, index) => (
            <motion.div
              key={statement}
              className="final-statement"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
            >
              {statement}
            </motion.div>
          ))}
        </div>

        <div className="final-manifesto">
          <p>Você pode fazer tudo certo e ainda assim sofrer pelo erro de outra pessoa.</p>
          <strong>NÃO SEJA O IMPRUDENTE.</strong>
        </div>

        <p className="final-note">{content.note}</p>
      </div>
    </section>
  )
}
