import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const number = new Intl.NumberFormat('pt-BR')

export function AnimatedCount({ value, suffix = '', duration = 1400, className = '' }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const [visible, setVisible] = useState(Boolean(reduceMotion))
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true)
      setDisplay(value)
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, value])

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value)
      return undefined
    }

    if (!visible) {
      setDisplay(0)
      return undefined
    }

    let frame = 0
    const startedAt = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(value * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, reduceMotion, value, visible])

  return (
    <span ref={ref} className={className}>
      {number.format(Math.round(display))}
      {suffix}
    </span>
  )
}
