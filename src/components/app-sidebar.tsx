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
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { VtLogo } from "@/components/vt-logo"
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
              className="data-[slot=sidebar-menu-button]:!p-0 !h-[25px] !w-[150px] group-data-[collapsible=icon]:!w-[25px] group-data-[collapsible=icon]:!h-[25px] group-data-[collapsible=icon]:!p-0 hover:bg-transparent active:bg-transparent hover:text-inherit active:text-inherit focus-visible:ring-0"
            >
              <a
                href="#"
                aria-label="Acme Inc."
                className="block relative h-[25px] w-full transition-all duration-200 ease-linear"
              >
                <span
                  className="absolute inset-0 flex items-center transition-all duration-200 ease-linear opacity-100 scale-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:scale-95"
                >
                  <VtLogo variant="white" width={150} height={25} />
                </span>
                <span
                  className="absolute inset-0 flex items-center transition-all duration-200 ease-linear opacity-0 scale-95 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:scale-100"
                >
                  <VtLogo variant="icon" width={25} height={25} />
                </span>
              </a>
            </SidebarMenuButton>
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
