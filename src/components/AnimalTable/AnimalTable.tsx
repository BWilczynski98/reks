"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { Cat, Dog, Plus, PlusSquare } from "lucide-react"

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
        <Table>
          {/* <TableCaption>Tabela przedstawia listę podopiecznych stowarzyszenia Reks.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imię</TableHead>
              <TableHead>Gatunek</TableHead>
              <TableHead>Płeć</TableHead>
              <TableHead>Gdzie przebywa</TableHead>
              <TableHead>Wiek</TableHead>
              <TableHead>Czas w schronisku</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((animal, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{animal.name}</TableCell>
                <TableCell>{animal.type}</TableCell>
                <TableCell>{animal.gender}</TableCell>
                <TableCell>{animal.residence}</TableCell>
                <TableCell>{animal.birthDate}</TableCell>
                <TableCell>{animal.timeWhenFound}</TableCell>
                <TableCell className="text-right">{animal.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
