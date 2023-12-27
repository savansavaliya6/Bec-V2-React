import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const uploadMedia = createAsyncThunk(
  "eventMedia/uploadMedia",
  async (user, { dispatch }) => {
    let data = new FormData()
    data.append("event_id", user.event_id)
    for (let i = 0; i < user["file-upload"].length; i++) {
      data.append("media[]", user["file-upload"][i])
    }
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/eventMedia/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.data.status) {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }

    dispatch(completeProgress())
  }
)

export const getMedia = createAsyncThunk(
  "eventMedia/getMedia",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/eventMedia-list`, { params })

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

export const deleteMedia = createAsyncThunk(
  "eventMedia/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/customer/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getMedia({
          page: getState().eventMedia.params.page,
          perPage: getState().eventMedia.params.perPage,
          query: getState().eventMedia.params.query,
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
  media: [],
  params: {},
  loading: false,
  totalPages: 0,
}

const eventMediaSlice = createSlice({
  name: "eventMedia",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getMedia.pending, (state) => {
        state.loading = true
      })
      .addCase(getMedia.fulfilled, (state, action) => {
        state.media = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getMedia.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default eventMediaSlice.reducer
