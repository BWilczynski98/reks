"use client"
import { AnimalGender, AnimalResidence, AnimalStatus, AnimalType } from "@/app/types/animal"
import { TextFieldType } from "@/app/types/textfield"
import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { Gender, Residence, Status, Type } from "@prisma/client"
import dayjs from "dayjs"
import { useState } from "react"
import { BiFilter } from "react-icons/bi"
import { SlOptionsVertical } from "react-icons/sl"
import { Button, FilterList, Pagination, StatusBadge, TextField } from "../UI"
import { Card } from "../UI/Card/Card"
import { Table } from "../UI/Table/Table"
import { TableBody } from "../UI/Table/TableBody"
import { TableCell } from "../UI/Table/TableCell"
import { TableHead } from "../UI/Table/TableHead"
import { TableHeaderCell } from "../UI/Table/TableHeaderCell"
import { TableRow } from "../UI/Table/TableRow"
import { TableFooter } from "../UI/Table/TableFooter"
import { usePagination } from "@/app/hooks/usePagination/usePagination"

require("dayjs/locale/pl")

enum RegisterTimeSort {
  OLDEST = "oldest",
  LATEST = "latest",
}

export const TableOfAnimal = () => {
  const relativeTime = require("dayjs/plugin/relativeTime")
  dayjs.extend(relativeTime)

  const sortByRegisterTime = (a: string, b: string, sorting: RegisterTimeSort): number => {
    const firstDate = new Date(a).getTime()
    const secondDate = new Date(b).getTime()

    if (sorting === "latest") {
      return secondDate - firstDate
    }
    return firstDate - secondDate
  }

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

  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<TableFilter[]>([
    { label: "Pies", value: AnimalType.DOG, active: false },
    { label: "Kot", value: AnimalType.CAT, active: false },
    { label: "Samiec", value: AnimalGender.MALE, active: false },
    { label: "Samica", value: AnimalGender.FEMALE, active: false },
    { label: "Siedziba", value: AnimalResidence.BASE, active: false },
    { label: "Dom tymczasowy", value: AnimalResidence.TEMPORARY_HOME, active: false },
    { label: "Adoptowany", value: AnimalStatus.ADAPTED, active: false },
    { label: "Do adopcji", value: AnimalStatus.FOR_ADOPTION, active: false },
    { label: "Nie do adopcji", value: AnimalStatus.UNADOPTABLE, active: false },
    { label: "Kwarantanna", value: AnimalStatus.QUARANTINE, active: false },
  ])
  const [sorting, setSorting] = useState({
    registerTime: RegisterTimeSort.LATEST,
  })
  const [visible, setVisible] = useState(true)
  const { data } = useGetAllAnimalQuery()
  const animals = data?.map((animal) => ({
    ...animal,
    type: animal.type === Type.DOG ? AnimalType.DOG : AnimalType.CAT,
    gender: animal.gender === Gender.MALE ? AnimalGender.MALE : AnimalGender.FEMALE,
    residence: animal.residence === Residence.BASE ? AnimalResidence.BASE : AnimalResidence.TEMPORARY_HOME,
    residencePeriod: dayjs(animal.createAt).locale("pl").toNow(true),
    registration: dayjs(animal.createAt).format("DD/MM/YYYY"),
    age: dayjs(animal.birthDate).locale("pl").toNow(true),
    status: describeStatus(animal.status as Status),
  }))
  const [rowPerPage, setRowPerPage] = useState(5)
  const { page: animalPage, next, previous } = usePagination(animals, rowPerPage)

  const handleRowPerPage = (rowPerPage: number) => setRowPerPage(rowPerPage)

  const handleChangeFilterCriteria = (criteria: TableFilter) => {
    // Jeśli np w criteria przychodzi obiekt {label: "Samiec", value: AnimalGender.MALE, active: true}
    // to w moim state filters wartość odpowiadająca za Samiec zmienia się na taką jaką przesyłam w argumencie
  }

  const handleChangeSearchValue = (searchValue: string) => setSearch(searchValue)

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-base font-semibold text-neutral-800">Tabela zwierząt</h2>
            <Button>Nowy wpis</Button>
          </div>
          <div className="w-full flex gap-2 justify-between items-center">
            <div>
              <TextField
                type={TextFieldType.TEXT}
                placeholder="Szukaj"
                value={search}
                onChange={handleChangeSearchValue}
                // size="small"
              />
            </div>
            <FilterList kindOfFiltering={filters}>
              <BiFilter />
            </FilterList>
          </div>
        </div>
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell>Imię</TableHeaderCell>
              <TableHeaderCell>Typ</TableHeaderCell>
              <TableHeaderCell>Płeć</TableHeaderCell>
              <TableHeaderCell>Gdzie przebywa</TableHeaderCell>
              <TableHeaderCell>Wiek</TableHeaderCell>
              <TableHeaderCell>Czas w schronisku</TableHeaderCell>
              <TableHeaderCell>Data rejestracji</TableHeaderCell>
              <TableHeaderCell visible={visible}>Status</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {animalPage
              ?.filter((animal) => animal.name.toUpperCase().includes(search.toUpperCase()))
              // .filter(({ gender }) => gender.includes(filters.gender))
              // .filter(({ type }) => type.includes(filters.type))
              // .filter(({ residence }) => residence.includes(filters.residence))
              // .filter(({ status }) => status.includes(filters.status))
              .sort((a, b) => sortByRegisterTime(a.createAt, b.createAt, sorting.registerTime))
              .map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell align="center">{animal.name}</TableCell>
                  <TableCell align="center">{animal.type}</TableCell>
                  <TableCell align="center">{animal.gender}</TableCell>
                  <TableCell align="center">{animal.residence}</TableCell>
                  <TableCell align="center">{animal.age}</TableCell>
                  <TableCell align="center">{animal.residencePeriod}</TableCell>
                  <TableCell align="center">{animal.registration}</TableCell>
                  <TableCell
                    align="center"
                    visible={visible}
                  >
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
        <div className="w-full flex justify-between">
          <div></div>
          <Pagination
            rowPerPage={rowPerPage}
            previousPage={previous}
            nextPage={next}
          />
        </div>
      </div>
    </Card>
  )
}
