import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./date-table-actions"
import { Role } from "@prisma/client"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Adres email",
  },
  {
    accessorKey: "name",
    header: "Imię",
    cell: ({ row }) => {
      const { name } = row.original
      return <span>{name ? name : "Brak informacji"}</span>
    },
  },
  {
    accessorKey: "role",
    header: "Rola",
    cell: ({ row }) => {
      const { role } = row.original
      return <span>{role === Role.ADMIN ? "Administrator" : "Użytkownik"}</span>
    },
  },
  {
    accessorKey: "active",
    header: "Stauts",
    cell: ({ row }) => {
      const { active } = row.original
      return <span>{active ? "Konto aktywowane" : "Konto nieaktywne"}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        userId={row.original.id}
        userEmailAddress={row.original.email}
      />
    ),
  },
]
