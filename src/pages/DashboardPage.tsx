import { ArrowRight, HandHeart, MapPin, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  attentionSummary,
  networkPulse,
  upcomingServices,
} from '../data/mockData'

const exceptionIcons = {
  volunteers: HandHeart,
  visitors: UserPlus,
  locations: MapPin,
}

const countWords: Record<number, string> = {
  0: 'No',
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
}

export function DashboardPage() {
  const attentionItems = attentionSummary
    .filter((item) => item.requiresAttention)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4)

  const nextImportantService =
    upcomingServices.find((service) => service.requiresAttention) ?? upcomingServices[0]

  const attentionCount = attentionItems.length
  const attentionCountLabel = countWords[attentionCount] ?? String(attentionCount)
  const operationalSummary = attentionCount === 0
    ? 'The network is operating normally. Nothing requires immediate attention.'
    : `The network is operating normally. ${attentionCountLabel} ${attentionCount === 1 ? 'item needs' : 'items need'} attention before this weekend.`

  return (
    <div className="page dashboard-page decision-dashboard exception-dashboard">
      <section className="page-heading dashboard-heading exception-dashboard-heading">
        <div>
          <p className="eyebrow">Wednesday, 15 July · Global Office</p>
          <h1>Good evening, Advisor</h1>
          <p className="operational-summary">{operationalSummary}</p>
        </div>
      </section>

      <section className="exception-list-section" aria-labelledby="attention-list-title">
        <div className="minimal-section-header">
          <div>
            <p className="eyebrow">Exceptions only</p>
            <h2 id="attention-list-title">Needs your attention</h2>
          </div>
          <p>{attentionCount} priorities to review</p>
        </div>

        <div className="exception-list">
          {attentionItems.map((item) => {
            const Icon = exceptionIcons[item.icon as keyof typeof exceptionIcons]
            return (
              <article className="exception-item" key={item.label}>
                <span className="exception-icon" aria-hidden="true"><Icon size={19} /></span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
                <Link className="exception-action" to={item.to}>
                  {item.actionLabel} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <div className="minimal-dashboard-grid">
        <section className="panel next-service-panel" aria-labelledby="next-service-title">
          <div className="minimal-section-header">
            <div>
              <p className="eyebrow">Next important service</p>
              <h2 id="next-service-title">{nextImportantService.name}</h2>
            </div>
          </div>

          <div className="next-service-context">
            <time dateTime={`2026-07-${nextImportantService.day}`}>
              <strong>{nextImportantService.day}</strong>
              <span>{nextImportantService.month}</span>
            </time>
            <div>
              <p><MapPin size={15} aria-hidden="true" /> {nextImportantService.location}</p>
              <strong>{nextImportantService.time}</strong>
            </div>
          </div>

          <dl className="service-decision-details">
            <div>
              <dt>Expected attendance</dt>
              <dd>{nextImportantService.expectedAttendance}</dd>
            </div>
            <div>
              <dt>Volunteer readiness</dt>
              <dd className="service-attention-text">{nextImportantService.volunteerReadiness}</dd>
            </div>
            <div>
              <dt>Open volunteer roles</dt>
              <dd>{nextImportantService.openVolunteerRoles}</dd>
            </div>
          </dl>

          <Link className="service-action-link" to="/services/community-worship-gathering">
            Review service readiness <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <section className="panel network-pulse-panel" aria-labelledby="network-pulse-title">
          <div className="minimal-section-header">
            <div>
              <p className="eyebrow">At a glance</p>
              <h2 id="network-pulse-title">Network pulse</h2>
            </div>
          </div>
          <dl className="network-pulse-list">
            {networkPulse.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}
