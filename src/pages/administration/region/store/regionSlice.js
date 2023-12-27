import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createActivity = createAsyncThunk(
  "regions/createActivity",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())

    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/region/create`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getActivity({
          page: getState().regions.params.page,
          perPage: getState().regions.params.perPage,
          query: getState().regions.params.query,
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
  "regions/getActivity",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/region-list`, { params })

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
  "regions/updateGuest",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/region/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getActivity({
          page: getState().regions.params.page,
          perPage: getState().regions.params.perPage,
          query: getState().regions.params.query,
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
  "regions/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/region/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getActivity({
          page: getState().regions.params.page,
          perPage: getState().regions.params.perPage,
          query: getState().regions.params.query,
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

const regionSlice = createSlice({
  name: "regions",
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

export default regionSlice.reducer
