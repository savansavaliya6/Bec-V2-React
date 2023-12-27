import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createUsers = createAsyncThunk(
  "eventCategories/create",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/categorie/create`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getCategories({
          page: getState().eventCategories.params.page,
          perPage: getState().eventCategories.params.perPage,
          query: getState().eventCategories.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getCategories = createAsyncThunk(
  "eventCategories/categories-list",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/categories-list`, { params })
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
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const updateUser = createAsyncThunk(
  "eventCategories/updateUser",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/categorie/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getCategories({
          page: getState().eventCategories.params.page,
          perPage: getState().eventCategories.params.perPage,
          query: getState().eventCategories.params.query,
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
  "eventCategories/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/categorie/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getCategories({
          page: getState().eventCategories.params.page,
          perPage: getState().eventCategories.params.perPage,
          query: getState().eventCategories.params.query,
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

const eventCategoriesSlice = createSlice({
  name: "eventCategories",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
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

export default eventCategoriesSlice.reducer
