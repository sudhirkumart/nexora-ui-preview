import { ArrowRight, Check, Clock3, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import type { PreviewStatus } from '../data/mockData'

interface PlaceholderPageProps {
  eyebrow: string
  title: string
  description: string
  status: PreviewStatus
  highlights: string[][]
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  status,
  highlights,
}: PlaceholderPageProps) {
  return (
    <div className="page placeholder-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <StatusBadge status={status} />
      </section>

      <section className="placeholder-hero">
        <div className="placeholder-copy">
          <span className="section-icon warm" aria-hidden="true"><Layers3 size={23} /></span>
          <p className="eyebrow">Preview workspace</p>
          <h2>{title} experience is being shaped</h2>
          <p>
            This first iteration establishes the intended direction without implying a
            production-ready capability. Content and workflows will be refined through advisor
            and customer review.
          </p>
          <div className="placeholder-actions">
            <Link className="button button-primary" to="/dashboard">
              Return to dashboard <ArrowRight size={17} />
            </Link>
            <Link className="button button-secondary" to="/about-preview">
              About this preview
            </Link>
          </div>
        </div>
        <div className="placeholder-preview" aria-label={`${title} sample summary`}>
          <div className="placeholder-preview-header">
            <div><span /><span /><span /></div>
            <small>Sample view</small>
          </div>
          <div className="placeholder-stat-grid">
            {highlights.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="placeholder-rows">
            <span /><span /><span /><span />
          </div>
        </div>
      </section>

      <section className="placeholder-notes" aria-label="Preview notes">
        <article>
          <Clock3 size={20} aria-hidden="true" />
          <div><strong>Planned capability</strong><p>Workflow detail and interactions will be added in later design iterations.</p></div>
        </article>
        <article>
          <Check size={20} aria-hidden="true" />
          <div><strong>Safe sample content</strong><p>All figures and records shown here are fictional and remain in this frontend.</p></div>
        </article>
      </section>
    </div>
  )
}
