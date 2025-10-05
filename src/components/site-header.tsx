import { IconBrandNextjs } from "@tabler/icons-react"
import { Navigation } from "./navigation"

export function SiteHeader() {
  return (
    <header className="flex w-full h-fit items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full justify-between items-center gap-1 p-4 lg:gap-2 lg:p-6">
        <div className="w-fit h-fit flex justify-center items-center gap-2">
          <IconBrandNextjs size={48} />
          <span className="text-2xl hidden lg:block ">
            NextMerce
          </span>
        </div>
        <Navigation />
      </div>
    </header>
  )
}
