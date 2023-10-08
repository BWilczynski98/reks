"use client"

import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const AnimalTable = () => {
  const { data } = useGetAllAnimalQuery()

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
        <DataTable
          columns={columns}
          data={data ? data : []}
        />
      </CardContent>
    </Card>
  )
}
