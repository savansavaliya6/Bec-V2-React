import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
const loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <CircularProgress />
    </div>
  )
}

export default loader
