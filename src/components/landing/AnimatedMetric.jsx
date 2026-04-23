import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { formatMetric } from '../../utils/formatters'

export function AnimatedMetric({ value, format, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const animatedValue = useCountUp(typeof value === 'number' ? value : 0, isInView)

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {typeof value === 'number' ? formatMetric(animatedValue, format) : value}
    </motion.span>
  )
}
