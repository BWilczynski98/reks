import { body } from "@/app/lib/fonts"
import { Severity } from "@/app/types/alert"
import type { Severity as SeverityType } from "@/app/types/alert"
import cx from "classnames"
import React from "react"
import { BiCheckCircle, BiErrorCircle, BiInfoCircle } from "react-icons/bi"
import { MdClose } from "react-icons/md"

type Props = {
  children: React.ReactNode
  severity: SeverityType | null
  open: boolean
  onClose: () => void
}

export const Alert = ({ children, severity = Severity.INFO, open, onClose }: Props) => {
  let icon = <BiInfoCircle />
  let title
  switch (severity) {
    case Severity.SUCCESS:
      title = "Sukces"
      icon = <BiCheckCircle />
      break
    case Severity.ERROR:
      title = "Błąd"
      icon = <BiErrorCircle />
      break
    case Severity.INFO:
      title = "Informacja"
      icon = <BiInfoCircle />
      break
    default:
      title = "Informacja"
      icon = <BiInfoCircle />
      break
  }

  return (
    <>
      {open ? (
        <div
          className={cx(`${body.className} px-3 py-4 border-2 rounded-default w-full text-sm sm:text-base z-10`, {
            "bg-green-100": severity === Severity.SUCCESS,
            "border-green-300": severity === Severity.SUCCESS,
            "bg-red-100": severity === Severity.ERROR,
            "border-red-300": severity === Severity.ERROR,
            "bg-sky-100": severity === Severity.INFO,
            "border-sky-300": severity === Severity.INFO,
          })}
        >
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <span
                className={cx("text-xl", {
                  "text-green-300": severity === Severity.SUCCESS,
                  "text-red-300": severity === Severity.ERROR,
                  "text-sky-300": severity === Severity.INFO,
                })}
              >
                {icon}
              </span>
              <h4 className="font-semibold">{title}</h4>
            </div>
            <div
              className="p-1 duration-150 ease-in-out rounded-full cursor-pointer hover:bg-neutral-300/20"
              onClick={onClose}
            >
              <span>
                <MdClose />
              </span>
            </div>
          </div>
          <div>{children}</div>
        </div>
      ) : null}
    </>
  )
}
