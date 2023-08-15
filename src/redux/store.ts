import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import counterReducer from "./features/counterSlice"
import { userApi } from "./services/userApi"
import { animalApi } from "./services/animalApi"

export const rootReducer = combineReducers({
  counterReducer,
  [userApi.reducerPath]: userApi.reducer,
  [animalApi.reducerPath]: animalApi.reducer,
})

export const rootMiddleware = [animalApi.middleware]

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootMiddleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
