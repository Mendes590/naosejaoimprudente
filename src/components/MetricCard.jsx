import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldAlert, TriangleAlert, HeartPulse, Activity, Percent } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { formatMetric } from '../utils/formatters'

const icons = [ShieldAlert, TriangleAlert, HeartPulse, Activity, Percent]

export function MetricCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const value = typeof item.value === 'number' ? useCountUp(item.value, inView, 1300) : item.value
  const Icon = icons[index % icons.length]

  return (
    <motion.article
      ref={ref}
      className="metric-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <div className="metric-card-top">
        <span>{item.label}</span>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <strong>{typeof value === 'number' ? formatMetric(value, item.format) : value}</strong>
      <p>{item.detail}</p>
    </motion.article>
  )
}
