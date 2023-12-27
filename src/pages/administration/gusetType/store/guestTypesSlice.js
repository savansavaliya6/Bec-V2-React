import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createGuestType = createAsyncThunk(
  "guestTypes/createGuestType",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/guestType/create`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getGuestTypes({
          page: getState().guestTypes.params.page,
          perPage: getState().guestTypes.params.perPage,
          query: getState().guestTypes.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getGuestTypes = createAsyncThunk(
  "guestTypes/getGuestTypes",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/guestType-list`, { params })

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

export const updateGuestType = createAsyncThunk(
  "guestTypes/updateGuestType",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/guestType/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getGuestTypes({
          page: getState().guestTypes.params.page,
          perPage: getState().guestTypes.params.perPage,
          query: getState().guestTypes.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteGuestTypes = createAsyncThunk(
  "guestTypes/deleteGuestTypes",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/guestType/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getGuestTypes({
          page: getState().guestTypes.params.page,
          perPage: getState().guestTypes.params.perPage,
          query: getState().guestTypes.params.query,
        })
      )
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getIDList = createAsyncThunk(
  "guestTypes/getIDList",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/id_list`)

    if (response.data.status) {
      dispatch(completeProgress())

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

const guestTypesSlice = createSlice({
  name: "guestTypes",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createGuestType.pending, (state) => {
        state.loading = true
      })
      .addCase(createGuestType.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createGuestType.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getGuestTypes.pending, (state) => {
        state.loading = true
      })
      .addCase(getGuestTypes.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getGuestTypes.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(updateGuestType.pending, (state) => {
        state.loading = true
      })
      .addCase(updateGuestType.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateGuestType.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteGuestTypes.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteGuestTypes.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteGuestTypes.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default guestTypesSlice.reducer
