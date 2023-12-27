import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/event/create`, user)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getEvents({
          page: getState().events.params.page,
          perPage: getState().events.params.perPage,
          query: getState().events.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/event_list`, { params })
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

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/event/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getEvents({
          page: getState().events.params.page,
          perPage: getState().events.params.perPage,
          query: getState().events.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/event/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getEvents({
          page: getState().events.params.page,
          perPage: getState().events.params.perPage,
          query: getState().events.params.query,
        })
      )
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getEventDropdownList = createAsyncThunk(
  "events/getEventDropdownList",
  async (params) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/eventDropdown_list`)

    if (response.data.status) {
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
  }
)

export const getEventsDropDown = createAsyncThunk(
  "events/getEventsDropDown",
  async (params) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/eventListDropdown`)
    if (response.data.status) {
      return response.data.event
    } else {
      toast.error(response.data.message)
    }
  }
)

////////////////////////////////////////////////////

export const getUsers = createAsyncThunk(
  "events/getUsers",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/customersWithoutVoucher`, {
      params,
    })
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

export const getAssignedVehicles = createAsyncThunk(
  "events/getAssignedVehicles",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/assignedVehicle_list`, {
      params,
    })
    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.event,
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

export const getAssignedUsers = createAsyncThunk(
  "events/getAssignedUsers",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/assignedCustomer_list`, {
      params,
    })
    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.event,
        // count: response.data.event.total,
        params,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const getUnAssignedVehicles = createAsyncThunk(
  "events/getUnAssignedVehicles",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/unAssignedVehicle_list`, {
      params,
    })

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.unAssignVehicle.data,
        count: response.data.unAssignVehicle.total,
        params,
      }
    } else {
      toast.error(response.data.message)
      console.log("error", response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const assignVehiclesToEvent = createAsyncThunk(
  "events/assignVehiclesToEvent",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/event/assign_vehicles`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getUnAssignedVehicles({
          page: getState().events.unAssignedVehicles.params.page,
          perPage: getState().events.unAssignedVehicles.params.perPage,
          query: getState().events.unAssignedVehicles.params.query,
        })
      )
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const assignGuestsToEvent = createAsyncThunk(
  "events/assignGuestsToEvent",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/event/assign_customers`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const unAssignGuestsToEvent = createAsyncThunk(
  "events/assignGuestsToEvent",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    let payload = {
      id: [user.customer_id],
      event_id: user.event_id,
    }
    const response = await Axios.post(
      `/${role}/event/remove_customers`,
      payload
    )
    if (response.data.status) {
      dispatch(completeProgress())

      toast.success(response.data.message)
      let payload = {
        event_id: user.event_id,
      }
      await dispatch(getAssignedUsers(payload))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const unAssignVehiclesToEvent = createAsyncThunk(
  "events/assignGuestsToEvent",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    let payload = {
      id: user.id,
    }
    const response = await Axios.post(`/${role}/event/remove_vehicles`, payload)
    if (response.data.status) {
      toast.success(response.data.message)
      let payload = {
        event_id: user.event_id,
      }
      dispatch(completeProgress())

      await dispatch(getAssignedVehicles(payload))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getActivities = createAsyncThunk(
  "events/getActivities",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/event_activitie-list/${params}`)

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.event,
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

export const getInstructors = createAsyncThunk(
  "events/getInstructors",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/event_instructor-list/${params}`)

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.event,
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

export const getHOBs = createAsyncThunk(
  "events/getHOBs",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/event_hob-list/${params}`)

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.hob,
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

export const createNote = createAsyncThunk(
  "events/createNote",
  async (user, { dispatch, getState }) => {
    let data = new FormData()
    data.append("event_id", user.event_id)
    data.append("notes", user.notes)
    // data.append("files[]", user.files[0])
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/eventNotes/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.status) {
      toast.success(response.data.message)

      await dispatch(getNotes(user.event_id))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getNotes = createAsyncThunk(
  "events/getNotes",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(
      `/${role}/eventNotes-list?event_id=${params}`
    )

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.eventNotes,
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

export const createGuestNote = createAsyncThunk(
  "events/createGuestNote",
  async (user, { dispatch, getState }) => {
    let data = new FormData()
    data.append("customer_id", user.customer_id)
    data.append("notes", user.notes)
    // data.append("files[]", user.files[0])
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/eventNotes/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.status) {
      toast.success(response.data.message)

      await dispatch(getGuestNotes(user.customer_id))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
    return response
  }
)

export const getGuestNotes = createAsyncThunk(
  "events/getGuestNotes",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(
      `/${role}/eventNotes-list?customer_id=${params}`
    )

    if (response.data.status) {
      dispatch(completeProgress())

      return {
        data: response.data.eventNotes,
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

const initialState = {
  selectedUser: {},
  users: [],
  params: {},
  eventDropdown: {},
  eventsList: [],
  guests: {
    users: [],
    params: {},
    totalPages: 0,
  },
  unAssignedVehicles: {
    unAssignedVehicles: [],
    params: {},
    totalPages: 0,
  },
  assignedVehicles: {
    vehicles: [],
    params: {},
    totalPages: 0,
  },
  assignedUsers: {
    users: [],
    params: {},
    totalPages: 0,
  },
  instructors: [],
  hobs: [],
  activities: [],
  notes: [],
  loading: false,
  totalPages: 0,
}

const eventsSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false
      })

    builder
      .addCase(editEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.guests.users = action.payload.data
        state.guests.totalPages = action.payload.count
        state.guests.params = action.payload.params
        state.loading = false
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getEventDropdownList.pending, (state) => {
        state.loading = true
      })
      .addCase(getEventDropdownList.fulfilled, (state, action) => {
        state.loading = false
        state.eventDropdown = action.payload
      })
      .addCase(getEventDropdownList.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getEventsDropDown.pending, (state) => {
        state.loading = true
      })
      .addCase(getEventsDropDown.fulfilled, (state, action) => {
        state.loading = false
        state.eventsList = action.payload
      })
      .addCase(getEventsDropDown.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getUnAssignedVehicles.pending, (state) => {
        state.loading = true
      })
      .addCase(getUnAssignedVehicles.fulfilled, (state, action) => {
        state.unAssignedVehicles.unAssignedVehicles = action.payload.data
        state.unAssignedVehicles.totalPages = action.payload.count
        state.unAssignedVehicles.params = action.payload.params
        state.loading = false
      })
      .addCase(getUnAssignedVehicles.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getAssignedVehicles.pending, (state) => {
        state.loading = true
      })
      .addCase(getAssignedVehicles.fulfilled, (state, action) => {
        state.assignedVehicles.vehicles = action.payload.data
        // state.assignedVehicles.totalPages = action.payload.count;
        // state.assignedVehicles.params = action.payload.params;
        state.loading = false
      })
      .addCase(getAssignedVehicles.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getAssignedUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAssignedUsers.fulfilled, (state, action) => {
        state.assignedUsers.users = action.payload.data
        // state.assignedUsers.totalPages = action.payload.count;
        // state.assignedUsers.params = action.payload.params;
        state.loading = false
      })
      .addCase(getAssignedUsers.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(assignGuestsToEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(assignGuestsToEvent.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(assignGuestsToEvent.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(assignVehiclesToEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(assignVehiclesToEvent.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(assignVehiclesToEvent.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getActivities.pending, (state) => {
        // state.loading = true
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        // state.loading = false
        state.activities = action.payload.data
      })
      .addCase(getActivities.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(getInstructors.pending, (state) => {
        // state.loading = true
      })
      .addCase(getInstructors.fulfilled, (state, action) => {
        // state.loading = false
        state.instructors = action.payload.data
      })
      .addCase(getInstructors.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(getHOBs.pending, (state) => {
        // state.loading = true
      })
      .addCase(getHOBs.fulfilled, (state, action) => {
        // state.loading = false
        state.hobs = action.payload.data
      })
      .addCase(getHOBs.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(createNote.pending, (state) => {
        // state.loading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        // state.loading = false
        // state.instructors = action.payload.data
      })
      .addCase(createNote.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(getNotes.pending, (state) => {
        // state.loading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        // state.loading = false
        state.notes = action.payload.data
      })
      .addCase(getNotes.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(createGuestNote.pending, (state) => {
        // state.loading = true
      })
      .addCase(createGuestNote.fulfilled, (state, action) => {
        // state.loading = false
        // state.instructors = action.payload.data
      })
      .addCase(createGuestNote.rejected, (state, action) => {
        // state.loading = false
      })
    builder
      .addCase(getGuestNotes.pending, (state) => {
        // state.loading = true
      })
      .addCase(getGuestNotes.fulfilled, (state, action) => {
        // state.loading = false
        state.notes = action.payload.data
      })
      .addCase(getGuestNotes.rejected, (state, action) => {
        // state.loading = false
      })
  },
})

export default eventsSlice.reducer
