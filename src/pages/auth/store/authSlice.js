import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../store/loadingBarSlice"

export const handleLogin = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/login", credentials)
    if (response.data.status) {
      sessionStorage.setItem("accessToken", response.data.data.access_token)
      sessionStorage.setItem("refreshToken", response.data.data.refresh_token)
      sessionStorage.setItem("role", response.data.data.role)
      sessionStorage.setItem("instructor", response.data.data.is_instructor)
      toast.success(response.data.message)
      dispatch(completeProgress())
      return response.data.data
    } else {
      toast.error(response.data.message)
      dispatch(completeProgress())
      return
    }
  }
)

export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/logout")

    if (response.data.status) {
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("role")
      sessionStorage.removeItem("instructor")
      sessionStorage.setItem("darkMode", false)
      document.body.setAttribute("data-bs-theme", "light")
      toast.success(response.data.message)
      dispatch(completeProgress())
    } else {
      dispatch(completeProgress())
      toast.error(response.data.message)
      throw new Error(data.message)
    }
    return response
  }
)

export const handleForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/forgot-password", email)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      return response.data.token
    } else {
      dispatch(completeProgress())

      toast.error(response.data.message)
      throw new Error(data.message)
    }
  }
)

export const handleResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (password, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/password/reset", password)

    if (response.data.status) {
      dispatch(completeProgress())

      toast.success(response.data.message)
    } else {
      dispatch(completeProgress())

      toast.error(response.data.message)
      throw new Error(data.message)
    }
  }
)

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (params, { dispatch }) => {
    const role = sessionStorage.getItem("role")

    dispatch(setRandomProgress())
    const response = await Axios.get(`/${role}/profile/details`)

    if (response.data.status) {
      dispatch(completeProgress())

      // toast.success(response.data.message);
      return response.data.data.user_details
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")
    let data = new FormData()
    data.append("f_name", params.f_name)
    data.append("l_name", params.l_name)
    data.append("email", params.email)
    data.append("role", params.role)
    data.append("is_instructor", params.is_instructor)
    data.append("id", params.id)

    if (params?.files) {
      data.append("avatar", params.files[0])
    }

    const response = await Axios.post(`/${role}/profile/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(getProfile())
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  loading: false,
  passwordUpdated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    gotoLogin: (state) => {
      state.passwordUpdated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload) {
          state.isAuthenticated = true
          state.user = action.payload
        }
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(handleLogout.pending, (state) => {
        state.loading = true
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(handleForgotPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(handleForgotPassword.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(handleForgotPassword.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(handleResetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(handleResetPassword.fulfilled, (state, action) => {
        state.loading = false
        state.passwordUpdated = true
      })
      .addCase(handleResetPassword.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { logoutSuccess, gotoLogin } = authSlice.actions

export default authSlice.reducer
