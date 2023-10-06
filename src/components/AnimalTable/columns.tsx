"use client"

import { AnimalGender, AnimalResidence, AnimalStatus, AnimalType } from "@/types/animal"
import { Gender, Residence, Status, Type } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import { pl } from "date-fns/locale"
import Link from "next/link"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./date-table-actions"

export const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "name",
    header: "Imię",
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <Link
          href={`/animalProfile/${id}`}
          className="font-semibold"
        >
          {row.getValue("name")}
        </Link>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Gatunek",
    cell: ({ row }) => {
      const type = row.getValue("type")
      const formatted = type === Type.CAT ? AnimalType.CAT : AnimalType.DOG
      return formatted
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "gender",
    header: "Płeć",
    cell: ({ row }) => {
      const gender = row.getValue("gender")
      const formatted = gender === Gender.FEMALE ? AnimalGender.FEMALE : AnimalGender.MALE
      return formatted
    },
  },
  {
    accessorKey: "residence",
    header: () => {
      return <span className="line-clamp-1">Gdzie przebywa</span>
    },
    cell: ({ row }) => {
      const residence = row.getValue("residence")
      const formatted = residence === Residence.BASE ? AnimalResidence.BASE : AnimalResidence.TEMPORARY_HOME
      return formatted
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Wiek"
      />
    ),
    cell: ({ row }) => {
      const dateToCompare = new Date(row.getValue("birthDate"))
      const formatted = formatDistanceToNow(dateToCompare, { locale: pl })
      return formatted
    },
  },
  {
    accessorKey: "timeWhenFound",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="W schronisku od"
      />
    ),

    cell: ({ row }) => {
      const dateToCompare = new Date(row.getValue("timeWhenFound"))
      // const formatted = format(dateToCompare, "dd/MM/yyyy")
      const formatted = formatDistanceToNow(dateToCompare, { locale: pl })
      return formatted
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      let formatted
      switch (status) {
        case Status.ADAPTED:
          formatted = AnimalStatus.ADAPTED
          break
        case Status.FOR_ADOPTION:
          formatted = AnimalStatus.FOR_ADOPTION
          break
        case Status.QUARANTINE:
          formatted = AnimalStatus.QUARANTINE
          break
        case Status.UNADOPTABLE:
          formatted = AnimalStatus.UNADOPTABLE
          break
        default:
          formatted = AnimalStatus.UNADOPTABLE
          break
      }
      return formatted
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions animalId={row.original.id} />,
  },
]
