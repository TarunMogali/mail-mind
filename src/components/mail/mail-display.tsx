'use client'

import {
  Archive,
  ArchiveX,
  CalendarCheck,
  Clock,
  MoreVertical,
  Reply,
  ReplyAll,
  ShieldAlert,
  Sparkles,
  Trash2,
  XCircle,
} from 'lucide-react'
import * as React from 'react'

import { categorizeEmailAction } from '@/app/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import type { Mail } from '@/lib/types'
import { AiReply } from './ai-reply'

interface MailDisplayProps {
  mail: Mail | null
  onUpdateMail: (mailId: string, updates: Partial<Mail>) => void
}

export function MailDisplay({ mail, onUpdateMail }: MailDisplayProps) {
  const [isCategorizing, setIsCategorizing] = React.useState(false)
  const { toast } = useToast()

  const getAvatarUrl = (avatarId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === avatarId)
    return image?.imageUrl || 'https://picsum.photos/seed/placeholder/40/40'
  }

  const handleCategorize = async () => {
    if (!mail) return
    setIsCategorizing(true)
    const result = await categorizeEmailAction({ emailContent: mail.body })
    setIsCategorizing(false)

    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: 'Categorization Failed',
        description: result.error,
      })
    } else {
      onUpdateMail(mail.id, { category: result.category, read: true })
      toast({
        title: 'Email Categorized',
        description: `Email marked as: ${result.category}`,
      })
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Interested':
        return <Sparkles className="h-4 w-4 text-emerald-500" />
      case 'Meeting Booked':
        return <CalendarCheck className="h-4 w-4 text-sky-500" />
      case 'Not Interested':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'Spam':
        return <ShieldAlert className="h-4 w-4 text-amber-500" />
      case 'Out of Office':
        return <Clock className="h-4 w-4 text-slate-500" />
      default:
        return null
    }
  }

  if (!mail) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M19 16v6"/><path d="M16 19h6"/></svg>
          <p>No mail selected</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Star thread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuItem>Mute thread</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage alt={mail.from.name} src={getAvatarUrl(mail.from.avatar)} />
              <AvatarFallback>
                {mail.from.name
                  .split(' ')
                  .map((chunk) => chunk[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{mail.from.name}</div>
              <div className="line-clamp-1 text-xs">{mail.subject}</div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Reply-To:</span>{' '}
                <span className="text-muted-foreground">{mail.from.email}</span>
              </div>
            </div>
          </div>
          {mail.date && (
            <div className="ml-auto text-xs text-muted-foreground">
              {mail.date}
            </div>
          )}
        </div>
        <Separator />
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          {mail.body}
        </div>
        <Separator className="mt-auto" />
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-categorize" className="flex items-center gap-2 text-base font-semibold">
                AI Category
              </Label>
              {mail.category && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getCategoryIcon(mail.category)}
                  <span>{mail.category}</span>
                </div>
              )}
            </div>
            <Button onClick={handleCategorize} disabled={isCategorizing} size="sm">
              {isCategorizing ? 'Categorizing...' : 'Run AI Categorization'}
            </Button>
          </div>
          <AiReply mail={mail} />
        </div>
      </div>
    </div>
  )
}
