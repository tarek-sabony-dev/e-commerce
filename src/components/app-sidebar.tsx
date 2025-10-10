"use client"

import * as React from "react"
import {
  IconBrandNextjs,
  IconChartBarPopular,
  IconHeart,
  IconPhone,
  IconShoppingBag,
  IconShoppingCart,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
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
    name: "Tarek Sabony",
    email: "FakeEmail@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Popular",
      url: "/",
      icon: IconChartBarPopular,
    },
    {
      title: "Shop",
      url: "/shop",
      icon: IconShoppingBag,
    },
    {
      title: "Whishlist",
      url: "/whishlist",
      icon: IconHeart,
    },
    {
      title: "Cart",
      url: "/cart",
      icon: IconShoppingCart,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: IconPhone,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                  <IconBrandNextjs className="!size-7" />
                  <span className="text-base font-semibold ">
                    NextMerce
                  </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
