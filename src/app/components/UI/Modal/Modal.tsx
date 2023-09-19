import { cn } from "@/app/lib/cn"
import { headline } from "@/app/lib/fonts"
import { Button } from "@components/UI"
import React from "react"
import { MdClose } from "react-icons/md"

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
  disabledButtons?: boolean
}

export const Modal = ({ open = true, onClose, onConfirm, title = "Tytuł", children, disabledButtons }: Props) => {
  return (
    <div
      className={cn(`fixed top-0 left-0 w-screen h-screen backdrop-brightness-75 z-10 backdrop-blur-sm`, {
        hidden: !open,
      })}
    >
      <div className="fixed z-20 flex flex-col gap-8 p-5 -translate-x-1/2 -translate-y-1/2 border border-neutral-200 rounded-default top-1/2 left-1/2 w-[500px] bg-background shadow-md">
        <div className={`${headline.className} flex justify-between items-center`}>
          <h1 className="text-xl font-semibold text-neutral-800">{title}</h1>
          <div
            className="h-6 w-6 flex justify-center items-center rounded-full cursor-pointer hover:bg-neutral-100 hover:text-neutral-600 duration-150 ease-in-out"
            onClick={onClose}
          >
            <MdClose />
          </div>
        </div>
        <div>{children}</div>
        {disabledButtons ? null : (
          <div className="flex gap-2 place-content-end">
            <Button
              outline
              action="deny"
              onClick={onClose}
            >
              Anuluj
            </Button>
            <Button
              onClick={onConfirm}
              type="submit"
            >
              Potwierdź
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
