'use client'

import { useState, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/header'
import { MemoList } from '@/components/memo-list'
import { MemoEditor } from '@/components/memo-editor'
import { FloatingActionButton } from '@/components/floating-action-button'
import { StatsBar } from '@/components/stats-bar'
import { type Memo, type MemoColor } from '@/lib/types'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

// Sample initial memos for demo
const INITIAL_MEMOS: Memo[] = [
  {
    id: '1',
    title: '오늘의 할 일',
    content: '1. 프로젝트 미팅 참석\n2. 보고서 작성 완료\n3. 저녁 운동하기\n4. 책 30분 읽기',
    color: 'peach',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPinned: true,
  },
  {
    id: '2',
    title: '회의 메모',
    content: '다음 주 프로젝트 일정 논의\n- 디자인 검토: 월요일\n- 개발 시작: 화요일\n- QA 테스트: 금요일',
    color: 'mint',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    isPinned: false,
  },
  {
    id: '3',
    title: '장보기 목록',
    content: '우유, 계란, 빵, 사과, 바나나, 치즈',
    color: 'lemon',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
    isPinned: false,
  },
  {
    id: '4',
    title: '아이디어 노트',
    content: '새로운 앱 기능 아이디어:\n- 음성 메모 지원\n- 이미지 첨부\n- 태그 시스템\n- 다크 모드',
    color: 'lavender',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
    isPinned: true,
  },
  {
    id: '5',
    title: '독서 기록',
    content: '「세이노의 가르침」 - 인생의 방향에 대해 깊이 생각하게 되었다. 매일 조금씩이라도 성장하자.',
    color: 'rose',
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 345600000),
    isPinned: false,
  },
  {
    id: '6',
    title: '맛집 리스트',
    content: '1. 강남역 파스타집\n2. 홍대 브런치 카페\n3. 이태원 타코집',
    color: 'sky',
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 432000000),
    isPinned: false,
  },
]

export default function MemoApp() {
  const { data: session } = useSession()
  const [memos, setMemos] = useState<Memo[]>(INITIAL_MEMOS)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null)

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pinnedCount = memos.filter((m) => m.isPinned).length
    const todayCount = memos.filter((m) => {
      const memoDate = new Date(m.createdAt)
      memoDate.setHours(0, 0, 0, 0)
      return memoDate.getTime() === today.getTime()
    }).length

    return {
      total: memos.length,
      pinned: pinnedCount,
      today: todayCount,
    }
  }, [memos])

  const handleCreateMemo = useCallback(() => {
    setEditingMemo(null)
    setIsEditorOpen(true)
  }, [])

  const handleEditMemo = useCallback((memo: Memo) => {
    setEditingMemo(memo)
    setIsEditorOpen(true)
  }, [])

  const handleSaveMemo = useCallback((memoData: Partial<Memo>) => {
    if (memoData.id) {
      // Update existing memo
      setMemos((prev) =>
        prev.map((m) =>
          m.id === memoData.id
            ? {
                ...m,
                title: memoData.title || '',
                content: memoData.content || '',
                color: memoData.color as MemoColor || m.color,
                updatedAt: new Date(),
              }
            : m
        )
      )
      toast.success('메모가 수정되었어요!')
    } else {
      // Create new memo
      const newMemo: Memo = {
        id: Date.now().toString(),
        title: memoData.title || '',
        content: memoData.content || '',
        color: memoData.color as MemoColor || 'peach',
        createdAt: new Date(),
        updatedAt: new Date(),
        isPinned: false,
      }
      setMemos((prev) => [newMemo, ...prev])
      toast.success('새 메모가 작성되었어요!')
    }
  }, [])

  const handleDeleteMemo = useCallback((id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id))
    toast.success('메모가 삭제되었어요!')
  }, [])

  const handleTogglePin = useCallback((id: string) => {
    setMemos((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isPinned: !m.isPinned, updatedAt: new Date() } : m
      )
    )
  }, [])

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false)
    setEditingMemo(null)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <StatsBar
          totalMemos={stats.total}
          pinnedMemos={stats.pinned}
          todayMemos={stats.today}
        />

        {/* Memo List */}
        <MemoList
          memos={memos}
          searchQuery={searchQuery}
          onEdit={handleEditMemo}
          onDelete={handleDeleteMemo}
          onTogglePin={handleTogglePin}
        />
      </main>

      {/* FAB */}
      <FloatingActionButton onClick={handleCreateMemo} />

      {/* Editor Modal */}
      <MemoEditor
        memo={editingMemo}
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        onSave={handleSaveMemo}
        onDelete={handleDeleteMemo}
      />

      {/* Toast Notifications */}
      <Toaster position="bottom-center" />
    </div>
  )
}
