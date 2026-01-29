export interface Memo {
  id: string
  title: string
  content: string
  color: string
  createdAt: Date
  updatedAt: Date
  isPinned: boolean
}

export type MemoColor =
  | 'peach'
  | 'mint'
  | 'lavender'
  | 'lemon'
  | 'rose'
  | 'sky'

export const MEMO_COLORS: Record<MemoColor, string> = {
  peach: 'bg-orange-50 border-orange-200',
  mint: 'bg-emerald-50 border-emerald-200',
  lavender: 'bg-purple-50 border-purple-200',
  lemon: 'bg-yellow-50 border-yellow-200',
  rose: 'bg-pink-50 border-pink-200',
  sky: 'bg-sky-50 border-sky-200',
}

export const MEMO_COLOR_DOT: Record<MemoColor, string> = {
  peach: 'bg-orange-300',
  mint: 'bg-emerald-300',
  lavender: 'bg-purple-300',
  lemon: 'bg-yellow-300',
  rose: 'bg-pink-300',
  sky: 'bg-sky-300',
}
