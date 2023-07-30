import Image from "next/image"
import bannerSvg from "./banner.svg"

export const Banner = () => {
  return (
    <div className="relative w-full h-full brightness-75">
      <Image
        src={bannerSvg}
        alt="Banner photo"
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  )
}
