"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/Components/nav-main"
import { NavProjects } from "@/Components/nav-projects"
import { NavSecondary } from "@/Components/nav-secondary"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: route('dashboard'),
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "List",
          url: route('orders.list'),
        },
        {
          title: "Create",
          url: route('orders.create'),
        },
        
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "List",
          url: route('products.list'),
        },
        {
          title: "Create",
          url: route('products.create'),
        },
        {
          title: "Suggest",
          url: route('products.suggest'),
        },
      ],
    },
    {
      title: "Wallet",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "History",
          url: route('wallet.history'),
        },
        {
          title: "Request Withdraw",
          url: route('wallet.requestWithdraw'),
        },
      ],
    },
    
  ],
  navSecondary: [
    {
      title: "Courses",
      url: route('courses.list'),
      icon: LifeBuoy,
    },
    {
      title: "Notifications",
      url: route('notifications.list'),
      icon: LifeBuoy,
    },
    {
      title: "Profile",
      url: route('profile.show'),
      icon: Send,
    },
  ],
}

export function ClientSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
