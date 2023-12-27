import React, { useEffect, useState } from "react"
import { createFeedback } from "./store/FeedbackSlice"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { PiNotePencilBold } from "react-icons/pi"
import { GrAdd } from "react-icons/gr"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  TextInputField,
  TextareaField,
} from "../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"

const roleOptions = [
  { value: "Text", label: "Text" },
  { value: "Option", label: "Option" },
]

const AddGuest = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    form_name: yup.string().required("Form Name is required"),
    form_desc: yup.string().required("Form Description is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    const response = await dispatch(createFeedback(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
        <Formik
          enableReinitialize={true}
          initialValues={selectedItem}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Add Event Feedback Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row g-3">
                  <div>
                    <TextInputField
                      label="Form Name"
                      placeholder="Enter Form Name"
                      type="text"
                      name="form_name"
                    />
                  </div>
                  <div>
                    <TextareaField
                      label="Description"
                      placeholder="Enter Description"
                      type="text"
                      name="form_desc"
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
    </>
  )
}

export default AddGuest
