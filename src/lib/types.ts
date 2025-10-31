export type Mail = {
  id: string
  accountId: string
  folder: 'inbox' | 'sent' | 'archive' | 'trash' | 'spam'
  from: {
    name: string
    email: string
    avatar: string
  }
  to: {
    name: string
    email: string
  }
  subject: string
  body: string
  date: string
  read: boolean
  category?: 'Interested' | 'Meeting Booked' | 'Not Interested' | 'Spam' | 'Out of Office'
}

export type Account = {
  label: string
  email: string
  icon: React.ReactElement
}

export type FolderLink = {
  title: string
  label?: string
  icon: React.ReactElement
}
