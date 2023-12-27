import React, { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

//Layouts
import NonAuthLayout from "../layouts/nonAuthLayout/NonAuthLayout"
import VerticalLayout from "../layouts/verticalLayout/VerticalLayout"

//routes
import { adminRoutes, userRoutes, publicRoutes } from "./allRoutes"
import { AuthProtected } from "./authProtected"
import { Toaster } from "react-hot-toast"

import { useSelector, useDispatch } from "react-redux"
import LoadingBar from "react-top-loading-bar"
import { useRef } from "react"
import { setRandomProgress, completeProgress } from "../store/loadingBarSlice"
import { useEffect } from "react"

const Index = () => {
  const [opacity, setOpacity] = useState(1)
  const dispatch = useDispatch()
  const loadingProgress = useSelector(
    (state) => state.loadingBar.loadingProgress
  )

  // useEffect(() => {
  //   dispatch(setRandomProgress())

  //   const simulateLoading = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000))

  //     dispatch(completeProgress())
  //   }
  //   simulateLoading()
  // }, [dispatch])

  useEffect(() => {
    if (loadingProgress < 100) {
      setOpacity(0.4)
    } else {
      setOpacity(1)
    }
  }, [loadingProgress])

  return (
    <React.Fragment>
      <LoadingBar
        color="#4f6a92"
        progress={loadingProgress}
        shadow={false}
        background="1"
        height="8px"
      />
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{ opacity, zIndex: "9999" }}>
        <Routes>
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>

          <Route>
            {adminRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                    <VerticalLayout>{route.component}</VerticalLayout>
                  </AuthProtected>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>

          <Route>
            {userRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<VerticalLayout>{route.component}</VerticalLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        </Routes>
      </div>
    </React.Fragment>
  )
}

export default Index
