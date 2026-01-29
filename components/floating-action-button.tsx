'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  onClick: () => void
  className?: string
}

export function FloatingActionButton({ onClick, className }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        'fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'transition-all duration-300 hover:scale-110 hover:shadow-xl',
        'focus-visible:ring-4 focus-visible:ring-primary/30',
        'z-50',
        className
      )}
      aria-label="새 메모 작성"
    >
      <Plus className="w-6 h-6" />
    </Button>
  )
}
