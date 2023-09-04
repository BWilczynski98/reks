import { useState } from "react"

type PaginationResult<T> = {
  page: T[] | undefined
  next: () => void
  previous: () => void
}

export const usePagination = <T>(array: T[] | undefined, itemsPerPage: number): PaginationResult<T> => {
  const [startOfCoverage, setStartOfCoverage] = useState(0)
  const [endOfCoverage, setEndOfCoverage] = useState(itemsPerPage)
  console.log("pagination")
  const nextPage = () => {
    if (!!array && endOfCoverage >= array?.length) {
      return
    }
    console.log("next")
    setStartOfCoverage((prev) => prev + itemsPerPage)
    setEndOfCoverage((prev) => prev + itemsPerPage)
  }

  const previousPage = () => {
    if (!!array && startOfCoverage === 0) {
      return
    }
    console.log("previous")
    setStartOfCoverage((prev) => prev - itemsPerPage)
    setEndOfCoverage((prev) => prev - itemsPerPage)
  }

  const page = array?.slice(startOfCoverage, endOfCoverage)

  return { page, next: nextPage, previous: previousPage }
}
