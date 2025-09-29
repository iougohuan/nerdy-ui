"use client"

import * as React from "react"
import { ChevronDown, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MultiSelectOption = {
  label: string
  value: string
}

type MultiSelectProps = {
  options: MultiSelectOption[]
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  summaryFormatter?: (count: number) => string
  className?: string
  invalid?: boolean
  onAddCustomOption?: (label: string) => void
  allowCustom?: boolean
  customOptionsMap?: Record<string, string>
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select",
  summaryFormatter,
  className,
  invalid = false,
  onAddCustomOption,
  allowCustom = false,
  customOptionsMap = {},
}: MultiSelectProps) {
  const [showCustomDialog, setShowCustomDialog] = React.useState(false)
  const [customValue, setCustomValue] = React.useState("")
  
  const selectedCount = value.length
  const optionsMap = React.useMemo(() => {
    const map: Record<string, string> = {}
    for (const opt of options) map[opt.value] = opt.label
    // Merge custom options for display in badges
    return { ...map, ...customOptionsMap }
  }, [options, customOptionsMap])

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const update = () => setTriggerWidth(el.offsetWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const toggle = (val: string) => {
    if (val === "other" && allowCustom) {
      setShowCustomDialog(true)
      return
    }
    if (value.includes(val)) onChange(value.filter((v) => v !== val))
    else onChange([...value, val])
  }

  const handleSaveCustom = () => {
    if (customValue.trim()) {
      onAddCustomOption?.(customValue.trim())
      setCustomValue("")
      setShowCustomDialog(false)
    }
  }

  const summaryText = React.useMemo(() => {
    if (selectedCount === 0) return placeholder
    if (selectedCount === 1) return optionsMap[value[0]] ?? placeholder
    return summaryFormatter ? summaryFormatter(selectedCount) : `${selectedCount} selected`
  }, [selectedCount, optionsMap, value, placeholder, summaryFormatter])

  return (
    <div className={cn("w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full rounded-xl border border-[rgba(255,255,255,0.16)] bg-[#161730] shadow-[0_1px_2px_0_rgba(0,0,0,0.10)] px-3 py-2.5 text-left flex items-center justify-between gap-3 cursor-pointer",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
              invalid && "ring-[3px] ring-destructive/20 border-destructive"
            )}
            ref={triggerRef}
          >
            <span className={cn(selectedCount === 0 && "text-muted-foreground")}>{summaryText}</span>
            <ChevronDown className="size-4 text-foreground/70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          style={triggerWidth ? { width: triggerWidth } : undefined}
          className="min-w-[14rem] surface-input bg-[var(--surface-input-bg)] text-foreground"
        >
          {options.map((opt) => (
            <DropdownMenuCheckboxItem
              key={opt.value}
              checked={value.includes(opt.value)}
              onCheckedChange={() => toggle(opt.value)}
              className="capitalize"
            >
              {opt.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedCount > 1 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {value.map((val) => (
            <span
              key={val}
              className={cn(
                "rounded-full px-2 py-1 text-sm flex items-center gap-1.5",
                "surface-chip"
              )}
            >
              {optionsMap[val] ?? val}
              <button
                type="button"
                aria-label="Remove"
                onClick={() => toggle(val)}
                className="grid place-items-center size-5 rounded-full bg-white/20 cursor-pointer pointer-events-auto hover:bg-white/30 transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add other</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Type your option"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSaveCustom()
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleSaveCustom}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


