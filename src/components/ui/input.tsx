import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, tone, size = "default", ...props }: React.ComponentProps<"input"> & { tone?: "surface" | "default"; size?: "sm" | "default" | "lg" }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        size === "sm" && "h-8 rounded-md px-3 py-1",
        size === "default" && "h-9 rounded-md px-3 py-1",
        size === "lg" && "h-12 rounded-xl px-4",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        tone === "surface" && "surface-input",
        className
      )}
      {...props}
    />
  )
}

export { Input }
