'use client'

import { useState, useEffect } from 'react'
import { X, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { type Memo, type MemoColor, MEMO_COLOR_DOT } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MemoEditorProps {
  memo: Memo | null
  isOpen: boolean
  onClose: () => void
  onSave: (memo: Partial<Memo>) => void
  onDelete?: (id: string) => void
}

const COLORS: MemoColor[] = ['peach', 'mint', 'lavender', 'lemon', 'rose', 'sky']

const COLOR_LABELS: Record<MemoColor, string> = {
  peach: '피치',
  mint: '민트',
  lavender: '라벤더',
  lemon: '레몬',
  rose: '로즈',
  sky: '스카이',
}

export function MemoEditor({ memo, isOpen, onClose, onSave, onDelete }: MemoEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState<MemoColor>('peach')
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  useEffect(() => {
    if (memo) {
      setTitle(memo.title)
      setContent(memo.content)
      setColor(memo.color as MemoColor)
    } else {
      setTitle('')
      setContent('')
      setColor('peach')
    }
  }, [memo, isOpen])

  const handleSave = () => {
    onSave({
      id: memo?.id,
      title: title.trim(),
      content: content.trim(),
      color,
    })
    onClose()
  }

  const handleDelete = () => {
    if (memo && onDelete) {
      onDelete(memo.id)
      setShowDeleteAlert(false)
      onClose()
    }
  }

  const isEditing = !!memo

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {isEditing ? '메모 수정하기' : '새 메모 작성하기'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="memo-title" className="text-sm font-medium text-foreground">
                제목
              </label>
              <Input
                id="memo-title"
                placeholder="메모 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
                autoFocus
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <label htmlFor="memo-content" className="text-sm font-medium text-foreground">
                내용
              </label>
              <Textarea
                id="memo-content"
                placeholder="메모 내용을 입력하세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>

            {/* Color Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">배경 색상</label>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="메모 색상 선택">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      'w-10 h-10 rounded-full transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                      MEMO_COLOR_DOT[c],
                      color === c && 'ring-2 ring-offset-2 ring-foreground scale-110'
                    )}
                    role="radio"
                    aria-checked={color === c}
                    aria-label={COLOR_LABELS[c]}
                    title={COLOR_LABELS[c]}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {isEditing && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteAlert(true)}
                className="sm:mr-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                삭제
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              취소
            </Button>
            <Button type="button" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              이 메모를 삭제하면 복구할 수 없습니다. 정말 삭제하시겠어요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              삭제하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
