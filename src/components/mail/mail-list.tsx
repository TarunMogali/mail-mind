'use client'

import { Search } from 'lucide-react'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { Mail } from '@/lib/types'
import { PlaceHolderImages } from '@/lib/placeholder-images'

interface MailListProps {
  items: Mail[]
  selectedMailId: string | null
  onSelectMail: (id: string) => void
}

export function MailList({ items, selectedMailId, onSelectMail }: MailListProps) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const getAvatarUrl = (avatarId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === avatarId)
    return image?.imageUrl || 'https://picsum.photos/seed/placeholder/40/40'
  }

  const filteredItems = items.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

    const getCategoryBadgeClass = (category?: string) => {
    switch (category) {
      case 'Interested':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
      case 'Meeting Booked':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 border-sky-200 dark:border-sky-800/60'
      case 'Not Interested':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800/60'
      case 'Spam':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
      case 'Out of Office':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300 border-slate-200 dark:border-slate-700/60'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }


  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Inbox</h1>
      </div>
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search" 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent/80',
                  selectedMailId === item.id && 'bg-accent'
                )}
                onClick={() => onSelectMail(item.id)}
              >
                <div className="flex w-full items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                       <AvatarImage alt={item.from.name} src={getAvatarUrl(item.from.avatar)} />
                      <AvatarFallback>
                        {item.from.name
                          .split(' ')
                          .map((chunk) => chunk[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'font-semibold',
                            !item.read && 'font-bold text-primary'
                          )}
                        >
                          {item.from.name}
                        </div>
                        {!item.read && (
                          <span className="flex h-2 w-2 rounded-full bg-accent" />
                        )}
                      </div>
                      <div className="text-xs font-medium">{item.subject}</div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'ml-auto text-xs',
                      selectedMailId === item.id
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.date}
                  </div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {item.body.substring(0, 300)}
                </div>
                {item.category && (
                  <Badge variant="outline" className={cn('font-normal', getCategoryBadgeClass(item.category))}>
                    {item.category}
                  </Badge>
                )}
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No mail found.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
