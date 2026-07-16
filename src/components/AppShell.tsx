import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  BarChart3,
  Building2,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  CircleHelp,
  FileText,
  HandHeart,
  HeartHandshake,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageSquareText,
  Settings,
  Sparkles,
  Users,
  UsersRound,
  X,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { FeedbackModal } from './FeedbackModal'
import { AccessibleDialog } from './AccessibleDialog'
import { organisation } from '../data/mockData'

interface AppShellProps {
  children: ReactNode
}

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'People', to: '/people', icon: Users },
  { label: 'Services & Events', to: '/services', icon: CalendarRange },
  { label: 'Groups', to: '/groups', icon: UsersRound },
  { label: 'Volunteers', to: '/volunteers', icon: HandHeart },
  { label: 'Care & Follow-up', to: '/care-follow-up', icon: HeartHandshake },
  { label: 'Outreach', to: '/outreach', icon: Sparkles },
  { label: 'Calendar', to: '/calendar', icon: CalendarDays },
  { label: 'Locations', to: '/locations', icon: MapPin },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
]

const secondaryNavigation = [
  { label: 'Settings', to: '/settings', icon: Settings },
  { label: 'About this preview', to: '/about-preview', icon: CircleHelp },
]

const mobileNavigation = navigation.slice(0, 4)
function NavigationItem({
  label,
  to,
  icon: Icon,
  onNavigate,
}: (typeof navigation)[number] & { onNavigate?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
    >
      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  )
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null)

  const routeLabel = location.pathname.startsWith('/services')
    ? 'Services & Events'
    : [...navigation, ...secondaryNavigation].find((item) =>
      location.pathname === '/' ? item.to === '/dashboard' : item.to === location.pathname,
    )?.label ?? 'Preview'

  useEffect(() => {
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 961px)')
    const closeMobileMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false)
    }

    desktopQuery.addEventListener('change', closeMobileMenuOnDesktop)
    return () => desktopQuery.removeEventListener('change', closeMobileMenuOnDesktop)
  }, [])

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">N</div>
          <div className="brand-copy">
            <span className="brand-name">NEXORA</span>
            <span className="brand-label">Advisor Preview</span>
          </div>
        </div>

        <div className="sidebar-context">
          <span>Workspace</span>
          <strong>{organisation.name}</strong>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="nav-group-label">Overview</span>
            {navigation.map((item) => (
              <NavigationItem key={item.to} {...item} />
            ))}
          </div>
          <div className="nav-group nav-group-secondary">
            <span className="nav-group-label">Preview</span>
            {secondaryNavigation.map((item) => (
              <NavigationItem key={item.to} {...item} />
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="preview-version">
            <span className="version-dot" aria-hidden="true" />
            <span>Preview 0.1</span>
          </div>
          <p>Fictional sample data only</p>
        </div>
      </aside>

      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-mobile-brand">
            <div className="brand-mark small" aria-hidden="true">N</div>
            <div>
              <span className="brand-name">NEXORA</span>
              <span className="brand-label">Advisor Preview</span>
            </div>
          </div>

          <div className="organisation-selector-wrap">
            <label htmlFor="organisation-selector">Viewing organisation</label>
            <div className="select-shell">
              <Building2 size={17} aria-hidden="true" />
              <select id="organisation-selector" defaultValue="global">
                {organisation.hierarchy.map((level) => (
                  <option value={level.id} key={level.id}>{level.name}</option>
                ))}
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </div>
          </div>

          <div className="topbar-actions">
            <button
              className="feedback-header-button"
              type="button"
              onClick={() => setIsFeedbackOpen(true)}
            >
              <MessageSquareText size={18} aria-hidden="true" />
              <span>Feedback</span>
            </button>
            <div className="advisor-profile" aria-label="Preview user">
              <div className="avatar-placeholder" aria-hidden="true">AD</div>
              <div className="advisor-copy">
                <strong>Advisor view</strong>
                <span>Review access</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="main-content" tabIndex={-1}>
        <div className="concept-notice" role="note">
          <FileText size={16} aria-hidden="true" />
          <span>
            Concept environment using fictional sample data. Features shown may not yet be
            available in the production product.
          </span>
        </div>
        {children}
        <footer className="content-footer">
          <span>NEXORA Advisor Preview</span>
          <span>Preview 0.1 · Fictional data · Not a production system</span>
        </footer>
      </main>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {mobileNavigation.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`mobile-nav-item${isMobileMenuOpen ? ' active' : ''}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          ref={mobileMenuTriggerRef}
        >
          <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
          <span>More</span>
        </button>
      </nav>

      <AccessibleDialog
        bodyClassName="nav-open"
        className="mobile-drawer-backdrop"
        dismissLabel="Close navigation"
        isOpen={isMobileMenuOpen}
        labelledBy="mobile-menu-title"
        onClose={() => setIsMobileMenuOpen(false)}
      >
          <aside
            className="mobile-drawer"
            id="mobile-menu"
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">NEXORA Advisor Preview</p>
                <h2 id="mobile-menu-title">Explore preview</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation"
                data-dialog-initial-focus
              >
                <X size={21} />
              </button>
            </div>
            <nav className="drawer-nav">
              {[...navigation, ...secondaryNavigation].map((item) => (
                <NavigationItem
                  key={item.to}
                  {...item}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
            <div className="drawer-footer">
              <button
                className="button button-primary drawer-feedback"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsFeedbackOpen(true)
                }}
              >
                <MessageSquareText size={18} />
                Share feedback
              </button>
              <p>Preview 0.1 · Fictional sample data</p>
            </div>
          </aside>
      </AccessibleDialog>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        screenName={routeLabel}
      />

      <button
        className="floating-feedback-button"
        type="button"
        onClick={() => setIsFeedbackOpen(true)}
        aria-label={`Give feedback about the ${routeLabel} screen`}
      >
        <MessageSquareText size={19} aria-hidden="true" />
        <span>Feedback</span>
      </button>

    </div>
  )
}
