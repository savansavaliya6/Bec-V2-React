import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import AddEventGuest from "./AddEventGuest"
import { Checkbox } from "@mui/material"
import { getGuests } from "../../guests/guest/store/guestSlice"
import { assignGuestsToEvent, getUsers } from "../events/store/eventsSlice"
import Loading from "../../../components/Loader/loader"
import { Button, Modal } from "react-bootstrap"

const AddEventGuestFromDropdown = ({
  showAddGuestsModal,
  handleHideAddGuestsModal,
  selectedItem,
}) => {
  const dispatch = useDispatch()

  const [selectedUsers, setSelectedUsers] = useState([])
  const [loader, setLoader] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    guests: { users, totalPages, loading },
  } = useSelector((state) => state.events)

  const columns = [
    {
      key: "select",
      label: "Select",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Checkbox
            title="Select"
            className="ms-2 checkboxes"
            size="sm"
            variant="outline-dark"
            onChange={(e) => handleCheck(e, row.id)}
            checked={selectedUsers.includes(row.id)}
          ></Checkbox>
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.title || "--"}</div>
      ),
    },
    {
      key: "f_name",
      label: "First Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.f_name || "--"}</div>
      ),
    },
    {
      key: "l_name",
      label: "Last Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.l_name || "--"}</div>
      ),
    },

    {
      key: "customerhash",
      label: "Customer Token",
      cell: (row) => <div>{row.customerhash || "--"}</div>,
    },
    {
      key: "email",
      label: "Email",
    },

    {
      key: "contact",
      label: "Contact Number",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.contact || "--"}</div>
      ),
    },
  ]

  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setSelectedUsers((prev) => [...prev, id])
    } else {
      setSelectedUsers((prev) => prev.filter((item) => item !== id))
    }
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

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getUsers({ query, page, perPage }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  const handleSubmit = async () => {
    let obj = {}
    obj.event_id = selectedItem?.id
    obj.customer_id = selectedUsers
    setLoader(true)
    const response = await dispatch(assignGuestsToEvent(obj)).unwrap()
    if (response.data.status) {
      handleHideAddGuestsModal()
      setSelectedUsers([])
    }
    setLoader(false)
  }

  return (
    <>
      <Modal
        size="xl"
        show={showAddGuestsModal}
        onHide={() => {
          handleHideAddGuestsModal()
          setSelectedUsers([])
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Guests to Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <form className="card-body">
              <SearchFilters
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                itemsPerPage={itemsPerPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
              />
              <div className="table-wrapper">
                <div className="table-wrapper table-responsive">
                  <DataTable data={users} columns={columns} />
                </div>
              </div>
            </form>
            <Pagination
              className="mb-2"
              currentPage={currentPage}
              totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
              onPageChange={handlePageChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleHideAddGuestsModal()
              setSelectedUsers([])
            }}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            disabled={!selectedUsers.length || loader}
            onClick={() => handleSubmit()}
          >
            Add Guests
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEventGuestFromDropdown
