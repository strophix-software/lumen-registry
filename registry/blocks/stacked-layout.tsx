import * as React from "react"
import {
  Bell,
  Search,
  ChevronDown,
  ChevronsUpDown,
  Check,
  Settings,
  LogOut,
  Plus,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface StackedTab {
  title: string
  href: string
  active?: boolean
  badge?: string | number
}

export interface OrgScope {
  id: string
  name: string
  plan?: string
}

export interface StackedLayoutProps {
  brand?: {
    name: string
    logo?: React.ReactNode
    href?: string
  }
  organizations?: OrgScope[]
  activeOrgId?: string
  onOrgSelect?: (orgId: string) => void
  primaryTabs?: StackedTab[]
  secondaryTabs?: StackedTab[]
  user?: {
    name: string
    email: string
    avatar?: string
    initials?: string
  }
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
  onSearchClick?: () => void
  children: React.ReactNode
}

const DEFAULT_PRIMARY_TABS: StackedTab[] = [
  { title: "Overview", href: "#", active: true },
  { title: "Deployments", href: "#" },
  { title: "Analytics", href: "#" },
  { title: "Activity", href: "#" },
  { title: "Settings", href: "#" },
]

export function StackedLayout({
  brand = { name: "Lumen" },
  organizations = [
    { id: "org-1", name: "Acme Corp", plan: "Pro" },
    { id: "org-2", name: "Personal", plan: "Hobby" },
  ],
  activeOrgId = "org-1",
  onOrgSelect,
  primaryTabs = DEFAULT_PRIMARY_TABS,
  secondaryTabs,
  user = { name: "Alex Rivera", email: "alex@example.com", initials: "AR" },
  breadcrumbs,
  actions,
  onSearchClick,
  children,
}: StackedLayoutProps) {
  const currentOrg = organizations.find((o) => o.id === activeOrgId) ?? organizations[0]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top primary bar */}
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <a href={brand.href ?? "/"} className="flex items-center gap-2 font-bold tracking-tight">
              {brand.logo ?? (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                  L
                </div>
              )}
            </a>

            <span className="text-muted-foreground/40 text-lg">/</span>

            {/* Org Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-2 px-2 text-sm font-semibold">
                  <span>{currentOrg?.name}</span>
                  <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Teams & Organizations</DropdownMenuLabel>
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => onOrgSelect?.(org.id)}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate">{org.name}</span>
                    {org.id === activeOrgId && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create Team</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-3">
            {onSearchClick && (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex text-muted-foreground gap-2 w-48 justify-start text-xs h-8"
                onClick={onSearchClick}
              >
                <Search className="h-3.5 w-3.5" />
                <span>Quick search...</span>
                <kbd className="pointer-events-none ml-auto inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  ⌘K
                </kbd>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                    <AvatarFallback>{user.initials ?? user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Primary tabs row */}
        {primaryTabs && primaryTabs.length > 0 && (
          <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
            {primaryTabs.map((tab, idx) => (
              <a
                key={idx}
                href={tab.href}
                className={cn(
                  "relative py-2.5 text-sm font-medium transition-colors hover:text-foreground whitespace-nowrap",
                  tab.active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {tab.title}
                {tab.active && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-primary" />
                )}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Subheader bar (breadcrumbs + secondary actions / tabs) */}
      {(breadcrumbs || actions || secondaryTabs) && (
        <div className="border-b bg-muted/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 py-4 px-4 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
            <div>{breadcrumbs}</div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
          {secondaryTabs && secondaryTabs.length > 0 && (
            <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2">
              {secondaryTabs.map((tab, idx) => (
                <a
                  key={idx}
                  href={tab.href}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                    tab.active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {tab.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Page content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
