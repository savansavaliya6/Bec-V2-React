import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AuthProtected = ({ children }) => {
  let token = sessionStorage.getItem("accessToken")
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export { AuthProtected }
