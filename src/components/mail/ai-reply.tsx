'use client'

import * as React from 'react'
import { Bot, Sparkles } from 'lucide-react'

import { generateSuggestedReplyAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import type { Mail } from '@/lib/types'

interface AiReplyProps {
  mail: Mail
}

export function AiReply({ mail }: AiReplyProps) {
  const [agenda, setAgenda] = React.useState('')
  const [reply, setReply] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!agenda.trim()) {
      toast({
        variant: 'destructive',
        title: 'Agenda is required',
        description: 'Please provide the product and outreach agenda.',
      })
      return
    }

    setIsLoading(true)
    setReply('')
    const result = await generateSuggestedReplyAction({
      emailBody: mail.body,
      productAndOutreachAgenda: agenda,
    })
    setIsLoading(false)

    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: 'Error generating reply',
        description: result.error,
      })
    } else {
      setReply(result.suggestedReply)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Suggested Reply
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter product and outreach agenda... (e.g., I am applying for a job position. If the lead is interested, share the meeting booking link: https://cal.com/example)"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            className="min-h-[100px]"
            aria-label="Product and outreach agenda"
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Reply'
            )}
          </Button>
        </form>
        {reply && (
          <div className="mt-6 rounded-lg border bg-muted p-4">
            <p className="text-sm text-muted-foreground">Suggested Reply:</p>
            <p className="whitespace-pre-wrap pt-2">{reply}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
