import { Filter, RotateCcw } from 'lucide-react'
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

const insightPreviewAreas = [
  { title: 'Sermon summaries', description: 'Concise, reviewable overviews of completed messages.' },
  { title: 'Key headings', description: 'A simple outline of the main sections and themes.' },
  { title: 'Review questions', description: 'Draft questions prepared for responsible human review.' },
  { title: 'Discussion prompts', description: 'Prompts for future small-group and ministry conversations.' },
  { title: 'Review status', description: 'A clear indication of what is ready, reviewed, or still in progress.' },
]

export function ServicesPage() {
  const [activeView, setActiveView] = useState<ServicesPageView>('preparation')
  const [locationFilter, setLocationFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('14')
  const [statusFilter, setStatusFilter] = useState('all')

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
        <section className="services-tab-view services-insights-view" id="services-insights-view" aria-labelledby="services-insights-title">
          <div className="services-tab-heading">
            <div>
              <p className="eyebrow">Future review workspace</p>
              <h2 id="services-insights-title">Sermon insights</h2>
              <p>A calm placeholder for future reviewed sermon material.</p>
            </div>
          </div>
          <div className="services-insights-list">
            {insightPreviewAreas.map((area) => (
              <article key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
          <p className="services-tab-note">
            This section is a visual placeholder only. Insight generation, review workflows, and
            publishing are not connected here.
          </p>
        </section>
      )}
    </div>
  )
}
