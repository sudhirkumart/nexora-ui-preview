import { useEffect, useRef, useState } from 'react'
import { MessageSquareText, X } from 'lucide-react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  screenName: string
}

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function FeedbackModal({ isOpen, onClose, screenName }: FeedbackModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement as HTMLElement
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
  }, [isOpen, onClose])

  if (!isOpen) return null

  const closeModal = () => {
    setShowConfirmation(false)
    onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={closeModal}>
      <div
        className="feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon" aria-hidden="true">
              <MessageSquareText size={20} />
            </span>
            <div>
              <p className="eyebrow">Local preview feedback</p>
              <h2 id="feedback-title">Share an observation</h2>
            </div>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={closeModal}
            aria-label="Close feedback dialog"
            ref={closeButtonRef}
          >
            <X size={20} />
          </button>
        </div>

        {showConfirmation ? (
          <div className="feedback-confirmation" role="status">
            <span className="confirmation-mark" aria-hidden="true">✓</span>
            <h3>Feedback captured for this session</h3>
            <p>
              This is only a demonstration. Nothing has been submitted or stored.
              Submission integration will be added later.
            </p>
            <button className="button button-primary" type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setShowConfirmation(true)
            }}
          >
            <div className="form-grid">
              <label>
                <span>Screen name</span>
                <input type="text" value={screenName} readOnly />
              </label>
              <label>
                <span>Feedback category</span>
                <select defaultValue="Workflow">
                  <option>Workflow</option>
                  <option>Content</option>
                  <option>Visual design</option>
                  <option>Missing capability</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-full">
                <span>Feedback text</span>
                <textarea
                  rows={4}
                  placeholder="Describe what works, what is unclear, or what should change…"
                  required
                />
              </label>
              <label>
                <span>Customer relevance</span>
                <select defaultValue="Relevant to many">
                  <option>Relevant to one</option>
                  <option>Relevant to some</option>
                  <option>Relevant to many</option>
                  <option>Not yet known</option>
                </select>
              </label>
              <label>
                <span>Priority</span>
                <select defaultValue="Medium">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical to review</option>
                </select>
              </label>
            </div>
            <div className="modal-notice">
              <strong>Preview only.</strong> Nothing entered here is submitted or stored.
              Submission integration will be added later.
            </div>
            <div className="modal-actions">
              <button className="button button-secondary" type="button" onClick={closeModal}>
                Cancel
              </button>
              <button className="button button-primary" type="submit">
                Preview submission
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
