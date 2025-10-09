import { IconSearch } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { CartSheet } from "./cart-sheet"

export function SiteHeader() {
  return (
    <header className="flex h-fit py-4  shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex flex-row-reverse justify-between lg:flex-row w-full items-center px-4 lg:gap-2 lg:px-6">
        <div className="flex flex-row-reverse lg:flex-row items-center gap-1">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Input placeholder="Search products" />
            <Button variant={"secondary"}>
              <IconSearch />
              <span className="hidden lg:block">Search</span>
            </Button>
          </div>
          <CartSheet />
        </div>
      </div>
    </header>
  )
}
