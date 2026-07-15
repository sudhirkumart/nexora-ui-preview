import type { PreviewStatus } from '../data/mockData'

interface StatusBadgeProps {
  status: PreviewStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const className = status.toLowerCase().replace(/\s+/g, '-')
  return <span className={`status-badge status-${className}`}>{status}</span>
}
