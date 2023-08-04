import Image from "next/image"
import banner from "@/app/assets/germanShepherd.jpg"

export const Banner = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={banner}
        alt="German shepherd banner photo from free pick. Author wirestock"
        fill
        priority={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute text-[10px] bottom-1 left-1 text-neutral-950/50">
        <a href="https://pl.freepik.com/darmowe-zdjecie/selektywne-fokus-strzal-z-uroczego-owczarka-niemieckiego_13062040.htm#query=pies&position=28&from_view=keyword&track=sph">
          Obraz autorstwa wirestock
        </a>{" "}
        na Freepik
      </div>
    </div>
  )
}
