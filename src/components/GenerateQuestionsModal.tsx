import { Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { AccessibleDialog } from './AccessibleDialog'
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

export function GenerateQuestionsModal({
  isOpen,
  onClose,
  onGenerate,
}: GenerateQuestionsModalProps) {
  const [audience, setAudience] = useState<QuestionAudience>('General congregation')
  const [style, setStyle] = useState<QuestionStyle>('Reflection')
  const [count, setCount] = useState<3 | 5 | 10>(3)

  return (
    <AccessibleDialog
      bodyClassName="modal-open"
      className="modal-backdrop"
      isOpen={isOpen}
      labelledBy="generate-questions-title"
      onClose={onClose}
    >
      <div
        className="generate-questions-modal"
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
            data-dialog-initial-focus
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
    </AccessibleDialog>
  )
}
