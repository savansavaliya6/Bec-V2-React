import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux"
import { deleteVoucher } from "./store/voucherSlice"

function DeleteVoucher({
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
          <Modal.Title>Delete Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Voucher?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDeleteHideModal()}>
            No
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              dispatch(deleteVoucher(selectedItem.id))
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

export default DeleteVoucher
