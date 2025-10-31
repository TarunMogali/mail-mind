import React from 'react';
import type { Account, Mail } from './types';
import { Bot, Mailbox, Send, User } from 'lucide-react';

export const accounts: Account[] = [
  {
    label: 'Personal',
    email: 'personal@example.com',
    icon: <User className="h-4 w-4" />,
  },
  {
    label: 'Work',
    email: 'work@example.com',
    icon: <Mailbox className="h-4 w-4" />,
  },
  {
    label: 'Outreach',
    email: 'outreach@example.com',
    icon: <Send className="h-4 w-4" />,
  },
];

export const mails: Mail[] = [
  {
    id: '1',
    accountId: 'personal@example.com',
    folder: 'inbox',
    read: true,
    from: {
      name: 'Amelia',
      email: 'amelia@example.com',
      avatar: 'avatar-1',
    },
    to: {
      name: 'You',
      email: 'personal@example.com',
    },
    date: '2 hours ago',
    subject: 'Re: Your Application for Backend Engineer',
    body: `
Hi,

Thank you for your interest in the Backend Engineer position at ReachInbox. We've reviewed your resume and are impressed with your qualifications.

We'd like to schedule a technical interview. Are you available sometime next week?

Best,
Amelia
HR Team, ReachInbox`,
    category: 'Interested',
  },
  {
    id: '2',
    accountId: 'personal@example.com',
    folder: 'inbox',
    read: true,
    from: {
      name: 'William',
      email: 'william@example.com',
      avatar: 'avatar-2',
    },
    to: {
      name: 'You',
      email: 'personal@example.com',
    },
    date: '4 hours ago',
    subject: 'Coffee Chat?',
    body: `
Hey,

Just wanted to follow up on our conversation from last week. Let me know if you're free for a quick coffee chat sometime.

Cheers,
William`,
  },
  {
    id: '3',
    accountId: 'work@example.com',
    folder: 'inbox',
    read: false,
    from: {
      name: 'Olivia',
      email: 'olivia@example.com',
      avatar: 'avatar-3',
    },
    to: {
      name: 'You',
      email: 'work@example.com',
    },
    date: '1 day ago',
    subject: 'Project Alpha Kick-off',
    body: `
Hi Team,

This is a reminder that the kick-off meeting for Project Alpha is scheduled for tomorrow at 10 AM. Please come prepared to discuss the project timeline and deliverables.

Thanks,
Olivia`,
    category: 'Meeting Booked'
  },
  {
    id: '4',
    accountId: 'work@example.com',
    folder: 'inbox',
    read: true,
    from: {
      name: 'James',
      email: 'james@example.com',
      avatar: 'avatar-4',
    },
    to: {
      name: 'You',
      email: 'work@example.com',
    },
    date: '2 days ago',
    subject: 'Not the right fit',
    body: `
Hello,

Thank you for applying, but we've decided to move forward with other candidates at this time.

Regards,
James`,
    category: 'Not Interested',
  },
  {
    id: '5',
    accountId: 'outreach@example.com',
    folder: 'inbox',
    read: false,
    from: {
      name: 'Sophia',
      email: 'sophia@example.com',
      avatar: 'avatar-5',
    },
    to: {
      name: 'You',
      email: 'outreach@example.com',
    },
    date: '3 days ago',
    subject: 'Out of Office: Vacation',
    body: `
I am currently out of the office and will return on Monday. I will respond to your message as soon as possible upon my return.

Best,
Sophia`,
    category: 'Out of Office',
  },
  {
    id: '6',
    accountId: 'outreach@example.com',
    folder: 'inbox',
    read: true,
    from: {
      name: 'Benjamin',
      email: 'benjamin@example.com',
      avatar: 'avatar-6',
    },
    to: {
      name: 'You',
      email: 'outreach@example.com',
    },
    date: '4 days ago',
    subject: 'URGENT: Your account needs attention!',
    body: `
Click here to secure your account and win a prize! Limited time offer.

This is not a drill!`,
    category: 'Spam',
  },
  {
    id: '7',
    accountId: 'personal@example.com',
    folder: 'inbox',
    read: false,
    from: {
      name: 'Isabella',
      email: 'isabella@example.com',
      avatar: 'avatar-7',
    },
    to: {
      name: 'You',
      email: 'personal@example.com',
    },
    date: '5 days ago',
    subject: 'Weekend Plans',
    body: `
Hey!

Any plans for the weekend? Thinking of hiking Mount Falcon. Let me know if you'd like to join.

- Isabella`,
  },
  {
    id: '8',
    accountId: 'work@example.com',
    folder: 'inbox',
    read: true,
    from: {
      name: 'Lucas',
      email: 'lucas@example.com',
      avatar: 'avatar-8',
    },
    to: {
      name: 'You',
      email: 'work@example.com',
    },
    date: '1 week ago',
    subject: 'Confirmed: Technical Interview on Friday',
    body: `
Hi,

This email is to confirm your technical interview slot for this Friday at 2:00 PM. The meeting link is attached.

See you then,
Lucas`,
    category: 'Meeting Booked'
  },
];
