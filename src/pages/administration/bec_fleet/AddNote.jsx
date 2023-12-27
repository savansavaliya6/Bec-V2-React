import { Form, Formik } from "formik"
import React from "react"
import { Button, Modal } from "react-bootstrap"
import { PiNotePencilBold } from "react-icons/pi"
import { FilePickerField, TextareaField } from "../../../components/Fields"
import * as yup from "yup"
import { createNote } from "./store/becFleetSlice"
import { useDispatch } from "react-redux"
import Notes from "./Notes"
import { BsCloudArrowUp } from "react-icons/bs"
import { GrGallery } from "react-icons/gr"

const AddNote = ({
  showAddNoteModal,
  handleAddNoteHideModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()

  const fileValidation = (files) => {
    if (!files || files.length === 0) {
      // return yup.array().min(1, "File is required").required("File is required")
      return yup.array()
    }

    // Check each selected file for its type or other conditions
    const supportedFileTypes = ["application/pdf", "image/jpeg", "image/png"]
    const maxFileSizeInBytes = 10 * 1024 * 1024 // 10 MB

    for (const file of files) {
      if (!supportedFileTypes.includes(file.type)) {
        return yup
          .string()
          .test("fileType", "Unsupported file type", () => false)
      }
      if (file.size > maxFileSizeInBytes) {
        return yup
          .string()
          .test("fileSize", "File size is too large", () => false)
      }
    }

    return yup.array()
  }

  const validationSchema = yup.object().shape({
    notes: yup.string().required("Note is required"),
    // files: fileValidation(),
    // files: yup.array().test("files", "File is required", (files) => {
    //   if (!files || files.length === 0) {
    //     return true
    //   }
    //   const supportedFileTypes = ["application/pdf", "image/jpeg", "image/png"]
    //   const maxFileSizeInBytes = 1024 // 10 MB

    //   return files.every((file) => {
    //     return (
    //       supportedFileTypes.includes(file.type) &&
    //       file.size <= maxFileSizeInBytes
    //     )
    //   })
    // }),
  })

  const handleSubmit = async (values, helpers) => {
    let obj = { ...values }
    obj.fleet_id = selectedItem.id

    const response = await dispatch(createNote(obj)).unwrap()
    if (response.data.status) {
      helpers.resetForm()
    }
    // if (response.data.status) handleAddNoteHideModal()
  }

  return (
    <Modal size="xl" show={showAddNoteModal} onHide={handleAddNoteHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={{ notes: "", files: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>
                <PiNotePencilBold /> Add Note
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-12">
                  <TextareaField label="Note" name="notes" />
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
                        <GrGallery className="File-icon" />
                        <p className="pointer-none">
                          Please Upload Image or PDF here. <br />
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
                              accept="application/pdf,image/*"
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
              <Button variant="outline-dark" onClick={handleAddNoteHideModal}>
                Close
              </Button>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Save Note
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
      <Notes selectedItem={selectedItem} />
    </Modal>
  )
}

export default AddNote
