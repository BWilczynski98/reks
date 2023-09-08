import { useMemo, useState } from "react"

type PaginationResult<T> = {
  page: T[] | undefined
  next: () => void
  previous: () => void
  currentPage: number
  startOfCoverage: number
  endOfCoverage: number
  totalItems: number
}

export const usePagination = <T>(array: T[] | undefined, itemsPerPage: number): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = array ? array.length : 0
  const startOfCoverage = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage])
  let endOfCoverage = useMemo(() => startOfCoverage + itemsPerPage, [startOfCoverage, itemsPerPage])

  const page = useMemo(() => array?.slice(startOfCoverage, endOfCoverage), [array, startOfCoverage, endOfCoverage])

  if (!!array && endOfCoverage >= array?.length) {
    endOfCoverage = array.length
  }

  const next = () => {
    if (!!array && endOfCoverage < array.length) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }
  return { page, next, previous, currentPage, startOfCoverage, endOfCoverage, totalItems }
}
