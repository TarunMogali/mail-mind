import { MailOpen } from 'lucide-react'
import { Mail } from '@/components/mail/mail'
import { accounts, mails } from '@/lib/data.tsx'

export default function Home() {
  return (
    <>
      <main className="hidden h-screen flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
        />
      </main>
      <div className="flex h-screen flex-col items-center justify-center gap-2 md:hidden">
        <MailOpen className="h-12 w-12 text-primary" />
        <h1 className="text-2xl font-bold">MailMind</h1>
        <p className="text-center text-muted-foreground">
          This application is best viewed on a desktop device.
        </p>
      </div>
    </>
  )
}
