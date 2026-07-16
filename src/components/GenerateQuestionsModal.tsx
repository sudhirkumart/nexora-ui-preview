import { Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  questionAudiences,
  questionStyles,
  type QuestionAudience,
  type QuestionStyle,
} from '../data/servicesMockData'

export interface QuestionGenerationRequest {
  audience: QuestionAudience
  style: QuestionStyle
  count: 3 | 5 | 10
}

interface GenerateQuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (request: QuestionGenerationRequest) => void
}

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function GenerateQuestionsModal({
  isOpen,
  onClose,
  onGenerate,
}: GenerateQuestionsModalProps) {
  const [audience, setAudience] = useState<QuestionAudience>('General congregation')
  const [style, setStyle] = useState<QuestionStyle>('Reflection')
  const [count, setCount] = useState<3 | 5 | 10>(3)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

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

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="generate-questions-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="generate-questions-title"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon" aria-hidden="true"><Sparkles size={20} /></span>
            <div>
              <p className="eyebrow">Local simulation</p>
              <h2 id="generate-questions-title">Generate questions</h2>
            </div>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close generate questions dialog"
            onClick={onClose}
            ref={closeButtonRef}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            onGenerate({ audience, style, count })
          }}
        >
          <label>
            <span>Audience</span>
            <select value={audience} onChange={(event) => setAudience(event.target.value as QuestionAudience)}>
              {questionAudiences.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Question style</span>
            <select value={style} onChange={(event) => setStyle(event.target.value as QuestionStyle)}>
              {questionStyles.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <fieldset>
            <legend>Number of questions</legend>
            <div className="question-count-options">
              {([3, 5, 10] as const).map((option) => (
                <label key={option}>
                  <input
                    checked={count === option}
                    name="question-count"
                    onChange={() => setCount(option)}
                    type="radio"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="modal-notice">
            <strong>Preview interaction only.</strong> A fixed set of fictional sample questions will
            be added locally. No AI or external service is contacted.
          </div>
          <div className="modal-actions">
            <button className="button button-secondary" type="button" onClick={onClose}>Cancel</button>
            <button className="button button-primary" type="submit">Simulate generation</button>
          </div>
        </form>
      </div>
    </div>
  )
}
