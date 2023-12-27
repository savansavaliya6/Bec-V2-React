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
import { Checkbox } from "@mui/material"
import { createAttendance } from "../schedule/store/instructorSlice"
import ViewAttendance from "./ViewAttendance"
import { Link } from "react-router-dom"
import {
  BiSolidBookAlt,
  BiSolidMessageAltDetail,
  BiSolidStar,
} from "react-icons/bi"
import { BsFillBookmarkStarFill } from "react-icons/bs"
import { IoEnter } from "react-icons/io5"

const AssignedUsers = ({
  showGuestsModal,
  handleHideGuestsModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()

  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState({})
  const [selectedUsersList, setSelectedUsersList] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    assignedUsers: { users, totalPages, loading },
  } = useSelector((state) => state.events)

  const columns = [
    // BiSolidBookAlt

    {
      key: "actions",
      label: "Mark Attendance",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {/* <Button
            title="Edit"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => {
              let obj = {
                id: [row.id],
                event_id: row.event_id,
                customer_id: row.customer_id,
              }
              dispatch(unAssignGuestsToEvent(obj))
            }}
          ></Button> */}
          <Checkbox
            title="Mark Attendance"
            className="ms-2 checkboxes"
            size="sm"
            variant="outline-dark"
            onChange={(e) => handleCheck(e, row.customer_id)}
            checked={selectedUsersList.includes(row.customer_id)}
            disabled={!row.is_registered}
          ></Checkbox>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      cell: (row) => (
        <>
          <span className="me-2 ml-2">
            <BiSolidBookAlt
              color={row.is_registered ? "#4f6a92" : "#D3D3D3"}
              size={20}
              title={row.is_registered ? "Registered" : "Not Registered"}
            />
          </span>
          <span className="me-2">
            <IoEnter
              size={20}
              color={row.check_in ? "#4f6a92" : "#D3D3D3"}
              title={row.check_in ? "Checked In" : "Not Checked In"}
            />
          </span>
          <span className="me-2">
            <BiSolidMessageAltDetail
              color={row.is_given_feedback ? "#4f6a92" : "#D3D3D3"}
              size={20}
              title={
                row.is_given_feedback ? "Given Feedback" : "Not Given Feedback"
              }
            />
          </span>
          <span className="me-2">
            <BiSolidStar
              color={row.is_rated_event ? "#4f6a92" : "#D3D3D3"}
              size={20}
              title={row.is_rated_event ? "Rated Event" : "Not Rated Event"}
            />
          </span>
          <span className="me-2">
            <BsFillBookmarkStarFill
              color={row.is_rated_instructor ? "#4f6a92" : "#D3D3D3"}
              size={20}
              title={
                row.is_rated_instructor
                  ? "Rated Instructor"
                  : "Not Rated Instructor"
              }
            />
          </span>
        </>
      ),
    },

    // {
    //   key: "notes",
    //   label: "Notes",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <Button
    //         title="Create Note"
    //         className="ms-2"
    //         size="sm"
    //         variant="outline-dark"
    //         onClick={() => handleAddNoteShowModal(row)}
    //       >
    //         <MdMessage  size={"17"} className="library-icons" />
    //       </Button>
    //     </div>
    //   ),
    // },
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
      label: "Customer Registration",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Link
            to={`/guest/register/${row.assign_customer?.customerhash}`}
            target="_blank"
          >
            <Button
              title="Register Customer"
              className="ms-2"
              size="sm"
              variant="outline-dark"
            >
              Register Customer
            </Button>
          </Link>
          {/* <Button
            title="Register Customer"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => (
              <a
                href={`https://becv2.vnvserver.com/guest/register/${row.assign_customer?.customerhash}`}
                target="_blank"
              ></a>
            )}
          >
            Register Customer
          </Button> */}
          {/* {row.assign_customer?.customerhash} */}
        </div>
      ),
    },
    {
      key: "view_attendance",
      label: "View Attendance",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Button
            title="View Attendance"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleAttendanceShowModal(row)}
          >
            View Attendance
          </Button>
        </div>
      ),
    },
    // {
    //   key: "is_registered",
    //   label: "Registered",
    //   cell: (row) => (
    //     <span
    //       className={`${row.is_registered ? "bg-success" : "bg-secondary"}
    //       badge fw-medium text-xs text-capitalize`}
    //     >
    //       {row.is_registered ? "Yes" : "No"}
    //     </span>
    //   ),
    //   // cell: (row) => (
    //   //   <input
    //   //     type="checkbox"
    //   //     checked={row.is_registered}
    //   //     style={{ cursor: "not-allowed" }}
    //   //   />
    //   // ),
    // },

    // {
    //   key: "is_given_feedback",
    //   label: "Given Feedback",
    //   cell: (row) => (
    //     <span
    //       className={`${row.is_given_feedback ? "bg-success" : "bg-secondary"}
    //       badge fw-medium text-xs text-capitalize`}
    //     >
    //       {row.is_given_feedback ? "Yes" : "No"}
    //     </span>
    //   ),
    //   // cell: (row) => (
    //   //   <input
    //   //     type="checkbox"
    //   //     checked={row.is_given_feedback}
    //   //     style={{ cursor: "not-allowed" }}
    //   //   />
    //   // ),
    // },
    // {
    //   key: "is_rated_event",
    //   label: "Rated Event",
    //   cell: (row) => (
    //     <span
    //       className={`${row.is_rated_event ? "bg-success" : "bg-secondary"}
    //       badge fw-medium text-xs text-capitalize`}
    //     >
    //       {row.is_rated_event ? "Yes" : "No"}
    //     </span>
    //   ),
    //   // cell: (row) => (
    //   //   <input
    //   //     type="checkbox"
    //   //     checked={row.is_rated_event}
    //   //     style={{ cursor: "not-allowed" }}
    //   //   />
    //   // ),
    // },
    // {
    //   key: "is_rated_instructor",
    //   label: "Rated Instructior",
    //   cell: (row) => (
    //     <span
    //       className={`${row.is_rated_instructor ? "bg-success" : "bg-secondary"}
    //       badge fw-medium text-xs text-capitalize`}
    //     >
    //       {row.is_rated_instructor ? "Yes" : "No"}
    //     </span>
    //   ),
    //   // cell: (row) => (
    //   //   <input
    //   //     type="checkbox"
    //   //     checked={row.is_rated_instructor}
    //   //     style={{ cursor: "not-allowed" }}
    //   //   />
    //   // ),
    // },
  ]

  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setSelectedUsersList((prev) => [...prev, id])
    } else {
      setSelectedUsersList((prev) => prev.filter((item) => item !== id))
    }
  }

  const handleAddNoteShowModal = (data) => {
    setSelectedUser(data)
    setShowAddNoteModal(true)
  }

  const handleAddNoteHideModal = () => {
    setShowAddNoteModal(false)
    setSelectedUser({})
  }

  const handleAttendanceShowModal = (data) => {
    setSelectedUser(data)
    setShowAttendanceModal(true)
  }

  const handleAttendanceHideModal = () => {
    setShowAttendanceModal(false)
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
    if (selectedItem.id) {
      const payload = {
        event_id: selectedItem.id,
      }
      dispatch(getAssignedUsers(payload))
    }
  }, [selectedItem])

  const handleSubmit = async () => {
    let payload = {
      event_id: selectedItem.id,
      customer_id: selectedUsersList,
      is_checkedIn: 1,
    }
    const response = await dispatch(createAttendance(payload)).unwrap()
    if (response.data.status) {
      setSelectedUsersList([])
      handleHideGuestsModal()
    }
  }

  return (
    <>
      <ViewAttendance
        showAttendanceModal={showAttendanceModal}
        handleAttendanceHideModal={handleAttendanceHideModal}
        selectedItem={selectedUser}
        eventId={selectedItem?.id}
      />
      {/* <AddNote
        showAddNoteModal={showAddNoteModal}
        handleAddNoteHideModal={handleAddNoteHideModal}
        selectedItem={selectedUser}
        type="guest"
      /> */}
      <Modal
        size="xl"
        show={showGuestsModal}
        onHide={() => {
          setSelectedUsersList([])
          handleHideGuestsModal()
        }}
      >
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
          <Button
            variant="outline-dark"
            onClick={() => {
              setSelectedUsersList([])
              handleHideGuestsModal()
            }}
          >
            Close
          </Button>

          <Button
            variant="dark"
            type="submit"
            disabled={!selectedUsersList.length}
            onClick={() => handleSubmit()}
          >
            Mark Attendance
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AssignedUsers
