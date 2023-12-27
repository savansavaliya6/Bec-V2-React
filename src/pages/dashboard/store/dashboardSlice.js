import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../store/loadingBarSlice"

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/dynamic_dashboard`)
    if (response.data.status) {
      dispatch(completeProgress())
      return {
        data: response.data,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

const initialState = {
  data: {},
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.loading = false
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default dashboardSlice.reducer
