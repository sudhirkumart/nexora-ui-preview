import { CircleCheck, Database, FlaskConical, LockKeyhole, Route, Tags } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { previewStatuses } from '../data/mockData'

const principles = [
  {
    icon: FlaskConical,
    title: 'Product and workflow review',
    text: 'This environment helps advisors explore ideas, discuss workflows, and identify improvements before development decisions are made.',
  },
  {
    icon: Database,
    title: 'Fictional data only',
    text: 'Every organisation, person, activity, and metric is invented for demonstration. No customer records or production data are present.',
  },
  {
    icon: LockKeyhole,
    title: 'Not a production system',
    text: 'This preview has no authentication, backend, persistent storage, analytics, tracking, or external data submission.',
  },
  {
    icon: Route,
    title: 'Planned capabilities',
    text: 'Some screens represent future possibilities. Their presence here does not mean the capability has been built or committed.',
  },
]

export function AboutPreviewPage() {
  return (
    <div className="page about-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">NEXORA Advisor Preview · Preview 0.1</p>
          <h1>About this preview</h1>
          <p className="page-description">
            A focused concept environment for thoughtful product and workflow review.
          </p>
        </div>
        <StatusBadge status="Demo Ready" />
      </section>

      <section className="about-intro">
        <div className="about-intro-mark" aria-hidden="true">N</div>
        <div>
          <p className="eyebrow">A safe place to explore</p>
          <h2>See the direction. Question the workflow. Shape what comes next.</h2>
          <p>
            This separate environment presents clickable NEXORA concepts for a founder,
            trusted technical advisor, and—later—selected prospective customers. It is designed
            for constructive review, not live operational use.
          </p>
        </div>
      </section>

      <section className="principles-grid" aria-label="Preview principles">
        {principles.map(({ icon: Icon, title, text }) => (
          <article className="principle-card" key={title}>
            <span aria-hidden="true"><Icon size={21} /></span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="limitations-panel">
        <div>
          <p className="eyebrow">Important limitation</p>
          <h2>What this preview does not represent</h2>
          <p>
            Pricing, availability, delivery timelines, contractual commitments, and production
            readiness are not represented here. Screens and status labels are conversation aids,
            not delivery promises.
          </p>
        </div>
        <ul>
          <li><CircleCheck size={18} /> No live customer or personal data</li>
          <li><CircleCheck size={18} /> No backend or external integrations</li>
          <li><CircleCheck size={18} /> No analytics, cookies, or tracking</li>
          <li><CircleCheck size={18} /> No feedback is submitted or stored</li>
        </ul>
      </section>

      <section className="status-legend" aria-labelledby="status-legend-title">
        <div className="status-legend-heading">
          <span className="section-icon cool" aria-hidden="true"><Tags size={20} /></span>
          <div>
            <p className="eyebrow">Shared review language</p>
            <h2 id="status-legend-title">Preview status labels</h2>
          </div>
        </div>
        <div className="status-list">
          {previewStatuses.map((status) => <StatusBadge key={status} status={status} />)}
        </div>
      </section>
    </div>
  )
}
