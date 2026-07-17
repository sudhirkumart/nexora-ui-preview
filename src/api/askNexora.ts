const ASK_NEXORA_TOKEN_KEY = 'nexora.ask_nexora.access_token'

export interface AskNexoraTokenPair {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface AskNexoraDocument {
  id: string
  filename: string
  mime_type: string
  size_bytes: number
  status: string
  chunk_count: number
  created_at: string
}

export interface AskNexoraSource {
  document_id: string
  chunk_id: string
  source_label: string
  rank: number
  excerpt: string
}

export interface AskNexoraAnswer {
  query_id: string
  answer_id: string
  answer: string
  status: string
  model_mode: string
  sources: AskNexoraSource[]
}

export class AskNexoraApiError extends Error {
  readonly status: number | null

  constructor(message: string, status: number | null = null) {
    super(message)
    this.name = 'AskNexoraApiError'
    this.status = status
  }
}

export function getAskNexoraToken(): string | null {
  return sessionStorage.getItem(ASK_NEXORA_TOKEN_KEY)
}

export function setAskNexoraToken(token: string | null): void {
  if (token) {
    sessionStorage.setItem(ASK_NEXORA_TOKEN_KEY, token)
  } else {
    sessionStorage.removeItem(ASK_NEXORA_TOKEN_KEY)
  }
}

function detailMessage(value: unknown): string | null {
  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    const messages = value
      .map((item) => {
        if (!item || typeof item !== 'object' || !('msg' in item)) return null
        return typeof item.msg === 'string' ? item.msg : null
      })
      .filter((item): item is string => Boolean(item))

    return messages.length > 0 ? messages.join(' ') : null
  }

  return null
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  if (response.ok) {
    if (!isJson) {
      throw new AskNexoraApiError(
        'The NEXORA backend returned an unexpected response. Confirm the local API is running.',
        response.status,
      )
    }

    return response.json() as Promise<T>
  }

  let message: string | null = null
  if (isJson) {
    const body = await response.json() as { detail?: unknown }
    message = detailMessage(body.detail)
  }

  if (response.status === 401) {
    message = 'Your local Ask NEXORA session is not authorised or has expired.'
  } else if (response.status === 403) {
    message = 'Ask NEXORA is unavailable. The backend feature flag or your permissions did not allow access.'
  }

  throw new AskNexoraApiError(message ?? `The request failed with status ${response.status}.`, response.status)
}

async function request<T>(
  path: string,
  options: RequestInit,
  token?: string,
): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  try {
    const response = await fetch(path, { ...options, headers })
    return await parseResponse<T>(response)
  } catch (error) {
    if (error instanceof AskNexoraApiError) throw error
    throw new AskNexoraApiError(
      'Could not reach the local NEXORA backend. Confirm it is running on port 8000.',
    )
  }
}

export function signInToAskNexora(email: string, password: string): Promise<AskNexoraTokenPair> {
  return request<AskNexoraTokenPair>('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function uploadAskNexoraDocument(
  file: File,
  token: string,
): Promise<AskNexoraDocument> {
  const body = new FormData()
  body.append('dummy_data_confirmed', 'true')
  body.append('file', file)

  return request<AskNexoraDocument>('/api/v1/ask-nexora/documents', {
    method: 'POST',
    body,
  }, token)
}

export async function queryAskNexora(
  question: string,
  documentIds: string[],
  token: string,
): Promise<AskNexoraAnswer> {
  const answer = await request<AskNexoraAnswer>('/api/v1/ask-nexora/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, document_ids: documentIds }),
  }, token)

  if (answer.model_mode !== 'local_dummy') {
    throw new AskNexoraApiError(
      'This preview accepts only local_dummy answers. The unexpected response was not displayed.',
      502,
    )
  }

  return answer
}
