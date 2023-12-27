import React, { useEffect, useState } from "react"
import Header from "./Header"
import SideBar from "./SideBar"

const VerticalLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    let darkMode = sessionStorage.getItem("darkMode")
    if (darkMode == "true") return true
    return false
  })
  const handleClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    sessionStorage.setItem("darkMode", darkMode)

    darkMode
      ? document.body.setAttribute("data-bs-theme", "dark")
      : document.body.setAttribute("data-bs-theme", "light")
  }, [darkMode])

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <main className={"page-wrapper " + (sidebarOpen ? "sidebar-collapse" : "")}>
      <SideBar darkMode={darkMode} hideSidebar={() => setSidebarOpen(false)} />
      <div className="content-wrapper">
        <Header
          darkMode={handleDarkMode}
          sidebarOpen={sidebarOpen}
          toggleMenu={handleClick}
        />
        <div className="content-inner">{children}</div>
      </div>
    </main>
  )
}

export default VerticalLayout
