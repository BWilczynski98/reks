import { Sidebar } from "@/components"
import { MobileDrawer } from "@/components/Navigation/MobileDrawer/mobile-drawer"

export default function SidebarLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col lg:flex-row">
      <div>
        <Sidebar className="max-lg:hidden" />
        <div className="px-2 py-2 items-center lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <div className="w-full h-screen overflow-auto pt-10 pb-[20%]">{children}</div>
    </section>
  )
}
