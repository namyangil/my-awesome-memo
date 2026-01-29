'use client'

import { FileText, Pin, Calendar } from 'lucide-react'

interface StatsBarProps {
  totalMemos: number
  pinnedMemos: number
  todayMemos: number
}

export function StatsBar({ totalMemos, pinnedMemos, todayMemos }: StatsBarProps) {
  const stats = [
    {
      icon: FileText,
      label: '전체 메모',
      value: totalMemos,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Pin,
      label: '고정됨',
      value: pinnedMemos,
      color: 'text-accent-foreground',
      bgColor: 'bg-accent',
    },
    {
      icon: Calendar,
      label: '오늘 작성',
      value: todayMemos,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border"
        >
          <div className={`p-2 rounded-lg ${stat.bgColor}`}>
            <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
          </div>
          <div className="min-w-0">
            <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
