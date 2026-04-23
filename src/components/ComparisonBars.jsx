import { motion } from 'framer-motion'
import { formatMetric } from '../utils/formatters'

function getMax(items) {
  return Math.max(...items.map((item) => item.value))
}

export function ComparisonBars({ title, items, unit, tone = 'warm', format }) {
  const max = getMax(items)

  return (
    <div className="comparison-block">
      <div className="comparison-block-head">
        <h3>{title}</h3>
        <span>{unit}</span>
      </div>

      <div className="comparison-list">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            className="comparison-row"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
          >
            <div className="comparison-row-head">
              <span>{item.label}</span>
              <strong>{formatMetric(item.value, format)}</strong>
            </div>
            <div className="comparison-track">
              <motion.div
                className={`comparison-fill comparison-fill-${tone}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / max) * 100}%` }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
