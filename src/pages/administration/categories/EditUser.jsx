import React from "react"
import { Button, Modal } from "react-bootstrap"
import { updateUser } from "./store/eventCategoriesSlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  RadioInput,
  DatePickerField,
  TextInputField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"

const EditUser = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const initialValues = {
    name: selectedItem.name,
  }

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ]

  const validationSchema = yup.object().shape({
    name: yup.string().required("Category Name is required"),
    // status: yup.string().required("Status is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj["id"] = Number(selectedItem.id) || ""
    const response = await dispatch(updateUser(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  return (
    <Modal size="md" show={showEditModal} onHide={handleEditHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="row g-3">
                {/* <div className="col-md-6">
                  <TextInputField
                    label="Event Category Id"
                    type="text"
                    name="event_id"
                  />
                </div> */}
                <div className="col-md-12">
                  <TextInputField
                    label="Category Name"
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

export default EditUser
