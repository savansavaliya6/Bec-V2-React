import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  getAssignedVehicles,
  unAssignVehiclesToEvent,
} from "./store/eventsSlice"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import DataTable from "../../../components/DataTable"
import Pagination from "../../../components/DataTable/Pagination"
import moment from "moment"

const AssignedVehicles = ({
  showVehiclesModal,
  handleHideVehiclesModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const darkMode = sessionStorage.getItem("darkMode")

  const columns = [
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

    {
      key: "unassign_vehicle",
      label: "Unassign Vehicle",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Button
            title="Edit"
            className="ms-2"
            size="sm"
            variant={darkMode == "true" ? "outline-primary" : "outline-dark"}
            disabled={
              !moment(selectedItem?.end_time, "YYYY-MM-DD HH:mm").isAfter(
                moment()
              )
            }
            onClick={() => {
              let obj = {
                id: [row.id],
                event_id: row.event_id,
              }
              dispatch(unAssignVehiclesToEvent(obj))
            }}
          >
            Unassign
          </Button>
        </div>
      ),
    },
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
    if (selectedItem.id && showVehiclesModal) {
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
            {/* <SearchFilters
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            /> */}
            <div className="table-wrapper">
              <div className="table-wrapper table-responsive">
                <DataTable data={vehicles} columns={columns} />
              </div>
            </div>
          </form>
          {/* <Pagination
            currentPage={currentPage}
            totalPages={vehicles ? Math.ceil(totalPages / itemsPerPage) : 0}
            onPageChange={handlePageChange}
          /> */}
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
