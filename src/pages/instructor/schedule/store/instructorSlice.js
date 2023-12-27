import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const getEvents = createAsyncThunk(
  "instructor/getEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/instructor_schedule`)

    if (response.data.status) {
      // toast.success(response.data.message);
      dispatch(completeProgress())
      return response?.data?.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getAttendanceEvents = createAsyncThunk(
  "instructor/getAttendanceEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/current_event_list`, { params })

    if (response.data.status) {
      // toast.success(response.data.message);
      dispatch(completeProgress())
      return {
        data: response.data.event,
        // count: response.data.data.total,
        // params,
      }
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const createAttendance = createAsyncThunk(
  "instructor/createAttendance",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/attendance`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      // await dispatch(
      //   getUsers({
      //     page: getState().instructor.params.page,
      //     perPage: getState().instructor.params.perPage,
      //     query: getState().instructor.params.query,
      //   })
      // )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getAttendance = createAsyncThunk(
  "instructor/getAttendance",
  async (params, { dispatch }) => {
    const role = sessionStorage.getItem("role")

    dispatch(setRandomProgress())
    const response = await Axios.get(`/${role}/attendance_list`, { params })

    if (response.data.status) {
      // toast.success(response.data.message);
      dispatch(completeProgress())
      return {
        data: response.data.event,
        // count: response.data.data.total,
        // params,
      }
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

const initialState = {
  events: [],
  attedanceEvents: {
    loading: false,
    events: [],
    params: {},
    totalPages: 0,
  },
  attendanceList: {
    loading: false,
    events: [],
    params: {},
    totalPages: 0,
  },
  loading: false,
}

const instructorSlice = createSlice({
  name: "instructor",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload
        state.loading = false
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getAttendanceEvents.pending, (state) => {
        state.attedanceEvents.loading = true
      })
      .addCase(getAttendanceEvents.fulfilled, (state, action) => {
        state.attedanceEvents.events = action.payload.data
        // state.attedanceEvents.totalPages = action.payload.count
        // state.attedanceEvents.params = action.payload.params
        state.attedanceEvents.loading = false
      })
      .addCase(getAttendanceEvents.rejected, (state, action) => {
        state.attedanceEvents.loading = false
      })
    builder
      .addCase(getAttendance.pending, (state) => {
        state.attendanceList.loading = true
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.attendanceList.events = action.payload.data
        // state.attendanceList.totalPages = action.payload.count
        // state.attendanceList.params = action.payload.params
        state.attendanceList.loading = false
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.attendanceList.loading = false
      })
  },
})

export default instructorSlice.reducer
