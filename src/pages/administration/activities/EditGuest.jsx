import React, { useEffect, useState } from "react"
import { Button, FormGroup, Modal } from "react-bootstrap"
import { updateGuest } from "./store/eventActivitiesSlice"
import { useDispatch, useSelector } from "react-redux"

import {
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  RadioInput,
  TextInputField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"

const EditGuest = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const initialValues = {
    name: selectedItem.name,
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Activity Name is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj["id"] = Number(selectedItem.id) || ""
    const response = await dispatch(updateGuest(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  return (
    <Modal size="md" show={showEditModal} onHide={handleEditHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-12">
                  <TextInputField
                    label="Activity Name"
                    type="text"
                    name="name"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleEditHideModal}>
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

export default EditGuest
