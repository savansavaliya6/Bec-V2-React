import authSlice from "../pages/auth/store/authSlice"
import userSlice from "../pages/users/store/userSlice"
import guestSlice from "../pages/guests/guest/store/guestSlice"
import voucherSlice from "../pages/guests/voucher/store/voucherSlice"
import vehicleSlice from "../pages/guests/vehicle/store/vehicleSlice"
import eventTypesSlice from "../pages/administration/types/store/eventTypesSlice"
import eventCategoriesSlice from "../pages/administration/categories/store/eventCategoriesSlice"
import eventActivitiesSlice from "../pages/administration/activities/store/eventActivitiesSlice"
import guestTypesSlice from "../pages/administration/gusetType/store/guestTypesSlice"
import becFleetSlice from "../pages/administration/bec_fleet/store/becFleetSlice"
import eventsSlice from "../pages/event/events/store/eventsSlice"
import guestInterestsSlice from "../pages/administration/interests/store/guestInterestsSlice"
import indemintySlice from "../pages/administration/indemnityForm/store/indemintySlice"
import FeedbackSlice from "../pages/administration/feedback_form/store/FeedbackSlice"
import instructorSlice from "../pages/instructor/schedule/store/instructorSlice"
import eventMediaSlice from "../pages/instructor/uploadMedia/store/eventMediaSlice"
import hobSlice from "../pages/administration/hob/store/hobSlice"
import conferenceRoomSlice from "../pages/administration/conference_room/store/conferenceRoomSlice"
import customersSlice from "../pages/customer/store/customersSlice"
import dashboardSlice from "../pages/dashboard/store/dashboardSlice"
import regionSlice from "../pages/administration/region/store/regionSlice"
import complimentSlice from "../pages/administration/give_compliment/store/regionSlice"
import loadingBarSlice from "./loadingBarSlice"

const rootReducer = {
  loadingBar: loadingBarSlice,
  auth: authSlice,
  dashboard: dashboardSlice,
  users: userSlice,
  guests: guestSlice,
  vouchers: voucherSlice,
  vehicles: vehicleSlice,
  eventTypes: eventTypesSlice,
  eventCategories: eventCategoriesSlice,
  eventActivities: eventActivitiesSlice,
  guestTypes: guestTypesSlice,
  fleets: becFleetSlice,
  events: eventsSlice,
  guestInterests: guestInterestsSlice,
  feedback: FeedbackSlice,
  indemnity: indemintySlice,
  instructor: instructorSlice,
  eventMedia: eventMediaSlice,
  hobs: hobSlice,
  conferenceRooms: conferenceRoomSlice,
  customers: customersSlice,
  regions: regionSlice,
  compliments: complimentSlice,
}

export default rootReducer
