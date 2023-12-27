import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Card, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import Loading from "../../../components/Loader/loader"
import { checkIn, getCheckInEvents } from "../store/customersSlice"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { QrReader } from "react-qr-reader"
import moment from "moment-timezone"
import { TbBoxModel2 } from "react-icons/tb"
import { BiTime } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { RiShapesFill } from "react-icons/ri"
import { Chip } from "@mui/material"

const index = () => {
  const { id } = useParams()
  const [showQR, setShowQR] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")
  const [apiInProgress, setApiInProgress] = useState(false)

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
            {filteredData.length && filteredData[0].check_in ? (
              <span
                className="bg-primary
                badge fw-medium text-xs text-capitalize"
              >
                Checked-In
              </span>
            ) : (
              <Button
                title="Check In"
                className="ms-2"
                size="sm"
                variant="outline-dark"
                onClick={() => handleCheckIn(row)}
              >
                Check In
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
        <div className={"text-capitalize"}>
          {moment(row.start_time)
            .tz("Africa/Johannesburg")
            .format("DD/MM/YYYY (h:mm A)")}

          {/* {row.start_date || "--"} */}
        </div>
      ),
    },
    // {
    //   key: "start_time",
    //   label: "Start Time",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>

    //       {row.start_time.split(" ")[1] || "--"}
    //     </div>
    //   ),
    // },
    {
      key: "end_date",
      label: "End Date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.end_time)
            .tz("Africa/Johannesburg")
            .format("DD/MM/YYYY (h:mm A)")}

          {/* {row.end_date || "--"} */}
        </div>
      ),
    },
    // {
    //   key: "end_time",
    //   label: "End Time",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.end_time.split(" ")[1] || "--"}
    //     </div>
    //   ),
    // },
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
    checkInEvents: { users, totalPages, loading },
  } = useSelector((state) => state.customers)

  const handleCheckIn = (row) => {
    setShowQR(true)
    setSelectedItem(row)
  }

  const handleScan = async (data) => {
    if (apiInProgress) {
      return
    }

    if (data)
      if (
        data.text ==
        `${selectedItem.id}4f89${selectedItem.event_code}${selectedItem.event_name}`
      ) {
        setApiInProgress(true)
      } else {
        toast.error("Wrong QR Code")
      }
  }

  const checkInAPI = async () => {
    try {
      const response = await dispatch(
        checkIn({
          customerhash: id,
          event_id: selectedItem.id,
        })
      ).unwrap()

      if (response.data.status) {
        // toast.success("Success")
        setApiInProgress(false)

        setShowQR(false)
      }
    } catch (error) {
      console.error("API error:", error)
      toast.error("Error during API call")
      setApiInProgress(false)
    }
  }

  useEffect(() => {
    if (apiInProgress) {
      checkInAPI()
    }
  }, [apiInProgress])

  const handleError = (error) => {
    toast.error("Error scanning QR Code")
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

  const RegisteredButton = ({ row }) => {
    let filteredData = row?.event_customer?.filter(
      (i) => i?.assign_customer?.customerhash == id
    )
    return (
      <>
        {filteredData.length && filteredData[0].check_in ? (
          <Chip
            variant="outlined"
            label={"Checked in"}
            size="small"
            color={"primary"}
          />
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleCheckIn(row)}
            >
              Check In
            </button>
          </div>
        )}
      </>
    )
  }

  // const getAllUsers = useMemo(() => {
  //   return (query, page, perPage, id) => {
  //     dispatch(getCheckInEvents({ query, page, perPage, customerhash: id }))
  //   }
  // }, [])

  // useEffect(() => {
  //   getAllUsers(searchTerm, currentPage, itemsPerPage, id)
  // }, [searchTerm, itemsPerPage, currentPage, id])

  useEffect(() => {
    dispatch(getCheckInEvents({ customerhash: id }))
  }, [])

  return (
    <>
      {showQR ? (
        <Modal size="lg" show={showQR} onHide={() => setShowQR(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Scan QR to Check-In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row g-3" style={{ border: "2px solid black" }}>
              <QrReader
                onResult={handleScan}
                onError={handleError}
                containerStyle={{ margin: "auto", width: "50%", height: "50%" }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setShowQR(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
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
                There are no events for you to Check In!
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
