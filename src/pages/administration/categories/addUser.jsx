import React, { useState, useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import { createUsers } from "./store/eventCategoriesSlice"
import { useDispatch } from "react-redux"
import { IoIosAddCircle } from "react-icons/io"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
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

  const [categoryName, setCategoryname] = useState("")
  const [CategoryNamelist, setCategoryNamelist] = useState([])

  const validationSchema = yup.object().shape({
    name: yup.string().required("Category Name is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    const response = await dispatch(createUsers(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  const handleInputChange = (e) => {
    setCategoryname(e.target.value)
  }
  const handleEditClick = () => {
    setCategoryNamelist((prev) => [...prev, categoryName])
    setCategoryname("")
  }

  useEffect(() => {
    if (!showModal) {
      setCategoryname("")
    }
  }, [showModal])

  return (
    <Modal size="md" show={showModal} onHide={handleAddHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event Category</Modal.Title>
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
                {/* <div className="col-md-6">
                  <TextInputField
                    label="Event Category Id"
                    type="text"
                    name="event_id"
                  />
                </div> */}
                <div className="col-md-12">
                  <TextInputField
                    label="Event Category Name"
                    type="text"
                    placeholder="Enter Category name"
                    name="name"
                  />
                </div>
                {/* <div className="col-md-6">
                  <DatePickerField
                    label="Created Date"
                    placeholder="Select Date "
                    //type="text"
                    name="created_date"
                  />
                </div> */}
                {/* <div className="col-md-6">
                  <TextInputField
                    label="Status"
                    type="text"
                    placeholder="Enter status"
                    name="status"
                  />
                </div> */}

                {/* <div className="col-md-6">
                  <DropdownField
                    label="Role"
                    options={roleOptions}
                    name="role"
                  />
                </div>
                <div className="col-md-6">
                  <TextInputField
                    label="Password"
                    type="text"
                    name="password"
                  />
                </div>
                <div className="col-md">
                  <RadioInput
                    label="Is Instructor?"
                    name="is_instructor"
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
