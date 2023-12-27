import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/create_vehicle`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getVehicles({
          page: getState().vehicles.params.page,
          perPage: getState().vehicles.params.perPage,
          query: getState().vehicles.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getVehicles = createAsyncThunk(
  "vehicle/getVehicles",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/vehicle_list`, { params })

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

export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/vehicle/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getVehicles({
          page: getState().vehicles.params.page,
          perPage: getState().vehicles.params.perPage,
          query: getState().vehicles.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/vehicle/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getVehicles({
          page: getState().vehicles.params.page,
          perPage: getState().vehicles.params.perPage,
          query: getState().vehicles.params.query,
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
  "vehicle/getDropdownList",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/dropdown_list`)

    if (response.data.status) {
      dispatch(completeProgress())

      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const createDropdownList = createAsyncThunk(
  "vehicle/createDropdownList",
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
  "vehicle/getCustomerHashList",
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
  "vehicle/getVehicleDetailsFromVIN",
  async (id, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/auto_get_data/${id}`)

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
  dropdownList: {},
  customerHashList: [],
  vehicleDetails: null,
  totalPages: 0,
}

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    emptyVehicle: (state) => {
      state.vehicleDetails = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.loading = true
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getVehicles.pending, (state) => {
        state.loading = true
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
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
  },
})

export const { emptyVehicle } = vehicleSlice.actions

export default vehicleSlice.reducer
