import React, { useEffect, useState } from "react"
import { Button, FormGroup, Modal } from "react-bootstrap"
import { updateFeedback } from "./store/FeedbackSlice"
import { useDispatch, useSelector } from "react-redux"

import {
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  RadioInput,
  TextInputField,
  TextareaField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"

const EditGuest = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const initialValues = {
    form_name: selectedItem.form_name,
    form_desc: selectedItem.form_description,
  }

  const validationSchema = yup.object().shape({
    form_name: yup.string().required("Form Name is required"),
    form_desc: yup.string().required("Form Description is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj["id"] = Number(selectedItem.id) || ""
    const response = await dispatch(updateFeedback(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  return (
    <Modal size="lg" show={showEditModal} onHide={handleEditHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Event Feedback Form</Modal.Title>
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
