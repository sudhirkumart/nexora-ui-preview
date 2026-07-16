import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CompletedServiceRecord } from '../data/servicesMockData'
import { SermonWorkflowStatus } from './SermonWorkflowStatus'

interface CompletedServiceRowProps {
  service: CompletedServiceRecord
}

export function CompletedServiceRow({ service }: CompletedServiceRowProps) {
  return (
    <article className="completed-service-row">
      <time dateTime={service.date}>{service.day} {service.month}</time>
      <div className="completed-service-name">
        <strong><Link to={service.actionTo}>{service.name}</Link></strong>
        <span><MapPin size={13} aria-hidden="true" /> {service.location}</span>
      </div>
      <div className="completed-service-attendance">
        <span>Attendance</span>
        <strong>{service.attendance}</strong>
      </div>
      <p>{service.operationalNote}</p>
      <SermonWorkflowStatus state={service.sermonInsightStatus} />
      {service.sermon ? (
        <div className="completed-service-actions" aria-label={`${service.name} sermon actions`}>
          <Link to="/services/sunday-worship-12-july/sermon">View sermon</Link>
          <Link to="/services/sunday-worship-12-july/sermon/insights">Review insights</Link>
          <Link to="/services/sunday-worship-12-july/sermon/questions">Review questions</Link>
        </div>
      ) : (
        <Link to={service.actionTo}>
          {service.actionLabel} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </article>
  )
}
