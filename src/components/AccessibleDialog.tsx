import { useEffect, useRef, type ReactNode } from 'react'

interface AccessibleDialogProps {
  bodyClassName: string
  children: ReactNode
  className: string
  dismissLabel?: string
  isOpen: boolean
  labelledBy: string
  onClose: () => void
}

export function AccessibleDialog({
  bodyClassName,
  children,
  className,
  dismissLabel = 'Close dialog',
  isOpen,
  labelledBy,
  onClose,
}: AccessibleDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return

    const dialog = dialogRef.current
    returnFocusRef.current = document.activeElement as HTMLElement | null
    document.body.classList.add(bodyClassName)

    if (!dialog.open) dialog.showModal()
    dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]')?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onCloseRef.current()
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      if (dialog.open) dialog.close()
      document.body.classList.remove(bodyClassName)
      returnFocusRef.current?.focus()
      returnFocusRef.current = null
    }
  }, [bodyClassName, isOpen])

  return (
    <dialog
      aria-labelledby={labelledBy}
      className={`accessible-dialog ${className}`}
      onCancel={(event) => {
        event.preventDefault()
        onCloseRef.current()
      }}
      ref={dialogRef}
    >
      <button
        aria-label={dismissLabel}
        className="dialog-dismiss-layer"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      {children}
    </dialog>
  )
}
