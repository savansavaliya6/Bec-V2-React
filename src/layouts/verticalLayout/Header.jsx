import React, { useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import profileImage from "../../assets/images/profile-sample.jpg"
import { FaRegUser, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { getProfile, handleLogout } from "../../pages/auth/store/authSlice"
import { useDispatch, useSelector } from "react-redux"

const Header = ({ sidebarOpen, toggleMenu, darkMode }) => {
  const { isAuthenticated, loading, profile } = useSelector(
    (state) => state.auth
  )
  const role = sessionStorage.getItem("role")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (role) dispatch(getProfile())
  }, [])

  return (
    <header className="header-wrapper">
      <button
        onClick={toggleMenu}
        type="button"
        className="btn btn-sm min-w-auto px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
        id="topnav-hamburger-icon"
      >
        <span className={"hamburger-icon " + (sidebarOpen ? " open" : "")}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div className="ms-auto user-profile">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="d-flex align-items-center"
          >
            <span className="d-flex align-items-center me-2">
              <img
                className="rounded-circle header-profile-user"
                src={profile?.avatar ? profile?.avatar : profileImage}
                alt="Profile Avatar"
                height={100}
                width={100}
              />
              <span className="text-start ms-xl-2">
                <span className="d-none d-lg-inline-block ms-1 fw-medium user-name-text">
                  {role
                    ? loading
                      ? "Loading"
                      : `${profile?.f_name} ${profile?.l_name}`
                    : "Guest"}
                </span>
                {/*<span className="d-none d-lg-block ms-1 fs-12 text-muted user-name-sub-text">
                  John Vino
                </span>*/}
              </span>
            </span>
          </Dropdown.Toggle>

          {role ? (
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/profile")}>
                <FaRegUser className="icon-left" size={18} />
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={async () => {
                  const res = await dispatch(handleLogout()).unwrap()
                  if (res.data.status) {
                    navigate("/login")
                  }
                }}
              >
                <FaSignOutAlt className="icon-left" size={18} />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          ) : null}
        </Dropdown>
      </div>
      <button className="btn" onClick={darkMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-brightness-high-fill light-mode-icon"
          viewBox="0 0 16 16"
        >
          <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-moon-stars-fill dark-mode-icon"
          viewBox="0 0 16 16"
        >
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
        </svg>
      </button>
    </header>
  )
}

export default Header
