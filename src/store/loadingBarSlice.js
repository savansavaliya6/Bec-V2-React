import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loadingProgress: 100,
  loadingCompleted: false,
}

const loadingBarSlice = createSlice({
  name: "loadingBar",
  initialState,
  reducers: {
    setRandomProgress: (state) => {
      state.loadingProgress = Math.floor(Math.random() * 100) + 1
    },
    completeProgress: (state) => {
      state.loadingProgress = 100
      state.loadingCompleted = true
    },
    resetProgress: (state) => {
      state.loadingProgress = 0
      state.loadingCompleted = false
    },
  },
})

export const { setRandomProgress, completeProgress, resetProgress } =
  loadingBarSlice.actions

export default loadingBarSlice.reducer
