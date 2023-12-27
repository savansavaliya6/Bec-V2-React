import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux"
import { deleteVehicle } from "./store/vehicleSlice"

function DeleteVehicle({
  showDeleteModal,
  handleDeleteHideModal,
  selectedItem,
}) {
  const dispatch = useDispatch()
  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={handleDeleteHideModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Vehicle?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDeleteHideModal()}>
            No
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              dispatch(deleteVehicle(selectedItem.id))
              handleDeleteHideModal()
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteVehicle
