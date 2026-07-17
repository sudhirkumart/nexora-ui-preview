import { useMemo, useState, type ReactNode } from 'react'
import {
  getAskNexoraToken,
  setAskNexoraToken,
  signInToAskNexora,
} from '../api/askNexora'
import { AskNexoraAuthContext, type AskNexoraAuthValue } from './askNexoraAuthContextValue'

export function AskNexoraAuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getAskNexoraToken())

  const value = useMemo<AskNexoraAuthValue>(() => ({
    isAuthenticated: Boolean(token),
    token,
    signIn: async (email: string, password: string) => {
      const response = await signInToAskNexora(email, password)
      setAskNexoraToken(response.access_token)
      setTokenState(response.access_token)
    },
    signOut: () => {
      setAskNexoraToken(null)
      setTokenState(null)
    },
  }), [token])

  return (
    <AskNexoraAuthContext.Provider value={value}>
      {children}
    </AskNexoraAuthContext.Provider>
  )
}
