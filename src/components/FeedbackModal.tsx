import { useState } from 'react'
import { MessageSquareText, X } from 'lucide-react'
import { AccessibleDialog } from './AccessibleDialog'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  screenName: string
}

export function FeedbackModal({ isOpen, onClose, screenName }: FeedbackModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const closeModal = () => {
    setShowConfirmation(false)
    onClose()
  }

  return (
    <AccessibleDialog
      bodyClassName="modal-open"
      className="modal-backdrop"
      isOpen={isOpen}
      labelledBy="feedback-title"
      onClose={closeModal}
    >
      <div
        className="feedback-modal"
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
            data-dialog-initial-focus
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
    </AccessibleDialog>
  )
}
