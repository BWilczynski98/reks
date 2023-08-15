import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineCloudUpload } from "react-icons/ai"

export const Dropzone = () => {
  const [error, setError] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    maxSize: 2000000,
    maxFiles: 1,
  })

  return (
    <div
      className={cn(
        `${body.className} bg-neutral-100 border border-neutral-200 rounded-default px-4 py-10 flex flex-col justify-center items-center cursor-pointer gap-2 text-sm text-neutral-700 text-center`
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="flex w-10 h-10 text-2xl rounded-full bg-primary-700 place-items-center place-content-center text-neutral-100 ">
        <AiOutlineCloudUpload />
      </div>
      {!error ? (
        <>
          {" "}
          <p>Przeciągnij lub kliknij w to pole, aby dodać zdjęcie</p>
          <p className="text-[12px] ">JPG, JPEG, PNG (Max: 2MB)</p>
        </>
      ) : (
        <>
          <p>errro</p>
        </>
      )}
    </div>
  )
}
