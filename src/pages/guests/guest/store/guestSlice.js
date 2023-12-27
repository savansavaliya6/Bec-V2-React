import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createGuest = createAsyncThunk(
  "guest/createUsers",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/create_customer`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getGuests({
          page: getState().guests.params.page,
          perPage: getState().guests.params.perPage,
          query: getState().guests.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getGuests = createAsyncThunk(
  "guest/getGuests",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/customer_list`, { params })

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

export const getHistory = createAsyncThunk(
  "guest/getHistory",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/completed-eventList", {
      params,
    })

    if (response.data.status) {
      dispatch(completeProgress())

      // toast.success(response.data.message);
      return {
        data: response.data.data,
        // count: response.data.data.total,
        // params,
      }
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const updateGuest = createAsyncThunk(
  "guest/updateUser",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/customer/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getGuests({
          page: getState().guests.params.page,
          perPage: getState().guests.params.perPage,
          query: getState().guests.params.query,
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
  "guest/deleteUser",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/customer/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getGuests({
          page: getState().guests.params.page,
          perPage: getState().guests.params.perPage,
          query: getState().guests.params.query,
        })
      )
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getIDList = createAsyncThunk("guest/getIDList", async (params) => {
  const role = sessionStorage.getItem("role")

  const response = await Axios.get(`/${role}/id_list`)

  if (response.data.status) {
    return response.data.data
  } else {
    toast.error(response.data.message)
  }
})

export const getGuestTypesList = createAsyncThunk(
  "guest/getGuestTypesList",
  async (params) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/guestType-list`)

    if (response.data.status) {
      return response.data.data.data
    } else {
      toast.error(response.data.message)
    }
  }
)

const guestForm = {
  customer_id: null,
  customerhash: null,
  title: null,
  f_name: null,
  l_name: null,
  email: null,
  ownership_id: null,
  id_type: null,
  id_number: null,
  dob: null,
  contact: null,
  contact_method: null,
}

const initialState = {
  selectedUser: {},
  users: [],
  params: {},
  loading: false,
  IDLists: [],
  guestTypesList: [],
  totalPages: 0,
  history: {
    users: [],
    params: {},
    loading: false,
    totalPages: 0,
  },
  guest: {
    form: guestForm,
    loading: false,
  },
}

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setCurrentGuest: (state, action) => {
      state.guest.form = action.payload
    },
    removeCurrentGuest: (state) => {
      state.guest.form = {
        customer_id: "",
        customerhash: "",
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGuest.pending, (state) => {
        state.loading = true
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createGuest.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getGuests.pending, (state) => {
        state.loading = true
      })
      .addCase(getGuests.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getGuests.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getHistory.pending, (state) => {
        state.history.loading = true
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history.users = action.payload.data
        // state.history.totalPages = action.payload.count
        // state.history.params = action.payload.params
        state.history.loading = false
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.history.loading = false
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
    builder
      .addCase(getIDList.pending, (state) => {
        state.loading = true
      })
      .addCase(getIDList.fulfilled, (state, action) => {
        state.loading = false
        state.IDLists = action.payload
      })
      .addCase(getIDList.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getGuestTypesList.pending, (state) => {
        state.loading = true
      })
      .addCase(getGuestTypesList.fulfilled, (state, action) => {
        state.loading = false
        state.guestTypesList = action.payload
      })
      .addCase(getGuestTypesList.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { setCurrentGuest, removeCurrentGuest } = guestSlice.actions

export default guestSlice.reducer
