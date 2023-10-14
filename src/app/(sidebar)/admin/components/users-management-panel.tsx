"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCreationForm } from "./user-creation-form"
import { Separator } from "@/components/ui/separator"
import { TableOfUsers } from "./table-of-users"
import { useGetListOfUsersQuery } from "@/redux/services/userApi"
import { columns } from "./columns"

export const UsersManagementPanel = () => {
  const { data: listOfUsers } = useGetListOfUsersQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Użytkownicy</CardTitle>
        <CardDescription>Panel do zarzadzania użytkownikami</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <UserCreationForm />
        <TableOfUsers
          columns={columns}
          data={listOfUsers ? listOfUsers : []}
        />
      </CardContent>
    </Card>
  )
}
