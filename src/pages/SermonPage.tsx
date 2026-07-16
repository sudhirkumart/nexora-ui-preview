import { ArrowLeft, Eye, FileText, MessageCircleQuestion, Play } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SermonSectionNav } from '../components/SermonSectionNav'
import { SermonWorkflowStatus } from '../components/SermonWorkflowStatus'
import { completedServices } from '../data/servicesMockData'

const service = completedServices.find((item) => item.id === 'sunday-worship-12-july')!
const sermon = service.sermon!

export function SermonPage() {
  const [showTranscript, setShowTranscript] = useState(false)
  const [previewMessage, setPreviewMessage] = useState('')

  return (
    <div className="page sermon-workflow-page">
      <Link className="service-back-link" to="/services/sunday-worship-12-july">
        <ArrowLeft size={16} aria-hidden="true" /> Back to completed service
      </Link>

      <SermonSectionNav />

      <section className="sermon-source-hero" aria-labelledby="sermon-source-page-title">
        <div>
          <p className="eyebrow">{service.name} · {service.dateLabel}</p>
          <h1 id="sermon-source-page-title">{sermon.title}</h1>
          <p>{sermon.speaker}</p>
        </div>
        <div className="sermon-source-context">
          <span>{service.location}</span>
          <span>{service.time}</span>
        </div>
      </section>

      <section className="sermon-source-panel" aria-labelledby="sermon-source-details-title">
        <div className="sermon-source-panel-heading">
          <div>
            <p className="eyebrow">Sermon source</p>
            <h2 id="sermon-source-details-title">Source and review status</h2>
          </div>
          <SermonWorkflowStatus state={sermon.workflowState} prominent />
        </div>

        <dl className="sermon-source-details">
          <div><dt>Service</dt><dd>{service.name}</dd></div>
          <div><dt>Church location</dt><dd>{service.location}</dd></div>
          <div><dt>Source type</dt><dd>{sermon.sourceType}</dd></div>
          <div><dt>Duration</dt><dd>{sermon.duration}</dd></div>
          <div><dt>Transcript status</dt><dd>{sermon.transcriptStatus}</dd></div>
          <div><dt>Insight status</dt><dd>{sermon.workflowState}</dd></div>
          <div><dt>Question-review status</dt><dd>{sermon.questionReviewStatus}</dd></div>
          <div className="sermon-source-link"><dt>Fictional online-link placeholder</dt><dd>{sermon.sourceUrl}</dd></div>
        </dl>

        <div className="sermon-source-actions" aria-label="Sermon actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setPreviewMessage('Preview only: the fictional sermon source would open here. No external service was contacted.')}
          >
            <Play size={17} aria-hidden="true" /> Watch sermon
          </button>
          <button
            className="button button-secondary"
            type="button"
            aria-expanded={showTranscript}
            aria-controls="sermon-transcript-preview"
            onClick={() => setShowTranscript((current) => !current)}
          >
            <FileText size={17} aria-hidden="true" /> {showTranscript ? 'Hide transcript' : 'View transcript'}
          </button>
          <Link className="button button-secondary" to="/services/sunday-worship-12-july/sermon/insights">
            <Eye size={17} aria-hidden="true" /> Review insights
          </Link>
          <Link className="button button-primary" to="/services/sunday-worship-12-july/sermon/questions">
            <MessageCircleQuestion size={17} aria-hidden="true" /> Review questions
          </Link>
        </div>

        {previewMessage && <div className="service-action-feedback" role="status">{previewMessage}</div>}
        {showTranscript && (
          <div className="sermon-transcript-preview" id="sermon-transcript-preview">
            <p className="eyebrow">Local transcript preview</p>
            <p>{sermon.transcriptPreview}</p>
          </div>
        )}

        <p className="sermon-preview-note">
          Preview interaction only. No source is opened and no changes are permanently saved.
        </p>
      </section>
    </div>
  )
}
