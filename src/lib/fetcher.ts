import { baseUrl } from "@/app/api/baseUrl"
import axios from "axios"

export const fetcher = (url: string, method = "get", data = {}) =>
  axios({ url: `${baseUrl}/${url}`, method, data }).then((res) => res.data)
