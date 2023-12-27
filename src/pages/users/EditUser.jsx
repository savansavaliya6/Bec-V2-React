import React from "react"
import { Button, Modal } from "react-bootstrap"
import { updateUser } from "./store/userSlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  FilePickerField,
  RadioInput,
  TextInputField,
} from "../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { BsCloudArrowUp } from "react-icons/bs"
import { GrGallery } from "react-icons/gr"
import toast from "react-hot-toast"

const EditUser = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ]
  const initialValues = {
    f_name: selectedItem.f_name,
    l_name: selectedItem.l_name,
    email: selectedItem.email,
    password: selectedItem.password,
    role: selectedItem.role,
    is_instructor: Number(selectedItem.is_instructor),
    upload_new_profile_picture: 0,
    files: "",
  }

  const validationSchema = yup.object().shape({
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
    //password: yup.string().min(8, "Password must be at least 8 characters"),
    role: yup.string().required("Role is required"),
    is_instructor: yup
      .number()
      .oneOf([1, 0], "Select an option")
      .required("Select an option"),
  })

  const handleSubmit = async (values) => {
    if (values.upload_new_profile_picture == "1" && !values.files) {
      toast.error("Please select a profile picture.")
    } else {
      let obj = { ...values }
      obj["user_id"] = selectedItem.user_id
      obj["is_instructor"] = Number(values.is_instructor) || 0
      const response = await dispatch(updateUser(obj)).unwrap()
      if (response.data.status) handleEditHideModal()
    }
  }

  return (
    <Modal size="lg" show={showEditModal} onHide={handleEditHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
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
                  <TextInputField
                    label="Email"
                    type="email"
                    name="email"
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <DropdownField
                    label="Role"
                    options={roleOptions}
                    defaultValue={initialValues.role}
                    name="role"
                  />
                </div>
                {/*<div className="col-md-6">
                  <TextInputField
                    label="Password"
                    type="text"
                    name="password"
                  />
                </div>*/}
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
                <div className="col-md-6">
                  <RadioInput
                    label="Upload new Profile Picture?"
                    name="upload_new_profile_picture"
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
                {values["upload_new_profile_picture"] == "1" ? (
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
                ) : null}
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

export default EditUser
