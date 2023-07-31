import React from "react"

type Props = {
  icon?: React.ReactNode
  description?: string
  span?: string
  onClick?: () => void
}

export const Navigator = ({ icon, description, span, onClick }: Props) => {
  return (
    <div className="flex items-center justify-center select-none">
      <p>{icon}</p>
      <p>
        <span>{description}&nbsp;</span>
        <span
          className="cursor-pointer text-primary-700"
          onClick={onClick}
        >
          {span}
        </span>
      </p>
    </div>
  )
}
