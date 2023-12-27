import React, { useEffect, useMemo, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  getAssignedUsers,
  unAssignGuestsToEvent,
} from "../../event/events/store/eventsSlice"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import Pagination from "../../../components/DataTable/Pagination"
import DataTable from "../../../components/DataTable"

const AssignedUsers = ({
  showGuestsModal,
  handleHideGuestsModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    assignedUsers: { users, totalPages, loading },
  } = useSelector((state) => state.events)

  const columns = [
    {
      key: "title",
      label: "Title",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.assign_customer?.title}</div>
      ),
    },
    {
      key: "f_name",
      label: "First Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.assign_customer?.f_name}</div>
      ),
    },
    {
      key: "l_name",
      label: "Last Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.assign_customer?.l_name}</div>
      ),
    },
    {
      key: "email",
      label: "Email",
      cell: (row) => <div>{row.assign_customer?.email}</div>,
    },
    {
      key: "customerhash",
      label: "Customer Token",
      cell: (row) => <div>{row.assign_customer?.customerhash}</div>,
    },
    // {
    //   key: "unassign_customer",
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
    //           dispatch(unAssignGuestsToEvent(obj))
    //         }}
    //       >
    //         Unassign
    //       </Button>
    //     </div>
    //   ),
    // },
  ]

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
      dispatch(getAssignedUsers(payload))
    }
  }, [selectedItem])

  return (
    <Modal size="xl" show={showGuestsModal} onHide={handleHideGuestsModal}>
      <Modal.Header closeButton>
        <Modal.Title>Assigned Guests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card">
          <form className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h5">Event List</h2>
            </div>
            <hr></hr>
            {/* <SearchFilters
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            /> */}
            <div className="table-wrapper">
              <div className="table-wrapper table-responsive">
                <DataTable data={users} columns={columns} />
              </div>
            </div>
          </form>
          {/* <Pagination
            currentPage={currentPage}
            totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
            onPageChange={handlePageChange}
          /> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleHideGuestsModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AssignedUsers
