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
import { useMemo, useState } from 'react'
import { CompletedServiceRow } from '../components/CompletedServiceRow'
import { ServiceListItem } from '../components/ServiceListItem'
import { completedServices, serviceLocations, services } from '../data/servicesMockData'

const previewDate = new Date('2026-07-15T00:00:00')

type ServicesPageView = 'preparation' | 'completed' | 'insights'

const servicesPageViews: { id: ServicesPageView; label: string }[] = [
  { id: 'preparation', label: 'Preparation' },
  { id: 'completed', label: 'Completed' },
  { id: 'insights', label: 'Insights' },
]

const insightSourceStates = ['Sermon uploaded', 'Processing', 'No sermon added'] as const
const insightReviewStatuses = ['Draft generated', 'Needs review', 'Approved', 'Shared'] as const

const insightService = completedServices.find((service) => service.id === 'sunday-worship-12-july')!
const insightSermon = insightService.sermon!

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

export function ServicesPage() {
  const [activeView, setActiveView] = useState<ServicesPageView>('preparation')
  const [locationFilter, setLocationFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('14')
  const [statusFilter, setStatusFilter] = useState('all')
  const [insightSourceState, setInsightSourceState] = useState<(typeof insightSourceStates)[number]>('Sermon uploaded')
  const [insightReviewStatus, setInsightReviewStatus] = useState<(typeof insightReviewStatuses)[number]>('Needs review')

  const filteredServices = useMemo(() => services.filter((service) => {
    const matchesLocation = locationFilter === 'all' || service.location === locationFilter
    const matchesStatus = statusFilter === 'all' || service.preparationStatus === statusFilter
    const differenceInDays = Math.ceil(
      (new Date(`${service.date}T00:00:00`).getTime() - previewDate.getTime()) / 86_400_000,
    )
    const matchesDate = dateFilter === 'all' || differenceInDays <= Number(dateFilter)

    return matchesLocation && matchesStatus && matchesDate
  }), [dateFilter, locationFilter, statusFilter])

  const attentionCount = filteredServices.filter(
    (service) => service.preparationStatus === 'Attention needed',
  ).length
  const recentCompletedCount = completedServices.filter((service) => service.date >= '2026-07-12').length

  const resetFilters = () => {
    setLocationFilter('all')
    setDateFilter('14')
    setStatusFilter('all')
  }

  return (
    <div className="page services-page">
      <section className="page-heading services-page-heading">
        <div>
          <p className="eyebrow">Gatherings & preparation</p>
          <h1>Services & Events</h1>
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
            onClick={() => setActiveView(view.id)}
            type="button"
          >
            {view.label}
          </button>
        ))}
      </nav>

      {activeView === 'preparation' && (
        <div className="services-tab-view" id="services-preparation-view">
          <section className="services-filter-section" aria-labelledby="service-filters-title">
            <div className="services-filter-heading">
              <div>
                <Filter size={18} aria-hidden="true" />
                <h2 id="service-filters-title">Focus the service list</h2>
              </div>
              <button className="text-button" type="button" onClick={resetFilters}>
                <RotateCcw size={15} aria-hidden="true" /> Reset filters
              </button>
            </div>
            <div className="service-filter-grid">
              <label>
                <span>Location</span>
                <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
                  <option value="all">All locations</option>
                  {serviceLocations.map((location) => <option key={location}>{location}</option>)}
                </select>
              </label>
              <label>
                <span>Date range</span>
                <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
                  <option value="7">Next 7 days</option>
                  <option value="14">Next 14 days</option>
                  <option value="all">All upcoming</option>
                </select>
              </label>
              <label>
                <span>Status</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
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
              <strong>{filteredServices.length}</strong> upcoming {filteredServices.length === 1 ? 'service' : 'services'}
            </span>
            <span><strong>{attentionCount}</strong> requiring attention</span>
            <span><strong>{recentCompletedCount}</strong> completed recently</span>
          </div>

          <section className="services-results" aria-labelledby="upcoming-services-list-title">
            <div className="services-results-heading">
              <div>
                <p className="eyebrow">Upcoming</p>
                <h2 id="upcoming-services-list-title">Service preparation</h2>
              </div>
              <p>{filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} shown</p>
            </div>

            {filteredServices.length > 0 ? (
              <div className="services-list">
                {filteredServices.map((service) => (
                  <ServiceListItem service={service} key={service.id} />
                ))}
              </div>
            ) : (
              <div className="services-empty-state" role="status">
                <h3>No services match these filters</h3>
                <p>Adjust the location, date range, or status to review another fictional service.</p>
                <button className="button button-secondary" type="button" onClick={resetFilters}>
                  Reset filters
                </button>
              </div>
            )}
          </section>

          <section className="completed-services-section" id="completed-services" aria-labelledby="completed-services-title">
            <div className="completed-services-heading">
              <div>
                <p className="eyebrow">Service history</p>
                <h2 id="completed-services-title">Recently completed</h2>
                <p>A restrained view of recorded attendance, follow-up, and sermon-processing status.</p>
              </div>
              <button className="text-button" type="button" onClick={() => setActiveView('completed')}>
                View all completed services
              </button>
            </div>
            <div className="completed-services-list">
              {completedServices.slice(0, 3).map((service) => (
                <CompletedServiceRow service={service} key={service.id} />
              ))}
            </div>
          </section>
        </div>
      )}

      {activeView === 'completed' && (
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
            {completedServices.map((service) => (
              <CompletedServiceRow service={service} key={service.id} />
            ))}
          </div>
          <p className="services-tab-note">
            This preview currently contains three completed-service records. A fuller searchable
            history will appear here in a later iteration.
          </p>
        </section>
      )}

      {activeView === 'insights' && (
        <div className="services-tab-view services-insights-view" id="services-insights-view">
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

          <section className="insight-source-card" aria-labelledby="insight-source-title">
            <div className="insight-card-heading">
              <div>
                <p className="eyebrow">Sermon / media source</p>
                <h3 id="insight-source-title">Source state</h3>
              </div>
              <span className={`insight-source-status insight-source-${insightSourceState.toLowerCase().replace(/\s+/g, '-')}`}>
                <span aria-hidden="true" /> {insightSourceState}
              </span>
            </div>

            <div className="insight-state-switcher" aria-label="Preview sermon source state">
              {insightSourceStates.map((state) => (
                <button
                  aria-pressed={insightSourceState === state}
                  className={insightSourceState === state ? 'active' : undefined}
                  key={state}
                  onClick={() => setInsightSourceState(state)}
                  type="button"
                >
                  {state}
                </button>
              ))}
            </div>

            {insightSourceState !== 'No sermon added' && (
              <dl className="insight-source-metadata">
                <div><dt>Service</dt><dd>{insightService.name}</dd></div>
                <div><dt>Date</dt><dd>{insightService.dateLabel}</dd></div>
                <div><dt>Speaker</dt><dd>{insightSermon.speaker}</dd></div>
                <div><dt>Source type</dt><dd>{insightSermon.sourceType}</dd></div>
              </dl>
            )}
          </section>

          {insightSourceState === 'No sermon added' && (
            <section className="insights-empty-state" aria-labelledby="insights-empty-title">
              <Video size={25} aria-hidden="true" />
              <h3 id="insights-empty-title">No sermon insights available yet.</h3>
              <p>
                Future versions can support fictional workflow previews for YouTube links or uploaded
                sermon files. Upload and external-link processing are not available in this iteration.
              </p>
            </section>
          )}

          {insightSourceState === 'Processing' && (
            <section className="insights-processing-state" aria-labelledby="insights-processing-title">
              <Clock3 size={24} aria-hidden="true" />
              <div>
                <h3 id="insights-processing-title">Insights are being prepared</h3>
                <p>
                  This simulated state shows where processing feedback could appear. No transcript,
                  media, or AI service is running.
                </p>
              </div>
            </section>
          )}

          {insightSourceState === 'Sermon uploaded' && (
            <>
              <section className="insight-summary-card" aria-labelledby="insight-summary-title">
                <div className="insight-card-heading">
                  <div>
                    <p className="eyebrow">Generated draft</p>
                    <h3 id="insight-summary-title">Insight summary</h3>
                  </div>
                  <FileText size={20} aria-hidden="true" />
                </div>
                <p className="insight-summary-copy">{insightSermon.insights.summary}</p>
                <dl className="insight-summary-facts">
                  <div><dt>Key theme</dt><dd>Hope expressed through practical service</dd></div>
                  <div><dt>Audience</dt><dd>General congregation and ministry teams</dd></div>
                  <div><dt>Suggested follow-up angle</dt><dd>Connect reflection with one local action</dd></div>
                </dl>
              </section>

              <div className="insights-content-grid">
                <section className="insight-content-card" aria-labelledby="generated-headings-title">
                  <div className="insight-card-heading compact">
                    <div>
                      <p className="eyebrow">Easy to scan</p>
                      <h3 id="generated-headings-title">Generated headings</h3>
                    </div>
                  </div>
                  <ol className="generated-heading-list">
                    {[
                      ...insightSermon.insights.mainHeadings,
                      'Responding with sustainable care',
                      'Carrying hope into the week ahead',
                    ].map((heading) => <li key={heading}>{heading}</li>)}
                  </ol>
                </section>

                <section className="insight-content-card" aria-labelledby="insight-questions-title">
                  <div className="insight-card-heading compact">
                    <div>
                      <p className="eyebrow">Human review required</p>
                      <h3 id="insight-questions-title">Review questions</h3>
                    </div>
                    <MessageCircleQuestion size={19} aria-hidden="true" />
                  </div>
                  <ul className="insight-question-list">
                    {[
                      ...insightSermon.insights.discussionQuestions,
                      'Which households or ministry teams may need follow-up?',
                      'What should be reviewed before these notes are shared?',
                    ].map((question) => <li key={question}>{question}</li>)}
                  </ul>
                </section>

                <section className="insight-content-card" aria-labelledby="discussion-prompts-title">
                  <div className="insight-card-heading compact">
                    <div>
                      <p className="eyebrow">Community reflection</p>
                      <h3 id="discussion-prompts-title">Discussion prompts</h3>
                    </div>
                  </div>
                  <ul className="insight-prompt-list">
                    {discussionPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}
                  </ul>
                </section>

                <section className="insight-content-card" aria-labelledby="follow-up-ideas-title">
                  <div className="insight-card-heading compact">
                    <div>
                      <p className="eyebrow">Possible next steps</p>
                      <h3 id="follow-up-ideas-title">Follow-up ideas</h3>
                    </div>
                  </div>
                  <ul className="insight-follow-up-list">
                    {followUpIdeas.map((idea) => <li key={idea}><CheckCircle2 size={16} aria-hidden="true" /> <span>{idea}</span></li>)}
                  </ul>
                </section>
              </div>

              <section className="insight-review-card" aria-labelledby="insight-review-title">
                <div>
                  <p className="eyebrow">Local workflow preview</p>
                  <h3 id="insight-review-title">Review status</h3>
                  <p>Choose a state to preview the review path. Changes are not permanently saved.</p>
                </div>
                <div className="insight-review-steps" aria-label="Insight review status">
                  {insightReviewStatuses.map((status) => (
                    <button
                      aria-pressed={insightReviewStatus === status}
                      className={insightReviewStatus === status ? 'active' : undefined}
                      key={status}
                      onClick={() => setInsightReviewStatus(status)}
                      type="button"
                    >
                      <span aria-hidden="true" /> {status}
                    </button>
                  ))}
                </div>
              </section>

              <p className="services-tab-note">
                AI-style content shown here is fictional sample copy for product review. It is not an
                approved theological interpretation and no generation service has been connected.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
