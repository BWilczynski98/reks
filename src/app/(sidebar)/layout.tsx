import { Sidebar } from "@/components"

export default function SidebarLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <nav>
        <Sidebar />
      </nav>
      <div>{children}</div>
    </section>
  )
}
