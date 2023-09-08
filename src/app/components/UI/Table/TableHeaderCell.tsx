import { cn } from "@/app/lib/cn"
import React, { useState } from "react"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

type Props = {
  children?: React.ReactNode
  visible?: boolean
  sorting?: boolean
  sortFunction?: () => void
}

export const TableHeaderCell = ({ children, visible = true, sorting, sortFunction }: Props) => {
  const [isSorted, setIsSorted] = useState(sorting)

  const applySort = () => {
    setIsSorted((prev) => !prev)
    sortFunction
  }

  return (
    <th
      className={cn("font-medium py-4 px-2 max-w-[256px] text-center text-neutral-800 text-sm lg:text-base", {
        hidden: !visible,
      })}
      onClick={sortFunction}
    >
      <p className="relative line-clamp-1">
        {children}
        {sorting ? (
          <span
            className={cn(
              "absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer p-[2px] rounded-full hover:bg-neutral-100"
            )}
            onClick={applySort}
          >
            {isSorted ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
          </span>
        ) : null}
      </p>
    </th>
  )
}
