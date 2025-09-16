"use client"

import * as React from "react"
import { ChevronDown, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select",
  summaryFormatter,
  className,
}: MultiSelectProps) {
  const selectedCount = value.length
  const optionsMap = React.useMemo(() => {
    const map: Record<string, string> = {}
    for (const opt of options) map[opt.value] = opt.label
    return map
  }, [options])

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
    if (value.includes(val)) onChange(value.filter((v) => v !== val))
    else onChange([...value, val])
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
              "surface-input w-full rounded-xl px-4 py-3 text-left flex items-center justify-between gap-3 cursor-pointer",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            )}
            ref={triggerRef}
          >
            <span className={cn(selectedCount === 0 && "text-muted-foreground")}>{summaryText}</span>
            <ChevronDown className="size-4 opacity-50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          style={triggerWidth ? { width: triggerWidth } : undefined}
          className="min-w-[14rem]"
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

      {selectedCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {value.map((val) => (
            <span
              key={val}
              className={cn(
                "rounded-full px-3 py-2 text-sm flex items-center gap-2",
                "surface-chip"
              )}
            >
              {optionsMap[val] ?? val}
              <button
                type="button"
                aria-label="Remove"
                onClick={() => toggle(val)}
                className="grid place-items-center size-6 rounded-full bg-white/20 cursor-pointer pointer-events-auto hover:bg-white/30 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}


