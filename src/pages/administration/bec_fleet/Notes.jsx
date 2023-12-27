import moment from "moment"
import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { AiFillEye } from "react-icons/ai"
import { IoMdEye } from "react-icons/io"
import { useSelector } from "react-redux"

const Notes = ({ selectedItem }) => {
  const [documents, setDocuments] = useState("")
  const [documentModal, setDocumentModal] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useState({})

  const { users, totalPages, loading } = useSelector((state) => state.fleets)

  useEffect(() => {
    const currentVeh = users.find((user) => user.id === selectedItem.id)
    setCurrentVehicle(currentVeh)
  }, [users])

  const handleShowDocuments = (documents) => {
    setDocuments(documents)
    setDocumentModal(true)
  }

  const handleHideDocuments = () => {
    setDocumentModal(false)
    setDocuments("")
  }

  const renderDocument = (documentUrl) => {
    function getFileExtension(url) {
      const pathParts = url.split("/")

      const fileName = pathParts[pathParts.length - 1]
      const fileNameParts = fileName.split(".")

      if (fileNameParts.length > 1) {
        return fileNameParts[1].toLowerCase()
      }
      return ""
    }

    const extension = getFileExtension(documentUrl)

    if (
      extension.startsWith("jpg") ||
      extension.startsWith("jpeg") ||
      extension.startsWith("png") ||
      extension.startsWith("webp")
    ) {
      return (
        <img
          src={`${documentUrl}`}
          alt="Image Document"
          className="img-fluid mb-3"
          width={"100%"}
          height={"100%"}
        />
      )
    } else if (extension.startsWith("pdf")) {
      return (
        <iframe
          src={`${documentUrl}`}
          title="PDF Document"
          width="100%"
          height="500px"
        />
      )
    } else {
      return "Unsupported document format"
    }
  }
  return (
    <>
      <h2 className="h5 pb-3 ms-3 mb-4 ">Notes</h2>
      <Modal size="xl" show={documentModal} onHide={handleHideDocuments}>
        <Modal.Header closeButton>
          <Modal.Title>View Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>{documents && renderDocument(documents)}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideDocuments}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="timeline-container">
        {currentVehicle?.new_notes && (currentVehicle?.new_notes).length > 0 ? (
          currentVehicle?.new_notes.map((note, index) => {
            return (
              <ul class="timeline" key={note}>
                <li>
                  <div class="timeline-icon">
                    <a href="javascript:;">&nbsp;</a>
                  </div>
                  <div
                    class="timeline-body"
                    style={{
                      backgroundColor: index % 2 === 0 ? "#aec0cc" : "#d1d1d1",
                    }}
                  >
                    <div class="timeline-header">
                      <span class="username">{note.user.name}</span>

                      <span class="pull-right text-muted">
                        {note?.files && note.files.length ? (
                          <Button
                            title="View Document"
                            className="ms-2"
                            size="sm"
                            variant="outline-dark"
                            onClick={() => handleShowDocuments(note.files)}
                          >
                            {/* <AiFillEye size={"17"} /> */}
                            <IoMdEye size={"17"} color="#7f8de1" />
                          </Button>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <span class="date">
                      {moment(note.created_date, "YYYY-MM-DD HH:mm").format(
                        "MMM Do YYYY, h:mm A"
                      )}
                    </span>
                    <hr />
                    <div class="timeline-content">
                      <p>{note.notes}</p>
                    </div>
                  </div>
                </li>
              </ul>
            )
          })
        ) : (
          <p className="text-center">No data found</p>
        )}
      </div>
    </>
  )
}
export default Notes
