import { ArrowLeft, CalendarDays, Eye, MapPin, MessageCircleQuestion, Video } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SermonSourceModal } from '../components/SermonSourceModal'
import { SermonWorkflowStatus } from '../components/SermonWorkflowStatus'
import {
  completedServices,
  sermonWorkflowStates,
  type SermonWorkflowState,
} from '../data/servicesMockData'

const service = completedServices.find((item) => item.id === 'sunday-worship-12-july')!
const sermon = service.sermon!

export function CompletedServiceDetailPage() {
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false)
  const [sourceUrl, setSourceUrl] = useState(sermon.sourceUrl)
  const [workflowState, setWorkflowState] = useState<SermonWorkflowState>(sermon.workflowState)
  const [previewMessage, setPreviewMessage] = useState('')

  const handleSourcePreview = (source: string, state: SermonWorkflowState) => {
    setSourceUrl(source)
    setWorkflowState(state)
    setPreviewMessage(
      `Preview updated locally to “${state}”. The fictional source was not opened, processed, or saved.`,
    )
    setIsSourceModalOpen(false)
  }

  return (
    <div className="page completed-service-page">
      <Link className="service-back-link" to="/services">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Services & Events
      </Link>

      <section className="completed-service-hero" aria-labelledby="completed-service-title">
        <div>
          <p className="eyebrow">Completed service</p>
          <h1 id="completed-service-title">{service.name}</h1>
          <div className="service-detail-context">
            <span><CalendarDays size={16} aria-hidden="true" /> {service.dateLabel} · {service.time}</span>
            <span><MapPin size={16} aria-hidden="true" /> {service.location}</span>
          </div>
        </div>
        <span className="completed-state"><span aria-hidden="true" /> Completed</span>
        <dl className="completed-service-facts">
          <div><dt>Recorded attendance</dt><dd>{service.attendance}</dd></div>
          <div><dt>New visitors</dt><dd>{service.newVisitors}</dd></div>
          <div><dt>Follow-up tasks</dt><dd>{service.followUpTasks} assigned</dd></div>
        </dl>
      </section>

      <section className="completed-service-notes" aria-labelledby="service-notes-title">
        <div>
          <p className="eyebrow">Operational record</p>
          <h2 id="service-notes-title">Service notes</h2>
        </div>
        <p>{service.notes}</p>
      </section>

      <section className="sermon-record-panel" aria-labelledby="sermon-record-title">
        <div className="sermon-record-header">
          <div>
            <p className="eyebrow">Sermon</p>
            <h2 id="sermon-record-title">{sermon.title}</h2>
          </div>
          <SermonWorkflowStatus state={workflowState} prominent />
        </div>

        <div className="sermon-record-body">
          <dl className="sermon-metadata">
            <div><dt>Speaker</dt><dd>{sermon.speaker}</dd></div>
            <div><dt>Source type</dt><dd>{sermon.sourceType}</dd></div>
            <div><dt>Duration</dt><dd>{sermon.duration}</dd></div>
            <div><dt>Transcript status</dt><dd>{sermon.transcriptStatus}</dd></div>
            <div className="sermon-source-value">
              <dt>Fictional source placeholder</dt>
              <dd>{sourceUrl}</dd>
            </div>
          </dl>

          <div className="sermon-record-actions">
            <button className="button button-secondary" type="button" onClick={() => setIsSourceModalOpen(true)}>
              <Video size={17} aria-hidden="true" /> Add sermon source
            </button>
            <Link className="button button-secondary" to="/services/sunday-worship-12-july/sermon">
              <Video size={17} aria-hidden="true" /> View sermon
            </Link>
            <Link className="button button-secondary" to="/services/sunday-worship-12-july/sermon/insights">
              <Eye size={17} aria-hidden="true" /> Review insights
            </Link>
            <Link className="button button-primary" to="/services/sunday-worship-12-july/sermon/questions">
              <MessageCircleQuestion size={17} aria-hidden="true" /> Review questions
            </Link>
          </div>
        </div>

        <p className="sermon-preview-note">
          Preview interactions are local to this screen and are not permanently saved. No external
          video, transcript, or AI service is contacted.
        </p>
        {previewMessage && <div className="service-action-feedback" role="status">{previewMessage}</div>}

        <details className="sermon-state-support">
          <summary>Supported preview states</summary>
          <ul>
            {sermonWorkflowStates.map((state) => (
              <li key={state}><SermonWorkflowStatus state={state} /></li>
            ))}
          </ul>
        </details>
      </section>

      <SermonSourceModal
        isOpen={isSourceModalOpen}
        initialSource={sourceUrl}
        initialState={workflowState}
        onClose={() => setIsSourceModalOpen(false)}
        onPreview={handleSourcePreview}
      />
    </div>
  )
}
