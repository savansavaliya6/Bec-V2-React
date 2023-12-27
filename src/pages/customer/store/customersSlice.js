import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../services/api"
import { toast } from "react-hot-toast"
import moment from "moment/moment"
import {
  completeProgress,
  setRandomProgress,
} from "../../../store/loadingBarSlice"

export const checkIn = createAsyncThunk(
  "customers/checkIn",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const response = await Axios.post("/customer/cust_checkin", user)

    if (response.data.status) {
      toast.success(response.data.message)
      const payload = { customerhash: user.customerhash }
      dispatch(completeProgress())
      await dispatch(
        getCheckInEvents(
          payload
          //   {
          //   customerhash: user.customerhash,
          //   // page: getState().customers.checkInEvents.params.page,
          //   // perPage: getState().customers.checkInEvents.params.perPage,
          //   // query: getState().customers.checkInEvents.params.query,
          // }
        )
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getCustomerDetails = createAsyncThunk(
  "customers/getCustomerDetails",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/custDetails", { params })

    if (response.data.status) {
      // toast.success(response.data.message);
      dispatch(completeProgress())

      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const registerGuest = createAsyncThunk(
  "customers/registerGuest",
  async (user, { dispatch, getState }) => {
    let data = new FormData()
    data.append("customerhash", user.customerhash)
    data.append("event_id", user.event_id)
    data.append("f_name", user.f_name)
    data.append("l_name", user.l_name)
    data.append("email", user.email)
    data.append("contact", user.contact)
    data.append("kin_f_name", user.kin_f_name)
    data.append("kin_l_name", user.kin_l_name)
    data.append("relation", user.relation)
    data.append("kin_contact", user.kin_contact)
    data.append("brand", user.brand)
    data.append("interests", user.interests)

    if (user?.document) {
      data.append("license", user.document)
    }
    if (user?.signature) {
      data.append("signature", user.signature)
    }
    dispatch(setRandomProgress())

    const response = await Axios.post("/customer/custRegister", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())
      dispatch(
        getAssignedEvents({
          page: getState().customers.params.page,
          perPage: getState().customers.params.perPage,
          query: getState().customers.params.query,
          customerhash: user.customerhash,
        })
      )
      // getAssignedEvents
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getAssignedEvents = createAsyncThunk(
  "customers/getAssignedEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/custEvent-list", { params })
    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.event.data,
        count: response.data.event.total,
        params,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getCheckInEvents = createAsyncThunk(
  "customers/getCheckInEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/checkIn-eventList", { params })
    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.data,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getFeedbackEvents = createAsyncThunk(
  "customers/getFeedbackEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/completed-eventList", {
      params,
    })
    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.data,
        // count: response.data.event.total,
        // params,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getRateInstructors = createAsyncThunk(
  "customers/getRateInstructors",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/event_instructors", { params })
    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.data,
        // count: response.data.event.total,
        // params,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getQuestionList = createAsyncThunk(
  "customers/getQuestionList",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get(`/customer/view_feedback`, { params })
    if (response.data.status) {
      // toast.success(response.data.message);
      dispatch(completeProgress())

      return {
        data: response.data.data,
      }
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const saveFeedback = createAsyncThunk(
  "customers/saveFeedback",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/customer/saveFeedbackAnswers", user)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())
      let payload = { customerhash: user.customerhash }
      await dispatch(getFeedbackEvents(payload))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const rateEvent = createAsyncThunk(
  "customers/rateEvent",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/customer/event_rating", user)

    if (response.data.status) {
      dispatch(completeProgress())
      toast.success(response.data.message)
      let payload = { customerhash: user.customerhash }

      await dispatch(getFeedbackEvents(payload))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)
export const rateInstructor = createAsyncThunk(
  "customers/rateInstructor",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())

    const response = await Axios.post("/customer/instructor_rating", user)

    if (response.data.status) {
      dispatch(completeProgress())
      let payload = { customerhash: user.customerhash }
      await dispatch(getFeedbackEvents(payload))
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getInterestList = createAsyncThunk(
  "customers/getInterestList",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/interest_list")

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.data,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

const initialState = {
  selectedUser: {},
  questionLists: [],
  users: [],
  params: {},
  loading: false,
  totalPages: 0,
  guestInterestList: [],
  formData: {},
  guestDetails: {},
  checkInEvents: {
    users: [],
    params: {},
    loading: false,
    totalPages: 0,
  },
  feedbackEvents: {
    users: [],
    params: {},
    loading: false,
    totalPages: 0,
  },
  rateEvents: {
    users: [],
    params: {},
    loading: false,
    totalPages: 0,
  },
  rateInstructors: {
    users: [],
    params: {},
    loading: false,
    totalPages: 0,
  },
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    gatherData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      }
    },
    removeData: (state, action) => {
      state.formData = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.loading = true
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getAssignedEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(getAssignedEvents.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getAssignedEvents.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getCheckInEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(getCheckInEvents.fulfilled, (state, action) => {
        state.checkInEvents.users = action.payload.data
        // state.checkInEvents.totalPages = action.payload.count
        // state.checkInEvents.params = action.payload.params
        state.checkInEvents.loading = false
      })
      .addCase(getCheckInEvents.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getFeedbackEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(getFeedbackEvents.fulfilled, (state, action) => {
        state.feedbackEvents.users = action.payload.data
        // state.feedbackEvents.totalPages = action.payload.count
        // state.feedbackEvents.params = action.payload.params
        state.feedbackEvents.loading = false
      })
      .addCase(getFeedbackEvents.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getRateInstructors.pending, (state) => {
        state.loading = true
      })
      .addCase(getRateInstructors.fulfilled, (state, action) => {
        state.rateInstructors.users = action.payload.data
        // state.rateInstructors.totalPages = action.payload.count
        // state.rateInstructors.params = action.payload.params
        state.rateInstructors.loading = false
      })
      .addCase(getRateInstructors.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getQuestionList.pending, (state) => {
        // state.loading = true
      })
      .addCase(getQuestionList.fulfilled, (state, action) => {
        state.questionLists = action.payload.data
        // state.loading = false
      })
      .addCase(getQuestionList.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(getInterestList.pending, (state) => {
        // state.loading = true
      })
      .addCase(getInterestList.fulfilled, (state, action) => {
        state.guestInterestList = action.payload.data
      })
      .addCase(getInterestList.rejected, (state, action) => {
        // state.loading = false
      })
    builder.addCase(getCustomerDetails.fulfilled, (state, action) => {
      state.guestDetails = action.payload
    })
  },
})

export const { gatherData, removeData } = customersSlice.actions

export default customersSlice.reducer
