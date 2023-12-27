import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  resetProgress,
  setRandomProgress,
} from "../../../store/loadingBarSlice"

export const createUsers = createAsyncThunk(
  "user/createUsers",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")
    let data = new FormData()
    data.append("f_name", user.f_name)
    data.append("l_name", user.l_name)
    data.append("email", user.email)
    data.append("role", user.role)
    data.append("password", user.password)
    data.append("is_instructor", user.is_instructor)
    if (user?.files) {
      data.append("avatar", user.files[0])
    }
    const response = await Axios.post(`/${role}/custCreate`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getUsers({
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

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/userslist`, { params })

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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")
    let data = new FormData()
    data.append("f_name", params.f_name)
    data.append("l_name", params.l_name)
    data.append("email", params.email)
    data.append("role", params.role)
    data.append("password", params.password)
    data.append("is_instructor", params.is_instructor)
    if (params?.files) {
      data.append("avatar", params.files[0])
    }
    const response = await Axios.post(
      `/${role}/user_update/${params.user_id}`,
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
        getUsers({
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/user_delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getUsers({
          page: getState().users.params.page,
          perPage: getState().users.params.perPage,
          query: getState().users.params.query,
        })
      )
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutSuccess: (state) => {},
  },
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
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
        // dispatch(resetProgress())
      })
      .addCase(getUsers.rejected, (state, action) => {
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

export const { logoutSuccess } = userSlice.actions

export default userSlice.reducer
