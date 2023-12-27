import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  let userData = sessionStorage.getItem("userData")
  if (!userData) {
    return <Navigate to="/login" replace />
  }

  return children
}

export { PrivateRoute }
