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

import { NavMain } from "@/components/nav/nav-main"
import { NavUser } from "@/components/nav/nav-user"
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
      title: "Wishlist",
      url: "/wishlist",
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
