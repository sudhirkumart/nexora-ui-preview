import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ServiceRecord } from '../data/servicesMockData'
import { ReadinessStatus } from './ReadinessStatus'

interface ServiceListItemProps {
  service: ServiceRecord
}

export function ServiceListItem({ service }: ServiceListItemProps) {
  return (
    <Link
      className={`service-list-item-link${service.preparationStatus === 'Attention needed' ? ' needs-attention' : ''}`}
      to={`/services/${service.id}`}
      aria-label={`${service.name}, ${service.dateLabel}, ${service.location}. Review service`}
    >
      <article className="service-list-item">
        <time className="service-list-date" dateTime={service.date}>
          <strong>{service.day}</strong>
          <span>{service.month}</span>
        </time>

        <div className="service-list-main">
          <span className="service-type">{service.type}</span>
          <h2>{service.name}</h2>
          <p><MapPin size={14} aria-hidden="true" /> {service.location}</p>
          <span>{service.time}</span>
        </div>

        <dl className="service-list-facts">
          <div>
            <dt>Expected</dt>
            <dd>{service.expectedAttendance}</dd>
          </div>
          <div>
            <dt>Preparation</dt>
            <dd><ReadinessStatus status={service.preparationStatus} /></dd>
          </div>
          <div>
            <dt>Volunteers</dt>
            <dd>
              {service.openVolunteerRoles > 0
                ? `${service.openVolunteerRoles} roles unfilled`
                : service.volunteerReadiness}
            </dd>
          </div>
        </dl>

        <span className="service-list-action">
          Review service <ArrowRight size={16} aria-hidden="true" />
        </span>
      </article>
    </Link>
  )
}
