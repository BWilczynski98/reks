"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"
import { DataTable } from "./data-table"

const LoadingTile = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between space-x-2">
        <div className="flex flex-col md:flex-row w-4/5 gap-2">
          <Skeleton className="h-8 w-full md:w-4/12 lg:w-3/12" />
          <Skeleton className="h-8 w-4/12 md:w-2/12 lg:w-1/12" />
          <Skeleton className="h-8 w-5/12 md:w-2/12 lg:w-1/12" />
          <Skeleton className="h-8 w-6/12 md:w-3/12 lg:w-2/12" />
        </div>
        <div className="hidden md:flex w-1/5  justify-end">
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    </div>
  )
}

export const AnimalTable = () => {
  const { data, isFetching } = useGetAllAnimalQuery()
  const newTable = data?.concat(data, data, data, data, data, data, data, data, data, data)
  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div className="space-y-1">
          <CardTitle>Tabela zwierząt</CardTitle>
          <CardDescription>Tabela wyświetla wszystkich podopiecznych stowarzyszenia.</CardDescription>
        </div>
        <div>
          <Link href={"/add-animal"}>
            <Button
              className="w-full gap-1"
              variant={"ghost"}
            >
              Dodaj
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <LoadingTile />
        ) : (
          <DataTable
            columns={columns}
            data={newTable ? newTable : []}
          />
        )}
      </CardContent>
    </Card>
  )
}
