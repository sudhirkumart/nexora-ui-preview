import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SermonSectionNav } from '../components/SermonSectionNav'
import { SermonWorkflowStatus } from '../components/SermonWorkflowStatus'
import {
  completedServices,
  type SermonWorkflowState,
} from '../data/servicesMockData'

const service = completedServices.find((item) => item.id === 'sunday-worship-12-july')!
const sermon = service.sermon!

export function SermonInsightsPage() {
  const [reviewState, setReviewState] = useState<SermonWorkflowState>('Insights ready for review')
  const [reviewMessage, setReviewMessage] = useState('')

  const markReviewed = () => {
    setReviewState('Reviewed')
    setReviewMessage('Marked as reviewed for this local preview session. This change is not permanently saved.')
  }

  return (
    <div className="page sermon-workflow-page sermon-insights-page">
      <Link className="service-back-link" to="/services/sunday-worship-12-july">
        <ArrowLeft size={16} aria-hidden="true" /> Back to completed service
      </Link>

      <SermonSectionNav />

      <section className="sermon-insights-hero" aria-labelledby="sermon-insights-title">
        <div>
          <p className="eyebrow">{service.name} · {service.dateLabel}</p>
          <h1 id="sermon-insights-title">Sermon insights</h1>
          <p>{sermon.title}</p>
        </div>
        <div className="sermon-review-state">
          <span>Draft status</span>
          <SermonWorkflowStatus state={reviewState} prominent />
        </div>
      </section>

      <div className="ai-draft-notice" role="note">
        <Sparkles size={20} aria-hidden="true" />
        <div>
          <strong>AI-generated draft. Review before sharing or publishing.</strong>
          <p>
            This fictional preview organises sample content only. It is not an approved theological
            interpretation and requires qualified human review.
          </p>
        </div>
      </div>

      <section className="sermon-summary-panel" aria-labelledby="sermon-summary-title">
        <p className="eyebrow">Draft overview</p>
        <h2 id="sermon-summary-title">Concise sermon summary</h2>
        <p>{sermon.insights.summary}</p>
      </section>

      <div className="sermon-insight-columns">
        <section className="sermon-insight-section" aria-labelledby="sermon-outline-title">
          <p className="eyebrow">Structure & themes</p>
          <h2 id="sermon-outline-title">Sermon outline</h2>

          <div className="insight-subsection">
            <h3>Main headings</h3>
            <ol>{sermon.insights.mainHeadings.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
          <div className="insight-subsection">
            <h3>Main themes</h3>
            <ul className="insight-theme-list">
              {sermon.insights.themes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="insight-subsection">
            <h3>Scripture references</h3>
            <ul className="scripture-reference-list">
              {sermon.insights.scriptureReferences.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="sermon-insight-section" aria-labelledby="review-prompts-title">
          <p className="eyebrow">Review prompts</p>
          <h2 id="review-prompts-title">From insight to action</h2>

          <div className="insight-subsection">
            <h3>Key takeaways</h3>
            <ul>{sermon.insights.keyTakeaways.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="insight-subsection">
            <h3>Suggested discussion questions</h3>
            <ul>{sermon.insights.discussionQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="insight-subsection">
            <h3>Suggested ministry or follow-up actions</h3>
            <ul>{sermon.insights.suggestedActions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>
      </div>

      <section className="sermon-review-actions" aria-labelledby="sermon-review-actions-title">
        <div>
          <p className="eyebrow">Local preview decision</p>
          <h2 id="sermon-review-actions-title">Review this draft</h2>
          <p>Marking the draft as reviewed changes only this browser session and does not publish anything.</p>
        </div>
        <button className="button button-primary" type="button" onClick={markReviewed} disabled={reviewState === 'Reviewed'}>
          <CheckCircle2 size={17} aria-hidden="true" />
          {reviewState === 'Reviewed' ? 'Reviewed locally' : 'Mark draft as reviewed'}
        </button>
      </section>
      {reviewMessage && <div className="service-action-feedback sermon-review-feedback" role="status">{reviewMessage}</div>}
    </div>
  )
}
