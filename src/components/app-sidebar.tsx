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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
  const [selectedSchool, setSelectedSchool] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selected_school") || "Lincoln High School"
    }
    return "Lincoln High School"
  })
  React.useEffect(() => {
    try {
      localStorage.setItem("selected_school", selectedSchool)
    } catch (_) {
      // ignore persistence errors
    }
  }, [selectedSchool])
  const district = data.school.district

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className="data-[slot=sidebar-menu-button]:!px-2 hover:bg-[color:var(--menu-interactive-bg)]"
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="size-8 shrink-0 rounded-xl bg-[color:var(--menu-accent)] grid place-items-center">
                      <VtLogo variant="icon" width={18} height={18} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="truncate text-sm font-medium">{selectedSchool}</span>
                      <span className="truncate text-xs text-muted-foreground">{district}</span>
                    </div>
                    <div className="flex flex-col items-center leading-none text-muted-foreground">
                      <IconChevronUp className="size-4" />
                      <IconChevronDown className="size-4 -mt-1" />
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Schools in {district}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedSchool} onValueChange={setSelectedSchool}>
                  <DropdownMenuRadioItem value="Lincoln High School">Lincoln High School</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Roosevelt Middle School">Roosevelt Middle School</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Jefferson Elementary">Jefferson Elementary</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
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
