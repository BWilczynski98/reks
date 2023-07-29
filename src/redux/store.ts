import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import counterReducer from "./features/counterSlice"
import { userApi } from "./services/userApi"

export const rootReducer = combineReducers({
  counterReducer,
  [userApi.reducerPath]: userApi.reducer,
})

export const rootMiddleware = [userApi.middleware]

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootMiddleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
