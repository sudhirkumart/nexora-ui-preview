import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  FileSearch,
  FileText,
  LogOut,
  MessageSquareText,
  Search,
  ShieldCheck,
  Upload,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  AskNexoraApiError,
  queryAskNexora,
  uploadAskNexoraDocument,
  type AskNexoraAnswer,
  type AskNexoraDocument,
} from '../api/askNexora'
import { useAskNexoraAuth } from '../auth/useAskNexoraAuth'

type Availability = 'unknown' | 'available' | 'unavailable'

const acceptedFileTypes = '.txt,.md,.markdown,.csv,.json,text/plain,text/markdown,text/csv,application/json'

function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`
  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

function readableStatus(value: string): string {
  return value.replace(/_/g, ' ')
}

export function AskNexoraPage() {
  const { token, signOut } = useAskNexoraAuth()
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [dummyDataConfirmed, setDummyDataConfirmed] = useState(false)
  const [document, setDocument] = useState<AskNexoraDocument | null>(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<AskNexoraAnswer | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [queryError, setQueryError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isQuerying, setIsQuerying] = useState(false)
  const [availability, setAvailability] = useState<Availability>('unknown')

  const closeExpiredSession = (error: AskNexoraApiError): boolean => {
    if (error.status !== 401) return false
    signOut()
    navigate('/ask-nexora/login', { replace: true, state: { from: '/ask-nexora' } })
    return true
  }

  const handleApiFailure = (
    caughtError: unknown,
    setError: (message: string) => void,
  ) => {
    const error = caughtError instanceof AskNexoraApiError
      ? caughtError
      : new AskNexoraApiError('The local preview request could not be completed.')

    if (closeExpiredSession(error)) return
    if (error.status === 403) setAvailability('unavailable')
    setError(error.message)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null)
    setDummyDataConfirmed(false)
    setDocument(null)
    setAnswer(null)
    setUploadError(null)
    setQueryError(null)
  }

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file || !dummyDataConfirmed || !token || availability === 'unavailable') return

    setUploadError(null)
    setIsUploading(true)

    try {
      const uploadedDocument = await uploadAskNexoraDocument(file, token)
      setDocument(uploadedDocument)
      setAvailability('available')
      setAnswer(null)
    } catch (caughtError) {
      handleApiFailure(caughtError, setUploadError)
    } finally {
      setIsUploading(false)
    }
  }

  const handleQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || !document || !token || availability === 'unavailable') return

    setQueryError(null)
    setIsQuerying(true)

    try {
      const response = await queryAskNexora(trimmedQuestion, [document.id], token)
      setAnswer(response)
      setAvailability('available')
    } catch (caughtError) {
      handleApiFailure(caughtError, setQueryError)
    } finally {
      setIsQuerying(false)
    }
  }

  const handleSignOut = () => {
    signOut()
    navigate('/ask-nexora/login', { replace: true })
  }

  return (
    <div className="page ask-nexora-page">
      <section className="page-heading ask-nexora-page-heading">
        <div>
          <p className="eyebrow">Internal RAG foundation POC</p>
          <h1>Ask NEXORA</h1>
          <p className="page-description">
            Ask a focused question of one synthetic document and review the local answer with its
            tenant-scoped source excerpts.
          </p>
        </div>
        <button className="button button-secondary" type="button" onClick={handleSignOut}>
          <LogOut size={16} aria-hidden="true" /> Sign out
        </button>
      </section>

      <section className="ask-nexora-warning" role="note" aria-labelledby="ask-nexora-warning-title">
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <h2 id="ask-nexora-warning-title">Dummy data only — internal preview</h2>
          <p>
            Do not upload production tenant, beneficiary, donor, real NGO, church, customer, or
            operational documents. This workflow uses the authenticated local NEXORA backend and
            must remain within a synthetic test tenant.
          </p>
        </div>
      </section>

      {availability === 'unavailable' && (
        <section className="ask-nexora-unavailable" role="alert" aria-labelledby="ask-nexora-unavailable-title">
          <AlertTriangle size={23} aria-hidden="true" />
          <div>
            <h2 id="ask-nexora-unavailable-title">Ask NEXORA is unavailable</h2>
            <p>
              The backend rejected access. The feature flag remains the authority; confirm the
              local POC flag and test-user permissions before starting a new session.
            </p>
          </div>
        </section>
      )}

      <div className="ask-nexora-workspace" aria-label="Ask NEXORA local workflow">
        <section className="ask-nexora-card ask-nexora-upload-card" aria-labelledby="ask-nexora-upload-title">
          <div className="ask-nexora-card-heading">
            <span aria-hidden="true"><Upload size={21} /></span>
            <div>
              <p className="eyebrow">Step 1</p>
              <h2 id="ask-nexora-upload-title">Add one dummy document</h2>
            </div>
          </div>
          <p className="ask-nexora-card-intro">
            Accepted formats: plain text, Markdown, CSV, and JSON. File size and content are
            validated by the backend.
          </p>

          <form className="ask-nexora-form" onSubmit={handleUpload}>
            <input
              className="visually-hidden-file-input"
              id="ask-nexora-document"
              type="file"
              accept={acceptedFileTypes}
              onChange={handleFileChange}
              disabled={availability === 'unavailable' || isUploading}
            />
            <label className="ask-nexora-file-field" htmlFor="ask-nexora-document">
              <FileText size={22} aria-hidden="true" />
              <span>
                <strong>{file ? file.name : 'Choose a dummy file'}</strong>
                <small>{file ? formatBytes(file.size) : 'TXT, MD, CSV, or JSON'}</small>
              </span>
            </label>

            <label className="ask-nexora-confirmation" htmlFor="ask-nexora-dummy-confirmation">
              <input
                id="ask-nexora-dummy-confirmation"
                type="checkbox"
                checked={dummyDataConfirmed}
                onChange={(event) => setDummyDataConfirmed(event.target.checked)}
                disabled={!file || availability === 'unavailable' || isUploading}
                required
              />
              <span>
                I confirm this file contains only purpose-built dummy data and no real person,
                tenant, donor, beneficiary, church, NGO, or customer information.
              </span>
            </label>

            {uploadError && <div className="ask-nexora-error" role="alert">{uploadError}</div>}

            <button
              className="button button-primary"
              type="submit"
              disabled={!file || !dummyDataConfirmed || isUploading || availability === 'unavailable'}
            >
              <Upload size={16} aria-hidden="true" />
              {isUploading ? 'Uploading dummy file…' : 'Upload dummy document'}
            </button>
          </form>

          {document && (
            <div className="ask-nexora-document-result" role="status">
              <CheckCircle2 size={20} aria-hidden="true" />
              <div>
                <strong>{document.filename}</strong>
                <span>
                  {readableStatus(document.status)} · {document.chunk_count} source chunks · {formatBytes(document.size_bytes)}
                </span>
              </div>
            </div>
          )}
        </section>

        <section className="ask-nexora-card ask-nexora-query-card" aria-labelledby="ask-nexora-query-title">
          <div className="ask-nexora-card-heading">
            <span aria-hidden="true"><MessageSquareText size={21} /></span>
            <div>
              <p className="eyebrow">Step 2</p>
              <h2 id="ask-nexora-query-title">Ask a question</h2>
            </div>
          </div>
          <p className="ask-nexora-card-intro">
            The question is restricted to the dummy document uploaded in this browser session.
            Unsupported answers should return an insufficient-evidence message.
          </p>

          <form className="ask-nexora-form" onSubmit={handleQuestion}>
            <label htmlFor="ask-nexora-question">Question about the dummy document</label>
            <textarea
              id="ask-nexora-question"
              rows={4}
              maxLength={2000}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={document ? 'Ask a concise, evidence-based question…' : 'Upload a confirmed dummy document first.'}
              disabled={!document || availability === 'unavailable' || isQuerying}
              required
            />
            <div className="ask-nexora-input-meta">
              <span>{document ? `Source: ${document.filename}` : 'No current-session document'}</span>
              <span>{question.length}/2000</span>
            </div>

            {queryError && <div className="ask-nexora-error" role="alert">{queryError}</div>}

            <button
              className="button button-primary"
              type="submit"
              disabled={!document || !question.trim() || isQuerying || availability === 'unavailable'}
            >
              <Search size={16} aria-hidden="true" />
              {isQuerying ? 'Reviewing local chunks…' : 'Ask local dummy data'}
            </button>
          </form>
        </section>
      </div>

      {answer && (
        <section className="ask-nexora-answer" aria-labelledby="ask-nexora-answer-title" aria-live="polite">
          <div className="ask-nexora-answer-heading">
            <div className="ask-nexora-card-heading">
              <span aria-hidden="true"><FileSearch size={21} /></span>
              <div>
                <p className="eyebrow">Backend response</p>
                <h2 id="ask-nexora-answer-title">Local dummy answer</h2>
              </div>
            </div>
            <div className="ask-nexora-answer-meta" aria-label="Answer metadata">
              <span>{answer.model_mode}</span>
              <span>{readableStatus(answer.status)}</span>
            </div>
          </div>

          <p className="ask-nexora-answer-copy">{answer.answer}</p>

          <div className="ask-nexora-sources">
            <div>
              <h3>Source references</h3>
              <p>{answer.sources.length} tenant-scoped excerpt{answer.sources.length === 1 ? '' : 's'} returned.</p>
            </div>

            {answer.sources.length > 0 ? (
              <ol>
                {answer.sources.map((source) => (
                  <li key={source.chunk_id}>
                    <div className="ask-nexora-source-heading">
                      <strong>{source.source_label}</strong>
                      <span>Rank {source.rank}</span>
                    </div>
                    <blockquote>{source.excerpt}</blockquote>
                    <details>
                      <summary>Reference IDs</summary>
                      <dl>
                        <div><dt>Document</dt><dd>{source.document_id}</dd></div>
                        <div><dt>Chunk</dt><dd>{source.chunk_id}</dd></div>
                      </dl>
                    </details>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="ask-nexora-no-sources">
                No source excerpts were returned. Treat this as an insufficient-evidence result.
              </p>
            )}
          </div>
        </section>
      )}

      <p className="ask-nexora-footnote">
        Local POC only. No external LLM, embeddings, vector database, telemetry, tracing, or
        third-party document service is used by this interface.
      </p>
    </div>
  )
}
