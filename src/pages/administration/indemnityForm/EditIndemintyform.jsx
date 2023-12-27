import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { editCategory } from "./store/indemintySlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  RadioInput,
  DatePickerField,
  TextInputField,
  TimePickerField,
  FilePickerField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { GrAdd } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import { BsCloudArrowUp } from "react-icons/bs"
import { FaRegFilePdf } from "react-icons/fa"

const EditIndemintyform = ({
  showEditModal,
  handleEditHideModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    form_name: yup.string().required("Form Name is required"),
    // document: yup
    //   .mixed()
    //   .test("fileSize", "File Size is too large", (value) => {
    //     if (!value[0]) return true
    //     return value[0].size <= 2000000
    //   })
    //   .test("fileType", "Unsupported File Format", (value) => {
    //     if (!value[0]) return true
    //     return !["application/pdf"].includes(value.type)
    //   }),
  })

  const handleSubmit = async (values) => {
    let obj = {
      ...values,
    }
    obj.id = selectedItem.id

    const response = await dispatch(editCategory(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  return (
    <Modal size="lg" show={showEditModal} onHide={handleEditHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event Type</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={{
          form_name: selectedItem.form_name,
          document: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <TextInputField
                    label="Form Name "
                    type="text"
                    name="form_name"
                  />
                </div>

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
                        <FaRegFilePdf className="File-icon" />
                        <p className="pointer-none">
                          Please Upload Indemnity Form. <br />
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
                              name="document"
                              multiple={false}
                              accept="application/pdf"
                            />
                          </div>
                          {values?.["document"]?.length ? (
                            values?.["document"].map((selectedFile) => (
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

export default EditIndemintyform
