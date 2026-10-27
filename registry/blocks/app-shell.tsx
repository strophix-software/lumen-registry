import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  active?: boolean
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface AppShellProps {
  brand?: {
    name: string
    logo?: React.ReactNode
    href?: string
  }
  navigation?: NavSection[]
  user?: {
    name: string
    email: string
    avatar?: string
    initials?: string
  }
  children: React.ReactNode
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
  onSearchClick?: () => void
  onThemeToggle?: () => void
}

const DEFAULT_NAVIGATION: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
      { title: "Analytics", href: "#", icon: BarChart3, badge: "New" },
      { title: "Customers", href: "#", icon: Users },
    ],
  },
  {
    title: "Configuration",
    items: [
      { title: "Settings", href: "#", icon: Settings },
    ],
  },
]

export function AppShell({
  brand = { name: "Lumen App" },
  navigation = DEFAULT_NAVIGATION,
  user = { name: "Alex Rivera", email: "alex@example.com", initials: "AR" },
  children,
  breadcrumbs,
  actions,
  onSearchClick,
  onThemeToggle,
}: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        {/* Brand header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <a
            href={brand.href ?? "/"}
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
          >
            {brand.logo ?? (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                L
              </div>
            )}
            {(!collapsed || isMobile) && (
              <span className="truncate text-base">{brand.name}</span>
            )}
          </a>
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-6 px-2">
          {navigation.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {section.title && (!collapsed || isMobile) && (
                <span className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </span>
              )}
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon
                return (
                  <a
                    key={itemIdx}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title={collapsed && !isMobile ? item.title : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {(!collapsed || isMobile) && (
                      <span className="truncate flex-1">{item.title}</span>
                    )}
                    {(!collapsed || isMobile) && item.badge && (
                      <Badge
                        variant={item.active ? "secondary" : "outline"}
                        className="ml-auto text-xs px-1.5 py-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                )
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar bottom user summary */}
      <div className="border-t p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 px-2 hover:bg-muted",
                collapsed && !isMobile && "justify-center px-0"
              )}
            >
              <Avatar className="h-7 w-7">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback>{user.initials ?? user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {(!collapsed || isMobile) && (
                <div className="flex flex-col items-start truncate text-left text-xs leading-tight">
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-muted-foreground truncate">{user.email}</span>
                </div>
              )}
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
              <span>Settings</span>
            </DropdownMenuItem>
            {onThemeToggle && (
              <DropdownMenuItem onClick={onThemeToggle}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Toggle theme</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          {renderSidebarContent(true)}
        </SheetContent>
      </Sheet>

      {/* Main shell area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header navbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>

          <div className="flex-1">
            {breadcrumbs}
          </div>

          <div className="flex items-center gap-2">
            {onSearchClick ? (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex text-muted-foreground gap-2 w-48 justify-start text-xs"
                onClick={onSearchClick}
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search anything...</span>
                <kbd className="pointer-events-none ml-auto inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  ⌘K
                </kbd>
              </Button>
            ) : null}

            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>

            {actions}
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
