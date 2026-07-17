import { useState, type FormEvent } from 'react'
import { KeyRound, LockKeyhole, ShieldAlert } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AskNexoraApiError } from '../api/askNexora'
import { useAskNexoraAuth } from '../auth/useAskNexoraAuth'

interface LoginLocationState {
  from?: string
}

export function AskNexoraLoginPage() {
  const { isAuthenticated, signIn } = useAskNexoraAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)

  if (isAuthenticated) return <Navigate to="/ask-nexora" replace />

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSigningIn(true)

    try {
      await signIn(email.trim(), password)
      const requestedPath = (location.state as LoginLocationState | null)?.from
      navigate(requestedPath?.startsWith('/ask-nexora') ? requestedPath : '/ask-nexora', { replace: true })
    } catch (caughtError) {
      setError(
        caughtError instanceof AskNexoraApiError
          ? caughtError.message
          : 'Sign-in failed. Confirm the local backend and synthetic test account.',
      )
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div className="page ask-nexora-page ask-nexora-login-page">
      <section className="page-heading ask-nexora-page-heading">
        <div>
          <p className="eyebrow">Internal dummy-data POC</p>
          <h1>Sign in to Ask NEXORA</h1>
          <p className="page-description">
            Use an approved synthetic local test account. This sign-in protects only the internal
            Ask NEXORA POC in this advisor preview.
          </p>
        </div>
      </section>

      <div className="ask-nexora-login-layout">
        <section className="ask-nexora-login-card" aria-labelledby="ask-nexora-login-title">
          <div className="ask-nexora-card-heading">
            <span aria-hidden="true"><KeyRound size={21} /></span>
            <div>
              <p className="eyebrow">Local access</p>
              <h2 id="ask-nexora-login-title">Authenticated test session</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="ask-nexora-email">Synthetic test email</label>
            <input
              id="ask-nexora-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="ask-nexora-password">Password</label>
            <input
              id="ask-nexora-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error && <div className="ask-nexora-error" role="alert">{error}</div>}

            <button className="button button-primary" type="submit" disabled={isSigningIn}>
              <LockKeyhole size={17} aria-hidden="true" />
              {isSigningIn ? 'Signing in…' : 'Start local session'}
            </button>
          </form>
        </section>

        <aside className="ask-nexora-safety-note" aria-labelledby="ask-nexora-login-safety">
          <ShieldAlert size={23} aria-hidden="true" />
          <div>
            <h2 id="ask-nexora-login-safety">Dummy data only</h2>
            <p>
              Do not enter production credentials or use a production tenant. No beneficiary,
              donor, real NGO, church, customer, or operational documents are permitted.
            </p>
            <p>
              The access token is held only for this browser tab session and is sent only to the
              local NEXORA API through the same-origin development proxy.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
