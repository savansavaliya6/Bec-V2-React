import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { editEvent, getAssignedVehicles } from "./store/eventsSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  DropdownField,
  RadioInput,
  DatePickerField,
  TextInputField,
  TimePickerField,
  MultiSelectField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment-timezone"
import AddVehicle from "../addRemoveVehicles/ForCreateModal"
import toast from "react-hot-toast"

const EditEvent = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const { eventDropdown } = useSelector((state) => state.events)
  const {
    assignedVehicles: { vehicles, totalPages, loading },
    unAssignedVehicles: { unAssignedVehicles },
  } = useSelector((state) => state.events)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [activityList, setActivityList] = useState([])
  const [instructorList, setInstructorList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [types, setTypes] = useState([])
  const [retailers, setRetailers] = useState([])
  const [regionsList, setRegionsList] = useState([])
  const [feedbackFormList, setFeedbackFormList] = useState([])
  const [IndemnityForm, setIndemnityForm] = useState([])
  const [hobList, setHobList] = useState([])
  const [conferenceRoomList, setConferenceRoomList] = useState([])
  const [vehiclesList, setVehiclesList] = useState([])
  const [selectedVehiclesList, setSelectedVehiclesList] = useState([])

  const [newObj, setObj] = useState({})

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)

  const validationSchema = yup.object().shape({
    // e_code: yup.string().required("Event Code is required"),
    event_category: yup.string().required("Event Category name is required"),
    event_name: yup.string().required("Event Name is required"),
    event_type: yup.string().required("Event Type is required"),
    start_date: yup.string().required("Event Start Date is required"),
    end_date: yup.string().required("Event End Date is required"),
    start_time: yup.string().required("Event Start Time is required"),
    end_time: yup.string().required("Event Start Time is required"),
    activity_list: yup
      .array()
      .min(1, "Please select at least one activity")
      .required("Activity is Required"),
    region: yup.string().required("Region is Required"),
    retailer: yup.string().required("Retailer is Required"),
    project_manager: yup.string().required("Project Manger is Required"),
    instructor: yup
      .array()
      .min(1, "Please select at least one Instructor")
      .required("Instructors are Required"),
    hob_list: yup
      .array()
      .min(1, "Please select at least one HOB")
      .required("HOB is Required"),
    vehicle_ids: yup
      .array()
      .min(1, "Please select at least one Vehicle")
      .required("Vehicles are Required"),
    conference_room: yup.string().required("Conference Room is Required"),
    // number_of_guest: yup.string().required(" Number of List name is Required"),
    feedback_form_id: yup.string().required(" Feedback form id is Required"),
    // indemnity_id: yup.string().required(" IndemnityForm id  is Required"),
    // attendance: yup.string().required(" Multi-day attendance is Required"),
  })

  const initialValues = {
    ...selectedItem,
    event_category: selectedItem?.event_category?.id,
    event_type: selectedItem?.event_type?.id,
    activity_list: selectedItem.activity_list
      ? JSON.parse(selectedItem.activity_list)
      : [],
    hob_list: selectedItem.hob_list ? JSON.parse(selectedItem.hob_list) : [],
    conference_room: selectedItem.conference_room?.id,
    start_time: moment(selectedItem.start_time)
      .tz("Africa/Johannesburg")
      .format("HH:mm"),
    end_time: moment(selectedItem.end_time)
      .tz("Africa/Johannesburg")
      .format("HH:mm"),
    retailer: selectedItem?.retailer?.id,
    instructor: selectedItem.instructor
      ? JSON.parse(selectedItem.instructor)
      : [],
    feedback_form_id: selectedItem?.feedback_form_id?.id,
  }

  useEffect(() => {
    if (eventDropdown?.activities?.length > 0) {
      let activity_data = eventDropdown?.activities?.map((item, index) => ({
        value: item.id,
        label: item.name,
      }))
      setActivityList(activity_data)
    }
    if (eventDropdown?.region?.length) {
      let region_data = eventDropdown.region.map((region, index) => ({
        value: region.name,
        label: region.name,
      }))
      setRegionsList(region_data)
    }
    if (eventDropdown?.instructor?.length) {
      let instructor_data = eventDropdown.instructor.map(
        (instructor, index) => ({
          value: instructor.id,
          label: instructor.name,
        })
      )
      setInstructorList(instructor_data)
    }
    if (eventDropdown?.categories?.length) {
      let category_data = eventDropdown.categories.map((category, index) => ({
        value: category.id,
        label: category.name,
      }))
      setCategoryList(category_data)
    }
    if (eventDropdown?.eventType?.length) {
      let eventType = eventDropdown.eventType.map((eventType, index) => ({
        value: eventType.id,
        label: eventType.name,
      }))
      setTypes(eventType)
    }
    if (eventDropdown?.retailer?.length) {
      let retailer = eventDropdown.retailer.map((retailer, index) => ({
        value: retailer.id,
        label: retailer.dealer_name,
      }))
      setRetailers(retailer)
    }
    if (eventDropdown?.feedbackForms?.length) {
      let feedbackForms = eventDropdown.feedbackForms.map(
        (feedbackForms, index) => ({
          value: feedbackForms.id,
          label: feedbackForms.form_name,
        })
      )
      setFeedbackFormList(feedbackForms)
    }
    if (eventDropdown?.hob?.length) {
      let hob = eventDropdown.hob.map((hob, index) => ({
        value: hob.id,
        label: hob.name,
      }))
      setHobList(hob)
    }
    if (eventDropdown?.conferenceRoom?.length) {
      let conferenceRoom = eventDropdown.conferenceRoom.map(
        (conferenceRoom, index) => ({
          value: conferenceRoom.id,
          label: conferenceRoom.name,
        })
      )
      setConferenceRoomList(conferenceRoom)
    }
    if (eventDropdown?.indemnityForm?.length) {
      let indemnityForm = eventDropdown.indemnityForm.map(
        (indemnityForm, index) => ({
          value: indemnityForm.id,
          label: indemnityForm.form_name,
        })
      )
      setIndemnityForm(indemnityForm)
    }
  }, [eventDropdown])

  useEffect(() => {
    if (vehicles?.length) {
      const vehicleIDs = vehicles.map((item) => item.vehicle_id)
      setSelectedVehiclesList(vehicleIDs)
    }
  }, [vehicles])

  useEffect(() => {
    if (unAssignedVehicles?.length) {
      const vehicleIDs = unAssignedVehicles.map((item) => ({
        value: item.id,
        label: item.registration_no,
      }))
      setVehiclesList(vehicleIDs)
    }
  }, [unAssignedVehicles])

  useEffect(() => {
    if (selectedItem.id && showEditModal) {
      const payload = {
        event_id: selectedItem.id,
      }
      dispatch(getAssignedVehicles(payload))
    }
  }, [selectedItem])

  const handleSubmit = async (values) => {
    // if (vehiclesList.length) {
    let obj = { ...values }
    obj.id = selectedItem.id
    obj["start_time"] = `${values["start_date"]} ${values["start_time"]}`
    obj["end_time"] = `${values["end_date"]} ${values["end_time"]}`
    obj["vehicle_ids"] = values["vehicle_ids"]

    if (
      selectedItem.start_date !== values.start_date ||
      selectedItem.end_date !== values.end_date ||
      moment(selectedItem.start_time)
        .tz("Africa/Johannesburg")
        .format("HH:mm") !== values.start_time ||
      moment(selectedItem.end_time)
        .tz("Africa/Johannesburg")
        .format("HH:mm") !== values.end_time
    ) {
      setObj(obj)
      setShowConfirmModal(true)
    } else {
      const response = await dispatch(editEvent(obj)).unwrap()
      if (response.data.status) {
        handleEditHideModal()
        setSelectedVehiclesList([])
      }
    }
    // } else {
    //   toast.error("Please select vehicles")
    // }
  }

  // const handleAddVehicleShowModal = () => {
  //   setShowAddVehicleModal(true)
  //   setVehiclesList(vehiclesList)
  // }

  // const handleAddVehicleHideModal = (vehicles) => {
  //   setShowAddVehicleModal(false)
  //   if (vehicles) setVehiclesList(vehicles)
  // }

  // const handleSave = (vehicles) => {
  //   setVehiclesList(vehicles)
  //   setShowAddVehicleModal(false)
  // }

  // const handleCheck = (e, id) => {
  //   if (e.target.checked) {
  //     setVehiclesList((prev) => [...prev, id])
  //   } else {
  //     setVehiclesList((prev) => prev.filter((item) => item !== id))
  //   }
  // }

  return (
    <>
      {/* <AddVehicle
        showAddVehicleModal={showAddVehicleModal}
        handleAddVehicleHideModal={handleAddVehicleHideModal}
        handleSave={handleSave}
        handleCheck={handleCheck}
        vehiclesArray={vehiclesList}
      /> */}
      <Modal
        size="xl"
        show={showEditModal}
        onHide={() => {
          handleEditHideModal()
          setSelectedVehiclesList([])
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Modal.Body>
                <div className="row g-3">
                  <div className="col-md-6">
                    <DropdownField
                      label="Event Category"
                      options={categoryList}
                      defaultValue={selectedItem?.event_category?.id}
                      name="event_category"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Event Type"
                      defaultValue={selectedItem.event_type?.id}
                      options={types}
                      name="event_type"
                    />
                  </div>

                  <div className="col-md-6">
                    <TextInputField
                      label="Event Name"
                      type="text"
                      name="event_name"
                    />
                  </div>
                  <div className="col-md-6">
                    <MultiSelectField
                      label="HOB"
                      defaultValue={
                        selectedItem.hob_list
                          ? JSON.parse(selectedItem.hob_list)
                          : []
                      }
                      options={hobList}
                      name="hob_list"
                    />
                  </div>

                  <div className="col-md-6">
                    <DatePickerField label="Start Date" name="start_date" />
                  </div>

                  <div className="col-md-6">
                    <DatePickerField label="End Date" name="end_date" />
                  </div>
                  <div className="col-md-6">
                    <TimePickerField label="Start Time" name="start_time" />
                  </div>
                  <div className="col-md-6">
                    <TimePickerField label="End Time" name="end_time" />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Region"
                      defaultValue={selectedItem.region?.id}
                      options={regionsList}
                      name="region"
                    />
                  </div>
                  <div className="col-md-6">
                    <MultiSelectField
                      label="Activity List"
                      defaultValue={
                        selectedItem.activity_list
                          ? JSON.parse(selectedItem.activity_list)
                          : []
                      }
                      options={activityList}
                      name="activity_list"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Retailer"
                      defaultValue={selectedItem.retailer?.id}
                      options={retailers}
                      name="retailer"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      label="Project Manger"
                      name="project_manager"
                    />
                  </div>
                  <div className="col-md-6">
                    <MultiSelectField
                      label="Vehicles List"
                      defaultValue={
                        selectedVehiclesList.length ? selectedVehiclesList : []
                      }
                      options={vehiclesList}
                      name="vehicle_ids"
                    />
                  </div>

                  <div className="col-md-6">
                    <MultiSelectField
                      label="Instructor List"
                      defaultValue={
                        selectedItem.instructor
                          ? JSON.parse(selectedItem.instructor)
                          : []
                      }
                      options={instructorList}
                      name="instructor"
                    />
                  </div>
                  {/* <div className="col-md-6">
                  <TextInputField
                    label="Number of Guests"
                    type="number"
                    name="number_of_guest"
                  />
                </div> */}
                  <div className="col-md-6">
                    <DropdownField
                      label="Feedback Form ID"
                      options={feedbackFormList}
                      defaultValue={selectedItem.feedback_form_id?.id}
                      name="feedback_form_id"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Indemnity Form"
                      defaultValue={selectedItem.indemnity_id?.id}
                      options={IndemnityForm}
                      name="indemnity_id"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Conference Room"
                      defaultValue={selectedItem.conference_room?.id}
                      options={conferenceRoomList}
                      name="conference_room"
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <Button
                      variant="outline-dark"
                      onClick={handleAddVehicleShowModal}
                    >
                      Add Vehicles
                    </Button>
                  </div> */}

                  {/* <div className="col-md-6">
                  <RadioInput
                    label="Multi-Day Attendance"
                    name="attendance"
                    option={[
                      {
                        name: "Yes",
                        value: 1,
                      },
                      {
                        name: "No",
                        value: 0,
                      },
                    ]}
                  />
                </div> */}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    handleEditHideModal()
                    setSelectedVehiclesList([])
                  }}
                >
                  Cancel
                </Button>
                <Button variant="dark" type="submit" disabled={isSubmitting}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        size="md"
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            The time and date of the event have been updated. Please be aware
            that some vehicles originally assigned to this event will be
            unassigned due to potential scheduling conflicts with other
            bookings.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowConfirmModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={async () => {
              const response = await dispatch(editEvent(newObj)).unwrap()
              if (response.data.status) {
                setSelectedVehiclesList([])
                setObj({})
                setShowConfirmModal(false)
                handleEditHideModal()
              }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditEvent
