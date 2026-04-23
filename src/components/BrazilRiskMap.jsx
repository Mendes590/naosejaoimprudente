import { useMemo } from 'react'
import brazil from '@svg-maps/brazil'
import { formatMetric } from '../utils/formatters'

function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

function mixColor(from, to, amount) {
  const start = hexToRgb(from)
  const end = hexToRgb(to)
  const mix = (a, b) => Math.round(a + (b - a) * amount)
  return `rgb(${mix(start.r, end.r)}, ${mix(start.g, end.g)}, ${mix(start.b, end.b)})`
}

export function BrazilRiskMap({ metrics, activeUf, hoveredUf, onHover }) {
  const valueById = useMemo(
    () =>
      metrics.reduce((acc, item) => {
        acc[item.uf.toLowerCase()] = item
        return acc
      }, {}),
    [metrics],
  )

  const max = Math.max(...metrics.map((item) => item.value))

  return (
    <div className="map-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,118,74,0.18),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(245,195,99,0.14),transparent_36%)]" />
      <svg viewBox={brazil.viewBox} className="relative z-10 h-full w-full">
        {brazil.locations.map((location) => {
          const item = valueById[location.id]
          const strength = item ? item.value / max : 0
          const fill = item ? mixColor('#101319', '#ff6b4b', 0.25 + strength * 0.75) : 'rgba(255,255,255,0.08)'
          const isActive = activeUf === item?.uf || hoveredUf === item?.uf

          return (
            <path
              key={location.id}
              d={location.path}
              fill={fill}
              stroke={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.18)'}
              strokeWidth={isActive ? 2.2 : 1}
              style={{
                filter: isActive ? 'drop-shadow(0 0 18px rgba(255,107,75,0.55))' : 'none',
                transition: 'fill 220ms ease, stroke 220ms ease, filter 220ms ease',
              }}
              onMouseEnter={() => item && onHover(item.uf)}
              onMouseLeave={() => onHover(null)}
            />
          )
        })}
      </svg>

      <div className="relative z-10 mt-4 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 text-sm text-[var(--color-soft)] sm:grid-cols-3">
        {metrics.slice(0, 3).map((item) => (
          <div key={item.uf} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.uf}</p>
            <p className="mt-2 text-lg font-semibold text-white">{formatMetric(item.value, item.format)}</p>
            <p className="mt-1 text-xs">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
