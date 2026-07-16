import type { ServiceReadiness } from '../data/servicesMockData'

interface ReadinessStatusProps {
  status: ServiceReadiness
  prominent?: boolean
}

export function ReadinessStatus({ status, prominent = false }: ReadinessStatusProps) {
  const tone = status.toLowerCase().replace(/\s+/g, '-')

  return (
    <span className={`readiness-indicator readiness-indicator-${tone}${prominent ? ' prominent' : ''}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  )
}
