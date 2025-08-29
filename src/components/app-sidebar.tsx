"use client"

import * as React from "react"
import {
  IconHome,
  IconCalendar,
  IconUsers,
  IconReport,
  IconFileAi,
  IconDatabase,
  IconSparkles,
  IconCamera,
  IconFileDescription,
  IconFileWord,
  IconSettings,
  IconHelp,
  IconSearch,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { VtLogo } from "@/components/vt-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  school: {
    name: "School name",
    district: "District name",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Students",
      url: "/students",
      icon: IconUsers,
    },
    {
      title: "Tutoring Schedule",
      url: "/schedule",
      icon: IconCalendar,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconReport,
    },
    {
      title: "AI Tools",
      url: "/ai-tools",
      icon: IconSparkles,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-0 !h-[25px] !w-[25px] group-data-[collapsible=icon]:!w-[25px] group-data-[collapsible=icon]:!h-[25px] group-data-[collapsible=icon]:!p-0 hover:bg-transparent active:bg-transparent hover:text-inherit active:text-inherit focus-visible:ring-0"
            >
              <a
                href="#"
                aria-label="Acme Inc."
                className="block relative h-[25px] w-full"
              >
                <span className="absolute inset-0 grid place-items-center">
                  <VtLogo variant="icon" width={25} height={25} />
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <Separator className="my-2 opacity-20 group-data-[collapsible=icon]:hidden" />
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!py-3 data-[slot=sidebar-menu-button]:!px-2 hover:bg-[color:var(--menu-interactive-bg)]">
                  <div className="flex w-full items-center gap-3">
                    <div className="size-8 shrink-0 rounded-xl bg-[color:var(--menu-accent)] grid place-items-center">
                      <VtLogo variant="icon" width={18} height={18} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="truncate text-sm font-medium">{data.school.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{data.school.district}</span>
                    </div>
                    <div className="flex flex-col items-center leading-none text-muted-foreground">
                      <IconChevronUp className="size-4" />
                      <IconChevronDown className="size-4 -mt-1" />
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Schools in {data.school.district}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Lincoln High School</DropdownMenuItem>
                <DropdownMenuItem>Roosevelt Middle School</DropdownMenuItem>
                <DropdownMenuItem>Jefferson Elementary</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
