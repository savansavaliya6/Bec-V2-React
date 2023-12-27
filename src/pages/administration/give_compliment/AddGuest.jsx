import React, { useEffect, useState } from "react"
import { createActivity } from "./store/regionSlice"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  TextInputField,
} from "../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"

const AddGuest = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    compliment: yup.string().required("Compliment name is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    const response = await dispatch(createActivity(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  return (
    <Modal size="md" show={showModal} onHide={handleAddHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={selectedItem}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Compliment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-12">
                  <TextInputField
                    label="Compliment Name"
                    placeholder="Enter Compliment Name"
                    type="text"
                    name="compliment"
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

export default AddGuest
