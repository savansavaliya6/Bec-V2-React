import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createInterest = createAsyncThunk(
  "guestInterests/createInterest",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/create_guestInterest`, user)

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getInterestList({
          page: getState().guestInterests.params.page,
          perPage: getState().guestInterests.params.perPage,
          query: getState().guestInterests.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getInterestList = createAsyncThunk(
  "guestInterests/getInterestList",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/guestInterest_list`, { params })

    if (response.data.status) {
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

export const updateInterest = createAsyncThunk(
  "guestInterests/updateInterest",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/guestInterest/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getInterestList({
          page: getState().guestInterests.params.page,
          perPage: getState().guestInterests.params.perPage,
          query: getState().guestInterests.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteInterest = createAsyncThunk(
  "guestInterests/deleteInterest",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/guestInterest/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getInterestList({
          page: getState().guestInterests.params.page,
          perPage: getState().guestInterests.params.perPage,
          query: getState().guestInterests.params.query,
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

const guestInterestsSlice = createSlice({
  name: "guestInterests",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createInterest.pending, (state) => {
        state.loading = true
      })
      .addCase(createInterest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createInterest.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getInterestList.pending, (state) => {
        state.loading = true
      })
      .addCase(getInterestList.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getInterestList.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(updateInterest.pending, (state) => {
        state.loading = true
      })
      .addCase(updateInterest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateInterest.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteInterest.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteInterest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteInterest.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default guestInterestsSlice.reducer
