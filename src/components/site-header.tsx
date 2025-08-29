"use client"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()
  const segments = pathname?.split("/").filter(Boolean) ?? []
  const title = segments.length ? segments[segments.length - 1].replace(/[-_]/g, " ") : "Home"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium capitalize">{title}</h1>
        <div className="ml-auto" />
      </div>
    </header>
  )
}
