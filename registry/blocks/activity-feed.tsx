import * as React from "react"
import { CircleDot, LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export interface ActivityEvent {
  id: string
  actor: {
    name: string
    avatar?: string
    initials?: string
  }
  action: string
  target?: string
  timestamp: string
  icon?: LucideIcon | React.ComponentType<{ className?: string }>
  badge?: {
    label: string
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
  }
  details?: string
}

export interface ActivityFeedProps {
  events: ActivityEvent[]
  className?: string
}

export function ActivityFeed({ events, className }: ActivityFeedProps) {
  if (events.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-muted-foreground">
        No recent activity.
      </div>
    )
  }

  return (
    <div className={cn("flow-root", className)}>
      <ul className="-mb-8">
        {events.map((event, idx) => {
          const isLast = idx === events.length - 1
          const Icon = event.icon

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  {/* Avatar or Icon */}
                  <div className="relative">
                    <Avatar className="h-8 w-8 ring-4 ring-background">
                      {event.actor.avatar && (
                        <AvatarImage src={event.actor.avatar} alt={event.actor.name} />
                      )}
                      <AvatarFallback className="text-xs">
                        {event.actor.initials ?? event.actor.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {Icon && (
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Icon className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {event.actor.name}
                        </span>{" "}
                        {event.action}{" "}
                        {event.target && (
                          <span className="font-medium text-foreground">
                            {event.target}
                          </span>
                        )}
                      </p>
                      <time className="text-[11px] text-muted-foreground whitespace-nowrap">
                        {event.timestamp}
                      </time>
                    </div>

                    {event.badge && (
                      <div className="mt-1">
                        <Badge
                          variant={event.badge.variant ?? "secondary"}
                          className="text-[10px] px-1.5 py-0"
                        >
                          {event.badge.label}
                        </Badge>
                      </div>
                    )}

                    {event.details && (
                      <p className="mt-1 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
                        {event.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
