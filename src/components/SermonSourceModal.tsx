import { Link2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AccessibleDialog } from './AccessibleDialog'
import {
  sermonWorkflowStates,
  type SermonWorkflowState,
} from '../data/servicesMockData'

interface SermonSourceModalProps {
  isOpen: boolean
  initialSource: string
  initialState: SermonWorkflowState
  onClose: () => void
  onPreview: (source: string, state: SermonWorkflowState) => void
}

export function SermonSourceModal({
  isOpen,
  initialSource,
  initialState,
  onClose,
  onPreview,
}: SermonSourceModalProps) {
  const [source, setSource] = useState(initialSource)
  const [processingState, setProcessingState] = useState<SermonWorkflowState>(initialState)

  useEffect(() => {
    if (!isOpen) return

    setSource(initialSource)
    setProcessingState(initialState)
  }, [initialSource, initialState, isOpen])

  return (
    <AccessibleDialog
      bodyClassName="modal-open"
      className="modal-backdrop"
      isOpen={isOpen}
      labelledBy="sermon-source-title"
      onClose={onClose}
    >
      <div
        className="sermon-source-modal"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon" aria-hidden="true"><Link2 size={20} /></span>
            <div>
              <p className="eyebrow">Frontend preview</p>
              <h2 id="sermon-source-title">Add sermon source</h2>
            </div>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close sermon source dialog"
            onClick={onClose}
            data-dialog-initial-focus
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            onPreview(source, processingState)
          }}
        >
          <label>
            <span>Fictional YouTube or online link</span>
            <input
              type="url"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder="https://video.example.invalid/preview"
              required
            />
          </label>
          <label>
            <span>Simulated processing state</span>
            <select
              value={processingState}
              onChange={(event) => setProcessingState(event.target.value as SermonWorkflowState)}
            >
              {sermonWorkflowStates.map((state) => <option key={state}>{state}</option>)}
            </select>
          </label>

          <div className="modal-notice">
            <strong>Preview interaction only.</strong> No link is opened, uploaded, processed,
            submitted, or permanently saved.
          </div>
          <div className="modal-actions">
            <button className="button button-secondary" type="button" onClick={onClose}>Cancel</button>
            <button className="button button-primary" type="submit">Simulate source</button>
          </div>
        </form>
      </div>
    </AccessibleDialog>
  )
}
