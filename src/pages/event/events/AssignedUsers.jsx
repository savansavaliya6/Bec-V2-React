import React, { useEffect, useMemo, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAssignedUsers, unAssignGuestsToEvent } from "./store/eventsSlice"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import Pagination from "../../../components/DataTable/Pagination"
import DataTable from "../../../components/DataTable"
import {
  BiSolidBookAlt,
  BiSolidMessageAltDetail,
  BiSolidStar,
} from "react-icons/bi"
import { IoEnter } from "react-icons/io5"

import { BsFillBookmarkStarFill } from "react-icons/bs"

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

  const darkMode = sessionStorage.getItem("darkMode")
  console.log(darkMode)
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
            variant={darkMode == "true" ? "outline-primary" : "outline-dark"}
            disabled={row.is_registered}
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
      key: "status",
      label: "Status",
      cell: (row) => (
        <>
          <span className="me-2 ml-2">
            <BiSolidBookAlt
              size={20}
              color={row.is_registered ? "#4f6a92" : "#D3D3D3"}
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
              size={20}
              color={row.is_given_feedback ? "#4f6a92" : "#D3D3D3"}
              title={
                row.is_given_feedback ? "Given Feedback" : "Not Given Feedback"
              }
            />
          </span>
          <span className="me-2">
            <BiSolidStar
              size={20}
              color={row.is_rated_event ? "#4f6a92" : "#D3D3D3"}
              title={row.is_rated_event ? "Rated Event" : "Not Rated Event"}
            />
          </span>
          <span className="me-2">
            <BsFillBookmarkStarFill
              size={20}
              color={row.is_rated_instructor ? "#4f6a92" : "#D3D3D3"}
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
    //   key: "check_in",
    //   label: "Checked In",
    //   cell: (row) => (
    //     <span
    //       className={`${row.check_in ? "bg-success" : "bg-secondary"}
    //       badge fw-medium text-xs text-capitalize`}
    //     >
    //       {row.check_in ? "Yes" : "No"}
    //     </span>
    //   ),
    //   // cell: (row) => (
    //   //   <input
    //   //     type="checkbox"
    //   //     checked={row.check_in}
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
    <Modal size="xl" show={showGuestsModal} onHide={handleHideGuestsModal}>
      <Modal.Header closeButton>
        <Modal.Title>Assigned Guests</Modal.Title>
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
