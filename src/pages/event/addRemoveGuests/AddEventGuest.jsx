import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  DropdownField,
  RadioInput,
  TextInputField,
  DatePickerField,
} from "../../../components/Fields"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { GrAdd } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import {
  assignGuestsToEvent,
  assignVehiclesToEvent,
  getEventsDropDown,
} from "../events/store/eventsSlice"
import moment from "moment-timezone"

const AddEventGuest = ({
  showModal,
  handleAddHideModal,
  selectedItem,
  type,
}) => {
  const dispatch = useDispatch()
  const { eventsList } = useSelector((state) => state.events)

  const handleSubmit = async (values) => {
    let obj = { ...values }
    if (type == "vehicle") {
      obj.vehicle_id = selectedItem
      const response = await dispatch(assignVehiclesToEvent(obj)).unwrap()
      if (response.data.status) handleAddHideModal()
    } else {
      obj.customer_id = selectedItem

      const response = await dispatch(assignGuestsToEvent(obj)).unwrap()
      if (response.data.status) handleAddHideModal()
    }
  }

  const validationSchema = yup.object().shape({
    event_id: yup.string().required("Event Name is required"),
  })

  useEffect(() => {
    dispatch(getEventsDropDown())
  }, [])

  return (
    <Modal size="md" show={showModal} onHide={handleAddHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={{ event_id: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add to Event </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-12">
                  <DropdownField
                    options={
                      eventsList?.length
                        ? eventsList.map((event, i) => ({
                            value: event.id,
                            label: (
                              <>
                                {`${event.event_name}`}
                                <br></br>
                                {`${moment(event.start_time)
                                  .tz("Africa/Johannesburg")
                                  .format("MMM Do YYYY, (h:mm A)")}
                                - ${moment(event.end_time)
                                  .tz("Africa/Johannesburg")
                                  .format("MMM Do YYYY, (h:mm A)")}`}
                              </>
                            ),
                          }))
                        : []
                    }
                    label="Choose Event"
                    name="event_id"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleAddHideModal}>
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
  )
}

export default AddEventGuest
