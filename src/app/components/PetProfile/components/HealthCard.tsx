import { Button } from "../../UI"
import { Card } from "../../UI/Card/Card"
import { MdModeEdit, MdMedicalInformation } from "react-icons/md"
import { SiMoleculer } from "react-icons/si"
import { GiMedicines } from "react-icons/gi"
import { TbVaccine } from "react-icons/tb"
import { Row } from "./Row"
import type { HealthRecords } from "@/app/types/health"
import { AllergyList } from "./Allergy"

type Props = {
  healthRecords: HealthRecords
}

type HealthTileProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  title: string
  disabledButton?: boolean
}

const HealthTile = ({ children, icon, title, disabledButton }: HealthTileProps) => {
  return (
    <Card
      elevation="md"
      fullWidth
    >
      <div className="min-h-[150px] h-full max-h-[450px] overflow-auto p-2">
        <div className="w-full flex flex-col gap-4 justify-between h-full">
          <div className=" flex justify-between">
            <div className="flex items-center gap-5">
              <span className="text-3xl text-primary-500">{icon}</span>
              <p className="text-lg font-medium">{title}</p>
            </div>
            {/* <div className="flex items-center justify-center text-neutral-400 px-[6px] hover:bg-neutral-100 cursor-pointer rounded-full duration-100 ease-in-out">
            <MdModeEdit className="w-4 h-4" />
          </div> */}
          </div>
          <div>{children}</div>

          <div className="flex justify-center">{disabledButton ? null : <Button>Dodaj</Button>}</div>
        </div>
      </div>
    </Card>
  )
}

export const HealthCard = ({ healthRecords }: Props) => {
  return (
    <section className="flex flex-col gap-x-5 gap-y-10">
      <div className="w-full">
        <h2 className="text-xl font-semibold text-neutral-800">Karta zdrowia</h2>
      </div>
      <div>
        <HealthTile
          icon={<MdMedicalInformation />}
          title="Informacje podstawowe"
          disabledButton
        >
          {" "}
          <div className="flex flex-wrap">
            <div className="basis-1/4"></div>
            <div className="basis-3/4">
              <Row
                fieldName="Kastracja / Sterylizacja"
                value="Nie"
              />
              <Row
                fieldName="Odrobaczenie"
                value="Nie"
              />
              <Row
                fieldName="Mikrochip"
                value="Nie"
              />
            </div>
          </div>
        </HealthTile>
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <HealthTile
            icon={<SiMoleculer />}
            title="Alergie"
          >
            <div>
              {healthRecords.allergies.length > 0 ? (
                <AllergyList allergies={healthRecords.allergies} />
              ) : (
                <p className="text-neutral-400 text-center">Brak informacji na temat alergi</p>
              )}
            </div>
          </HealthTile>
        </div>
        <div className="w-full">
          <HealthTile
            icon={<GiMedicines />}
            title="Leki"
          >
            <div className="text-neutral-400 text-center">
              <p>Brak informacji na temat leków</p>
            </div>
          </HealthTile>
        </div>
        <div className="w-full">
          <HealthTile
            icon={<TbVaccine />}
            title="Szczepienia"
          >
            <div className="text-neutral-400 text-center">
              <p>Brak informacji na temat szczepień</p>
            </div>
          </HealthTile>
        </div>
      </div>
    </section>
  )
}
