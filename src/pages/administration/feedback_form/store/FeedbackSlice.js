import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from "../../../../services/api"
import { toast } from "react-hot-toast"
import {
  completeProgress,
  setRandomProgress,
} from "../../../../store/loadingBarSlice"

export const createFeedback = createAsyncThunk(
  "feedback/feedback/create",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/feedback/create`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getFeedback({
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

export const getFeedback = createAsyncThunk(
  "feedback/feedback-list",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/feedback-list`, { params })
    console.log(response.data.data.data)
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

export const getUserFeedback = createAsyncThunk(
  "feedback/getUserFeedback",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())

    const response = await Axios.get("/customer/showFeedbackAnswers", {
      params,
    })

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

export const updateFeedback = createAsyncThunk(
  "feedback/feedback/update",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(
      `/${role}/feedback/update/${params.id}`,
      params
    )

    if (response.data.status) {
      toast.success(response.data.message)
      await dispatch(
        getFeedback({
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

export const deleteFeedback = createAsyncThunk(
  "feedback/feedback/delete",
  async (id, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/feedback/delete/${id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      dispatch(completeProgress())

      await dispatch(
        getFeedback({
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

export const getQuestionType = createAsyncThunk(
  "feedback/question-types",
  async (params, { dispatch }) => {
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/question_type-list`)

    if (response.data.status) {
      // toast.success(response.data.message);

      return {
        data: response.data.data,
      }
    } else {
      toast.error(response.data.message)
    }
  }
)

export const getQuestionList = createAsyncThunk(
  "feedback/question-lists",
  async (params, { dispatch }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.get(`/${role}/question-list`, { params })
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

export const createQuestion = createAsyncThunk(
  "feedback/feedback/question-create",
  async (user, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/question/create`, user)
    if (response.data.status) {
      toast.success(response.data.message)
      let payload = {
        form_id: user?.form_id,
      }
      await dispatch(getQuestionList(payload))
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const deleteQuestion = createAsyncThunk(
  "feedback/question/delete",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.delete(`/${role}/question/delete/${params.id}`)

    if (response.data.status) {
      toast.success(response.data.message)
      let payload = {
        form_id: params?.form_id,
      }
      dispatch(completeProgress())

      await dispatch(getQuestionList(payload))
      return response.data.data
    } else {
      toast.error(response.data.message)
    }
    dispatch(completeProgress())
  }
)

export const updateQuestion = createAsyncThunk(
  "feedback/question/update",
  async (params, { dispatch, getState }) => {
    dispatch(setRandomProgress())
    const role = sessionStorage.getItem("role")

    const response = await Axios.post(`/${role}/question/update`, params)

    if (response.data.status) {
      toast.success(response.data.message)
      let payload = {
        form_id: params?.form_id,
      }
      await dispatch(getQuestionList(payload))
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
  userFeedback: [],
  questionTypes: [],
  questionLists: [],
}

const eventActivitesSlice = createSlice({
  name: "feedback",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.loading = true
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getFeedback.pending, (state) => {
        state.loading = true
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalPages = action.payload.count
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getFeedback.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getUserFeedback.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserFeedback.fulfilled, (state, action) => {
        state.userFeedback = action.payload.data
        // state.totalPages = action.payload.count
        // state.params = action.payload.params
        state.loading = false
      })
      .addCase(getUserFeedback.rejected, (state, action) => {
        state.loading = false
      })

    builder
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getQuestionType.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuestionType.fulfilled, (state, action) => {
        state.questionTypes = action.payload.data
        state.loading = false
      })
      .addCase(getQuestionType.rejected, (state, action) => {
        state.loading = false
      })
    builder
      .addCase(getQuestionList.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuestionList.fulfilled, (state, action) => {
        state.questionLists = action.payload.data
        state.loading = false
      })
      .addCase(getQuestionList.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default eventActivitesSlice.reducer
