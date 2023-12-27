import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Card, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import Loading from "../../../components/Loader/loader"
import { getFeedbackEvents } from "../store/customersSlice"
import AddFeedback from "./AddFeedback"
import { useParams } from "react-router-dom"
import moment from "moment-timezone"
import { TbBoxModel2 } from "react-icons/tb"
import { BiTime } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { RiShapesFill } from "react-icons/ri"
import { Chip } from "@mui/material"

const index = () => {
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => {
        let filteredData = row?.event_customer?.filter(
          (i) => i?.assign_customer?.customerhash == id
        )
        return (
          <div className="d-flex justify-content-center">
            {filteredData.length && filteredData[0].is_given_feedback ? (
              <span
                className="bg-primary
                badge fw-medium text-xs text-capitalize"
              >
                Given Feedback
              </span>
            ) : (
              <Button
                title="Give Feedback"
                className="ms-2"
                size="sm"
                variant="outline-dark"
                onClick={() => handleAddShowModal(row)}
              >
                Give Feedback
              </Button>
            )}
          </div>
        )
      },
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

  const RegisteredButton = ({ row }) => {
    let filteredData = row?.event_customer?.filter(
      (i) => i?.assign_customer?.customerhash == id
    )
    return (
      <>
        {filteredData.length && filteredData[0].is_given_feedback ? (
          <Chip
            variant="outlined"
            label={"Feedback Submitted"}
            size="small"
            color={"primary"}
          />
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal(row)}
            >
              Give Feedback
            </button>
          </div>
        )}
      </>
    )
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage, id) => {
      dispatch(getFeedbackEvents({ query, page, perPage, customerhash: id }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage, id)
  }, [searchTerm, itemsPerPage, currentPage, id])

  return (
    <>
      <AddFeedback
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
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
          /> */}
          {/* <div className="table-wrapper">
            <div className="table-wrapper table-responsive">
              <DataTable data={users} columns={columns} />
            </div>
          </div> */}
          {/* <div>
            {users.length ? (
              users.map((item) => (
                <div key={item.id}>
                  <Card className="question mb-2">
                    <Card.Body>
                      <Card.Title className="text-uppercase">
                        {item.event_name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted text-decoration-underline">
                        {item.event_code}
                      </Card.Subtitle>
                      <br></br>
                      <div className="row">
                        <div className="col-12">
                          <Card.Text>
                            <b>Event Category</b> :{" "}
                            {item.event_category?.categorieName}
                            <br />
                            <b>Event Type</b> : {item.event_type?.name}
                            <br />
                          </Card.Text>
                        </div>
                        <div className="col-12">
                          <Card.Text>
                            <b>Start Date</b> :{" "}
                            {moment(item.start_time)
                              .tz("Africa/Johannesburg")
                              .format("MMM Do YYYY, (h:mm A)")}
                            <br />
                            <b>End Date</b> :{" "}
                            {moment(item.end_time)
                              .tz("Africa/Johannesburg")
                              .format("MMM Do YYYY, (h:mm A)")}
                            <br />
                          </Card.Text>
                        </div>
                        <div className="col-12">
                          <Card.Text>
                            <b>Region</b> : {item.region}
                          </Card.Text>
                        </div>
                      </div>
                      <hr></hr>
                      {<RegisteredButton row={item} />}
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div className="w-100 text-center mb-3">
                There are no events for you to give feedback!
              </div>
            )}
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
                There are no events for you to Give Feedback!
              </div>
            )}
          </div>
        </form>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </>
  )
}

export default index
