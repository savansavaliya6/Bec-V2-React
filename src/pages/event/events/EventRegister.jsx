import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { createEvent } from "./store/eventsSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  DropdownField,
  RadioInput,
  TextInputField,
  DatePickerField,
  TimePickerField,
  MultiSelectField,
} from "../../../components/Fields"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { GrAdd } from "react-icons/gr"
import { MdDelete } from "react-icons/md"

import AddVehicle from "../addRemoveVehicles/ForCreateModal"
import toast from "react-hot-toast"

const EventRegister = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const { eventDropdown } = useSelector((state) => state.events)
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
  const [vehicles, setVehicles] = useState([])

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
      .required("Instructor is Required"),
    // number_of_guest: yup.string().required(" Number of List name is Required"),
    feedback_form_id: yup.string().required(" Feedback form id is Required"),
    hob_list: yup
      .array()
      .min(1, "Please select at least one HOB")
      .required("HOB is Required"),
    conference_room: yup.string().required("Conference Room is Required"),
    indemnity_id: yup.string().required(" Indemnity Form id  is Required"),
    // c_f_id: yup.string().required(" ConcentForm id is Required"),
    // attendance: yup.string().required(" Multi-day attendance is Required"),
    // v_list: yup.string().required(" Vehicles List name is Required"),
    // C_dob: yup.string().required(" Created Date  is Required"),
  })

  useEffect(() => {
    if (eventDropdown?.activities?.length > 0) {
      let activity_data = eventDropdown?.activities?.map((item, index) => ({
        value: item.id,
        label: item.name,
      }))
      setActivityList(activity_data)
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
    if (eventDropdown?.region?.length) {
      let region_data = eventDropdown.region.map((region, index) => ({
        value: region.name,
        label: region.name,
      }))
      setRegionsList(region_data)
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

  const handleSubmit = async (values) => {
    if (vehicles.length) {
      let obj = { ...values }
      obj["start_time"] = `${values["start_date"]} ${values["start_time"]}`
      obj["end_time"] = `${values["end_date"]} ${values["end_time"]}`
      obj["vehicle_id"] = vehicles
      const response = await dispatch(createEvent(obj)).unwrap()
      if (response.data.status) {
        handleAddHideModal()
        setVehicles([])
      }
    } else {
      toast.error("Please Add Vehicles.")
    }
  }

  const handleAddVehicleShowModal = () => {
    setShowAddVehicleModal(true)
    setVehicles(vehicles)
  }

  const handleAddVehicleHideModal = (vehicles) => {
    setShowAddVehicleModal(false)
    if (vehicles) setVehicles(vehicles)
  }

  const handleSave = (vehicles) => {
    setVehicles(vehicles)
    setShowAddVehicleModal(false)
  }

  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setVehicles((prev) => [...prev, id])
    } else {
      setVehicles((prev) => prev.filter((item) => item !== id))
    }
  }

  return (
    <>
      <AddVehicle
        showAddVehicleModal={showAddVehicleModal}
        handleAddVehicleHideModal={handleAddVehicleHideModal}
        handleSave={handleSave}
        handleCheck={handleCheck}
        vehiclesArray={vehicles}
      />
      <Modal
        size="xl"
        show={showModal}
        onHide={() => {
          handleAddHideModal()
          setVehicles([])
        }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={selectedItem}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row g-3">
                  <div className="col-md-6">
                    <DropdownField
                      label="Event Category"
                      options={categoryList}
                      name="event_category"
                    />
                  </div>
                  <div className="col-md-6">
                    <DropdownField
                      label="Event Type"
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
                      options={regionsList}
                      name="region"
                    />
                  </div>
                  <div className="col-md-6">
                    <MultiSelectField
                      label="Activity List"
                      options={activityList}
                      name="activity_list"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Retailer"
                      options={retailers}
                      name="retailer"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      label="Project Manger"
                      type="text"
                      name="project_manager"
                    />
                  </div>

                  <div className="col-md-6">
                    <MultiSelectField
                      label="Instructor List"
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
                      name="feedback_form_id"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Indemnity Form"
                      options={IndemnityForm}
                      name="indemnity_id"
                    />
                  </div>

                  <div className="col-md-6">
                    <DropdownField
                      label="Conference Room"
                      options={conferenceRoomList}
                      name="conference_room"
                    />
                  </div>
                  <div className="col-md-6">
                    <Button
                      variant="outline-dark"
                      onClick={handleAddVehicleShowModal}
                    >
                      Add Vehicles
                    </Button>
                  </div>

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
                    handleAddHideModal()
                    setVehicles([])
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
    </>
  )
}

export default EventRegister
