import React from "react"
import { Link, useLocation } from "react-router-dom"

import { findBreadcrumbPath } from "../../utils/findBreadCrumbPath"

const instructorMenu = {
  title: "Instructor",
  children: [
    {
      title: "Schedule",
      link: "/instructor/schedule",
    },
    {
      title: "Upload Event Media",
      link: "/instructor/upload-media",
    },
    {
      title: "Assign Notes",
      link: "/instructor/assign-notes",
    },
    {
      title: "Attendance",
      link: "/instructor/attendance",
    },
  ],
}

const adminMenu = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "User Management",
    link: "/users",
  },
  {
    title: "Guest Management",
    children: [
      {
        title: "Guests",
        link: "/guests/create-guest",
      },
      {
        title: "Vouchers",
        link: "/guests/create-voucher",
      },
      {
        title: "Vehicles",
        link: "/guests/create-vehicle",
      },
    ],
  },
  {
    title: "Administration",
    children: [
      {
        title: "Settings",
        children: [
          {
            title: "Manage Event Types",
            link: "/manage/types",
          },
          {
            title: "Manage Event Categories",
            link: "/manage/categories",
          },
          {
            title: "Manage Event Activities",
            link: "/manage/activities",
          },
          {
            title: "Manage Guest Interests List",
            link: "/manage/interests-list",
          },
          {
            title: "Manage Guest Types",
            link: "/manage/guest-types",
          },
          {
            title: "Manage Conference Rooms",
            link: "/manage/conference-room",
          },
          {
            title: "Manage HOB",
            link: "/manage/hob",
          },
          {
            title: "Manage Region",
            link: "/manage/region",
          },
          {
            title: "Manage Compliments",
            link: "/manage/compliment",
          },
        ],
      },
      {
        title: "BEC Fleet",
        link: "/manage/bec-fleet",
      },
      {
        title: "Indemnity Forms",
        link: "/manage/indemnity-forms",
      },
      {
        title: "Feedback Form",
        link: "/manage/feedback-forms",
      },
    ],
  },
  {
    title: "Event Management",
    children: [
      {
        title: "Events",
        link: "/event/events-list",
      },
      {
        title: "Add Guests",
        link: "/event/guests",
      },
      {
        title: "Assign Vehicles",
        link: "/event/vehicles",
      },
      {
        title: "Event Media",
        link: "/event/media",
      },
    ],
  },
]

const userMenu = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "User Management",
    link: "/users",
  },
  {
    title: "Guest Management",
    children: [
      {
        title: "Guests",
        link: "/guests/create-guest",
      },
      {
        title: "Vouchers",
        link: "/guests/create-voucher",
      },
      {
        title: "Vehicles",
        link: "/guests/create-vehicle",
      },
    ],
  },
  {
    title: "Event Management",
    children: [
      {
        title: "Events",
        link: "/event/events-list",
      },
      {
        title: "Add Guests",
        link: "/event/guests",
      },
      {
        title: "Assign Vehicles",
        link: "/event/vehicles",
      },
      {
        title: "Event Media",
        link: "/event/media",
      },
    ],
  },
]

const guestMenu = [
  {
    title: "Register",
    link: "/guest/register/",
  },
  {
    title: "Check-in",
    link: "/guest/check-in/",
  },
  {
    title: "Feedback",
    link: "/guest/feedback/",
  },
  {
    title: "Rate",
    link: "/guest/rate/",
  },
]

const adminInstructoMenu = [...adminMenu, instructorMenu]
const userInstructorMenu = [...userMenu, instructorMenu]

const Breadcrumb = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const role = sessionStorage.getItem("role")
  const instructor = sessionStorage.getItem("instructor")

  let menus =
    role && role === "admin"
      ? instructor == 1
        ? adminInstructoMenu
        : adminMenu
      : role === "user"
      ? instructor == 1
        ? userInstructorMenu
        : userMenu
      : guestMenu
  const breadcrumbPath = findBreadcrumbPath(menus, currentPath)

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="17"
              fill="#212121"
              className="bi bi-house home-icon"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
            </svg>
          </Link>
        </li>
        {breadcrumbPath.map((title, index) => (
          <li
            key={title}
            className={`breadcrumb-item ${
              index === breadcrumbPath.length - 1 ? "active" : ""
            }`}
          >
            {index === breadcrumbPath.length - 1 ? title : <>{title}</>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
