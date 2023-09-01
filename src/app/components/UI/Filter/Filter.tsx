"use client"
import { FiFilter } from "react-icons/fi"

export const Filter = () => {
  return (
    <div className="relative">
      <button className="flex text-neutral-800 font-medium justify-center items-center border border-neutral-200 w-32 h-10 rounded-default shadow-sm hover:bg-primary-500 hover:text-neutral-200">
        <FiFilter />
        <p>Filtry</p>
      </button>
    </div>
  )
}
