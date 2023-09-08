import React from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { Select } from "../Select/Select"
import { cn } from "@/app/lib/cn"

type PaginationProps = {
  rowPerPage: number
  handleRowPerPage: (value: number) => void
  rows: number[]
  previousPage: () => void
  nextPage: () => void
  startOfCoverage: number
  endOfCoverage: number
  totalItems: number
}

type IconButtonProps = {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
}

const IconButton = ({ children, onClick, disabled }: IconButtonProps) => {
  return (
    <>
      <button
        className={cn("rounded-full p-1  ease-in-out duration-150 text-xl", {
          "text-neutral-200": disabled,
          "hover:bg-neutral-50": !disabled,
        })}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  )
}

export const Pagination = ({
  rowPerPage,
  handleRowPerPage,
  rows,
  previousPage,
  nextPage,
  startOfCoverage,
  endOfCoverage,
  totalItems,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-2">
        <p>Wiersze na strone</p>
        <div className="w-14">
          <Select
            value={rowPerPage}
            options={rows}
            onChange={(value) => handleRowPerPage(value)}
            size="small"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>
          {startOfCoverage + 1} - {endOfCoverage} z {totalItems}
        </p>
        <IconButton
          onClick={previousPage}
          disabled={startOfCoverage === 0}
        >
          <MdNavigateBefore />
        </IconButton>
        <IconButton
          onClick={nextPage}
          disabled={endOfCoverage === totalItems}
        >
          <MdNavigateNext />
        </IconButton>
      </div>
    </div>
  )
}
