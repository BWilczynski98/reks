import { useDisclose } from "@/app/hooks"
import type { HealthRecords } from "@/app/types/health"
import { GiMedicines } from "react-icons/gi"
import { MdMedicalInformation } from "react-icons/md"
import { SiMoleculer } from "react-icons/si"
import { TbVaccine } from "react-icons/tb"
import { Button } from "../../UI"
import { Card } from "../../UI/Card/Card"
import { AllergyForm, AllergyList } from "./Allergy"
import { DrugForm } from "./Drug/DrugForm"
import { DrugList } from "./Drug/DrugList"
import { Row } from "./Row"
import { VaccinationForm } from "./Vaccination/VaccinationForm"
import { VaccinationList } from "./Vaccination/VaccinationList"

type Props = {
  healthRecords: HealthRecords
}

type HealthTileProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  title: string
  disabledButton?: boolean
  onClick?: () => void
}

const HealthTile = ({ children, icon, title, disabledButton, onClick }: HealthTileProps) => {
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

          <div className="flex justify-center">{disabledButton ? null : <Button onClick={onClick}>Dodaj</Button>}</div>
        </div>
      </div>
    </Card>
  )
}

export const HealthCard = ({ healthRecords }: Props) => {
  const {
    state: allergyFormIsOpen,
    handleOpen: allergyFormHandleOpen,
    handleClose: allergyFormHandleClose,
  } = useDisclose()
  const { state: drugFormIsOpen, handleOpen: drugFormHandleOpen, handleClose: drugFormHandleClose } = useDisclose()
  const {
    state: vaccinationFormIsOpen,
    handleOpen: vaccinationFormHandleOpen,
    handleClose: vaccinationFormHandleClose,
  } = useDisclose()

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
      <div className="flex gap-5 flex-wrap xl:flex-nowrap">
        {/* Forms to complete a pet's health record broken down by allergies, medications taken and vaccinations */}
        <AllergyForm
          formIsOpen={allergyFormIsOpen}
          formOnClose={allergyFormHandleClose}
          formOnSubmit={allergyFormHandleClose}
          formTitle="Formularz alergii"
          animalId={healthRecords.animalId}
        />
        <DrugForm
          formIsOpen={drugFormIsOpen}
          formOnClose={drugFormHandleClose}
          formOnSubmit={drugFormHandleClose}
          formTitle="Formularz leku"
          animalId={healthRecords.animalId}
        />
        <VaccinationForm
          formIsOpen={vaccinationFormIsOpen}
          formOnClose={vaccinationFormHandleClose}
          formOnSubmit={vaccinationFormHandleOpen}
          formTitle="Formularz szczepienia"
          animalId={healthRecords.animalId}
        />
        {/* */}
        {/* Allergy, medication and vaccination cards */}
        <div className="w-full">
          <HealthTile
            icon={<SiMoleculer />}
            title="Alergie"
            onClick={allergyFormHandleOpen}
          >
            <div>
              {!!healthRecords && healthRecords.allergies.length > 0 ? (
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
            onClick={drugFormHandleOpen}
          >
            {!!healthRecords && healthRecords.drugs.length > 0 ? (
              <DrugList drugs={healthRecords.drugs} />
            ) : (
              <div className="text-neutral-400 text-center">
                <p>Brak informacji na temat leków</p>
              </div>
            )}
          </HealthTile>
        </div>
        <div className="w-full">
          <HealthTile
            icon={<TbVaccine />}
            title="Szczepienia"
            onClick={vaccinationFormHandleOpen}
          >
            {!!healthRecords && healthRecords?.vaccinations.length > 0 ? (
              <VaccinationList vaccinations={healthRecords.vaccinations} />
            ) : (
              <div className="text-neutral-400 text-center">
                <p>Brak informacji na temat szczepień</p>
              </div>
            )}
          </HealthTile>
        </div>
        {/*  */}
      </div>
    </section>
  )
}
