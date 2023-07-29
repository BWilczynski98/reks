"use client"
import { decrement, increment } from "@/redux/features/counterSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useGetUsersQuery } from "@/redux/services/userApi"

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value)
  const dispatch = useAppDispatch()
  const { data } = useGetUsersQuery(null)
  console.log(count)
  console.log(data)

  return (
    <main>
      <div>
        <button onClick={() => dispatch(decrement())}>decrement</button>
      </div>
      <div>
        <h1>{count}</h1>
      </div>
      <div>
        <button onClick={() => dispatch(increment())}>increment</button>
      </div>
    </main>
  )
}
