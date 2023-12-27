import moment from "moment"
import React, { useState } from "react"
import { useEffect } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import { AiFillEye } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { getNotes } from "../../event/events/store/eventsSlice"
import NotesTimeline from "../../../components/NotesTimeline"

const Notes = ({ selectedItem, showNotesModal, handleHideNotesModal }) => {
  const dispatch = useDispatch()
  const [documents, setDocuments] = useState([])
  const [documentModal, setDocumentModal] = useState(false)

  const handleShowDocuments = (documents) => {
    setDocuments(documents)
    setDocumentModal(true)
  }

  const handleHideDocuments = () => {
    setDocumentModal(false)
    setDocuments([])
  }

  const { notes } = useSelector((state) => state.events)

  useEffect(() => {
    if (selectedItem?.id && showNotesModal) {
      dispatch(getNotes(selectedItem.id))
    }
  }, [selectedItem?.id])

  return (
    <Modal size="xl" show={showNotesModal} onHide={handleHideNotesModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div className="card">
          <form className="card-body">
            <h2 className="h5 pb-3 mb-4 border-bottom">Notes</h2>
            <Modal size="xl" show={documentModal} onHide={handleHideDocuments}>
              <Modal.Header closeButton>
                <Modal.Title>View Document</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {documents.length &&
                  documents.map((document) => renderDocument(document))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={handleHideDocuments}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center" width={"10%"}>
                    Sr. No.
                  </th>
                  <th width={"50%"} className="text-center">
                    Notes
                  </th>
                  <th className="text-center">Document</th>
                  <th className="text-center">Added by</th>
                  <th className="text-center">Created At</th>
                </tr>
              </thead>
              <tbody>
                {notes && notes?.length > 0 ? (
                  notes?.map((note, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-left">{note.notes}</td>
                      <td className="text-center">
                        {note?.files && JSON.parse(note.files).length ? (
                          <Button
                            title="View Document"
                            className="ms-2"
                            size="sm"
                            variant="outline-dark"
                            onClick={() =>
                              handleShowDocuments(JSON.parse(note.files))
                            }
                          >
                            <AiFillEye size={"17"} />
                          </Button>
                        ) : (
                          "No document"
                        )}
                      </td>
                      <td className="text-center">{note.created_by.name}</td>
                      <td className="text-center">
                        {moment(note.created_date).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Notes Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </form>
        </div> */}
        <NotesTimeline notes={notes} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleHideNotesModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default Notes
