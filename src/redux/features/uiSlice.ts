import { createSlice } from "@reduxjs/toolkit"

type uiState = {
  sidebarIsOpen: boolean
}

const initialState = {
  sidebarIsOpen: false,
} as uiState

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarIsOpen = true
    },
    closeSidebar: (state) => {
      state.sidebarIsOpen = false
    },
    toggleSidebar: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen
    },
  },
})

export const { openSidebar, closeSidebar, toggleSidebar } = ui.actions
export default ui.reducer
