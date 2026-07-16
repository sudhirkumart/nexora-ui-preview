import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { pageContent } from './data/mockData'
import { AboutPreviewPage } from './pages/AboutPreviewPage'
import { CompletedServiceDetailPage } from './pages/CompletedServiceDetailPage'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { ServicesPage } from './pages/ServicesPage'
import { SermonInsightsPage } from './pages/SermonInsightsPage'
import { SermonPage } from './pages/SermonPage'
import { SermonQuestionsPage } from './pages/SermonQuestionsPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/sunday-worship-12-july/sermon" element={<SermonPage />} />
        <Route path="/services/sunday-worship-12-july/sermon/insights" element={<SermonInsightsPage />} />
        <Route path="/services/sunday-worship-12-july/sermon/questions" element={<SermonQuestionsPage />} />
        <Route
          path="/services/sunday-worship-12-july/sermon-insights"
          element={<Navigate to="/services/sunday-worship-12-july/sermon/insights" replace />}
        />
        <Route path="/services/sunday-worship-12-july" element={<CompletedServiceDetailPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/services-events" element={<Navigate to="/services" replace />} />
        {Object.entries(pageContent).filter(([path]) => path !== 'services-events').map(([path, content]) => (
          <Route key={path} path={`/${path}`} element={<PlaceholderPage {...content} />} />
        ))}
        <Route path="/organisations" element={<Navigate to="/locations" replace />} />
        <Route path="/programs" element={<Navigate to="/outreach" replace />} />
        <Route path="/maps" element={<Navigate to="/locations" replace />} />
        <Route path="/about-preview" element={<AboutPreviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}
