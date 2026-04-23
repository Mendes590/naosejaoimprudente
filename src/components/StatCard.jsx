import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { formatMetric } from '../utils/formatters'

function useInViewport() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  return [ref, visible]
}

export function StatCard({ card, delay = 0 }) {
  const [ref, active] = useInViewport()
  const reducedMotion = useReducedMotion()
  const animatedValue = useCountUp(card.value ?? 0, active && !reducedMotion, 1400)
  const displayValue = card.value == null ? '45–59' : formatMetric(active ? animatedValue : 0, card.format)

  return (
    <motion.article
      ref={ref}
      className="editorial-stat-card"
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay }}
    >
      <p className="editorial-stat-label">{card.label}</p>
      <strong className="editorial-stat-value">{displayValue}</strong>
      <p className="editorial-stat-detail">{card.detail}</p>
    </motion.article>
  )
}
