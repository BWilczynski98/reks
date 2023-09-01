"use client"
import { useComponentVisible } from "@/app/hooks"
import { cn } from "@/app/lib/cn"
import React, { useEffect, useRef, useState } from "react"
import { FiFilter } from "react-icons/fi"

const options = ["Pies", "Kot", "Samiec", "Samica", "Siedziba", "Dom tymczasowy"]

export const Filter = () => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  return (
    <div className="relative">
      <button
        ref={ref}
        onClick={() => setIsComponentVisible((prev: boolean) => !prev)}
        className="flex text-neutral-800 font-medium justify-center items-center border border-neutral-200 w-32 h-10 rounded-default shadow-sm hover:bg-primary-500 hover:text-neutral-200"
      >
        <FiFilter />
        <p>Filtry</p>
      </button>

      <div
        className={cn(
          "absolute top-10 bg-white p-2 w-64 border border-neutral-200 rounded-default shadow-sm -left-full",
          {
            hidden: !isComponentVisible,
          }
        )}
      >
        <ul>
          {options.map((option) => (
            <li
              key={Math.random()}
              className="py-2"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
