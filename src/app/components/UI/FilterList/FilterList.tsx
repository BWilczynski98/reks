"use client"
import { useComponentVisible } from "@/app/hooks"
import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"

type DropdownProps = {
  children: React.ReactNode
  kindOfFiltering: TableFilter[]
}

type FilterItemProps = {
  label: string
}

const FilterItem = ({ label }: FilterItemProps) => {
  return (
    <div className="flex items-center gap-2 p-1">
      <input
        id={label}
        type="checkbox"
        value=""
        name="bordered-checkbox"
      />
      <label className="w-full text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
    </div>
  )
}

export const FilterList = ({ children, kindOfFiltering }: DropdownProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  return (
    <div
      className={`${body.className} relative`}
      ref={ref}
    >
      <button
        className="rounded-full p-3 hover:bg-neutral-50 ease-in-out duration-150"
        onClick={() => setIsComponentVisible((prev) => !prev)}
      >
        <span className={` text-base`}>{children}</span>
      </button>
      <div
        className={cn(
          "bg-white border border-neutral-200 rounded-default shadow-sm w-64 h-96 absolute right-0 p-2 z-50",
          {
            hidden: !isComponentVisible,
          }
        )}
      >
        <div className="border-b border-neutral-100 text-sm font-medium h-[10%] mb-1 flex items-center">
          <p>Filtrowanie</p>
        </div>
        <div className="h-[80%] overflow-auto">
          {kindOfFiltering.map((filter) => (
            <FilterItem
              key={filter.label + Math.random()}
              label={filter.label}
            />
          ))}
        </div>
        <div className="h-[10%] border-t border-neutral-200 flex justify-center items-center mt-1">
          <button
            className="text-sm hover:bg-neutral-50 w-full rounded-default py-[2px] font-medium"
            type="reset"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  )
}
