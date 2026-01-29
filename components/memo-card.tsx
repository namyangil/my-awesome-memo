'use client'

import { useState } from 'react'
import { Pin, PinOff, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Memo, MEMO_COLORS, type MemoColor } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MemoCardProps {
  memo: Memo
  onEdit: (memo: Memo) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
}

export function MemoCard({ memo, onEdit, onDelete, onTogglePin }: MemoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const colorClasses = MEMO_COLORS[memo.color as MemoColor] || MEMO_COLORS.peach

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  return (
    <Card
      className={cn(
        'group relative transition-all duration-300 cursor-pointer border-2',
        'hover:shadow-lg hover:-translate-y-1',
        colorClasses,
        memo.isPinned && 'ring-2 ring-primary/30'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit(memo)}
      role="article"
      aria-label={`메모: ${memo.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onEdit(memo)
        }
      }}
    >
      {/* Pin Indicator */}
      {memo.isPinned && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
          <Pin className="w-3 h-3 text-primary-foreground" />
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1 flex-1">
            {memo.title || '제목 없음'}
          </h3>
          <div
            className={cn(
              'transition-opacity duration-200',
              isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="메모 옵션"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(memo)
                  }}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  수정하기
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onTogglePin(memo.id)
                  }}
                >
                  {memo.isPinned ? (
                    <>
                      <PinOff className="w-4 h-4 mr-2" />
                      고정 해제
                    </>
                  ) : (
                    <>
                      <Pin className="w-4 h-4 mr-2" />
                      상단 고정
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(memo.id)
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
          {memo.content || '내용이 없습니다.'}
        </p>
      </CardContent>

      <CardFooter className="pt-2">
        <time className="text-xs text-muted-foreground" dateTime={memo.updatedAt.toString()}>
          {formatDate(memo.updatedAt)}
        </time>
      </CardFooter>
    </Card>
  )
}
