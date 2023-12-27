import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import { getGuests } from "../../guest/store/guestSlice"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createVoucher = createAsyncThunk(
  "voucher/createVoucher",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/create_voucher`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getVouchers({
          page: getState().vouchers.params.page,
          perPage: getState().vouchers.params.perPage,
          query: getState().vouchers.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getVouchers = createAsyncThunk(
  "voucher/getVouchers",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/voucher_list`, { params })

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

export const getNotAssignedVouchers = createAsyncThunk(
  "voucher/getNotAssignedVouchers",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/notAssignVoucher_list`, {
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

export const updateVoucher = createAsyncThunk(
  "voucher/updateVoucher",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/voucher/update/${params.id}`,
      params
    )

    if (response.data.status) {
      dispatch(completeProgress())

      toast.success(response.data.message)
      await dispatch(
        getVouchers({
          page: getState().vouchers.params.page,
          perPage: getState().vouchers.params.perPage,
          query: getState().vouchers.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/voucher/delete/${id}`)

    if (response.data.status) {
      dispatch(completeProgress())

      toast.success(response.data.message)
      await dispatch(
        getVouchers({
          page: getState().vouchers.params.page,
          perPage: getState().vouchers.params.perPage,
          query: getState().vouchers.params.query,
        })
      )
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const assignVoucher = createAsyncThunk(
  "voucher/assignVoucher",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/assign_voucher`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getVouchers({
          page: getState().vouchers.params.page,
          perPage: getState().vouchers.params.perPage,
          query: getState().vouchers.params.query,
        })
      )
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

export const unAssignVoucher = createAsyncThunk(
  "voucher/unAssignVoucher",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/unassign_voucher`, user)
    if (response.data.status) {
      toast.success(response.data.message)

      await dispatch(
        getVouchers({
          page: getState().vouchers.params.page,
          perPage: getState().vouchers.params.perPage,
          query: getState().vouchers.params.query,
        })
      )
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
  }
)

export const getRetailerList = createAsyncThunk(
  "voucher/getRetailerList",
  async (params) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/retailer_list`)

    if (response.data.status) {
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
  }
)

export const getLinkedUsers = createAsyncThunk(
  "voucher/getLinkedUsers",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/assign_custList`, { params })
    if (response.data.status) {
      // toast.success(response.data.message)
      dispatch(completeProgress())

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

export const getDetailOfAssignedVoucher = createAsyncThunk(
  "voucher/getDetailOfAssignedVoucher",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/assignVoucher_details`, {
      params,
    })

    if (response.data.status) {
      dispatch(completeProgress())

      // toast.success(response.data.message)
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

const initialState = {
  selectedUser: {},
  users: [],
  params: {},
  loading: false,
  IDLists: [],
  retailerList: [],
  linkedUsers: [],
  assignedVoucherDetail: {},
  totalPages: 0,
}

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    removeLinkedUsers: (state) => {
      state.linkedUsers = []
    },
    removeAssignedVoucherDetail: (state) => {
      state.assignedVoucherDetail = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVoucher.pending, (state) => {
        state.loading = true
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getVouchers.pending, (state) => {
        state.loading = true
      })
      .addCase(getVouchers.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getVouchers.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getNotAssignedVouchers.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotAssignedVouchers.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getNotAssignedVouchers.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(updateVoucher.pending, (state) => {
        state.loading = true
      })
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteVoucher.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(assignVoucher.pending, (state) => {
        state.loading = true
      })
      .addCase(assignVoucher.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(assignVoucher.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getRetailerList.pending, (state) => {
        state.loading = true
      })
      .addCase(getRetailerList.fulfilled, (state, action) => {
        state.loading = false
        state.retailerList = action.payload
      })
      .addCase(getRetailerList.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getLinkedUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getLinkedUsers.fulfilled, (state, action) => {
        state.linkedUsers = action.payload.data
        // state.totalPages = action.payload.count;
        // state.params = action.payload.params;
        state.loading = false
      })
      .addCase(getLinkedUsers.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getDetailOfAssignedVoucher.pending, (state) => {
        state.loading = true
      })
      .addCase(getDetailOfAssignedVoucher.fulfilled, (state, action) => {
        state.assignedVoucherDetail = action.payload.data
        // state.totalPages = action.payload.count;
        // state.params = action.payload.params;
        state.loading = false
      })
      .addCase(getDetailOfAssignedVoucher.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { removeLinkedUsers, removeAssignedVoucherDetail } =
  voucherSlice.actions

export default voucherSlice.reducer
