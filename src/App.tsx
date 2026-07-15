import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { pageContent } from './data/mockData'
import { AboutPreviewPage } from './pages/AboutPreviewPage'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {Object.entries(pageContent).map(([path, content]) => (
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
