import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createFeet = createAsyncThunk(
  "fleets/createFeet",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/create_becfleet`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getBecFeet({
          page: getState().fleets.params.page,
          perPage: getState().fleets.params.perPage,
          query: getState().fleets.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getBecFeet = createAsyncThunk(
  "fleets/getBecFeet",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/becfleet_list`, { params })

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

export const getFleetAssignedEvents = createAsyncThunk(
  "fleets/getFleetAssignedEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/get-fleet-veh-count`, {
      params,
    })

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

export const updateFleet = createAsyncThunk(
  "fleets/updateFleet",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/becfleet/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getBecFeet({
          page: getState().fleets.params.page,
          perPage: getState().fleets.params.perPage,
          query: getState().fleets.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteFeet = createAsyncThunk(
  "fleets/deleteFeet",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/becfleet/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getBecFeet({
          page: getState().fleets.params.page,
          perPage: getState().fleets.params.perPage,
          query: getState().fleets.params.query,
        })
      )
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getDropdownList = createAsyncThunk(
  "fleets/getDropdownList",
  async (params) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/autoGet_dropdown`)

    if (response.data.status) {
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
  }
)

export const createDropdownList = createAsyncThunk(
  "fleets/createDropdownList",
  async (params, { dispatch }) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/dropdown_save`, params)

    if (response.data.status) {
      // return response.data.data;
      dispatch(getDropdownList())
    } else {
      console.log("error", response.data.message)
      // toast.error(response.data.message);
    }
  }
)

export const getCustomerHashList = createAsyncThunk(
  "fleets/getCustomerHashList",
  async (params) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/customerhash_list`)

    if (response.data.status) {
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
  }
)

export const getVehicleDetailsFromVIN = createAsyncThunk(
  "fleets/getVehicleDetailsFromVIN",
  async (id, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/auto_get_data/${id}`)

    if (response.data.status) {
      dispatch(completeProgress())

      return response.data.data
    } else {
      // toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const createNote = createAsyncThunk(
  "fleets/createNote",
  async (user, { dispatch, getState }) => {
    let data = new FormData()
    data.append("fleet_id", user.fleet_id)
    data.append("notes", user.notes)
    if (user?.files) {
      data.append("files[]", user.files[0])
    }
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/create_notes`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getBecFeet({
          page: getState().fleets.params.page,
          perPage: getState().fleets.params.perPage,
          query: getState().fleets.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

const initialState = {
  selectedUser: {},
  users: [],
  params: {},
  loading: false,
  dropdownList: {},
  customerHashList: [],
  vehicleDetails: null,
  totalPages: 0,
  events: {
    users: [],
    params: {},
    loading: false,
    totalPages: 0,
  },
}

const becFleetSlice = createSlice({
  name: "fleets",
  initialState,
  reducers: {
    emptyVehicle: (state) => {
      state.vehicleDetails = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFeet.pending, (state) => {
        state.loading = true
      })
      .addCase(createFeet.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createFeet.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getBecFeet.pending, (state) => {
        state.loading = true
      })
      .addCase(getBecFeet.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getBecFeet.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getFleetAssignedEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(getFleetAssignedEvents.fulfilled, (state, action) => {
        state.events.users = action?.payload?.data || []
        state.events.totalPages = action?.payload?.count || 0
        state.events.params = action?.payload?.params || {}
        state.events.loading = false
      })
      .addCase(getFleetAssignedEvents.rejected, (state, action) => {
        state.loading = false
      })

    builder
      .addCase(updateFleet.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFleet.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateFleet.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteFeet.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteFeet.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteFeet.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getDropdownList.pending, (state) => {
        state.loading = true
      })
      .addCase(getDropdownList.fulfilled, (state, action) => {
        state.loading = false
        state.dropdownList = action.payload
      })
      .addCase(getDropdownList.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(createDropdownList.pending, (state) => {
        state.loading = true
      })
      .addCase(createDropdownList.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createDropdownList.rejected, (state, action) => {
        state.loading = false
      })

    builder
      .addCase(getCustomerHashList.pending, (state) => {
        state.loading = true
      })
      .addCase(getCustomerHashList.fulfilled, (state, action) => {
        state.loading = false
        state.customerHashList = action.payload
      })
      .addCase(getCustomerHashList.rejected, (state, action) => {
        state.loading = false
      })

    builder
      .addCase(getVehicleDetailsFromVIN.pending, (state) => {
        state.loading = true
      })
      .addCase(getVehicleDetailsFromVIN.fulfilled, (state, action) => {
        state.loading = false
        state.vehicleDetails = action.payload
      })
      .addCase(getVehicleDetailsFromVIN.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { emptyVehicle } = becFleetSlice.actions

export default becFleetSlice.reducer
