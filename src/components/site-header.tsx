import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex flex-row-reverse lg:flex-row w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
      </div>
    </header>
  )
}
