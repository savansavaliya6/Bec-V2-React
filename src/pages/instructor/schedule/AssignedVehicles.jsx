import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  getAssignedVehicles,
  unAssignVehiclesToEvent,
} from "../../event/events/store/eventsSlice"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import DataTable from "../../../components/DataTable"
import Pagination from "../../../components/DataTable/Pagination"

const AssignedVehicles = ({
  showVehiclesModal,
  handleHideVehiclesModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")
  const columns = [
    // {
    //   key: "vin",
    //   label: "VIN",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>{row.assign_vehicle?.vin}</div>
    //   ),
    // },
    {
      key: "registration_no",
      label: "Registration No.",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.assign_vehicle?.registration_no}
        </div>
      ),
    },
    {
      key: "brand",
      label: "Brand",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.assign_vehicle?.brand}</div>
      ),
    },
    {
      key: "nameplate",
      label: "nameplate",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.assign_vehicle?.nameplate}</div>
      ),
    },

    // {
    //   key: "unassign_vehicle",
    //   label: "Unassign Customer",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <Button
    //         title="Edit"
    //         className="ms-2"
    //         size="sm"
    //         variant="outline-dark"
    //         onClick={() => {
    //           let obj = {
    //             id: [row.id],
    //             event_id: row.event_id,
    //           }
    //           dispatch(unAssignVehiclesToEvent(obj))
    //         }}
    //       >
    //         Unassign
    //       </Button>
    //     </div>
    //   ),
    // },
  ]
  const {
    assignedVehicles: { vehicles, totalPages, loading },
  } = useSelector((state) => state.events)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (selectedItem.id) {
      const payload = {
        event_id: selectedItem.id,
      }
      dispatch(getAssignedVehicles(payload))
    }
  }, [selectedItem])

  return (
    <Modal size="xl" show={showVehiclesModal} onHide={handleHideVehiclesModal}>
      <Modal.Header closeButton>
        <Modal.Title>Assigned Vehicles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card">
          <form className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h5">Assigned Vehicles</h2>
            </div>
            <hr></hr>
            <SearchFilters
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
            <div className="table-wrapper">
              <div className="table-wrapper table-responsive">
                <DataTable data={vehicles} columns={columns} />
              </div>
            </div>
          </form>
          <Pagination
            currentPage={currentPage}
            totalPages={vehicles ? Math.ceil(totalPages / itemsPerPage) : 0}
            onPageChange={handlePageChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleHideVehiclesModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AssignedVehicles
