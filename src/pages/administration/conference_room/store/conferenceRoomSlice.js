import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createActivity = createAsyncThunk(
  "conferenceRooms/createActivity",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/conference_room/create`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getActivity({
          page: getState().conferenceRooms.params.page,
          perPage: getState().conferenceRooms.params.perPage,
          query: getState().conferenceRooms.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getActivity = createAsyncThunk(
  "conferenceRooms/getActivity",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/conference_room-list`, {
      params,
    })

    if (response.data.status) {
      // toast.success(response.data.message);
      dispatch(completeProgress())

      return {
        data: response.data.data.data,
        count: response.data.data.total,
        params,
      }
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const updateGuest = createAsyncThunk(
  "conferenceRooms/updateGuest",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/conference_room/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getActivity({
          page: getState().conferenceRooms.params.page,
          perPage: getState().conferenceRooms.params.perPage,
          query: getState().conferenceRooms.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteGuest = createAsyncThunk(
  "conferenceRooms/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/conference_room/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getActivity({
          page: getState().conferenceRooms.params.page,
          perPage: getState().conferenceRooms.params.perPage,
          query: getState().conferenceRooms.params.query,
        })
      )
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

const initialState = {
  selectedUser: {},
  users: [],
  params: {},
  loading: false,
  totalPages: 0,
}

const conferenceRoomsSlice = createSlice({
  name: "conferenceRooms",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.loading = true
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getActivity.pending, (state) => {
        state.loading = true
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getActivity.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(updateGuest.pending, (state) => {
        state.loading = true
      })
      .addCase(updateGuest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateGuest.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteGuest.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteGuest.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default conferenceRoomsSlice.reducer
