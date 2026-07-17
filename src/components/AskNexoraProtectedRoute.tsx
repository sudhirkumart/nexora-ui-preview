import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAskNexoraAuth } from '../auth/useAskNexoraAuth'

export function AskNexoraProtectedRoute() {
  const { isAuthenticated } = useAskNexoraAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/ask-nexora/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <Outlet />
}
