import { useMemo, useState } from 'react'
import {
  CompletedSection,
  InsightsSection,
  PreparationSection,
  ServicesPageHeader,
  type InsightReviewStatus,
  type InsightSourceState,
  type ServicesPageView,
} from '../components/services/ServicesPageSections'
import { completedServices, services } from '../data/servicesMockData'

const previewDate = new Date('2026-07-15T00:00:00')

export function ServicesPage() {
  const [activeView, setActiveView] = useState<ServicesPageView>('preparation')
  const [locationFilter, setLocationFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('14')
  const [statusFilter, setStatusFilter] = useState('all')
  const [insightSourceState, setInsightSourceState] = useState<InsightSourceState>('Sermon uploaded')
  const [insightReviewStatus, setInsightReviewStatus] = useState<InsightReviewStatus>('Needs review')

  const filteredServices = useMemo(() => services.filter((service) => {
    const matchesLocation = locationFilter === 'all' || service.location === locationFilter
    const matchesStatus = statusFilter === 'all' || service.preparationStatus === statusFilter
    const differenceInDays = Math.ceil(
      (new Date(`${service.date}T00:00:00`).getTime() - previewDate.getTime()) / 86_400_000,
    )
    const matchesDate = dateFilter === 'all' || differenceInDays <= Number(dateFilter)

    return matchesLocation && matchesStatus && matchesDate
  }), [dateFilter, locationFilter, statusFilter])

  const resetFilters = () => {
    setLocationFilter('all')
    setDateFilter('14')
    setStatusFilter('all')
  }

  return (
    <div className="page services-page">
      <ServicesPageHeader activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'preparation' && (
        <PreparationSection
          attentionCount={filteredServices.filter((service) => service.preparationStatus === 'Attention needed').length}
          dateFilter={dateFilter}
          filteredServices={filteredServices}
          locationFilter={locationFilter}
          onDateChange={setDateFilter}
          onLocationChange={setLocationFilter}
          onReset={resetFilters}
          onStatusChange={setStatusFilter}
          onViewChange={setActiveView}
          recentCompletedCount={completedServices.filter((service) => service.date >= '2026-07-12').length}
          serviceCount={filteredServices.length}
          statusFilter={statusFilter}
        />
      )}

      {activeView === 'completed' && <CompletedSection />}

      {activeView === 'insights' && (
        <InsightsSection
          insightReviewStatus={insightReviewStatus}
          insightSourceState={insightSourceState}
          onReviewStatusChange={setInsightReviewStatus}
          onSourceStateChange={setInsightSourceState}
        />
      )}
    </div>
  )
}
