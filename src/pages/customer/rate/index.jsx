import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Card, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import Loading from "../../../components/Loader/loader"
import { getFeedbackEvents, getRateInstructors } from "../store/customersSlice"
import { useParams } from "react-router-dom"
import AddRating from "./AddRating"
import Instructors from "./Instructors"
import Select from "react-select"
import moment from "moment-timezone"
import { TbBoxModel2 } from "react-icons/tb"
import { BiTime } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { RiShapesFill } from "react-icons/ri"
import { Chip } from "@mui/material"

const index = () => {
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [showInstructors, setShowInstructors] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const eventColumns = [
    {
      key: "rate_event",
      label: "Rate event",
      cell: (row) => {
        let filteredData = row?.event_customer?.filter(
          (i) => i?.assign_customer?.customerhash == id
        )
        return (
          <div className="d-flex justify-content-center">
            {filteredData.length && filteredData[0].is_rated_event ? (
              <span
                className="bg-primary
                badge fw-medium text-xs text-capitalize"
              >
                Rated
              </span>
            ) : (
              <Button
                title="Rate Event"
                className="ms-2"
                size="sm"
                variant="outline-dark"
                onClick={() => handleAddShowModal(row)}
              >
                Rate Event
              </Button>
            )}
          </div>
        )
      },
    },
    {
      key: "rate_instructor",
      label: "Rate Instructor",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Button
            title="Edit"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleInstructorShowModal(row)}
          >
            Rate Instructors
          </Button>
        </div>
      ),
    },
    {
      key: "event_name",
      label: "Event Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.event_name || "--"}</div>
      ),
    },
    {
      key: "event_code",
      label: "Event Code",
      cell: (row) => (
        <div className={"text-uppercase"}>{row.event_code || "--"}</div>
      ),
    },
    {
      key: "event_category",
      label: "Event Category",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.event_category?.categorieName || "--"}
        </div>
      ),
    },
    {
      key: "event_type",
      label: "Event Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.event_type?.name || "--"}</div>
      ),
    },

    {
      key: "start_date",
      label: "Start Date",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.start_date || "--"}</div>
      ),
    },
    {
      key: "start_time",
      label: "Start Time",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.start_time.split(" ")[1] || "--"}
        </div>
      ),
    },
    {
      key: "end_date",
      label: "End Date",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.end_date || "--"}</div>
      ),
    },
    {
      key: "end_time",
      label: "End Time",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.end_time.split(" ")[1] || "--"}
        </div>
      ),
    },
    {
      key: "region",
      label: "Region",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.region || "--"}</div>
      ),
    },
  ]

  const dispatch = useDispatch()
  const {
    feedbackEvents: { users },
  } = useSelector((state) => state.customers)

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

  const handleAddShowModal = (row) => {
    setShowModal(true)
    setSelectedItem(row)
  }

  const handleAddHideModal = () => {
    setShowModal(false)
    setSelectedItem({})
  }

  const handleInstructorShowModal = (row) => {
    setShowInstructors(true)
    setSelectedItem(row)
  }

  const handleInstructorHideModal = () => {
    setShowInstructors(false)
    setSelectedItem({})
  }

  const RegisteredButton = ({ row }) => {
    let filteredData = row?.event_customer?.filter(
      (i) => i?.assign_customer?.customerhash == id
    )

    return (
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-dark btn-step me-2"
          onClick={() => handleInstructorShowModal(row)}
        >
          Rate Instructors
        </button>
        {filteredData.length && filteredData[0].is_rated_event ? null : (
          // (
          // <Chip
          //   variant="outlined"
          //   label={"Rated Event"}
          //   size="small"
          //   color={"primary"}
          // />
          // )

          <button
            type="button"
            className="btn btn-dark btn-step me-2"
            onClick={() => handleAddShowModal(row)}
          >
            Rate Event
          </button>
        )}
      </div>
    )
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage, id) => {
      dispatch(getFeedbackEvents({ customerhash: id }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage, id)
  }, [searchTerm, itemsPerPage, currentPage, id])

  return (
    <>
      <AddRating
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={{ event_id: selectedItem?.id }}
        selectedOption="events"
      />

      <Instructors
        showModal={showInstructors}
        handleAddHideModal={handleInstructorHideModal}
        selectedItem={selectedItem}
      />

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
          ></SearchFilters> */}

          {/* <div className="table-wrapper">
            <div className="table-wrapper table-responsive">
              <DataTable data={users} columns={eventColumns} />
            </div>
          </div> */}
          <div className="container">
            {users.length ? (
              users.map((item) => (
                <div key={item.id} className="mb-4">
                  <Card className="shadow">
                    <Card.Body>
                      <Card.Title
                        className="text-uppercase"
                        style={{ fontSize: "1.4em" }}
                      >
                        {item.event_name}
                      </Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted text-decoration-underline">
                        {item.event_code}
                      </Card.Subtitle> */}
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <dl className="row mb-0">
                            <dt className="d-flex align-items-center small-text-sm">
                              <TbBoxModel2 className="me-2" />
                              Event Category
                            </dt>
                            <dd className="small-text">
                              {item.event_category?.categorieName}
                            </dd>

                            <dt className="d-flex align-items-center small-text-sm">
                              <RiShapesFill className="me-2" />
                              Event Type
                            </dt>
                            <dd className="small-text">
                              {item.event_type?.name}
                            </dd>

                            <dt className="d-flex align-items-center small-text-sm">
                              <FaLocationDot className="me-2" />
                              Region
                            </dt>
                            <dd className="small-text">{item.region}</dd>
                          </dl>
                        </div>
                        <div className="col-md-6">
                          <dl className="row mb-0">
                            <dt className="d-flex align-items-center small-text-sm">
                              <BiTime className="me-2" />
                              Start Date
                            </dt>
                            <dd className="small-text">
                              {moment(item.start_time)
                                .tz("Africa/Johannesburg")
                                .format("MMM Do YYYY, (h:mm A)")}
                            </dd>

                            <dt className="d-flex align-items-center small-text-sm">
                              <BiTime className="me-2" />
                              End Date
                            </dt>
                            <dd className="small-text">
                              {moment(item.end_time)
                                .tz("Africa/Johannesburg")
                                .format("MMM Do YYYY, (h:mm A)")}
                            </dd>
                          </dl>
                        </div>
                      </div>

                      <hr />
                      {/* Assuming RegisteredButton is a component for your button */}
                      <RegisteredButton row={item} />
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div className="w-100 text-center mb-3">
                There are no events for you to rate!
              </div>
            )}
          </div>
        </form>
        {/* 
          <Pagination
            currentPage={currentPage}
            totalPages={
              rateEvents.users
                ? Math.ceil(rateEvents.totalPages / itemsPerPage)
                : 0
            }
            onPageChange={handlePageChange}
          />
        */}
      </div>
    </>
  )
}

export default index
