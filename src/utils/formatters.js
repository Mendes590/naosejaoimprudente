const numberFormat = new Intl.NumberFormat('pt-BR')

export function formatNumber(value) {
  return numberFormat.format(Math.round(value))
}

export function formatDecimal(value) {
  return value.toFixed(2).replace('.', ',')
}

export function formatPercent(value) {
  return `${formatDecimal(value)}%`
}

export function formatMetric(value, format) {
  if (format === 'percent') return formatPercent(value)
  if (format === 'decimal') return formatDecimal(value)
  return formatNumber(value)
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
