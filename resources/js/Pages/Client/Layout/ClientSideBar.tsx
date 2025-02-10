import * as React from "react"
import { BookOpen, Bot, Command, LifeBuoy, Send, SquareTerminal, BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, LocateIcon, } from "lucide-react"
import { NavMain } from "@/Components/nav-main"
import { NavSecondary } from "@/Components/nav-secondary"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
} from "@/Components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage, } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/Components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/Components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"

const isRouteActive = (routeName) => {
  return route().current(routeName);
}

export function ClientSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { props: InertiaProps } = usePage();

  const data = {
    user: {
      name: InertiaProps.auth.user.name,
      email: InertiaProps.auth.user.email,
      avatar: null,
    },
    navMain: [
      {
        title: "Dashboard",
        url: route('client.dashboard'),
        icon: SquareTerminal,
        isActive: isRouteActive('client.dashboard'),
        items: [
          {
            title: "Dashboard",
            url: route('client.dashboard'),
            isActive: isRouteActive('client.dashboard'),
          },
        ],
      },
      {
        title: "Orders",
        url: "#",
        icon: Bot,
        isActive: isRouteActive('orders.list') || isRouteActive('orders.create'),
        items: [
          {
            title: "List",
            url: route('orders.list'),
            isActive: isRouteActive('orders.list'),
          },
          {
            title: "Create",
            url: route('orders.create'),
            isActive: isRouteActive('orders.create'),
          },

        ],
      },
      {
        title: "Products",
        url: "#",
        icon: BookOpen,
        isActive: isRouteActive('products.list') || isRouteActive('products.create') || isRouteActive('products.suggest'),
        items: [
          {
            title: "List",
            url: route('products.list'),
            isActive: isRouteActive('products.list'),
          },
          {
            title: "Create",
            url: route('products.create'),
            isActive: isRouteActive('products.create'),
          },
          {
            title: "Suggest",
            url: route('products.suggest'),
            isActive: isRouteActive('products.suggest'),
          },
        ],
      },
      {
        title: "Wallet",
        url: "#",
        icon: BookOpen,
        isActive: isRouteActive('wallet.history') || isRouteActive('wallet.requestWithdraw'),
        items: [
          {
            title: "History",
            url: route('wallet.history'),
            isActive: isRouteActive('wallet.history'),
          },
          {
            title: "Request Withdraw",
            url: route('wallet.requestWithdraw'),
            isActive: isRouteActive('wallet.requestWithdraw'),
          },
        ],
      },
      {
        title: "Locations",
        url: "#",
        icon: LocateIcon,
        isActive: isRouteActive('locations.wilayas') || isRouteActive('locations.centers'),
        items: [
          {
            title: "Wilaya",
            url: route('locations.wilayas'),
            isActive: isRouteActive('locations.wilayas'),
          },
          {
            title: "Centers",
            url: route('locations.centers'),
            isActive: isRouteActive('locations.centers'),
          }
        ],
      },

    ],
    navSecondary: [
      {
        title: "Courses",
        url: route('courses.list'),
        icon: LifeBuoy,
        isActive: isRouteActive('courses.list'),
      },
      {
        title: "Notifications",
        url: route('notifications.list'),
        icon: LifeBuoy,
        isActive: isRouteActive('notifications.list'),
      },
      {
        title: "Profile",
        url: route('profile.show'),
        icon: Send,
        isActive: isRouteActive('profile.show'),
      },
    ],
  }


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


export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={route('client.logout')}
                method="post"
                as="button"
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut size={18} />
                Log Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}