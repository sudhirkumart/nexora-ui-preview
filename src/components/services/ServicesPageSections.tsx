import {
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  MessageCircleQuestion,
  RotateCcw,
  Sparkles,
  Video,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { CompletedServiceRow } from '../CompletedServiceRow'
import { ServiceListItem } from '../ServiceListItem'
import {
  completedServices,
  serviceLocations,
  type SermonRecord,
  type ServiceRecord,
} from '../../data/servicesMockData'

export type ServicesPageView = 'preparation' | 'completed' | 'insights'
export type InsightSourceState = 'Sermon uploaded' | 'Processing' | 'No sermon added'
export type InsightReviewStatus = 'Draft generated' | 'Needs review' | 'Approved' | 'Shared'

interface ServicesPageHeaderProps {
  activeView: ServicesPageView
  onViewChange: (view: ServicesPageView) => void
}

const servicesPageViews: { id: ServicesPageView; label: string }[] = [
  { id: 'preparation', label: 'Preparation' },
  { id: 'completed', label: 'Completed' },
  { id: 'insights', label: 'Insights' },
]

export function ServicesPageHeader({ activeView, onViewChange }: ServicesPageHeaderProps) {
  return (
    <>
      <section className="page-heading services-page-heading">
        <div>
          <p className="eyebrow">Gatherings &amp; preparation</p>
          <h1>Services &amp; Events</h1>
          <p className="page-description">
            Review upcoming gatherings, preparation status, volunteer coverage and attendance readiness.
          </p>
        </div>
      </section>

      <nav className="services-page-tabs" aria-label="Services & Events sections">
        {servicesPageViews.map((view) => (
          <button
            aria-pressed={activeView === view.id}
            className={activeView === view.id ? 'active' : undefined}
            key={view.id}
            onClick={() => onViewChange(view.id)}
            type="button"
          >
            {view.label}
          </button>
        ))}
      </nav>
    </>
  )
}

interface ServicesFiltersSummaryProps {
  attentionCount: number
  dateFilter: string
  locationFilter: string
  onDateChange: (value: string) => void
  onLocationChange: (value: string) => void
  onReset: () => void
  onStatusChange: (value: string) => void
  recentCompletedCount: number
  serviceCount: number
  statusFilter: string
}

function ServicesFiltersSummary({
  attentionCount,
  dateFilter,
  locationFilter,
  onDateChange,
  onLocationChange,
  onReset,
  onStatusChange,
  recentCompletedCount,
  serviceCount,
  statusFilter,
}: ServicesFiltersSummaryProps) {
  return (
    <>
      <section className="services-filter-section" aria-labelledby="service-filters-title">
        <div className="services-filter-heading">
          <div>
            <Filter size={18} aria-hidden="true" />
            <h2 id="service-filters-title">Focus the service list</h2>
          </div>
          <button className="text-button" type="button" onClick={onReset}>
            <RotateCcw size={15} aria-hidden="true" /> Reset filters
          </button>
        </div>
        <div className="service-filter-grid">
          <label>
            <span>Location</span>
            <select value={locationFilter} onChange={(event) => onLocationChange(event.target.value)}>
              <option value="all">All locations</option>
              {serviceLocations.map((location) => <option key={location}>{location}</option>)}
            </select>
          </label>
          <label>
            <span>Date range</span>
            <select value={dateFilter} onChange={(event) => onDateChange(event.target.value)}>
              <option value="7">Next 7 days</option>
              <option value="14">Next 14 days</option>
              <option value="all">All upcoming</option>
            </select>
          </label>
          <label>
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
              <option value="all">All preparation statuses</option>
              <option value="Attention needed">Attention needed</option>
              <option value="Ready">Ready</option>
              <option value="Not started">Not started</option>
            </select>
          </label>
        </div>
      </section>

      <div className="services-inline-summary" aria-live="polite">
        <span>
          <strong>{serviceCount}</strong> upcoming {serviceCount === 1 ? 'service' : 'services'}
        </span>
        <span><strong>{attentionCount}</strong> requiring attention</span>
        <span><strong>{recentCompletedCount}</strong> completed recently</span>
      </div>
    </>
  )
}

interface PreparationSectionProps extends ServicesFiltersSummaryProps {
  filteredServices: ServiceRecord[]
  onViewChange: (view: ServicesPageView) => void
}

export function PreparationSection({ filteredServices, onViewChange, ...filterProps }: PreparationSectionProps) {
  return (
    <div className="services-tab-view" id="services-preparation-view">
      <ServicesFiltersSummary {...filterProps} />
      <UpcomingServices services={filteredServices} onReset={filterProps.onReset} />
      <RecentlyCompleted onViewChange={onViewChange} />
    </div>
  )
}

function UpcomingServices({ services, onReset }: { services: ServiceRecord[]; onReset: () => void }) {
  return (
    <section className="services-results" aria-labelledby="upcoming-services-list-title">
      <div className="services-results-heading">
        <div>
          <p className="eyebrow">Upcoming</p>
          <h2 id="upcoming-services-list-title">Service preparation</h2>
        </div>
        <p>{services.length} {services.length === 1 ? 'service' : 'services'} shown</p>
      </div>

      {services.length > 0 ? (
        <div className="services-list">
          {services.map((service) => <ServiceListItem service={service} key={service.id} />)}
        </div>
      ) : (
        <div className="services-empty-state" role="status">
          <h3>No services match these filters</h3>
          <p>Adjust the location, date range, or status to review another fictional service.</p>
          <button className="button button-secondary" type="button" onClick={onReset}>Reset filters</button>
        </div>
      )}
    </section>
  )
}

function RecentlyCompleted({ onViewChange }: { onViewChange: (view: ServicesPageView) => void }) {
  return (
    <section className="completed-services-section" id="completed-services" aria-labelledby="completed-services-title">
      <div className="completed-services-heading">
        <div>
          <p className="eyebrow">Service history</p>
          <h2 id="completed-services-title">Recently completed</h2>
          <p>A restrained view of recorded attendance, follow-up, and sermon-processing status.</p>
        </div>
        <button className="text-button" type="button" onClick={() => onViewChange('completed')}>
          View all completed services
        </button>
      </div>
      <div className="completed-services-list">
        {completedServices.slice(0, 3).map((service) => (
          <CompletedServiceRow service={service} key={service.id} />
        ))}
      </div>
    </section>
  )
}

export function CompletedSection() {
  return (
    <section className="services-tab-view services-history-view" id="services-completed-view" aria-labelledby="completed-history-title">
      <div className="services-tab-heading">
        <div>
          <p className="eyebrow">Service history</p>
          <h2 id="completed-history-title">Completed services</h2>
          <p>Review the fictional records currently available in this preview.</p>
        </div>
        <span>{completedServices.length} services recorded</span>
      </div>
      <div className="completed-services-list">
        {completedServices.map((service) => <CompletedServiceRow service={service} key={service.id} />)}
      </div>
      <p className="services-tab-note">
        This preview currently contains three completed-service records. A fuller searchable
        history will appear here in a later iteration.
      </p>
    </section>
  )
}

interface InsightsSectionProps {
  insightReviewStatus: InsightReviewStatus
  insightSourceState: InsightSourceState
  onReviewStatusChange: (status: InsightReviewStatus) => void
  onSourceStateChange: (state: InsightSourceState) => void
}

const insightSourceStates: InsightSourceState[] = ['Sermon uploaded', 'Processing', 'No sermon added']
const insightReviewStatuses: InsightReviewStatus[] = ['Draft generated', 'Needs review', 'Approved', 'Shared']
const insightService = completedServices.find((service) => service.id === 'sunday-worship-12-july')!
const insightSermon = insightService.sermon!

export function InsightsSection(props: InsightsSectionProps) {
  return (
    <div className="services-tab-view services-insights-view" id="services-insights-view">
      <InsightsIntro />
      <InsightSourceCard state={props.insightSourceState} onChange={props.onSourceStateChange} />
      <InsightStateContent state={props.insightSourceState} />
      {props.insightSourceState === 'Sermon uploaded' && (
        <>
          <InsightSummary sermon={insightSermon} />
          <InsightContentGrid sermon={insightSermon} />
          <InsightReviewStatus status={props.insightReviewStatus} onChange={props.onReviewStatusChange} />
          <p className="services-tab-note">
            AI-style content shown here is fictional sample copy for product review. It is not an
            approved theological interpretation and no generation service has been connected.
          </p>
        </>
      )}
    </div>
  )
}

function InsightsIntro() {
  return (
    <section className="services-insights-intro" aria-labelledby="services-insights-title">
      <div>
        <p className="eyebrow">Media-to-review preview</p>
        <h2 id="services-insights-title">Sermon insights</h2>
        <p>
          Sermon and service-media insights will appear here after a fictional source is
          available. This preview demonstrates possible states and a human-review workflow only.
        </p>
      </div>
      <span className="insights-preview-label"><Sparkles size={16} aria-hidden="true" /> UI preview</span>
    </section>
  )
}

function InsightSourceCard({ state, onChange }: { state: InsightSourceState; onChange: (state: InsightSourceState) => void }) {
  return (
    <section className="insight-source-card" aria-labelledby="insight-source-title">
      <div className="insight-card-heading">
        <div>
          <p className="eyebrow">Sermon / media source</p>
          <h3 id="insight-source-title">Source state</h3>
        </div>
        <span className={`insight-source-status insight-source-${state.toLowerCase().replace(/\s+/g, '-')}`}>
          <span aria-hidden="true" /> {state}
        </span>
      </div>

      <div className="insight-state-switcher" aria-label="Preview sermon source state">
        {insightSourceStates.map((sourceState) => (
          <button
            aria-pressed={state === sourceState}
            className={state === sourceState ? 'active' : undefined}
            key={sourceState}
            onClick={() => onChange(sourceState)}
            type="button"
          >
            {sourceState}
          </button>
        ))}
      </div>

      {state !== 'No sermon added' && (
        <dl className="insight-source-metadata">
          <div><dt>Service</dt><dd>{insightService.name}</dd></div>
          <div><dt>Date</dt><dd>{insightService.dateLabel}</dd></div>
          <div><dt>Speaker</dt><dd>{insightSermon.speaker}</dd></div>
          <div><dt>Source type</dt><dd>{insightSermon.sourceType}</dd></div>
        </dl>
      )}
    </section>
  )
}

function InsightStateContent({ state }: { state: InsightSourceState }) {
  if (state === 'No sermon added') {
    return (
      <section className="insights-empty-state" aria-labelledby="insights-empty-title">
        <Video size={25} aria-hidden="true" />
        <h3 id="insights-empty-title">No sermon insights available yet.</h3>
        <p>
          Future versions can support fictional workflow previews for YouTube links or uploaded
          sermon files. Upload and external-link processing are not available in this iteration.
        </p>
      </section>
    )
  }

  if (state === 'Processing') {
    return (
      <section className="insights-processing-state" aria-labelledby="insights-processing-title">
        <Clock3 size={24} aria-hidden="true" />
        <div>
          <h3 id="insights-processing-title">Insights are being prepared</h3>
          <p>This simulated state shows where processing feedback could appear. No transcript, media, or AI service is running.</p>
        </div>
      </section>
    )
  }

  return null
}

function InsightSummary({ sermon }: { sermon: SermonRecord }) {
  return (
    <section className="insight-summary-card" aria-labelledby="insight-summary-title">
      <div className="insight-card-heading">
        <div><p className="eyebrow">Generated draft</p><h3 id="insight-summary-title">Insight summary</h3></div>
        <FileText size={20} aria-hidden="true" />
      </div>
      <p className="insight-summary-copy">{sermon.insights.summary}</p>
      <dl className="insight-summary-facts">
        <div><dt>Key theme</dt><dd>Hope expressed through practical service</dd></div>
        <div><dt>Audience</dt><dd>General congregation and ministry teams</dd></div>
        <div><dt>Suggested follow-up angle</dt><dd>Connect reflection with one local action</dd></div>
      </dl>
    </section>
  )
}

const discussionPrompts = [
  'Where is attentive service most needed in our community this week?',
  'How can shared responsibility become a sustainable ministry practice?',
  'What would make practical hope visible beyond the Sunday gathering?',
]

const followUpIdeas = [
  'Call first-time attendees who requested a conversation.',
  'Prepare the reviewed questions for small-group facilitators.',
  'Share approved sermon notes with ministry leaders.',
  'Identify prayer or care needs for confidential follow-up.',
]

function InsightContentGrid({ sermon }: { sermon: SermonRecord }) {
  const headings = [...sermon.insights.mainHeadings, 'Responding with sustainable care', 'Carrying hope into the week ahead']
  const questions = [...sermon.insights.discussionQuestions, 'Which households or ministry teams may need follow-up?', 'What should be reviewed before these notes are shared?']

  return (
    <div className="insights-content-grid">
      <InsightListCard eyebrow="Easy to scan" id="generated-headings-title" title="Generated headings">
        <ol className="generated-heading-list">{headings.map((heading) => <li key={heading}>{heading}</li>)}</ol>
      </InsightListCard>
      <InsightListCard eyebrow="Human review required" icon id="insight-questions-title" title="Review questions">
        <ul className="insight-question-list">{questions.map((question) => <li key={question}>{question}</li>)}</ul>
      </InsightListCard>
      <InsightListCard eyebrow="Community reflection" id="discussion-prompts-title" title="Discussion prompts">
        <ul className="insight-prompt-list">{discussionPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>
      </InsightListCard>
      <InsightListCard eyebrow="Possible next steps" id="follow-up-ideas-title" title="Follow-up ideas">
        <ul className="insight-follow-up-list">
          {followUpIdeas.map((idea) => <li key={idea}><CheckCircle2 size={16} aria-hidden="true" /> <span>{idea}</span></li>)}
        </ul>
      </InsightListCard>
    </div>
  )
}

function InsightListCard({ children, eyebrow, icon = false, id, title }: { children: ReactNode; eyebrow: string; icon?: boolean; id: string; title: string }) {
  return (
    <section className="insight-content-card" aria-labelledby={id}>
      <div className="insight-card-heading compact">
        <div><p className="eyebrow">{eyebrow}</p><h3 id={id}>{title}</h3></div>
        {icon && <MessageCircleQuestion size={19} aria-hidden="true" />}
      </div>
      {children}
    </section>
  )
}

function InsightReviewStatus({ status, onChange }: { status: InsightReviewStatus; onChange: (status: InsightReviewStatus) => void }) {
  return (
    <section className="insight-review-card" aria-labelledby="insight-review-title">
      <div>
        <p className="eyebrow">Local workflow preview</p>
        <h3 id="insight-review-title">Review status</h3>
        <p>Choose a state to preview the review path. Changes are not permanently saved.</p>
      </div>
      <div className="insight-review-steps" aria-label="Insight review status">
        {insightReviewStatuses.map((reviewStatus) => (
          <button
            aria-pressed={status === reviewStatus}
            className={status === reviewStatus ? 'active' : undefined}
            key={reviewStatus}
            onClick={() => onChange(reviewStatus)}
            type="button"
          >
            <span aria-hidden="true" /> {reviewStatus}
          </button>
        ))}
      </div>
    </section>
  )
}
