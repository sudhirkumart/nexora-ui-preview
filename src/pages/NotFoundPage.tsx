import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page not-found-page">
      <p className="eyebrow">404 · Preview route</p>
      <h1>This screen is not part of the preview</h1>
      <p>Return to the dashboard to continue exploring the current concept environment.</p>
      <Link className="button button-primary" to="/dashboard">
        <ArrowLeft size={17} /> Return to dashboard
      </Link>
    </div>
  )
}
