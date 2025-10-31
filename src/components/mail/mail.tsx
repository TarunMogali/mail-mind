'use client'

import {
  Archive,
  CalendarCheck,
  Clock,
  Inbox,
  Send,
  ShieldAlert,
  Sparkles,
  Trash2,
  XCircle
} from 'lucide-react'
import * as React from 'react'

import { AccountSwitcher } from './account-switcher'
import { MailDisplay } from './mail-display'
import { MailList } from './mail-list'
import { Nav } from './nav'
import type { Account, Mail as MailType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

interface MailProps {
  accounts: Account[]
  mails: MailType[]
}

export function Mail({ accounts, mails: defaultMails }: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [mails, setMails] = React.useState<MailType[]>(defaultMails)
  const [selectedAccount, setSelectedAccount] = React.useState<string>(accounts[0].email)
  const [activeFilter, setActiveFilter] = React.useState<string>('Inbox')
  const [selectedMailId, setSelectedMailId] = React.useState<string | null>(
    mails.find(m => !m.read)?.id || mails[0].id
  );
  
  const handleUpdateMail = (mailId: string, updates: Partial<MailType>) => {
    setMails(prevMails =>
      prevMails.map(mail => (mail.id === mailId ? { ...mail, ...updates } : mail))
    )
  }

  const handleSelectMail = (id: string) => {
    setSelectedMailId(id)
    handleUpdateMail(id, { read: true })
  }

  const filteredMails = React.useMemo(() => {
    const allAccountMails = mails.filter(mail => mail.accountId === selectedAccount)

    if (activeFilter === 'Inbox') {
      return allAccountMails.filter(mail => mail.folder === 'inbox')
    }
    if (activeFilter === 'Sent') {
      return allAccountMails.filter(mail => mail.folder === 'sent')
    }
    if (activeFilter === 'Archive') {
      return allAccountMails.filter(mail => mail.folder === 'archive')
    }
    if (activeFilter === 'Trash') {
        return allAccountMails.filter(mail => mail.folder === 'trash')
    }
    // Category filters only apply to inbox for this app's logic
    return allAccountMails.filter(mail => mail.category === activeFilter && mail.folder === 'inbox')

  }, [mails, selectedAccount, activeFilter])

  const selectedMail = mails.find((item) => item.id === selectedMailId) || null
  const unreadCount = React.useMemo(() => mails.filter(m => m.folder === 'inbox' && !m.read && m.accountId === selectedAccount).length, [mails, selectedAccount])

  React.useEffect(() => {
    if (filteredMails.length > 0 && !filteredMails.find(m => m.id === selectedMailId)) {
        setSelectedMailId(filteredMails[0].id)
    } else if (filteredMails.length === 0) {
        setSelectedMailId(null)
    }
  }, [filteredMails, selectedMailId])

  return (
      <div className="flex h-full w-full">
        <ResizablePanelGroup
            direction="horizontal"
            className="h-full max-h-screen items-stretch"
        >
            <ResizablePanel
            defaultSize={20}
            collapsedSize={4}
            collapsible={true}
            minSize={15}
            maxSize={25}
            onCollapse={() => {
                setIsCollapsed(true)
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
            }}
            onExpand={() => {
                setIsCollapsed(false)
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
            }}
            className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out', "bg-sidebar text-sidebar-foreground")}
            >
            <div className={cn('flex h-[56px] items-center justify-center', isCollapsed ? 'h-[56px]' : 'px-2')}>
                <AccountSwitcher 
                  isCollapsed={isCollapsed} 
                  accounts={accounts}
                  selectedAccount={selectedAccount}
                  onAccountChange={setSelectedAccount}
                />
            </div>
            <Separator />
            <Nav
                isCollapsed={isCollapsed}
                activeLink={activeFilter}
                onLinkClick={setActiveFilter}
                links={[
                {
                    title: 'Inbox',
                    label: unreadCount > 0 ? unreadCount.toString() : undefined,
                    icon: <Inbox className="h-4 w-4" />,
                },
                {
                    title: 'Sent',
                    icon: <Send className="h-4 w-4" />,
                },
                {
                    title: 'Archive',
                    icon: <Archive className="h-4 w-4" />,
                },
                {
                    title: 'Trash',
                    icon: <Trash2 className="h-4 w-4" />,
                },
                ]}
            />
            <Separator />
             <Nav
                isCollapsed={isCollapsed}
                activeLink={activeFilter}
                onLinkClick={setActiveFilter}
                links={[
                    {
                        title: 'Interested',
                        label: mails.filter(m => m.accountId === selectedAccount && m.folder === 'inbox' && m.category === 'Interested').length.toString(),
                        icon: <Sparkles className="h-4 w-4" />,
                    },
                     {
                        title: 'Meeting Booked',
                        label: mails.filter(m => m.accountId === selectedAccount && m.folder === 'inbox' && m.category === 'Meeting Booked').length.toString(),
                        icon: <CalendarCheck className="h-4 w-4" />,
                    },
                    {
                        title: 'Not Interested',
                        label: mails.filter(m => m.accountId === selectedAccount && m.folder === 'inbox' && m.category === 'Not Interested').length.toString(),
                        icon: <XCircle className="h-4 w-4" />,
                    },
                    {
                        title: 'Out of Office',
                        label: mails.filter(m => m.accountId === selectedAccount && m.folder === 'inbox' && m.category === 'Out of Office').length.toString(),
                        icon: <Clock className="h-4 w-4" />,
                    },
                    {
                        title: 'Spam',
                        label: mails.filter(m => m.accountId === selectedAccount && m.folder === 'inbox' && m.category === 'Spam').length.toString(),
                        icon: <ShieldAlert className="h-4 w-4" />,
                    },
                ]}
            />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={30}>
                <MailList
                    items={filteredMails}
                    onSelectMail={handleSelectMail}
                    selectedMailId={selectedMailId}
                />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
                <MailDisplay mail={selectedMail} onUpdateMail={handleUpdateMail} />
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}
