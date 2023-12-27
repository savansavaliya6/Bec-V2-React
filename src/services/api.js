import axios from "axios"
import { toast } from "react-hot-toast"

const Axios = axios.create({
  baseURL: "https://beczav2.vnvserver.com/api",
  headers: {
    "Content-Type": "application/json",
  },
})

Axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const rs = await axios.post(
            "https://beczav2.vnvserver.com/api/refresh-token",
            {
              token: sessionStorage.getItem("refreshToken"),
            }
          )

          const { access_token } = rs.data
          sessionStorage.setItem("accessToken", access_token)

          return Axios(originalConfig)
        } catch (_error) {
          toast.error("Token has expired, Please login again")
          return Promise.reject(_error)
        }
      }
    }
    if (err.response.status === 500) {
      // window.location.href("/error-page")
      toast.error("Network error! Please try again.")
    }
    return Promise.reject(err)
  }
)

export default Axios
