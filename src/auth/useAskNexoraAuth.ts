import { useContext } from 'react'
import { AskNexoraAuthContext, type AskNexoraAuthValue } from './askNexoraAuthContextValue'

export function useAskNexoraAuth(): AskNexoraAuthValue {
  const context = useContext(AskNexoraAuthContext)
  if (!context) throw new Error('useAskNexoraAuth must be used within AskNexoraAuthProvider')
  return context
}
