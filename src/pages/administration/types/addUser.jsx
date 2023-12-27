import React from "react"
import { Button, Modal } from "react-bootstrap"
import { createType } from "./store/eventTypesSlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  RadioInput,
  TextInputField,
  DatePickerField,
} from "../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
]

const addUser = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    name: yup.string().required("Event Type is required"),
    // status: yup.string().required("Status is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    const response = await dispatch(createType(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  return (
    <Modal size="md" show={showModal} onHide={handleAddHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event Type</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={selectedItem}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-12">
                  <TextInputField
                    label="Event Type Name"
                    type="text"
                    placeholder="Enter Event Type name"
                    name="name"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleAddHideModal}>
                Cancel
              </Button>
              <Button
                variant="dark"
                type="submit"
                disabled={isSubmitting}
                // disabled={!dirty || !isValid}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default addUser
