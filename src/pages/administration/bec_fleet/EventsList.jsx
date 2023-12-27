import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getFleetAssignedEvents } from "./store/becFleetSlice"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment-timezone"

const index = ({ showEventList, handleEventListHideModal, selectedItem }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    {
      key: "event_name",
      label: "Event Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.events.event_name || "--"}</div>
      ),
    },
    {
      key: "event_code",
      label: "Event Code",
      cell: (row) => <div>{row.events.event_code || "--"}</div>,
    },

    {
      key: "start_date",
      label: "Start Date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.events.start_time)
            .tz("Africa/Johannesburg")
            .format("DD/MM/YYYY (h:mm A)")}

          {/* {row.events.start_date || "--"} */}
        </div>
      ),
    },
    // {
    //   key: "start_time",
    //   label: "Start Time",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {moment(row.events.start_time).format("HH:mm") || "--"}
    //       {/* {row.events.start_time?.split(" ")[1] || "--"} */}
    //     </div>
    //   ),
    // },
    {
      key: "end_date",
      label: "End Date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.events.end_time)
            .tz("Africa/Johannesburg")
            .format("DD/MM/YYYY (h:mm A)")}

          {/* {row.events.end_date || "--"} */}
        </div>
      ),
    },
    // {
    //   key: "end_time",
    //   label: "End Time",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {moment(row.events.end_time).format("HH:mm") || "--"}
    //       {/* {row.events.end_time?.split(" ")[1] || "--"} */}
    //     </div>
    //   ),
    // },
    {
      key: "region",
      label: "Region",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.events.region || "--"}</div>
      ),
    },

    {
      key: "project_manager",
      label: "Project Manager",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.events.project_manager || "--"}
        </div>
      ),
    },

    {
      key: "created_date",
      label: "Created Date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.events.created_date || "--"}
        </div>
      ),
    },
  ]

  const dispatch = useDispatch()
  const {
    events: { users, totalPages, loading },
  } = useSelector((state) => state.fleets)

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
    return (query, page, perPage, selectedItem) => {
      selectedItem.id &&
        dispatch(
          getFleetAssignedEvents({
            query,
            page,
            perPage,
            vehicle_id: selectedItem.id,
          })
        )
    }
  }, [dispatch])

  useEffect(() => {
    showEventList &&
      getAllUsers(searchTerm, currentPage, itemsPerPage, selectedItem)
  }, [searchTerm, itemsPerPage, currentPage, selectedItem])

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <Modal size="xl" show={showEventList} onHide={handleEventListHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Event List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <form className="card-body">
              <hr></hr>
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
              currentPage={currentPage}
              totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
              onPageChange={handlePageChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleEventListHideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default index
