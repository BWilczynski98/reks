import { Sidebar } from "@/components"

export default function SidebarLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col lg:flex-row">
      <div>
        <Sidebar className="max-lg:hidden" />
      </div>
      <div className="w-full h-screen py-20 sm:py-10 sm:overflow-auto">{children}</div>
    </section>
  )
}
