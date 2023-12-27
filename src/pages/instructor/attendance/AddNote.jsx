import { Form, Formik } from "formik"
import React from "react"
import { Button, Modal } from "react-bootstrap"
import { PiNotePencilBold } from "react-icons/pi"
import { FilePickerField, TextareaField } from "../../../components/Fields"
import * as yup from "yup"
// import { createNote } from "./store/becFleetSlice"
import { useDispatch, useSelector } from "react-redux"
import Notes from "../../instructor/assignNotes/Notes"
import {
  createGuestNote,
  createNote,
  getNotes,
} from "../../event/events/store/eventsSlice"

const AddNote = ({
  showAddNoteModal,
  handleAddNoteHideModal,
  selectedItem,
  type,
}) => {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    notes: yup.string().required("Note is required"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    if (type == "event") {
      obj.event_id = selectedItem.id
      const response = await dispatch(createNote(obj)).unwrap()
      if (response.data.status) handleAddNoteHideModal()
    } else if (type == "guest") {
      obj.customer_id = selectedItem?.assign_customer?.id
      const response = await dispatch(createGuestNote(obj)).unwrap()
      if (response.data.status) handleAddNoteHideModal()
    } else {
      obj.customer_id = selectedItem?.id
      const response = await dispatch(createGuestNote(obj)).unwrap()
      if (response.data.status) handleAddNoteHideModal()
    }
  }

  return (
    <Modal size="xl" show={showAddNoteModal} onHide={handleAddNoteHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={{ notes: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
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
                {/* <div className="col-md-6">
                <FilePickerField
                  label="Upload File"
                  type="file"
                  name="files"
                  multiple={false}
                  accept="application/pdf,image/*"
                />
              </div> */}
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
      <Notes selectedItem={selectedItem} type={type} />
    </Modal>
  )
}

export default AddNote
