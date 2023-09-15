"use client"
import { useToggle } from "@/app/hooks"
import { usePagination } from "@/app/hooks/usePagination/usePagination"
import { AnimalGender, AnimalResidence, AnimalStatus, AnimalType } from "@/app/types/animal"
import { Routes } from "@/app/types/routes"
import { TextFieldType } from "@/app/types/textfield"
import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { Gender, Residence, Status, Type } from "@prisma/client"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiFilter } from "react-icons/bi"
import { SlOptionsVertical } from "react-icons/sl"
import { Button, Pagination, StatusBadge, TextField } from "../UI"
import { Card } from "../UI/Card/Card"
import { Select } from "../UI/Select"
import { Table } from "../UI/Table/Table"
import { TableBody } from "../UI/Table/TableBody"
import { TableCell } from "../UI/Table/TableCell"
import { TableHead } from "../UI/Table/TableHead"
import { TableHeaderCell } from "../UI/Table/TableHeaderCell"
import { TableRow } from "../UI/Table/TableRow"
require("dayjs/locale/pl")

const describeStatus = (status: Status): AnimalStatus => {
  switch (status) {
    case Status.ADAPTED:
      return AnimalStatus.ADAPTED
    case Status.FOR_ADOPTION:
      return AnimalStatus.FOR_ADOPTION
    case Status.UNADOPTABLE:
      return AnimalStatus.UNADOPTABLE
    case Status.QUARANTINE:
      return AnimalStatus.QUARANTINE
    default:
      return AnimalStatus.UNADOPTABLE
  }
}

