import { createContext } from 'react'

export interface AskNexoraAuthValue {
  isAuthenticated: boolean
  token: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const AskNexoraAuthContext = createContext<AskNexoraAuthValue | null>(null)
