"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "./ui/sidebar"
import { IconChartBarPopular, IconContract, IconDashboard, IconHeart, IconInnerShadowTop, IconPhone, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { HeartIcon, PhoneIcon, ShoppingBag, ShoppingCart } from "lucide-react"

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

export function Navigation() {
  const isMobile = useIsMobile()
  
  return (
    <>
      {isMobile ? 
        <MobileNavigation />
        :
        <DesktopNavigation />
      }
    </>
  )
}

function DesktopNavigation () {
  return (
    <>
      <div className="flex items-center gap-16">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {data.navMain.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <div>
                    <Link className="flex items-center gap-1" href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <NavUser user={data.user} />
      </div>
    </>
  )
}

function MobileNavigation () {
  return (
    <>
      <SidebarTrigger />
      <Sidebar collapsible="icon">
        <SidebarHeader className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <NavUser user={data.user} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
