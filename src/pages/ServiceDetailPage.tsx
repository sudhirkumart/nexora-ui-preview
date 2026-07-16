import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReadinessStatus } from '../components/ReadinessStatus'
import { postServiceSteps, services } from '../data/servicesMockData'

export function ServiceDetailPage() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)
  const [actionMessage, setActionMessage] = useState('')

  if (!service) {
    return (
      <div className="page service-detail-page service-not-found">
        <p className="eyebrow">Services & Events</p>
        <h1>Service preview not found</h1>
        <p>This fictional service record is not available in the current preview.</p>
        <Link className="button button-primary" to="/services">
          <ArrowLeft size={17} aria-hidden="true" /> Back to Services & Events
        </Link>
      </div>
    )
  }

  const runPreviewAction = (area: string, action: string) => {
    setActionMessage(
      `Preview interaction: “${action}” was opened for ${area}. Nothing has been saved or submitted.`,
    )
  }

  return (
    <div className="page service-detail-page">
      <Link className="service-back-link" to="/services">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Services & Events
      </Link>

      <section className="service-detail-hero" aria-labelledby="service-detail-title">
        <div className="service-detail-hero-copy">
          <p className="eyebrow">{service.type}</p>
          <h1 id="service-detail-title">{service.name}</h1>
          <div className="service-detail-context">
            <span><CalendarDays size={16} aria-hidden="true" /> {service.dateLabel} · {service.time}</span>
            <span><MapPin size={16} aria-hidden="true" /> {service.location}</span>
          </div>
        </div>
        <div className="service-detail-readiness">
          <span>Overall readiness</span>
          <ReadinessStatus status={service.preparationStatus} prominent />
          <small>{service.openVolunteerRoles} open volunteer roles</small>
        </div>
        <dl className="service-hero-facts">
          <div><dt>Expected attendance</dt><dd>{service.expectedAttendance}</dd></div>
          <div><dt>Volunteer arrival</dt><dd>{service.plan.volunteerArrival}</dd></div>
          <div><dt>Venue</dt><dd>{service.plan.venue}</dd></div>
        </dl>
      </section>

      {service.attentionIssues.length > 0 && (
        <section className="service-attention-panel" aria-labelledby="service-attention-title">
          <div className="service-section-heading">
            <div>
              <p className="eyebrow">Unresolved only</p>
              <h2 id="service-attention-title">Needs attention</h2>
            </div>
            <p>Preview actions are local and are not saved.</p>
          </div>
          <div className="service-issue-list">
            {service.attentionIssues.map((issue) => (
              <article className="service-issue-item" key={issue.id}>
                <div>
                  <strong>{issue.area}</strong>
                  <p>{issue.issue}</p>
                </div>
                <button
                  className="service-issue-action"
                  type="button"
                  onClick={() => runPreviewAction(issue.area, issue.action)}
                >
                  {issue.action} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
          {actionMessage && <div className="service-action-feedback" role="status">{actionMessage}</div>}
        </section>
      )}

      <div className="service-detail-grid">
        <section className="panel service-detail-section" aria-labelledby="readiness-overview-title">
          <div className="service-section-heading compact">
            <div>
              <p className="eyebrow">Preparation</p>
              <h2 id="readiness-overview-title">Readiness overview</h2>
            </div>
          </div>
          <div className="service-checklist">
            {service.readiness.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <ReadinessStatus status={item.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="panel service-detail-section" aria-labelledby="service-plan-title">
          <div className="service-section-heading compact">
            <div>
              <p className="eyebrow">Operational details</p>
              <h2 id="service-plan-title">Service plan</h2>
            </div>
          </div>
          <dl className="service-definition-list">
            <div><dt>Theme</dt><dd>{service.plan.theme}</dd></div>
            <div><dt>Service leader</dt><dd>{service.plan.serviceLeader}</dd></div>
            <div><dt>Speaker</dt><dd>{service.plan.speaker}</dd></div>
            <div><dt>Worship lead</dt><dd>{service.plan.worshipLead}</dd></div>
            <div><dt>Venue</dt><dd>{service.plan.venue}</dd></div>
            <div><dt>Volunteer arrival</dt><dd>{service.plan.volunteerArrival}</dd></div>
          </dl>
        </section>

        <section className="panel service-detail-section" aria-labelledby="volunteer-coverage-title">
          <div className="service-section-heading compact">
            <div>
              <p className="eyebrow">People & roles</p>
              <h2 id="volunteer-coverage-title">Volunteer coverage</h2>
            </div>
            <Link className="text-link" to="/volunteers">Open volunteers <ArrowRight size={15} /></Link>
          </div>
          <div className="service-role-list">
            {service.volunteerRoles.map((role) => (
              <div key={role.role}>
                <div><strong>{role.role}</strong><span>{role.owner}</span></div>
                <ReadinessStatus status={role.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="panel service-detail-section" aria-labelledby="attendance-preparation-title">
          <div className="service-section-heading compact">
            <div>
              <p className="eyebrow">Attendance & visitors</p>
              <h2 id="attendance-preparation-title">Attendance and visitor preparation</h2>
            </div>
          </div>
          <dl className="service-definition-list">
            <div><dt>Expected attendance</dt><dd>{service.expectedAttendance}</dd></div>
            <div><dt>Seating readiness</dt><dd>{service.attendancePreparation.seatingReadiness}</dd></div>
            <div><dt>Check-in method</dt><dd>{service.attendancePreparation.checkInMethod}</dd></div>
            <div><dt>Visitor welcome</dt><dd>{service.attendancePreparation.visitorWelcome}</dd></div>
            <div><dt>Follow-up owner</dt><dd>{service.attendancePreparation.followUpOwner}</dd></div>
            <div><dt>Follow-up deadline</dt><dd>{service.attendancePreparation.followUpDeadline}</dd></div>
          </dl>
        </section>
      </div>

      <section className="post-service-preview" aria-labelledby="post-service-title">
        <div>
          <p className="eyebrow">After completion</p>
          <h2 id="post-service-title">From gathering to follow-up</h2>
          <p>
            This informational preview shows how NEXORA can connect service preparation with
            attendance, visitor follow-up, care, and outreach workflows.
          </p>
        </div>
        <ol>
          {postServiceSteps.map((step, index) => (
            <li key={step}><span>{index + 1}</span>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
