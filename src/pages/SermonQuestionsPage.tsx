import { ArrowLeft, Check, CheckCircle2, Pencil, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GenerateQuestionsModal,
  type QuestionGenerationRequest,
} from '../components/GenerateQuestionsModal'
import { SermonSectionNav } from '../components/SermonSectionNav'
import {
  completedServices,
  generatedQuestionSamples,
  sermonQuestionGroups,
  type SermonQuestionGroupId,
} from '../data/servicesMockData'

const service = completedServices.find((item) => item.id === 'sunday-worship-12-july')!
const sermon = service.sermon!

function targetGroupForAudience(audience: QuestionGenerationRequest['audience']): SermonQuestionGroupId {
  if (audience === 'Small group') return 'small-group'
  if (audience === 'Ministry leaders') return 'ministry-leader'
  return 'personal'
}

export function SermonQuestionsPage() {
  const [groups, setGroups] = useState(() => sermonQuestionGroups.map((group) => ({
    ...group,
    questions: group.questions.map((question) => ({ ...question })),
  })))
  const [activeGroupId, setActiveGroupId] = useState<SermonQuestionGroupId>('personal')
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [newQuestionText, setNewQuestionText] = useState('')
  const [showAllQuestions, setShowAllQuestions] = useState(false)
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
  const [previewMessage, setPreviewMessage] = useState('')

  const activeGroup = useMemo(
    () => groups.find((group) => group.id === activeGroupId)!,
    [activeGroupId, groups],
  )
  const visibleQuestions = showAllQuestions
    ? activeGroup.questions
    : activeGroup.questions.slice(0, 3)
  const hiddenQuestionCount = activeGroup.questions.length - visibleQuestions.length

  const updateQuestion = (questionId: string, updates: { text?: string; status?: 'Approved' }) => {
    setGroups((current) => current.map((group) => group.id === activeGroupId
      ? {
          ...group,
          questions: group.questions.map((question) => question.id === questionId
            ? { ...question, ...updates }
            : question),
        }
      : group))
  }

  const saveEdit = (questionId: string) => {
    const trimmedText = editingText.trim()
    if (!trimmedText) return
    updateQuestion(questionId, { text: trimmedText })
    setEditingQuestionId(null)
    setPreviewMessage('Question edited locally. Changes are not permanently saved.')
  }

  const removeQuestion = (questionId: string) => {
    setGroups((current) => current.map((group) => group.id === activeGroupId
      ? { ...group, questions: group.questions.filter((question) => question.id !== questionId) }
      : group))
    setPreviewMessage('Question removed from this local preview session.')
  }

  const addQuestion = () => {
    const trimmedText = newQuestionText.trim()
    if (!trimmedText) return
    setGroups((current) => current.map((group) => group.id === activeGroupId
      ? {
          ...group,
          questions: [
            ...group.questions,
            { id: `added-${Date.now()}`, text: trimmedText, status: 'Draft' as const },
          ],
        }
      : group))
    setNewQuestionText('')
    setIsAdding(false)
    setShowAllQuestions(true)
    setPreviewMessage('Question added locally. Changes are not permanently saved.')
  }

  const generateQuestions = ({ audience, style, count }: QuestionGenerationRequest) => {
    const targetGroupId = targetGroupForAudience(audience)
    const timestamp = Date.now()
    const generated = generatedQuestionSamples.slice(0, count).map((text, index) => ({
      id: `generated-${timestamp}-${index}`,
      text,
      status: 'Draft' as const,
    }))

    setGroups((current) => current.map((group) => group.id === targetGroupId
      ? { ...group, questions: [...group.questions, ...generated] }
      : group))
    setActiveGroupId(targetGroupId)
    setShowAllQuestions(false)
    setIsGenerateModalOpen(false)
    setPreviewMessage(`${count} fictional ${style.toLowerCase()} questions simulated for ${audience.toLowerCase()}. No AI service was contacted.`)
  }

  const markAllReviewed = () => {
    setGroups((current) => current.map((group) => ({
      ...group,
      questions: group.questions.map((question) => ({ ...question, status: 'Approved' as const })),
    })))
    setPreviewMessage('All question groups marked as reviewed for this local preview session.')
  }

  return (
    <div className="page sermon-workflow-page sermon-questions-page">
      <Link className="service-back-link" to="/services/sunday-worship-12-july">
        <ArrowLeft size={16} aria-hidden="true" /> Back to completed service
      </Link>

      <SermonSectionNav />

      <section className="sermon-questions-hero" aria-labelledby="sermon-questions-title">
        <div>
          <p className="eyebrow">{service.name} · {service.dateLabel}</p>
          <h1 id="sermon-questions-title">Review generated questions</h1>
          <p>{sermon.title}</p>
        </div>
        <button className="button button-secondary" type="button" onClick={() => setIsGenerateModalOpen(true)}>
          <Sparkles size={17} aria-hidden="true" /> Generate more questions
        </button>
      </section>

      <div className="ai-draft-notice" role="note">
        <Sparkles size={20} aria-hidden="true" />
        <div>
          <strong>AI-generated draft. Review before sharing or publishing.</strong>
          <p>This fictional preview does not provide approved teaching or theological interpretation.</p>
        </div>
      </div>

      <div className="question-preview-notice" role="note">
        <strong>Preview interaction only. Changes are not permanently saved.</strong>
      </div>

      <section className="question-review-panel" aria-labelledby="question-groups-title">
        <div className="question-review-heading">
          <div>
            <p className="eyebrow">Progressive review</p>
            <h2 id="question-groups-title">Question groups</h2>
          </div>
          <button className="text-button" type="button" onClick={markAllReviewed}>
            <CheckCircle2 size={16} aria-hidden="true" /> Mark all reviewed
          </button>
        </div>

        <div className="question-group-tabs" role="tablist" aria-label="Question groups">
          {groups.map((group) => (
            <button
              aria-controls={`question-group-${group.id}`}
              aria-selected={activeGroupId === group.id}
              className={activeGroupId === group.id ? 'active' : undefined}
              id={`question-tab-${group.id}`}
              key={group.id}
              onClick={() => {
                setActiveGroupId(group.id)
                setShowAllQuestions(false)
                setEditingQuestionId(null)
                setIsAdding(false)
              }}
              role="tab"
              type="button"
            >
              {group.title}
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`question-tab-${activeGroup.id}`}
          className="question-group-content"
          id={`question-group-${activeGroup.id}`}
          role="tabpanel"
          tabIndex={0}
        >
          <div className="question-group-heading">
            <div>
              <h3>{activeGroup.title}</h3>
              <p>{activeGroup.description}</p>
            </div>
            <button className="text-button" type="button" onClick={() => setIsAdding(true)}>
              <Plus size={16} aria-hidden="true" /> Add question
            </button>
          </div>

          {activeGroup.questions.length > 0 ? (
            <ol className="review-question-list">
              {visibleQuestions.map((question) => (
                <li key={question.id}>
                  {editingQuestionId === question.id ? (
                    <form
                      className="question-edit-form"
                      onSubmit={(event) => {
                        event.preventDefault()
                        saveEdit(question.id)
                      }}
                    >
                      <label>
                        <span className="sr-only">Edit question</span>
                        <textarea value={editingText} onChange={(event) => setEditingText(event.target.value)} />
                      </label>
                      <div>
                        <button className="text-button" type="submit">Save</button>
                        <button className="text-button muted" type="button" onClick={() => setEditingQuestionId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="review-question-copy">
                        <p>{question.text}</p>
                        <span className={question.status === 'Approved' ? 'approved' : undefined}>
                          {question.status === 'Approved' && <Check size={13} aria-hidden="true" />}
                          {question.status}
                        </span>
                      </div>
                      <div className="review-question-actions" aria-label={`Actions for: ${question.text}`}>
                        <button
                          className="icon-button"
                          type="button"
                          aria-label="Edit question"
                          onClick={() => {
                            setEditingQuestionId(question.id)
                            setEditingText(question.text)
                          }}
                        ><Pencil size={15} aria-hidden="true" /></button>
                        <button
                          className="icon-button"
                          type="button"
                          aria-label="Remove question"
                          onClick={() => removeQuestion(question.id)}
                        ><Trash2 size={15} aria-hidden="true" /></button>
                        <button
                          className="question-approve-button"
                          type="button"
                          disabled={question.status === 'Approved'}
                          onClick={() => {
                            updateQuestion(question.id, { status: 'Approved' })
                            setPreviewMessage('Question approved locally. Changes are not permanently saved.')
                          }}
                        >
                          <Check size={15} aria-hidden="true" />
                          {question.status === 'Approved' ? 'Approved' : 'Approve'}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="questions-empty-state">No questions remain in this group. Add or simulate new questions when needed.</p>
          )}

          {hiddenQuestionCount > 0 && (
            <button className="text-button show-more-questions" type="button" onClick={() => setShowAllQuestions(true)}>
              Show {hiddenQuestionCount} more {hiddenQuestionCount === 1 ? 'question' : 'questions'}
            </button>
          )}
          {showAllQuestions && activeGroup.questions.length > 3 && (
            <button className="text-button show-more-questions" type="button" onClick={() => setShowAllQuestions(false)}>
              Show fewer questions
            </button>
          )}

          {isAdding && (
            <form
              className="add-question-form"
              onSubmit={(event) => {
                event.preventDefault()
                addQuestion()
              }}
            >
              <label htmlFor="new-question">New fictional question</label>
              <textarea
                autoFocus
                id="new-question"
                onChange={(event) => setNewQuestionText(event.target.value)}
                placeholder="Enter a concise review question"
                required
                value={newQuestionText}
              />
              <div>
                <button className="button button-primary" type="submit">Add question</button>
                <button className="button button-secondary" type="button" onClick={() => setIsAdding(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {previewMessage && <div className="service-action-feedback sermon-review-feedback" role="status">{previewMessage}</div>}

      <GenerateQuestionsModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={generateQuestions}
      />
    </div>
  )
}
