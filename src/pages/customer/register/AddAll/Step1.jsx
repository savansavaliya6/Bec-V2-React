import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  FilePickerField,
  PhoneInputField,
  RadioInput,
  TextInputField,
} from "../../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment"
import { gatherData } from "../../store/customersSlice"
import { useContext } from "react"
import FileContext from "../FileContext"
import { BsCloudArrowUp } from "react-icons/bs"
import { FaRegFilePdf } from "react-icons/fa"
import toast from "react-hot-toast"
import { GrGallery } from "react-icons/gr"

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Step1 = ({ handleAddHideModal, selectedItem, onNext }) => {
  const dispatch = useDispatch()
  const { saveFile, files } = useContext(FileContext)

  const { guestDetails, formData } = useSelector((state) => state.customers)

  const validationSchema = yup.object().shape({
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
    contact: yup.string().required("Contact Number is required"),
  })

  const initialValues = {
    f_name: formData?.f_name ? formData?.f_name : guestDetails?.f_name,
    l_name: formData?.l_name ? formData?.l_name : guestDetails?.l_name,
    email: formData?.email ? formData?.email : guestDetails?.email,
    contact: formData?.contact ? formData?.contact : guestDetails?.contact,
    document: "",
  }

  const handleSubmit = async (values) => {
    if (values.document) {
      let obj = { ...values }
      const newFile = obj.document[0]
      await saveFile({ name: "licence", file: newFile })
      obj.document = newFile.name
      delete obj.invited_by
      obj.event_id = selectedItem.id
      dispatch(gatherData(obj))
      onNext()
    } else {
      toast.error("Please upload Licence Image/PDF")
    }
  }

  const FileName = ({ values, formData }) => {
    if (values?.["document"]?.length) {
      return (
        <>
          {values?.["document"].map((selectedFile) => (
            <span id="file-name" className="ml-2" key={selectedFile.name}>
              {selectedFile.name}
            </span>
          ))}
        </>
      )
    } else {
      if (formData?.document) {
        return (
          <span id="file-name" className="ml-2">
            {formData.document}
          </span>
        )
      } else {
        return (
          <>
            <p className="text-center mt-2">No Files selected</p>
          </>
        )
      }
    }
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>Personal Details</Modal.Title>
            </Modal.Header>
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
                {/* <div className="col-md-6">
                <TextInputField label="Relation" name="relation" />
              </div> */}

                <div className="col-md-6">
                  <PhoneInputField label="Contact Number" name="contact" />
                </div>

                <div className="col-md-6">
                  <TextInputField
                    label="Invited By"
                    name="invited_by"
                    value={selectedItem?.created_by?.name || ""}
                    disabled
                  />
                </div>
                {/* <div className="col-md-6">
                <FilePickerField
                  label="Upload Licence Image/PDF"
                  type="file"
                  name="document"
                  multiple={false}
                  accept="application/pdf,image/*"
                />
              </div> */}
                <div className="col-md-12">
                  <div className="upload">
                    <div className="upload-files">
                      <header>
                        <p>
                          <BsCloudArrowUp />
                          <span className="load">Upload</span>
                        </p>
                      </header>
                      <div className="body" id="drop">
                        <GrGallery className="File-icon" />
                        <p className="pointer-none">
                          Please Upload Drivers Licence. <br />
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
                              label="Licence Image/PDF"
                              type="file"
                              name="document"
                              multiple={false}
                              accept="application/pdf,image/*"
                            />
                          </div>
                          <FileName values={values} formData={formData} />
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
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Next
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Step1
