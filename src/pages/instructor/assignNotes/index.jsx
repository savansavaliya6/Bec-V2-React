import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Modal, Table } from "react-bootstrap"
// import EventRegister from "./EventRegister"
// import EditEvent from "./EditEvent"
// import DeleteEvent from "./DeleteEvent"
import { useDispatch, useSelector } from "react-redux"
import {
  getInstructors,
  getActivities,
} from "../../event/events/store/eventsSlice"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import AssignedUsers from "./AssignedUsers"
import AssignedVehicles from "../../event/events/AssignedVehicles"
import Loading from "../../../components/Loader/loader"
import { MdMessage } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import AddNote from "./AddNote"
import { getEvents } from "../schedule/store/instructorSlice"
import moment from "moment-timezone"
import { Avatar } from "@mui/material"
import { FcComments } from "react-icons/fc"

const index = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showGuestsModal, setShowGuestsModal] = useState(false)
  const [showVehiclesModal, setShowVehiclesModal] = useState(false)
  const [showInstructorsModal, setShowInstructorsModal] = useState(false)
  const [showActivitiesModal, setShowActivitiesModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const { activities, instructors } = useSelector((state) => state.events)
  const { events } = useSelector((state) => state.instructor)

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center">
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
        <div className={"text-capitalize"}>{row.event_code || "--"}</div>
      ),
    },
    {
      key: "event_category",
      label: "Event Category",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.event_category?.name || "--"}
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
    {
      key: "activity_list",
      label: "Activity List",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Button
            title="View Activity List"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleShowActivitiesModal(row)}
          >
            Activities
          </Button>
        </div>
      ),
    },
    {
      key: "retailer",
      label: "Retailer",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.retailer?.dealer_name || "--"}
        </div>
      ),
    },
    {
      key: "project_manager",
      label: "Project Manager",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.project_manager || "--"}</div>
      ),
    },

    {
      key: "instructor",
      label: "Instructor",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <div className={"text-capitalize"}>
            <Button
              title="View Instructors List"
              className="ms-2"
              size="sm"
              variant="outline-dark"
              onClick={() => handleShowInstructorsModal(row)}
            >
              Instructors
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "number_of_guest",
      label: "Number of Guest",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.number_of_guest || "--"}</div>
      ),
    },

    {
      key: "attendance",
      label: "Multiday Attendance",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.attendance == 1 ? "Yes" : "No" || "--"}
        </div>
      ),
    },
    {
      key: "view_guests",
      label: "Assigned Guests",
      cell: (row) => (
        <Button
          title="Edit"
          className="ms-2"
          size="sm"
          variant="outline-dark"
          onClick={() => handleShowGuestsModal(row)}
        >
          Views Guests
        </Button>
      ),
    },
    {
      key: "view_vehicles",
      label: "Assigned Vehicles",
      cell: (row) => (
        <Button
          title="Edit"
          className="ms-2"
          size="sm"
          variant="outline-dark"
          onClick={() => handleShowVehiclesModal(row)}
        >
          View Vehicles
        </Button>
      ),
    },
    {
      key: "created_date",
      label: "Created Date",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.created_date || "--"}</div>
      ),
    },
  ]

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

  const handleAddShowModal = () => {
    setShowModal(true)
    setSelectedItem({})
  }

  const handleAddHideModal = () => {
    setShowModal(false)
  }

  const handleEditShowModal = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleEditHideModal = () => {
    setShowEditModal(false)
    setSelectedItem({})
  }

  const handleDeleteShowModal = (row) => {
    setShowDeleteModal(true)
    setSelectedItem(row)
  }

  const handleDeleteHideModal = () => {
    setShowDeleteModal(false)
    setSelectedItem({})
  }

  const handleShowGuestsModal = (row) => {
    setShowGuestsModal(true)
    setSelectedItem(row)
  }
  const handleHideGuestsModal = () => {
    setShowGuestsModal(false)
    setSelectedItem({})
  }
  const handleShowVehiclesModal = (row) => {
    setShowVehiclesModal(true)
    setSelectedItem(row)
  }
  const handleHideVehiclesModal = () => {
    setShowVehiclesModal(false)
    setSelectedItem({})
  }

  const handleShowInstructorsModal = (row) => {
    setShowInstructorsModal(true)
    setSelectedItem(row)
  }
  const handleHideInstructorsModal = () => {
    setShowInstructorsModal(false)
    setSelectedItem({})
  }

  const handleShowActivitiesModal = (row) => {
    setShowActivitiesModal(true)
    setSelectedItem(row)
  }
  const handleHideActivitiesModal = () => {
    setShowActivitiesModal(false)
    setSelectedItem({})
  }

  const handleAddNoteShowModal = (data) => {
    setSelectedItem(data)
    setShowAddNoteModal(true)
  }

  const handleAddNoteHideModal = () => {
    setShowAddNoteModal(false)
    setSelectedItem({})
  }

  useEffect(() => {
    if (selectedItem?.id && showInstructorsModal) {
      dispatch(getInstructors(selectedItem.id))
    }
  }, [showInstructorsModal, selectedItem])

  useEffect(() => {
    if (selectedItem?.id && showActivitiesModal) {
      dispatch(getActivities(selectedItem.id))
    }
  }, [showActivitiesModal, selectedItem])

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  return (
    <>
      <Breadcrumb />

      <AssignedUsers
        showGuestsModal={showGuestsModal}
        handleHideGuestsModal={handleHideGuestsModal}
        selectedItem={selectedItem}
      />
      <AssignedVehicles
        showVehiclesModal={showVehiclesModal}
        handleHideVehiclesModal={handleHideVehiclesModal}
        selectedItem={selectedItem}
      />

      <AddNote
        showAddNoteModal={showAddNoteModal}
        handleAddNoteHideModal={handleAddNoteHideModal}
        selectedItem={selectedItem}
        type="event"
      />

      <Modal
        size="lg"
        show={showInstructorsModal}
        onHide={handleHideInstructorsModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assigned Instructors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center" width={"10%"}>
                    Sr. No.
                  </th>
                  <th width={"60%"} className="text-center">
                    Avatar
                  </th>
                  <th width={"60%"} className="text-center">
                    Name
                  </th>
                  <th width={"60%"} className="text-center">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructors && instructors.length > 0 ? (
                  instructors.map((instructor, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {instructor?.user_details?.avatar ? (
                          <img
                            class="circular--square"
                            src={instructor?.user_details?.avatar}
                          />
                        ) : (
                          <div className="d-flex justify-content-center">
                            <Avatar
                              {...stringAvatar(
                                `${instructor?.user_details?.f_name} ${instructor?.user_details?.l_name}`
                              )}
                            />
                          </div>
                          // <FaCircleUser size={32} />
                        )}
                      </td>
                      <td className="text-center">{instructor.name}</td>
                      <td className="text-center">{instructor.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Instructors Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideInstructorsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={showActivitiesModal}
        onHide={handleHideActivitiesModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center" width={"10%"}>
                    Sr. No.
                  </th>
                  <th width={"60%"} className="text-center">
                    Activity Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities && activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{activity.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No Activities Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideActivitiesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
              {/* {loading ? (
                <Loading />
              ) : events && events.length ? (
                <> */}
              <DataTable data={events} columns={columns} />
            </div>
          </div>
        </form>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={events ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </>
  )
}

export default index
