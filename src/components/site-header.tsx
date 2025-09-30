"use client"

import * as React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

interface SiteHeaderProps {
  breadcrumbItems?: Array<{
    label: string
    href?: string
    onClick?: () => void
  }>
  currentPage?: string
}

export function SiteHeader({ breadcrumbItems, currentPage }: SiteHeaderProps = {}) {
  const pathname = usePathname()
  const segments = pathname?.split("/").filter(Boolean) ?? []
  const defaultTitle = segments.length ? segments[segments.length - 1].replace(/[-_]/g, " ") : "Home"
  const title = currentPage || defaultTitle

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {breadcrumbItems && breadcrumbItems.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList className="gap-2">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      href={item.href || "#"}
                      className="text-xs font-normal leading-4 tracking-normal text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                      }}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  </BreadcrumbSeparator>
                </React.Fragment>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs font-normal leading-4 tracking-normal text-foreground">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <h1 className="text-base font-medium capitalize">{title}</h1>
        )}
        <div className="ml-auto" />
      </div>
    </header>
  )
}