export const TableOfAnimal = () => {
  const router = useRouter()
  const relativeTime = require("dayjs/plugin/relativeTime")
  dayjs.extend(relativeTime)
  const { data } = useGetAllAnimalQuery()
  const { toggle: filterMenuIsOpen, handleToggle: handleToggleFilterMenu } = useToggle()
  const [search, setSearch] = useState<string>("")
  const [sortOldestDateOfRegistration, setSortOldestDateOfRegistration] = useState(false)

  const toggleSorting = () => {
    setSortOldestDateOfRegistration((prev) => !prev)
  }

  const sortByRegisterTime = (a: string, b: string, sorting: boolean): number => {
    const firstDate = new Date(a).getTime()
    const secondDate = new Date(b).getTime()

    return sorting ? firstDate - secondDate : secondDate - firstDate
  }

  const filtersInitialState = {
    type: "",
    gender: "",
    residence: "",
    status: "",
  }
  const [filters, setFilters] = useState(filtersInitialState)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const resetFilters = () => {
    setFilters(filtersInitialState)
  }

  const numberOfFilters = Object.values(filters).filter((option) => option.trim() !== "")

  const animals = data
    ?.map((animal) => ({
      ...animal,
      type: animal.type === Type.DOG ? AnimalType.DOG : AnimalType.CAT,
      gender: animal.gender === Gender.MALE ? AnimalGender.MALE : AnimalGender.FEMALE,
      residence: animal.residence === Residence.BASE ? AnimalResidence.BASE : AnimalResidence.TEMPORARY_HOME,
      residencePeriod: dayjs(animal.timeWhenFound).locale("pl").toNow(true),
      registration: dayjs(animal.timeWhenFound).format("DD/MM/YYYY"),
      age: dayjs(animal.birthDate).locale("pl").toNow(true),
      status: describeStatus(animal.status as Status),
    }))
    .sort((a, b) => sortByRegisterTime(a.timeWhenFound, b.timeWhenFound, sortOldestDateOfRegistration))
    .filter(
      (animal) =>
        animal.name.toUpperCase().includes(search.toUpperCase()) &&
        animal.gender.includes(filters.gender) &&
        animal.type.includes(filters.type) &&
        animal.residence.includes(filters.residence) &&
        animal.status.includes(filters.status)
    )

  const [rowPerPage, setRowPerPage] = useState(10)

  const {
    page: animalsPerSide,
    next,
    previous,
    startOfCoverage,
    endOfCoverage,
    totalItems,
  } = usePagination(animals, rowPerPage)

  const handleRowPerPage = (rowPerPage: number) => {
    setRowPerPage(rowPerPage)
  }
  const handleChangeSearchValue = (searchValue: string) => {
    setSearch(searchValue)
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-base font-semibold text-neutral-800">Tabela zwierząt</h2>
            <Button onClick={() => router.push(Routes.ADDING_ANIMAL)}>Nowy wpis</Button>
          </div>
          <div className="w-full flex gap-2 items-center">
            <div>
              <TextField
                type={TextFieldType.TEXT}
                placeholder="Szukaj"
                value={search}
                onChange={handleChangeSearchValue}
                size="small"
              />
            </div>
            <div className="relative">
              <button
                className="px-3 py-2 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default  hover:ring-2 hover:ring-primary-700 shadow-sm flex justify-center items-center gap-2"
                onClick={handleToggleFilterMenu}
              >
                Filtrowanie
                <span>
                  <BiFilter />
                </span>
              </button>
              {numberOfFilters.length > 0 ? (
                <div className="absolute -top-2 -right-1 bg-primary-700 rounded-full h-5 w-5 text-center text-white font-medium text-sm">
                  {numberOfFilters.length}
                </div>
              ) : null}
            </div>
            <div></div>
          </div>
          {filterMenuIsOpen ? (
            <div>
              <div className="w-full bg-background rounded-default py-4 px-2">
                <div className="max-xl:flex-col flex justify-between gap-2">
                  <Select
                    label="Płeć"
                    options={[AnimalGender.MALE, AnimalGender.FEMALE]}
                    value={filters.gender}
                    onChange={(value) => handleFilterChange("gender", value)}
                    placeholder="Płeć zwierzęcia"
                    fullWidth
                    tickOff
                  />
                  <Select
                    label="Typ"
                    options={[AnimalType.DOG, AnimalType.CAT]}
                    value={filters.type}
                    onChange={(value) => handleFilterChange("type", value)}
                    placeholder="Typ zwierzęcia"
                    fullWidth
                    tickOff
                  />
                  <Select
                    label="Gdzie przebywa"
                    options={[AnimalResidence.BASE, AnimalResidence.TEMPORARY_HOME]}
                    value={filters.residence}
                    onChange={(value) => handleFilterChange("residence", value)}
                    placeholder="Gdzie zwierze przebywa"
                    fullWidth
                    tickOff
                  />
                  <Select
                    label="Status"
                    options={[
                      AnimalStatus.ADAPTED,
                      AnimalStatus.FOR_ADOPTION,
                      AnimalStatus.QUARANTINE,
                      AnimalStatus.UNADOPTABLE,
                    ]}
                    value={filters.status}
                    onChange={(value) => handleFilterChange("status", value)}
                    placeholder="Status zwierzęcia"
                    fullWidth
                    tickOff
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    action="deny"
                    outline
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-full overflow-x-auto overflow-y-hidden flex flex-col gap-4 pb-4">
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>Imię</TableHeaderCell>
                <TableHeaderCell>Typ</TableHeaderCell>
                <TableHeaderCell>Płeć</TableHeaderCell>
                <TableHeaderCell>Gdzie przebywa</TableHeaderCell>
                <TableHeaderCell>Wiek</TableHeaderCell>
                <TableHeaderCell>Czas w schronisku</TableHeaderCell>
                <TableHeaderCell
                  sorting
                  sortFunction={toggleSorting}
                >
                  Data zabezpieczenia
                </TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {animalsPerSide?.map((animal) => (
                <TableRow key={animal.id + Math.random()}>
                  <TableCell
                    align="center"
                    link={true}
                    id={animal.id}
                  >
                    {animal.name}
                  </TableCell>
                  <TableCell align="center">{animal.type}</TableCell>
                  <TableCell align="center">{animal.gender}</TableCell>
                  <TableCell align="center">{animal.residence}</TableCell>
                  <TableCell align="center">{animal.age}</TableCell>
                  <TableCell align="center">{animal.residencePeriod}</TableCell>
                  <TableCell align="center">{animal.registration}</TableCell>
                  <TableCell align="center">
                    <StatusBadge severity={animal.status}>{animal.status}</StatusBadge>
                  </TableCell>
                  <TableCell align="right">
                    <button className="rounded-full hover:bg-background p-2 text-neutral-500">
                      <SlOptionsVertical />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex justify-between">
          <div></div>
          <Pagination
            rowPerPage={rowPerPage}
            rows={[5, 10, 20, 50]}
            handleRowPerPage={handleRowPerPage}
            previousPage={previous}
            nextPage={next}
            startOfCoverage={startOfCoverage}
            endOfCoverage={endOfCoverage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </Card>
  )
}
