import React from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { Select } from "../Select"

type PaginationProps = {
  rowPerPage: number
  handleRowPerPage?: () => void
  previousPage: () => void
  nextPage: () => void
}

type IconButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <>
      <button
        className="rounded-full p-1 hover:bg-neutral-50 ease-in-out duration-150 text-xl"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export const Pagination = ({ rowPerPage, handleRowPerPage, previousPage, nextPage }: PaginationProps) => {
  const start = "1"
  const end = "5"
  const total = "20"
  return (
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-2">
        <p>Wiersze na strone</p>
        <div className="w-14">
          <Select
            value={"5"}
            options={["5", "10", "15", "20"]}
            onChange={() => {}}
            size="small"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>
          {start} - {end} z {total}
        </p>
        <IconButton onClick={previousPage}>
          <MdNavigateBefore />
        </IconButton>
        <IconButton onClick={nextPage}>
          <MdNavigateNext />
        </IconButton>
      </div>
    </div>
  )
}
