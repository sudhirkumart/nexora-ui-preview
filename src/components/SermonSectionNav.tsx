import { NavLink } from 'react-router-dom'

const sermonSections = [
  { label: 'Sermon', to: '/services/sunday-worship-12-july/sermon', end: true },
  { label: 'Insights', to: '/services/sunday-worship-12-july/sermon/insights', end: false },
  { label: 'Questions', to: '/services/sunday-worship-12-july/sermon/questions', end: false },
]

export function SermonSectionNav() {
  return (
    <nav className="sermon-section-nav" aria-label="Sermon review sections">
      {sermonSections.map((section) => (
        <NavLink
          className={({ isActive }) => isActive ? 'active' : undefined}
          end={section.end}
          key={section.label}
          to={section.to}
        >
          {section.label}
        </NavLink>
      ))}
    </nav>
  )
}
