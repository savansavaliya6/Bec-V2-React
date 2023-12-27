import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FeedbackShow from "./FeedbackShow"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import { useParams } from "react-router-dom"
import { getHistory } from "../guest/store/guestSlice"
import { VscFeedback } from "react-icons/vsc"
import { FaAddressCard, FaFileSignature } from "react-icons/fa"
import {
  BiSolidBookAlt,
  BiSolidMessageAltDetail,
  BiSolidStar,
} from "react-icons/bi"
import { IoEnter } from "react-icons/io5"

import { BsFillBookmarkStarFill } from "react-icons/bs"
import moment from "moment-timezone"

const index = ({
  showCompletedEventsModal,
  handleCompletedEventsHideModal,
  selectedItem,
}) => {
  const [events, setEvents] = useState([])
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [event, setEvent] = useState({})
  const [type, setType] = useState("signature")

  const dispatch = useDispatch()
  const {
    history: { users, totalPages, loading },
  } = useSelector((state) => state.guests)

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Button
            title="View Feedback and Ratings"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleShowFeedbackModal(row)}
          >
            <VscFeedback size={"17"} className="library-icons" />
          </Button>
          <Button
            title="View Customer Indemnity"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => {
              handleShowSignatureModal(row)
              setType("signature")
            }}
          >
            <FaFileSignature size={"17"} className="library-icons" />
          </Button>
          <Button
            title="View Customer License"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => {
              handleShowSignatureModal(row)
              setType("licence")
            }}
          >
            <FaAddressCard size={"17"} className="library-icons" />
          </Button>
        </div>
      ),
    },
    // {
    //   key: "view_indemnity",
    //   label: "View Customer Signature",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <Button
    //         title="View Customer Signature"
    //         className="ms-2"
    //         size="sm"
    //         variant="outline-dark"
    //         onClick={() => handleShowSignatureModal(row)}
    //       >
    //         <FaFileSignature size={"17"} className="library-icons" />
    //       </Button>
    //     </div>
    //   ),
    // },
    {
      key: "status",
      label: "Status",
      cell: (row) => {
        let filteredData = row?.event_customer?.filter(
          (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
        )
        return (
          <>
            <span className="me-2 ml-2">
              <BiSolidBookAlt
                size={20}
                color={filteredData[0]?.is_registered ? "#4f6a92" : "#D3D3D3"}
                title={
                  filteredData[0]?.is_registered
                    ? "Registered"
                    : "Not Registered"
                }
              />
            </span>
            <span className="me-2">
              <IoEnter
                size={20}
                color={filteredData[0]?.check_in ? "#4f6a92" : "#D3D3D3"}
                title={
                  filteredData[0]?.check_in ? "Checked In" : "Not Checked In"
                }
              />
            </span>
            <span className="me-2">
              <BiSolidMessageAltDetail
                size={20}
                color={
                  filteredData[0]?.is_given_feedback ? "#4f6a92" : "#D3D3D3"
                }
                title={
                  filteredData[0]?.is_given_feedback
                    ? "Given Feedback"
                    : "Not Given Feedback"
                }
              />
            </span>
            <span className="me-2">
              <BiSolidStar
                size={20}
                color={filteredData[0]?.is_rated_event ? "#4f6a92" : "#D3D3D3"}
                title={
                  filteredData[0]?.is_rated_event
                    ? "Rated Event"
                    : "Not Rated Event"
                }
              />
            </span>
            <span className="me-2">
              <BsFillBookmarkStarFill
                size={20}
                color={
                  filteredData[0]?.is_rated_instructor ? "#4f6a92" : "#D3D3D3"
                }
                title={
                  filteredData[0]?.is_rated_instructor
                    ? "Rated Instructor"
                    : "Not Rated Instructor"
                }
              />
            </span>
          </>
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
    // {
    //   key: "event_category",
    //   label: "Event Category",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.event_category?.categorieName || "--"}
    //     </div>
    //   ),
    // },
    // {
    //   key: "event_type",
    //   label: "Event Type",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>{row.event_type?.name || "--"}</div>
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
    // {
    //   key: "retailer",
    //   label: "Retailer",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.retailer?.dealer_name || "--"}
    //     </div>
    //   ),
    // },
    {
      key: "project_manager",
      label: "Project Manager",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.project_manager || "--"}</div>
      ),
    },
    {
      key: "kin_contact_name",
      label: "Next of Kin Name",
      cell: (row) => {
        let filteredData = row?.event_customer?.filter(
          (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
        )
        return (
          <div className="d-flex justify-content-center">
            <span className={`text-capitalize`}>
              {filteredData.length && filteredData[0].assign_customer.kin_f_name
                ? `${filteredData[0].assign_customer.kin_f_name} ${filteredData[0].assign_customer.kin_l_name}`
                : "Not Registered"}
            </span>
          </div>
        )
      },
    },
    {
      key: "kin_contact",
      label: "Next of Kin Contact",
      cell: (row) => {
        let filteredData = row?.event_customer?.filter(
          (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
        )
        return (
          <div className="d-flex justify-content-center">
            <span className={`text-capitalize`}>
              {filteredData.length &&
              filteredData[0].assign_customer.kin_contact
                ? filteredData[0].assign_customer.kin_contact
                : "Not Registered"}
            </span>
          </div>
        )
      },
    },
    {
      key: "kin_contact_relation",
      label: "Next of Kin Relation",
      cell: (row) => {
        let filteredData = row?.event_customer?.filter(
          (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
        )
        return (
          <div className="d-flex justify-content-center">
            <span className={`text-capitalize`}>
              {filteredData.length && filteredData[0].assign_customer.relation
                ? filteredData[0].assign_customer.relation
                : "Not Registered"}
            </span>
          </div>
        )
      },
    },

    // {
    //   key: "conference_room",
    //   label: "Conference Room",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.conference_room?.name || "--"}
    //     </div>
    //   ),
    // },

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

    // {
    //   key: "number_of_guest",
    //   label: "Number of Guest",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>{row.number_of_guest || "--"}</div>
    //   ),
    // },
    // {
    //   key: "feedback_form_id",
    //   label: "Feedback Form",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.feedback_form_id?.feedbackName || "--"}
    //     </div>
    //   ),
    // },
    // {
    //   key: "indemnity_id",
    //   label: "Indemnity Form",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.indemnity_id?.form_name || "--"}
    //     </div>
    //   ),
    // },
    // {
    //   key: "attendance",
    //   label: "Multiday Attendance",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       {row.attendance == 1 ? "Yes" : "No" || "--"}
    //     </div>
    //   ),
    // },
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

    // {
    //   key: "is_given_feedback",
    //   label: "Given Feedback",
    //   cell: (row) => {
    //     let filteredData = row?.event_customer?.filter(
    //       (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
    //     )
    //     return (
    //       <div className="d-flex justify-content-center">
    //         <span
    //           className={`${
    //             filteredData.length && filteredData[0].is_given_feedback
    //               ? "bg-success"
    //               : "bg-secondary"
    //           }
    //             badge fw-medium text-xs text-capitalize`}
    //         >
    //           {filteredData.length && filteredData[0].is_given_feedback
    //             ? "Yes"
    //             : "No"}
    //         </span>
    //       </div>
    //     )
    //   },
    // },

    // {
    //   key: "is_rated_event",
    //   label: "Rated Event",
    //   cell: (row) => {
    //     let filteredData = row?.event_customer?.filter(
    //       (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
    //     )
    //     return (
    //       <div className="d-flex justify-content-center">
    //         <span
    //           className={`${
    //             filteredData.length && filteredData[0].is_rated_event
    //               ? "bg-success"
    //               : "bg-secondary"
    //           }
    //             badge fw-medium text-xs text-capitalize`}
    //         >
    //           {filteredData.length && filteredData[0].is_rated_event
    //             ? "Yes"
    //             : "No"}
    //         </span>
    //       </div>
    //     )
    //   },
    // },
    // {
    //   key: "is_rated_instructor",
    //   label: "Rated Instructor",
    //   cell: (row) => {
    //     let filteredData = row?.event_customer?.filter(
    //       (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
    //     )
    //     return (
    //       <div className="d-flex justify-content-center">
    //         <span
    //           className={`${
    //             filteredData.length && filteredData[0].is_rated_instructor
    //               ? "bg-success"
    //               : "bg-secondary"
    //           }
    //             badge fw-medium text-xs text-capitalize`}
    //         >
    //           {filteredData.length && filteredData[0].is_rated_instructor
    //             ? "Yes"
    //             : "No"}
    //         </span>
    //       </div>
    //     )
    //   },
    // },
  ]

  const handleShowFeedbackModal = (row) => {
    setShowFeedbackModal(true)
    setEvent(row)
  }
  const handleHideFeedbackModal = () => {
    setShowFeedbackModal(false)
    setEvent({})
  }

  const handleShowSignatureModal = (row) => {
    setShowSignatureModal(true)
    setEvent(row)
  }
  const handleHideSignatureModal = () => {
    setShowSignatureModal(false)
    setEvent({})
    setType("")
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
    if (selectedItem?.id && showCompletedEventsModal)
      dispatch(getHistory({ customerhash: selectedItem?.customerhash }))
  }, [selectedItem])

  useEffect(() => {
    setEvents(users)
  }, [users])

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <FeedbackShow
        showFeedbackModal={showFeedbackModal}
        handleHideFeedbackModal={handleHideFeedbackModal}
        selectedItem={selectedItem}
        event={event}
      />

      <Modal
        size="xl"
        show={showCompletedEventsModal}
        onHide={handleCompletedEventsHideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Guest Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <form className="card-body">
              <div className="table-wrapper">
                <div className="table-wrapper table-responsive">
                  <DataTable data={events} columns={columns} />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={handleCompletedEventsHideModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="xl"
        show={showSignatureModal}
        onHide={handleHideSignatureModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`View ${
            type == "signature" ? "Signature" : "Licence"
          }`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {event.id && renderDocument(event, selectedItem, type)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideSignatureModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default index

const renderDocument = (event, selectedItem, type) => {
  const filteredData =
    event?.event_customer?.length &&
    event?.event_customer?.filter(
      (i) => i?.assign_customer?.customerhash == selectedItem.customerhash
    )

  let documentUrl =
    type == "signature"
      ? filteredData?.length && filteredData[0]?.signature_signedURL
      : filteredData?.length &&
        filteredData[0]?.assign_customer?.license_signedURL[0]

  function getFileExtension(url) {
    const pathParts = url?.split("/")

    const fileName = pathParts[pathParts?.length - 1]
    const fileNameParts = fileName?.split(".")

    if (fileNameParts?.length > 1) {
      return fileNameParts[1].toLowerCase()
    }
    return ""
  }

  const extension = getFileExtension(documentUrl)

  if (
    extension.startsWith("jpg") ||
    extension.startsWith("jpeg") ||
    extension.startsWith("png") ||
    extension.startsWith("webp")
  ) {
    return (
      <div className="d-flex justify-content-center">
        <img
          border={"1px solid black"}
          src={`${documentUrl}`}
          alt="Image Document"
          className="img-fluid"
          width={"50%"}
          height={"50%"}
        />
      </div>
    )
  } else if (extension.startsWith("pdf")) {
    return (
      <iframe
        src={`${documentUrl}`}
        title="PDF Document"
        width="100%"
        height="500px"
      />
    )
  } else {
    return "Unsupported document format"
  }
}
