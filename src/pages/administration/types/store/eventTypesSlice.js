import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createType = createAsyncThunk(
  "eventTypes/createType",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/eventType/create`, user)

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getType({
          page: getState().eventTypes.params.page,
          perPage: getState().eventTypes.params.perPage,
          query: getState().eventTypes.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getType = createAsyncThunk(
  "eventTypes/getType",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/eventType-list`, { params })

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.data.data,
        count: response.data.data.total,
        params,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const updateGuest = createAsyncThunk(
  "eventTypes/updateGuest",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/eventType/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getType({
          page: getState().eventTypes.params.page,
          perPage: getState().eventTypes.params.perPage,
          query: getState().eventTypes.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteUser = createAsyncThunk(
  "eventTypes/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/eventType/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getType({
          page: getState().eventTypes.params.page,
          perPage: getState().eventTypes.params.perPage,
          query: getState().eventTypes.params.query,
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

const eventTypes = createSlice({
  name: "eventTypes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createType.pending, (state) => {
        state.loading = true
      })
      .addCase(createType.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createType.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getType.pending, (state) => {
        state.loading = true
      })
      .addCase(getType.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getType.rejected, (state, action) => {
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
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default eventTypes.reducer
