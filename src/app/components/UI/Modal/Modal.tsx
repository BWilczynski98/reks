import { cn } from "@/app/lib/cn"
import { headline } from "@/app/lib/fonts"
import { Button } from "@components/UI"
import React from "react"

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
}

export const Modal = ({ open = true, onClose, onConfirm, title = "Tytuł", children }: Props) => {
  return (
    <div
      className={cn(`fixed top-0 left-0 w-screen h-screen bg-neutral-300/40 z-10`, {
        hidden: !open,
      })}
    >
      <div className="fixed z-20 flex flex-col gap-8 p-5 -translate-x-1/2 -translate-y-1/2 border border-neutral-200 rounded-default top-1/2 left-1/2 w-[500px] bg-background">
        <div className={headline.className}>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div>{children}</div>
        <div className="flex gap-2 place-content-end">
          <Button
            outline
            action="deny"
            onClick={onClose}
          >
            Anuluj
          </Button>
          <Button onClick={onConfirm}>Potwierdź</Button>
        </div>
      </div>
    </div>
  )
}
