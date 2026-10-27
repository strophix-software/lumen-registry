import * as React from "react"
import { Search, X, SlidersHorizontal, Plus, Download, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface DataTableToolbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filterTitle?: string
  filterOptions?: FilterOption[]
  selectedFilters?: string[]
  onFilterToggle?: (value: string) => void
  columns?: { id: string; label: string; visible: boolean }[]
  onColumnToggle?: (columnId: string) => void
  onResetFilters?: () => void
  onExport?: () => void
  onAdd?: () => void
  addLabel?: string
  className?: string
}

export function DataTableToolbar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Filter records...",
  filterTitle = "Status",
  filterOptions = [],
  selectedFilters = [],
  onFilterToggle,
  columns = [],
  onColumnToggle,
  onResetFilters,
  onExport,
  onAdd,
  addLabel = "Add Record",
  className,
}: DataTableToolbarProps) {
  const isFiltered = searchValue.length > 0 || selectedFilters.length > 0

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9 h-9 text-xs"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange?.("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Faceted Filter */}
        {filterOptions.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 border-dashed text-xs gap-1.5">
                <span>{filterTitle}</span>
                {selectedFilters.length > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-1 h-4" />
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal text-[10px]">
                      {selectedFilters.length}
                    </Badge>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-1" align="start">
              <div className="flex flex-col gap-1">
                {filterOptions.map((option) => {
                  const isSelected = selectedFilters.includes(option.value)
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onFilterToggle?.(option.value)}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs transition-colors hover:bg-muted text-left",
                        isSelected && "font-semibold text-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span className="flex-1 truncate">{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-muted-foreground font-mono text-[10px]">
                          {option.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Reset button */}
        {isFiltered && onResetFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Reset
            <X className="ml-1 h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Column view options */}
        {columns.length > 0 && onColumnToggle && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>View</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-xs">Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.visible}
                  onCheckedChange={() => onColumnToggle(column.id)}
                  className="text-xs capitalize"
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Export button */}
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="h-9 gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}

        {/* Add CTA */}
        {onAdd && (
          <Button size="sm" onClick={onAdd} className="h-9 gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            <span>{addLabel}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
