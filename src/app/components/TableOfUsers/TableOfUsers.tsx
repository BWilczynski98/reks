"use client"
import { useGetListOfUsersQuery } from "@/redux/services/userApi"
import React from "react"
import { Card } from "../UI/Card/Card"
import { Table } from "../UI/Table/Table"
import { TableHead } from "../UI/Table/TableHead"
import { TableHeaderCell } from "../UI/Table/TableHeaderCell"
import { TableBody } from "../UI/Table/TableBody"
import { TableRow } from "../UI/Table/TableRow"
import { TableCell } from "../UI/Table/TableCell"
import { Role } from "@prisma/client"
import dayjs from "dayjs"
import { Badge } from "../UI"
import { Severity } from "@/app/types/alert"
import { SlOptionsVertical } from "react-icons/sl"

export const TableOfUsers = () => {
  const { data: listOfUsers } = useGetListOfUsersQuery()

  return (
    <Card>
      <header>
        <h2 className="text-base font-semibold text-neutral-800">Tabela użytkowników</h2>
      </header>
      <div className="w-full overflow-x-auto overflow-y-hidden flex flex-col gap-4 pb-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Imię</TableHeaderCell>
              <TableHeaderCell>Status konta</TableHeaderCell>
              <TableHeaderCell>Rola konta</TableHeaderCell>
              <TableHeaderCell>Data rejestracji</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.active ? (
                    <Badge severity={Severity.SUCCESS}>Aktywne</Badge>
                  ) : (
                    <Badge severity={Severity.ERROR}>Nie aktywne</Badge>
                  )}
                </TableCell>
                <TableCell>{user.role === Role.ADMIN ? "Administrator" : "Użytkownik"}</TableCell>
                <TableCell>{dayjs(user.createdAt).format("DD/MM/YYYY")}</TableCell>
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
    </Card>
  )
}
