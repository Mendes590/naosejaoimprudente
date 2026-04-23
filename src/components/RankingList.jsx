import { motion } from 'framer-motion'
import { formatNumber } from '../utils/formatters'

export function RankingList({ title, items }) {
  const max = Math.max(...items.map((item) => item.value))

  return (
    <article className="ranking-card">
      <div className="ranking-head">
        <h3>{title}</h3>
      </div>

      <div className="ranking-list">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            className="ranking-item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
          >
            <div className="ranking-item-main">
              <span className="ranking-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.support}</p>
              </div>
            </div>

            <div className="ranking-item-side">
              <strong>{formatNumber(item.value)}</strong>
              <div className="ranking-track">
                <motion.div
                  className="ranking-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.value / max) * 100}%` }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, delay: index * 0.06 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </article>
  )
}
