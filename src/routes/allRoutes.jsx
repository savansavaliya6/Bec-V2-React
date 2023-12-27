import Login from "../pages/auth/Login"
import ForgetPasswordPage from "../pages/auth/ForgetPassword"
import ResetPasswordPage from "../pages/auth/ResetPassword"
import Register from "../pages/auth/Register"
import Dashboard from "../pages/dashboard/Dashboard"
import Profile from "../pages/profile"
import Users from "../pages/users"
// guest management
import Voucher from "../pages/guests/voucher"
import Vehicles from "../pages/guests/vehicle"
import AllInOne from "../pages/guests/allInOne"

//administration
import EventTypes from "../pages/administration/types"
import EventActivities from "../pages/administration/activities"
import EventCategories from "../pages/administration/categories"
import GuestsInterests from "../pages/administration/interests"
import FeedbackForms from "../pages/administration/feedback_form"
import IndemnityForm from "../pages/administration/indemnityForm"
import ConferenceRoom from "../pages/administration/conference_room"
import HOB from "../pages/administration/hob"
import Region from "../pages/administration/region"
import GiveCompliment from "../pages/administration/give_compliment"
import GuestTypes from "../pages/administration/gusetType"
import BecFleet from "../pages/administration/bec_fleet"

//events
import Events from "../pages/event/events"
import EventMedia from "../pages/event/eventMedia"
import AddRemoveGuests from "../pages/event/addRemoveGuests"
import AddRemoveVehicles from "../pages/event/addRemoveVehicles"

//Instructor
import Schedule from "../pages/instructor/schedule"
import UploadMedia from "../pages/instructor/uploadMedia"
import AssignNotes from "../pages/instructor/assignNotes"
import Attendance from "../pages/instructor/attendance"

//Customer
import GuestRegister from "../pages/customer/register"
import CheckIn from "../pages/customer/checkIn"
import Feedback from "../pages/customer/feedback"
import Rate from "../pages/customer/rate"

import ComingSoon from "../pages/comingSoon/ComingSoon"
import NotFound from "../pages/notFound/NotFound"

import { Navigate } from "react-router-dom"

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/reset-password/:token", component: <ResetPasswordPage /> },
  { path: "/register", component: <Register /> },
]

const adminRoutes = [
  {
    path: "/",
    component: <Navigate to="/dashboard" />,
  },
  { path: "/profile", component: <Profile /> },
  { path: "/dashboard", component: <Dashboard /> },

  // user management
  { path: "/users", component: <Users /> },

  //guest management
  { path: "/guests/create-guest", component: <AllInOne /> },
  { path: "/guests/create-voucher", component: <Voucher /> },
  { path: "/guests/create-vehicle", component: <Vehicles /> },

  // Administration
  { path: "/manage/types", component: <EventTypes /> },
  { path: "/manage/categories", component: <EventCategories /> },
  { path: "/manage/activities", component: <EventActivities /> },
  { path: "/manage/guest-types", component: <GuestTypes /> },
  { path: "/manage/interests-list", component: <GuestsInterests /> },
  { path: "/manage/bec-fleet", component: <BecFleet /> },
  { path: "/manage/feedback-forms", component: <FeedbackForms /> },
  { path: "/manage/indemnity-forms", component: <IndemnityForm /> },
  { path: "/manage/conference-room", component: <ConferenceRoom /> },
  { path: "/manage/hob", component: <HOB /> },
  { path: "/manage/region", component: <Region /> },
  { path: "/manage/compliment", component: <GiveCompliment /> },

  //Event management
  { path: "/event/events-list", component: <Events /> },
  { path: "/event/guests", component: <AddRemoveGuests /> },
  { path: "/event/vehicles", component: <AddRemoveVehicles /> },
  { path: "/event/media", component: <EventMedia /> },

  // feedback form
  { path: "/forms", component: <ComingSoon /> },

  //Instructor
  { path: "/instructor/schedule", component: <Schedule /> },
  { path: "/instructor/upload-media", component: <UploadMedia /> },
  { path: "/instructor/assign-notes", component: <AssignNotes /> },
  { path: "/instructor/attendance", component: <Attendance /> },

  { path: "*", component: <NotFound /> },
]

const userRoutes = [
  {
    path: "/guest/register/:id",
    component: <GuestRegister />,
  },
  {
    path: "/guest/check-in/:id",
    component: <CheckIn />,
  },
  { path: "/guest/feedback/:id", component: <Feedback /> },
  { path: "/guest/rate/:id", component: <Rate /> },
  { path: "*", component: <NotFound /> },
]

export { adminRoutes, userRoutes, publicRoutes }
