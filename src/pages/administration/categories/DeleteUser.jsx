import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux"
import { deleteUser } from "./store/eventCategoriesSlice"

function DeleteModal({ showDeleteModal, handleDeleteHideModal, selectedItem }) {
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
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDeleteHideModal()}>
            No
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              dispatch(deleteUser(selectedItem.id))
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

export default DeleteModal
