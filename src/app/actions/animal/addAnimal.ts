"use server"

import { server } from "@/app/config"

export async function addAnimal(data: {}) {
  const res = await fetch(`${server}/api/animal/create`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
  return res
}
