import type { SermonWorkflowState } from '../data/servicesMockData'

interface SermonWorkflowStatusProps {
  state: SermonWorkflowState
  prominent?: boolean
}

export function SermonWorkflowStatus({ state, prominent = false }: SermonWorkflowStatusProps) {
  const tone = state.toLowerCase().replace(/\s+/g, '-')

  return (
    <span className={`sermon-workflow-status sermon-state-${tone}${prominent ? ' prominent' : ''}`}>
      <span aria-hidden="true" />
      {state}
    </span>
  )
}
