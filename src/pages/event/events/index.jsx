import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap"
import EventRegister from "./EventRegister"
import EditEvent from "./EditEvent"
import DeleteEvent from "./DeleteEvent"
import { useDispatch, useSelector } from "react-redux"
import {
  getEvents,
  getEventDropdownList,
  getInstructors,
  getActivities,
  getHOBs,
} from "./store/eventsSlice"
import QRCode from "qrcode"
import { BsQrCode } from "react-icons/bs"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import AssignedUsers from "./AssignedUsers"
import AssignedVehicles from "./AssignedVehicles"
import Loading from "../../../components/Loader/loader"
import Notes from "./Notes"
import { useRef } from "react"
import toast from "react-hot-toast"
import { FaCircleUser } from "react-icons/fa6"

import { MdMessage } from "react-icons/md"
import { MdDelete, MdEdit } from "react-icons/md"
import moment from "moment-timezone"
import Select from "react-select"
import AddEventGuestFromDropdown from "../addRemoveGuests/AddEventGuestFromDropdown"
import { Avatar, Chip } from "@mui/material"
import ViewEvent from "./ViewEvent"

const index = () => {
  const dispatch = useDispatch()
  const qrCodeRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [showViewEventModal, setShowViewEventModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showGuestsModal, setShowGuestsModal] = useState(false)
  const [showVehiclesModal, setShowVehiclesModal] = useState(false)
  const [showAddGuestsModal, setShowAddGuestsModal] = useState(false)
  const [showInstructorsModal, setShowInstructorsModal] = useState(false)
  const [showHOBModal, setShowHOBModal] = useState(false)
  const [showActivitiesModal, setShowActivitiesModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [showQRCodeModal, setShowQRCodeModal] = useState(false)

  const [eventList, setEventList] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")
  const [qrcode, setQrcode] = useState("")

  const { users, totalPages, loading, activities, instructors, hobs } =
    useSelector((state) => state.events)

  const handleSelectChange = (event, row) => {
    const selectedAction = event.target.value

    switch (selectedAction) {
      case "add-guests":
        handleShowAddGuestsModal(row)
        break
      case "add-vehicles":
        handleEditShowModal(row)
        break
      case "edit":
        handleEditShowModal(row)
        break
      case "view":
        handleViewEventShowModal(row)
        break
      case "delete":
        handleDeleteShowModal(row)
        break
      case "view-notes":
        handleShowNotesModal(row)
        break
      case "generate-qr":
        generateAndDownloadQRCode(row)
        break
      case "view-hobs":
        handleShowHOBModal(row)
        break
      case "view-activities":
        handleShowActivitiesModal(row)
        break
      case "view-instructors":
        handleShowInstructorsModal(row)
        break
      case "view-guests":
        handleShowGuestsModal(row)
        break
      case "view-vehicles":
        handleShowVehiclesModal(row)
        break
      default:
        break
    }
  }

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => {
        const startDateTime = moment.tz(
          `${row.start_time}`,
          "Africa/Johannesburg"
        )
        const endDateTime = moment.tz(`${row.end_time}`, "Africa/Johannesburg")
        const currentDate = moment.tz("Africa/Johannesburg")

        const isStartTimeInProgress = currentDate.isBetween(
          startDateTime,
          endDateTime,
          null,
          "[]"
        )
        const isCompleted = currentDate.isAfter(endDateTime)

        return (
          // <div className="d-flex justify-content-center">
          //   <Button
          //     title="Edit"
          //     className="ms-2"
          //     size="sm"
          //     variant="outline-dark"
          //     onClick={() => handleEditShowModal(row)}
          //   >
          //     <MdEdit size={17} />
          //   </Button>
          //   <Button
          //     size="sm"
          //     className="ms-2"
          //     variant="outline-dark"
          //     title="Delete"
          //     onClick={() => handleDeleteShowModal(row)}
          //   >
          //     <MdDelete size={17} />
          //   </Button>
          //   <Button
          //     title="View Notes"
          //     className="ms-2"
          //     size="sm"
          //     variant="outline-dark"
          //     onClick={() => handleShowNotesModal(row)}
          //   >
          //     <MdMessage  size={"17"} className="library-icons" />
          //   </Button>
          //   <Button
          //     title="Generate QR Code"
          //     className="ms-2"
          //     size="sm"
          //     variant="outline-dark"
          //     onClick={() => generateAndDownloadQRCode(row)}
          //   >
          //     <BsQrCode />
          //   </Button>
          // </div>
          <div className="dropdown-container dark-mode">
            <select
              className="dropdown-select"
              onChange={(event) => handleSelectChange(event, row)}
              value=""
            >
              <option value="">Select an action</option>
              {isStartTimeInProgress || isCompleted ? (
                <option value="view">View</option>
              ) : (
                <option value="edit">Edit</option>
              )}
              <option value="generate-qr">Generate QR Code</option>
              {!isStartTimeInProgress && (
                <option value="add-guests">Add Guests</option>
              )}
              {/* <option value="add-vehicles">Add Vehicles</option> */}
              <option value="view-vehicles">View Vehicles</option>
              <option value="view-guests">View Guests</option>
              <option value="view-notes">View Notes</option>
              <option value="view-hobs">View HOBs</option>
              <option value="view-activities">View Activities</option>
              <option value="view-instructors">View Instructors</option>
              <option value="delete">Delete</option>
            </select>
          </div>

          // <Select
          // classNamePrefix="react-select"
          //   options={actionOptions}
          //   isSearchable={false}
          //   onChange={() => handleSelectChange(selectedOption, row)}
          //   placeholder="Action buttons"
          // />
        )
      },
    },
    // {
    //   key: "progress1",
    //   label: "Status",
    //   cell: (row) => (
    //     <Select
    //       options={actionOptions}
    //       isSearchable={false}
    //       onChange={(selectedOption) => handleSelectChange(selectedOption, row)}
    //       placeholder="Action buttons"
    //     />
    //   ),
    // },
    {
      key: "progress",
      label: "Status",
      cell: (row) => {
        const startDateTime = moment.tz(
          `${row.start_time}`,
          "Africa/Johannesburg"
        )
        const endDateTime = moment.tz(`${row.end_time}`, "Africa/Johannesburg")
        const currentDate = moment.tz("Africa/Johannesburg")

        const isStartTimeInProgress = currentDate.isBetween(
          startDateTime,
          endDateTime,
          null,
          "[]"
        )
        const isEndTimeInProgress =
          currentDate.isSameOrAfter(startDateTime) &&
          currentDate.isBefore(endDateTime)
        const isCompleted = currentDate.isAfter(endDateTime)

        return (
          <Chip
            variant="outlined"
            label={
              isStartTimeInProgress
                ? "In Progress"
                : isCompleted
                ? "Completed"
                : isEndTimeInProgress
                ? "Scheduled"
                : "Upcoming"
            }
            size="small"
            color={
              isStartTimeInProgress
                ? "success"
                : isCompleted
                ? "error"
                : "primary"
            }
          />
          // <span
          //   className={`${
          //     isStartTimeInProgress
          //       ? "bg-dark"
          //       : isCompleted
          //       ? "bg-primary"
          //       : "bg-warning"
          //   }
          //   badge fw-medium text-xs text-capitalize`}
          // >
          //   {isStartTimeInProgress
          //     ? "In progress"
          //     : isCompleted
          //     ? "Completed"
          //     : isEndTimeInProgress
          //     ? "Scheduled"
          //     : "Upcoming"}
          // </span>
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
        <div className={"text-capitalize"}>{row.event_code || "--"}</div>
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
    // {
    //   key: "hob_list",
    //   label: "HOBs",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <div className={"text-capitalize"}>
    //         <Button
    //           title="View HOBs List"
    //           className="ms-2"
    //           size="sm"
    //           variant="outline-dark"
    //           onClick={() => handleShowHOBModal(row)}
    //         >
    //           HOBs
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
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
    //       {row.start_time?.split(" ")[1] || "--"}
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
    //       {row.end_time?.split(" ")[1] || "--"}
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
    // {
    //   key: "activity_list",
    //   label: "Activity List",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <Button
    //         title="View Activity List"
    //         className="ms-2"
    //         size="sm"
    //         variant="outline-dark"
    //         onClick={() => handleShowActivitiesModal(row)}
    //       >
    //         Activities
    //       </Button>
    //     </div>
    //   ),
    // },
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
      key: "conference_room",
      label: "Conference Room",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.conference_room?.name || "--"}
        </div>
      ),
    },

    // {
    //   key: "instructor",
    //   label: "Instructor",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <div className={"text-capitalize"}>
    //         <Button
    //           title="View Instructors List"
    //           className="ms-2"
    //           size="sm"
    //           variant="outline-dark"
    //           onClick={() => handleShowInstructorsModal(row)}
    //         >
    //           Instructors
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },

    {
      key: "number_of_guest",
      label: "Number of Guest",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.number_of_guest || "--"}</div>
      ),
    },
    {
      key: "feedback_form_id",
      label: "Feedback Form",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.feedback_form_id?.feedbackName || "--"}
        </div>
      ),
    },
    {
      key: "indemnity_id",
      label: "Indemnity Form",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.indemnity_id?.form_name || "--"}
        </div>
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
    // {
    //   key: "view_guests",
    //   label: "Assigned Guests",
    //   cell: (row) => (
    //     <Button
    //       title="Edit"
    //       className="ms-2"
    //       size="sm"
    //       variant="outline-dark"
    //       onClick={() => handleShowGuestsModal(row)}
    //     >
    //       Views Guests
    //     </Button>
    //   ),
    // },
    // {
    //   key: "view_vehicles",
    //   label: "Assigned Vehicles",
    //   cell: (row) => (
    //     <Button
    //       title="Edit"
    //       className="ms-2"
    //       size="sm"
    //       variant="outline-dark"
    //       onClick={() => handleShowVehiclesModal(row)}
    //     >
    //       View Vehicles
    //     </Button>
    //   ),
    // },

    {
      key: "created_date",
      label: "Created Date",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.created_date || "--"}</div>
      ),
    },
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

  const handleViewEventShowModal = (row) => {
    setShowViewEventModal(true)
    setSelectedItem(row)
  }
  const handleViewEventHideModal = () => {
    setShowViewEventModal(false)
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

  const handleShowAddGuestsModal = (row) => {
    setShowAddGuestsModal(true)
    setSelectedItem(row)
  }
  const handleHideAddGuestsModal = () => {
    setShowAddGuestsModal(false)
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

  const handleShowHOBModal = (row) => {
    setShowHOBModal(true)
    setSelectedItem(row)
  }
  const handleHideHOBModal = () => {
    setShowHOBModal(false)
    setSelectedItem({})
  }

  const handleShowNotesModal = (row) => {
    setShowNotesModal(true)
    setSelectedItem(row)
  }
  const handleHideNotesModal = () => {
    setShowNotesModal(false)
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

  const handleHideQRCodeModal = () => {
    setShowQRCodeModal(false)
    setSelectedEvent(null)
    setQrcode("")
  }

  const generateAndDownloadQRCode = async (row) => {
    const data = `${row.id}4f89${row.event_code}${row.event_name}`
    try {
      const canvas = await QRCode.toCanvas(qrCodeRef.current, data, {
        errorCorrectionLevel: "H",
        margin: 5,
        scale: 10,
      })
      const qrCodeDataURL = canvas.toDataURL("image/png")
      setShowQRCodeModal(true)
      setSelectedEvent(row.event_name)
      setQrcode(qrCodeDataURL)
      // const downloadLink = document.createElement("a")
      // downloadLink.href = qrCodeDataURL
      // downloadLink.download = `${row.event_name}.png`
      // downloadLink.click()
    } catch (error) {
      toast.error("Error generating QR code")
    }
  }

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

  const handleDownloadQR = () => {
    const downloadLink = document.createElement("a")
    downloadLink.href = qrcode
    downloadLink.download = `${selectedEvent}.png`
    downloadLink.click()
  }

  const getAllCategoryList = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getEvents({ query, page, perPage }))
    }
  }, [dispatch])

  useEffect(() => {
    if (selectedItem?.id && showHOBModal) {
      dispatch(getHOBs(selectedItem.id))
    }
  }, [showHOBModal, selectedItem])

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
    dispatch(getEventDropdownList())
  }, [])

  useEffect(() => {
    getAllCategoryList(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, currentPage, itemsPerPage])

  // useEffect(() => {
  //   setEventList(users)
  // }, [users])

  return (
    <>
      <Breadcrumb />
      <AddEventGuestFromDropdown
        showAddGuestsModal={showAddGuestsModal}
        handleHideAddGuestsModal={handleHideAddGuestsModal}
        selectedItem={selectedItem}
      />
      <EventRegister
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
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
      <Notes
        showNotesModal={showNotesModal}
        handleHideNotesModal={handleHideNotesModal}
        selectedItem={selectedItem}
      />
      <ViewEvent
        showViewEventModal={showViewEventModal}
        handleViewEventHideModal={handleViewEventHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <EditEvent
        showEditModal={showEditModal}
        handleEditHideModal={handleEditHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <DeleteEvent
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
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

      <Modal size="lg" show={showHOBModal} onHide={handleHideHOBModal}>
        <Modal.Header closeButton>
          <Modal.Title>HOBs</Modal.Title>
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
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {hobs && hobs.length > 0 ? (
                  hobs.map((hob, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{hob.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No HOBs Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideHOBModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showQRCodeModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        onHide={handleHideQRCodeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card m-auto">
            <img src={qrcode} alt="qr code" className="mb-2" />
            <Button variant="outline-dark" onClick={handleDownloadQR}>
              Download QR Code
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideQRCodeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Event List</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add Event
            </button>
          </div>
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
    </>
  )
}

export default index
