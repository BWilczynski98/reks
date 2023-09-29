import { AnimalGender, AnimalResidence, AnimalType } from "@/app/types/animal"
import { Gender, Residence, Type } from "@prisma/client"
import dayjs from "dayjs"
import Image from "next/image"
import { LuDog } from "react-icons/lu"
import { Row } from "./Row"
require("dayjs/locale/pl")

type BasicInformationProps = {
  pet: Animal
}

export const BasicInformation = ({ pet }: BasicInformationProps) => {
  const relativeTime = require("dayjs/plugin/relativeTime")
  dayjs.extend(relativeTime)
  return (
    <section className="flex flex-wrap w-full gap-5 md:gap-0">
      <div className="basis-full lg:basis-1/4 max-lg:flex max-lg:justify-center max-lg:items-center">
        <div className="relative w-52 h-52">
          {pet && pet.photoUrl ? (
            <Image
              src={pet.photoUrl}
              priority={true}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "100%",
              }}
              alt="Zdjęcie profilowe zwierzęcia"
            />
          ) : (
            <div className="w-full h-full bg-primary-50 rounded-full flex justify-center items-center">
              <LuDog className="text-7xl text-primary-200" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 basis-full lg:basis-3/4">
        <div className="flex gap-2">
          <p className="text-xl font-semibold text-primary-700">{pet.name}</p>
          {/* <div className="flex items-center justify-center text-neutral-400 px-[6px] hover:bg-neutral-100 cursor-pointer rounded-full duration-100 ease-in-out">
            <MdModeEdit className="w-4 h-4" />
          </div> */}
        </div>
        <Row
          fieldName="Typ"
          value={pet.type === Type.DOG ? AnimalType.DOG : AnimalType.CAT}
        />
        <Row
          fieldName="Płeć"
          value={pet.gender === Gender.MALE ? AnimalGender.MALE : AnimalGender.FEMALE}
        />
        <Row
          fieldName="Wiek"
          value={dayjs(pet.birthDate).locale("pl").toNow(true)}
        />
        <Row
          fieldName="Miejsce znalezienia"
          value={pet.locationWhereFound}
        />
        <Row
          fieldName="Data zabezpieczenia"
          value={dayjs(pet.timeWhenFound).locale("pl").format("D MMMM YYYY")}
        />
        <Row
          fieldName="Gdzie przebywa"
          value={pet.residence === Residence.BASE ? AnimalResidence.BASE : AnimalResidence.TEMPORARY_HOME}
        />
        {pet.residence === Residence.TEMPORARY_HOME ? (
          <>
            <Row
              fieldName="Dom tymczasowy"
              value={pet?.residence === Residence.TEMPORARY_HOME ? (pet.homeId as string) : ""}
            />
          </>
        ) : null}
        <Row
          fieldName="Stan zdrowia w dniu przyjęcia"
          value={
            pet.descriptionOfHealth
              ? pet.descriptionOfHealth
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        />
        <Row
          fieldName="Uwagi"
          value={
            pet.description
              ? pet.description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        />
      </div>
    </section>
  )
}
