"use client"

import { type Icon } from "@tabler/icons-react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.url === pathname || (item.url === "/" && pathname === "/")
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  className={
                    isActive
                      ? "text-[color:var(--menu-accent)] [&>svg]:text-[color:var(--menu-accent)] bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.16)] border-[0.5px] rounded-xl hover:text-[color:var(--menu-accent)]"
                      : "text-sidebar-foreground text-sm font-normal leading-5 gap-2 p-2 rounded-xl border border-transparent hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.16)] hover:border-[0.5px]"
                  }
                  asChild
                >
                  <a href={item.url} aria-current={isActive ? "page" : undefined}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
