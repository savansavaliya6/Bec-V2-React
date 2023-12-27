import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import Loading from "../../../components/Loader/loader"
import { getFeedbackEvents, getRateInstructors } from "../store/customersSlice"
import { useParams } from "react-router-dom"
import AddRating from "./AddRating"
import Select from "react-select"
import { FaCircleUser } from "react-icons/fa6"
import { Avatar, Chip } from "@mui/material"

const index = ({ showModal, handleAddHideModal, selectedItem }) => {
  const { id } = useParams()
  const [showInstructors, setShowInstructors] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState({})
  const [isRated, setIsRated] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const instructorColumns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-center">
            {isRated.includes(row.id) ? (
              <Chip
                variant="outlined"
                label={"Rated"}
                size="small"
                color={"primary"}
              />
            ) : (
              <Button
                title="Rate"
                className="ms-2"
                size="sm"
                variant="outline-dark"
                onClick={() => handleInstructorShowModal(row)}
              >
                Rate
              </Button>
            )}
          </div>
        )
      },
    },
    {
      key: "avatar",
      label: "Avatar",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.avatar ? (
            <img class="circular--square" src={row.avatar} />
          ) : (
            <div className="d-flex justify-content-center">
              <Avatar {...stringAvatar(`${row.name}`)} />
            </div>
            // <FaCircleUser size={32} />
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.name || "--"}</div>
      ),
    },
  ]
  const dispatch = useDispatch()
  const { rateInstructors } = useSelector((state) => state.customers)

  function stringToColor(string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = "#"

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: "3rem",
        height: "3rem",
      },
      children: `${name.split(" ")[0][0].toUpperCase()}${name
        .split(" ")[1][0]
        .toUpperCase()}`,
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

  const handleInstructorShowModal = (row) => {
    setShowInstructors(true)
    setSelectedInstructor(row)
  }

  const handleInstructorHideModal = () => {
    setShowInstructors(false)
    setSelectedInstructor({})
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage, id, event_id) => {
      let payload = {
        customerhash: id,
        event_id,
      }
      dispatch(getRateInstructors(payload))
    }
  }, [])

  useEffect(() => {
    if (selectedItem?.id && showModal)
      getAllUsers(searchTerm, currentPage, itemsPerPage, id, selectedItem?.id)
  }, [searchTerm, itemsPerPage, currentPage, id, selectedItem?.id])

  useEffect(() => {
    const res = selectedItem?.instructor_rating?.length
      ? selectedItem.instructor_rating.map(
          (i) =>
            rateInstructors.users.filter(
              (item) => item.id == i.instructor_id.id
            )[0].id
        )
      : []
    setIsRated(res)
  }, [rateInstructors])

  return (
    <>
      <AddRating
        showModal={showInstructors}
        handleAddHideModal={handleInstructorHideModal}
        handleInstructorHideModal={handleAddHideModal}
        selectedItem={{
          event_id: selectedItem?.id,
          instructor_id: selectedInstructor?.id,
        }}
        selectedOption="instructors"
      />
      <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <form className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h5">Instructor List</h2>
              </div>
              <hr></hr>
              {/* <SearchFilters
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          ></SearchFilters> */}

              <div className="table-wrapper">
                <div className="table-wrapper table-responsive">
                  <DataTable
                    data={rateInstructors.users}
                    columns={instructorColumns}
                  />
                </div>
              </div>
            </form>
            {/* 
          <Pagination
            currentPage={currentPage}
            totalPages={
              rateInstructors.users
                ? Math.ceil(rateInstructors.totalPages / itemsPerPage)
                : 0
            }
            onPageChange={handlePageChange}
          />
         */}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleAddHideModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default index
