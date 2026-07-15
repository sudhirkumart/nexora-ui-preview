import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  MapPin,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  organisation,
  programOutcomes,
  recentActivities,
  summaryMetrics,
  upcomingEvents,
} from '../data/mockData'
import { StatusBadge } from '../components/StatusBadge'

const metricIcons = {
  people: Users,
  programs: Target,
  outreach: Sparkles,
  locations: MapPin,
}

export function DashboardPage() {
  return (
    <div className="page dashboard-page">
      <section className="page-heading dashboard-heading">
        <div>
          <p className="eyebrow">Wednesday, 15 July · Global Office</p>
          <h1>Good evening, Advisor</h1>
          <p className="page-description">
            Here is a fictional snapshot of progress across {organisation.name}.
          </p>
        </div>
        <div className="page-heading-meta">
          <span>Dashboard workflow</span>
          <StatusBadge status="Demo Ready" />
        </div>
      </section>

      <section className="organisation-overview" aria-labelledby="organisation-summary-title">
        <div className="organisation-overview-copy">
          <span className="section-icon warm" aria-hidden="true">
            <Building2 size={21} />
          </span>
          <div>
            <p className="eyebrow">Organisation summary</p>
            <h2 id="organisation-summary-title">{organisation.name}</h2>
            <p>{organisation.description}</p>
          </div>
        </div>
        <div className="hierarchy-flow" aria-label="Five-level organisation hierarchy">
          {organisation.hierarchy.map((level, index) => (
            <div className="hierarchy-step" key={level.name}>
              <span>{index + 1}</span>
              <div>
                <strong>{level.name}</strong>
                <small>{level.type}</small>
              </div>
            </div>
          ))}
        </div>
        <Link className="text-link" to="/organisations">
          View organisation structure <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="metric-grid" aria-label="Organisation metrics">
        {summaryMetrics.map((metric) => {
          const Icon = metricIcons[metric.icon as keyof typeof metricIcons]
          return (
            <article className="metric-card" key={metric.label}>
              <div className="metric-card-top">
                <span className={`metric-icon metric-${metric.icon}`} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="metric-trend">{metric.trend}</span>
              </div>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <span className="metric-detail">{metric.detail}</span>
            </article>
          )
        })}
      </section>

      <div className="dashboard-grid">
        <section className="panel activities-panel" aria-labelledby="recent-activities-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Across the network</p>
              <h2 id="recent-activities-title">Recent activity</h2>
            </div>
            <button className="text-button" type="button">View all</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <article className="activity-item" key={activity.title}>
                <span className={`activity-marker activity-${activity.type}`} aria-hidden="true">
                  <CircleDot size={17} />
                </span>
                <div className="activity-copy">
                  <strong>{activity.title}</strong>
                  <p>{activity.description}</p>
                </div>
                <time>{activity.time}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="panel events-panel" aria-labelledby="upcoming-events-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Next on the calendar</p>
              <h2 id="upcoming-events-title">Upcoming events</h2>
            </div>
            <CalendarDays size={19} aria-hidden="true" />
          </div>
          <div className="event-list">
            {upcomingEvents.map((event) => (
              <article className="event-item" key={event.title}>
                <time className="event-date" dateTime={`2026-07-${event.day}`}>
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                </time>
                <div className="event-copy">
                  <span className="event-tag">{event.tag}</span>
                  <h3>{event.title}</h3>
                  <p>{event.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel coverage-panel" aria-labelledby="coverage-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Illustrative only</p>
              <h2 id="coverage-title">Geographic coverage</h2>
            </div>
            <StatusBadge status="Concept" />
          </div>
          <div className="coverage-visual" role="img" aria-label="Abstract representation of three coverage zones and five sample locations">
            <div className="coverage-shape shape-one" />
            <div className="coverage-shape shape-two" />
            <div className="coverage-shape shape-three" />
            <span className="map-point point-one"><i />Global Office</span>
            <span className="map-point point-two"><i />Country Office</span>
            <span className="map-point point-three"><i />North Region</span>
            <span className="map-point point-four"><i />Community Centre</span>
            <span className="map-point point-five"><i />Outreach Centre</span>
            <div className="coverage-legend">
              <span><i className="legend-dot active" />Active sample location</span>
              <span><i className="legend-zone" />Illustrative coverage zone</span>
            </div>
          </div>
          <div className="coverage-summary">
            <div><strong>3</strong><span>Coverage zones</span></div>
            <div><strong>5</strong><span>Sample locations</span></div>
            <Link className="text-link" to="/maps">Explore maps <ArrowRight size={15} /></Link>
          </div>
        </section>

        <section className="panel outcomes-panel" aria-labelledby="outcomes-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Current quarter</p>
              <h2 id="outcomes-title">Program outcome summary</h2>
            </div>
            <span className="outcome-score"><CheckCircle2 size={16} /> 72% overall</span>
          </div>
          <p className="panel-intro">
            Illustrative progress against fictional quarterly program targets.
          </p>
          <div className="outcome-list">
            {programOutcomes.map((outcome) => (
              <div className="outcome-item" key={outcome.label}>
                <div className="outcome-label">
                  <strong>{outcome.label}</strong>
                  <span>{outcome.result}</span>
                </div>
                <div className="progress-row">
                  <div className="progress-track" aria-hidden="true">
                    <span style={{ width: `${outcome.value}%` }} />
                  </div>
                  <span>{outcome.value}%</span>
                </div>
              </div>
            ))}
          </div>
          <Link className="text-link outcome-link" to="/reports">
            Review detailed outcomes <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  )
}
