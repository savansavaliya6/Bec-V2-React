import React, { useEffect, useState } from "react"
import { Button, FormGroup, Modal } from "react-bootstrap"
// import { updateGuest } from "../auth/store/authSlice";
import { useDispatch, useSelector } from "react-redux"

import {
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  FilePickerField,
  PhoneInputField,
  RadioInput,
  TextInputField,
} from "../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { getProfile, updateProfile } from "../auth/store/authSlice"
import toast from "react-hot-toast"
import { BsCloudArrowUp } from "react-icons/bs"
import { GrGallery } from "react-icons/gr"

const index = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.auth)

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ]
  const initialValues = {
    f_name: profile?.f_name,
    l_name: profile?.l_name,
    email: profile?.email,
    role: profile?.role,
    is_instructor: Number(profile?.is_instructor),
    upload_new_profile_picture: 0,
    files: "",
  }

  const validationSchema = yup.object().shape({
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
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
      obj["id"] = profile?.id
      obj["is_instructor"] = Number(values.is_instructor) || 0

      const response = await dispatch(updateProfile(obj)).unwrap()
      if (response.data.status) handleEditHideModal()
    }
  }

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return (
    <>
      {profile ? (
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ isSubmitting, values }) => (
            <div className="card">
              <Form className="card-body">
                <h2 className="h5 pb-3 mb-4 border-bottom">Profile</h2>
                <div className="row g-4">
                  <div className="d-flex">
                    <img
                      src={profile?.avatar}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "contain",
                        marginBottom: "1rem",
                      }}
                    />
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-md-6">
                    <TextInputField
                      label="First name"
                      type="text"
                      name="f_name"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      label="Last name"
                      type="text"
                      name="l_name"
                    />
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
                    <TextInputField label="Role" disabled name="role" />
                  </div>

                  <div className="col-md-6">
                    <RadioInput
                      label="Are you an Instructor?"
                      name="is_instructor"
                      disabled="true"
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
                <div className="col-12 mb-2 text-end">
                  <button
                    className="btn btn-dark btn-step justify-content-end"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <span className="mx-auto">Submit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="icon-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          Loading
        </div>
      )}
    </>
  )
}

export default index
