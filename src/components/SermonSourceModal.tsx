import { Link2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function SermonSourceModal({
  isOpen,
  initialSource,
  initialState,
  onClose,
  onPreview,
}: SermonSourceModalProps) {
  const [source, setSource] = useState(initialSource)
  const [processingState, setProcessingState] = useState<SermonWorkflowState>(initialState)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement as HTMLElement
    setSource(initialSource)
    setProcessingState(initialState)
    document.body.classList.add('modal-open')
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      triggerRef.current?.focus()
    }
  }, [initialSource, initialState, isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="sermon-source-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sermon-source-title"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
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
            ref={closeButtonRef}
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
    </div>
  )
}
