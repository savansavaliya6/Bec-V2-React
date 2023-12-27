import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { createType, setPdf } from "./store/indemintySlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  RadioInput,
  TextInputField,
  DatePickerField,
  FilePickerField,
} from "../../../components/Fields"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { GrAdd } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import ViewIndemintyform from "./ViewIndemintyform"
import { BsCloudArrowUp } from "react-icons/bs"
import { FaRegFilePdf } from "react-icons/fa"

const AddIndemintyform = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    form_name: yup.string().required("Form Name is required"),
    // document: yup
    //   .mixed()
    //   .test("fileSize", "File Size is too large", (value) => {
    //     return value[0].size <= 2000000
    //   })
    //   .test(
    //     "fileType",
    //     "Unsupported File Format",
    //     (value) => !["application/pdf"].includes(value.type)
    //   )
    //   .required("File is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    const res = await dispatch(createType(obj)).unwrap()
    if (res.data.status) handleAddHideModal()
  }

  return (
    <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={selectedItem}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Indemnity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <TextInputField
                    label="Form Name"
                    type="text"
                    name="form_name"
                  />
                </div>
                {/* <div className="col-md-6">
                  <FilePickerField
                    label="Upload File"
                    type="file"
                    name="document"
                    multiple={false}
                    accept="application/pdf"
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
              <Button variant="outline-dark" onClick={handleAddHideModal}>
                Cancel
              </Button>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddIndemintyform
