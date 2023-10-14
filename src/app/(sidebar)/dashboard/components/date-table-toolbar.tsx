"use client"

import { AnimalResidence, AnimalStatus, AnimalType } from "@/types/animal"
import { Residence, Status, Type } from "@prisma/client"
import { Table } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./date-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const statuses = [
    {
      value: Status.ADAPTED,
      label: AnimalStatus.ADAPTED,
    },
    {
      value: Status.FOR_ADOPTION,
      label: AnimalStatus.FOR_ADOPTION,
    },
    {
      value: Status.QUARANTINE,
      label: AnimalStatus.QUARANTINE,
    },
    {
      value: Status.UNADOPTABLE,
      label: AnimalStatus.UNADOPTABLE,
    },
  ]

  const genders = [
    {
      value: Type.CAT,
      label: AnimalType.CAT,
    },
    {
      value: Type.DOG,
      label: AnimalType.DOG,
    },
  ]

  const residence = [
    {
      value: Residence.BASE,
      label: AnimalResidence.BASE,
    },
    {
      value: Residence.TEMPORARY_HOME,
      label: AnimalResidence.TEMPORARY_HOME,
    },
  ]

  return (
    <div className="flex">
      <div className="flex flex-col flex-1 items-start gap-2 md:flex-row">
        <Input
          placeholder="Szukaj po imieniu..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="h-8 w-full sm:max-w-[250px]"
        />
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("type") && (
            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title="Gatunek"
              options={genders}
            />
          )}
          {table.getColumn("residence") && (
            <DataTableFacetedFilter
              column={table.getColumn("residence")}
              title="Gdzie przebywa"
              options={residence}
            />
          )}
          {isFiltered && (
            <Button
              variant="secondary"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Trash2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
