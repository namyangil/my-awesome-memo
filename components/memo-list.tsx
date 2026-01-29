'use client'

import { FileText, Pin } from 'lucide-react'
import { MemoCard } from './memo-card'
import { type Memo } from '@/lib/types'

interface MemoListProps {
  memos: Memo[]
  searchQuery: string
  onEdit: (memo: Memo) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
}

export function MemoList({ memos, searchQuery, onEdit, onDelete, onTogglePin }: MemoListProps) {
  // Filter memos based on search query
  const filteredMemos = memos.filter(
    (memo) =>
      memo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memo.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Separate pinned and unpinned memos
  const pinnedMemos = filteredMemos.filter((memo) => memo.isPinned)
  const unpinnedMemos = filteredMemos.filter((memo) => !memo.isPinned)

  if (filteredMemos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <FileText className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {searchQuery ? '검색 결과가 없어요' : '아직 메모가 없어요'}
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {searchQuery
            ? '다른 검색어로 시도해 보세요.'
            : '오른쪽 아래의 + 버튼을 눌러 첫 번째 메모를 작성해 보세요!'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Pinned Memos */}
      {pinnedMemos.length > 0 && (
        <section aria-labelledby="pinned-memos-heading">
          <div className="flex items-center gap-2 mb-4">
            <Pin className="w-4 h-4 text-primary" />
            <h2 id="pinned-memos-heading" className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              고정된 메모
            </h2>
            <span className="text-xs text-muted-foreground">({pinnedMemos.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pinnedMemos.map((memo) => (
              <MemoCard
                key={memo.id}
                memo={memo}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}

      {/* Other Memos */}
      {unpinnedMemos.length > 0 && (
        <section aria-labelledby="other-memos-heading">
          {pinnedMemos.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 id="other-memos-heading" className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                다른 메모
              </h2>
              <span className="text-xs text-muted-foreground">({unpinnedMemos.length})</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {unpinnedMemos.map((memo) => (
              <MemoCard
                key={memo.id}
                memo={memo}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
