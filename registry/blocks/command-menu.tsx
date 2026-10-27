import * as React from "react"
import { Search, FileText, Settings, User, LogOut, Moon, Sun, Laptop } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export interface CommandItem {
  id: string
  title: string
  icon?: React.ComponentType<{ className?: string }>
  shortcut?: string
  onSelect: () => void
}

export interface CommandGroup {
  heading: string
  items: CommandItem[]
}

export interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups?: CommandGroup[]
  placeholder?: string
}

const DEFAULT_GROUPS: CommandGroup[] = [
  {
    heading: "Quick Navigation",
    items: [
      { id: "docs", title: "Documentation", icon: FileText, shortcut: "G D", onSelect: () => {} },
      { id: "settings", title: "Project Settings", icon: Settings, shortcut: "G S", onSelect: () => {} },
      { id: "profile", title: "User Profile", icon: User, shortcut: "G P", onSelect: () => {} },
    ],
  },
  {
    heading: "System Actions",
    items: [
      { id: "logout", title: "Log out", icon: LogOut, onSelect: () => {} },
    ],
  },
]

export function CommandMenu({
  open,
  onOpenChange,
  groups = DEFAULT_GROUPS,
  placeholder = "Type a command or search...",
}: CommandMenuProps) {
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-xl shadow-2xl">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredGroups.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            filteredGroups.map((group, idx) => (
              <div key={idx} className="mb-2 last:mb-0">
                <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.heading}
                </span>
                <div className="mt-1 flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          item.onSelect()
                          onOpenChange(false)
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground text-left"
                      >
                        {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.shortcut && (
                          <kbd className="pointer-events-none rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {item.shortcut}
                          </kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t bg-muted/40 px-3 py-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Navigate with arrows</span>
          <span>Esc to close</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
