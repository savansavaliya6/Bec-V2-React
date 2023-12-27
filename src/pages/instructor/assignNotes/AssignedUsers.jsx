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
import AddNote from "./AddNote"
import { MdMessage } from "react-icons/md"
import { FcComments } from "react-icons/fc"

const AssignedUsers = ({
  showGuestsModal,
  handleHideGuestsModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()

  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    assignedUsers: { users, totalPages, loading },
  } = useSelector((state) => state.events)

  const columns = [
    {
      key: "unassign_customer",
      label: "Unassign Customer",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Button
            title="Edit"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            disabled={row.check_in}
            onClick={() => {
              let obj = {
                id: [row.id],
                event_id: row.event_id,
                customer_id: row.customer_id,
              }
              dispatch(unAssignGuestsToEvent(obj))
            }}
          >
            Unassign
          </Button>
        </div>
      ),
    },
    {
      key: "notes",
      label: "Notes",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Button
            title="Create Note"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleAddNoteShowModal(row)}
          >
            <FcComments size={"17"} className="library-icons" />
          </Button>
        </div>
      ),
    },
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
  ]

  const handleAddNoteShowModal = (data) => {
    setSelectedUser(data)
    setShowAddNoteModal(true)
  }

  const handleAddNoteHideModal = () => {
    setShowAddNoteModal(false)
    setSelectedUser({})
  }

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
    if (selectedItem.id && showGuestsModal) {
      const payload = {
        event_id: selectedItem.id,
      }
      dispatch(getAssignedUsers(payload))
    }
  }, [selectedItem])

  return (
    <>
      <AddNote
        showAddNoteModal={showAddNoteModal}
        handleAddNoteHideModal={handleAddNoteHideModal}
        selectedItem={selectedUser}
        type="guest"
      />
      <Modal size="xl" show={showGuestsModal} onHide={handleHideGuestsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assigned Guests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <form className="card-body">
              {/* <div className="d-flex justify-content-between align-items-center">
                <h2 className="h5">Event List</h2>
              </div>
              <hr></hr> */}
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
    </>
  )
}

export default AssignedUsers
