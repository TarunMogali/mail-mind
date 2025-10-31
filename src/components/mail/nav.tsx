'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FolderLink } from '@/lib/types'

interface NavProps {
  isCollapsed: boolean
  links: FolderLink[]
  activeLink: string
  onLinkClick: (title: string) => void
}

export function Nav({ links, isCollapsed, activeLink, onLinkClick }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-1 p-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => onLinkClick(link.title)}
                  className={cn(
                    buttonVariants({ variant: link.title === activeLink ? 'default' : 'ghost', size: 'icon' }),
                    'h-9 w-9',
                    link.title === activeLink &&
                      'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white'
                  )}
                >
                  {link.icon}
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              onClick={() => onLinkClick(link.title)}
              className={cn(
                buttonVariants({ variant: link.title === activeLink ? 'default' : 'ghost', size: 'sm' }),
                link.title === activeLink &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              {link.icon}
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    link.title === activeLink &&
                      'text-background dark:text-white'
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
