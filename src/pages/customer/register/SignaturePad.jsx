import React from "react"
import { Button, Modal, Table } from "react-bootstrap"
import SignatureCanvas from "react-signature-canvas"

function ViewIndemintyform({
  showViewModal,
  handleViewHideModal,
  selectedItem,
}) {
  return (
    <Modal size="xl" show={showViewModal} onHide={handleViewHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Signature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3">
          <div>
            <SignatureCanvas
              penColor="black"
              canvasProps={{ width: 500, height: 200 }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleViewHideModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewIndemintyform
