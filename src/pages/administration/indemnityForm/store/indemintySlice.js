import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createType = createAsyncThunk(
  "indemnity/createType",
  async (user, { dispatch, getState }) => {
    try {
      let data = new FormData()
      data.append("form_name", user.form_name)
      data.append("location", user.location)
      data.append("document", user.document[0])
      dispatch(setRandomProgress())
      const role = sessionStorage.getItem("role")

      const response = await Axios.post(
        `/${role}/indemnity_form/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      if (response.data.status) {
        toast.success(response.data.message)
        await dispatch(
          getType({
            page: getState().users.params.page,
            perPage: getState().users.params.perPage,
            query: getState().users.params.query,
          })
        )
      } else {
        toast.error(response.data.message)
      }
      dispatch(completeProgress())
      return response
    } catch (error) {
      console.log(error)
    }
  }
)

export const getType = createAsyncThunk(
  "indemnity/getType",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/indemnity_form-list`, { params })

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

export const editCategory = createAsyncThunk(
  "indemnity/editCategory",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())

    let data = new FormData()
    data.append("form_name", params.form_name)
    data.append("location", params.location)
    if (params.document) data.append("document", params.document[0])
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/indemnity_form/update/${params.id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getType({
          page: getState().users.params.page,
          perPage: getState().users.params.perPage,
          query: getState().users.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteCategory = createAsyncThunk(
  "indemnity/deleteCategory",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/indemnity_form/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getType({
          page: getState().users.params.page,
          perPage: getState().users.params.perPage,
          query: getState().users.params.query,
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
  pdf: "",
}

const indemnitySlice = createSlice({
  name: "indemnity",
  initialState,
  reducers: {
    setPdf: (state, action) => {
      state.pdf = action.payload
    },
  },
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
    // builder
    //   .addCase(editCategory.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(editCategory.fulfilled, (state, action) => {
    //     state.loading = false;
    //   })
    //   .addCase(editCategory.rejected, (state, action) => {
    //     state.loading = false;
    //   });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { setPdf } = indemnitySlice.actions

export default indemnitySlice.reducer
