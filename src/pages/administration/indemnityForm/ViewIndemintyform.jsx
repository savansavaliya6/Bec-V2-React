import React from "react"
import { Button, Modal, Table } from "react-bootstrap"

function ViewIndemintyform({
  showViewModal,
  handleViewHideModal,
  selectedItem,
}) {
  return (
    <Modal size="xl" show={showViewModal} onHide={handleViewHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Indeminty Forms Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src={selectedItem.document}
          title="PDF Document"
          width="100%"
          height="500px"
        />
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
