import React from "react"
import DataTable from "../../../components/DataTable"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

const AddedOption = ({
  showAddedOptions,
  handleAddedOptionsHideModal,
  data,
}) => {
  const columns = [
    {
      key: "id",
      label: "ID",
      cell: (row) => <div className={"text-capitalize"}>{row.id || ""}</div>,
    },
    {
      key: "img",
      label: "Image",
      cell: (row) => (
        <img
          src={
            row.img
              ? row.img
              : "https://udaan.jlrsaportal.co.za/thumb/img/noavailable/no-image-stock.jpeg"
          }
          width={"220px"}
          // height={"100px"}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      key: "price",
      label: "Price",
      cell: (row) => <div className={"text-capitalize"}>{row.price}</div>,
    },

    {
      key: "value",
      label: "Value",
      cell: (row) => <div className={"text-capitalize"}>{row.value || ""}</div>,
    },
    {
      key: "availability",
      label: "Availability",
      cell: (row) => <div>{row.availability || ""}</div>,
    },
  ]

  return (
    <Modal
      size="xl"
      show={showAddedOptions}
      onHide={handleAddedOptionsHideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Added Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(data) ? (
          <div className="table-wrapper table-responsive">
            <DataTable data={data} columns={columns} />
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleAddedOptionsHideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddedOption
