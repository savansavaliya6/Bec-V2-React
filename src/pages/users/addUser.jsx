import React from "react"
import { Button, Modal } from "react-bootstrap"
import { createUsers } from "./store/userSlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  FilePickerField,
  RadioInput,
  TextInputField,
} from "../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import { BsCloudArrowUp } from "react-icons/bs"
import { GrGallery } from "react-icons/gr"
import toast from "react-hot-toast"

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
]

const addUser = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    role: yup.string().required("Role is required"),
    is_instructor: yup
      .number()
      .oneOf([1, 0], "Select an option")
      .required("Select an option"),
  })

  const handleSubmit = async (values) => {
    if (values.files) {
      let obj = { ...values }

      const response = await dispatch(createUsers(obj)).unwrap()
      if (response.data.status) {
        handleAddHideModal()
      }
    } else {
      toast.error("Please select profile picture.")
    }
  }

  return (
    <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...selectedItem, files: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ dirty, isValid, isSubmitting, values }) => (
          <Form>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <TextInputField
                    label="First name"
                    type="text"
                    name="f_name"
                  />
                </div>
                <div className="col-md-6">
                  <TextInputField label="Last name" type="text" name="l_name" />
                </div>
                <div className="col-md-6">
                  <TextInputField label="Email" type="email" name="email" />
                </div>

                <div className="col-md-6">
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
                <div className="col-md-6">
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
                </div>
                <div className="col-md-12">
                  <div className="upload">
                    <div className="upload-files">
                      <header>
                        <p>
                          <BsCloudArrowUp />
                          <span className="load">Upload Profile Picture</span>
                        </p>
                      </header>
                      <div className="body" id="drop">
                        <GrGallery className="File-icon" />
                        <p className="pointer-none">
                          Please Upload Image here. <br />
                        </p>
                        <div className="d-flex justify-content-center flex-column">
                          <div>
                            <label
                              htmlFor="file-upload"
                              className="custom-file-upload"
                            >
                              <BsCloudArrowUp /> Upload File
                            </label>
                            <FilePickerField
                              id="file-upload"
                              label="Upload File"
                              type="file"
                              name="files"
                              multiple={false}
                              accept="image/*"
                            />
                          </div>
                          {values?.["files"].length ? (
                            values?.["files"].map((selectedFile) => (
                              <span
                                id="file-name"
                                className="ml-2"
                                key={selectedFile.name}
                              >
                                {selectedFile.name}
                              </span>
                            ))
                          ) : (
                            <p className="text-center mt-2">
                              No Files selected
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
