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
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { totalCartItems } = useCartStore()
  const { totalWishlistItems } = useWishlistStore()

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
        count: totalWishlistItems
  
      },
      {
        title: "Cart",
        url: "/cart",
        icon: IconShoppingCart,
        count: totalCartItems
      },
      {
        title: "Contacts",
        url: "/contacts",
        icon: IconPhone,
      },
    ],
  }

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
