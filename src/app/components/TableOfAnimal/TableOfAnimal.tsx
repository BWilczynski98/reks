"use client"
import React, { useState } from "react"
import { Table } from "../UI/Table/Table"
import { TableHead } from "../UI/Table/TableHead"
import { TableHeaderCell } from "../UI/Table/TableHeaderCell"
import { TableBody } from "../UI/Table/TableBody"
import { TableCell } from "../UI/Table/TableCell"
import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { AnimalGender, AnimalResidence, AnimalStatus, AnimalType } from "@/app/types/animal"
import { Gender, Residence, Status, Type } from "@prisma/client"
import { TableRow } from "../UI/Table/TableRow"
import { Filter, TextField } from "../UI"
import { TextFieldType } from "@/app/types/textfield"
import { SlOptionsVertical } from "react-icons/sl"
import { Card } from "../UI/Card/Card"

const mockData = [
  {
    id: "fsw123123ea-321312dasac",
    createAt: "2023-08-29T22:00:47.486Z",
    updateAt: "2023-08-29T22:00:47.486Z",
    name: "Reks",
    type: "DOG",
    gender: "MALE",
    birthDate: "2023-08-29T22:00:00.000Z",
    locationWhereFound: "Malbork 82-200 Jagiellońska 82A/17",
    residence: "BASE",
    status: "FOR_ADOPTION",
  },
]

export const TableOfAnimal = () => {
  const [search, setSearch] = useState<string>("")
  const [filter, setFilter] = useState("")
  const { data } = useGetAllAnimalQuery()
  const animals = data?.filter((animal) => animal.name.includes(search))

  const handleChangeSearchValue = (searchValue: string) => setSearch(searchValue)

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

  const filterFunction = (animal: Animal) => {
    switch (filter) {
      case Type.CAT as Type:
        return animal.type === Type.CAT
      case Type.DOG as Type:
        return animal.type === Type.DOG
      default:
        return animal
    }
  }

  return (
    <Card>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-base font-semibold">Tabela zwierząt</h2>
          </div>
          <div className="w-full flex justify-between gap-2 h-10 border">
            <div className="w-64 h-full">
              <TextField
                type={TextFieldType.TEXT}
                placeholder="szukaj"
                value={search}
                onChange={handleChangeSearchValue}
                size="small"
              />
            </div>

            <Filter />
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
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {animals
              ?.filter((animal) => filterFunction(animal))
              .map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell align="center">{animal.name}</TableCell>
                  <TableCell align="center">{animal.type === Type.CAT ? AnimalType.CAT : AnimalType.DOG}</TableCell>
                  <TableCell align="center">
                    {animal.gender === Gender.MALE ? AnimalGender.MALE : AnimalGender.FEMALE}
                  </TableCell>
                  <TableCell align="center">
                    {animal.residence === Residence.BASE ? AnimalResidence.BASE : AnimalResidence.TEMPORARY_HOME}
                  </TableCell>
                  <TableCell align="center">Wiek</TableCell>
                  <TableCell align="center">{describeStatus(animal.status as Status)}</TableCell>
                  <TableCell align="right">
                    <button className="rounded-full hover:bg-background p-2 text-neutral-500">
                      <SlOptionsVertical />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </Card>
  )
}
