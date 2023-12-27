import moment from "moment"
import React, { useEffect, useState } from "react"
import { Button, Card, Modal, Table } from "react-bootstrap"
import { BiSolidBusiness, BiSolidUserRectangle, BiTime } from "react-icons/bi"
import { FaIdCardClip, FaLocationDot } from "react-icons/fa6"
import { RiShapesFill } from "react-icons/ri"
import { TbBoxModel2 } from "react-icons/tb"
import { GiHomeGarage } from "react-icons/gi"
import { FcManager } from "react-icons/fc"
import {
  MdLocalActivity,
  MdMeetingRoom,
  MdOutlineNumbers,
} from "react-icons/md"
import { useSelector } from "react-redux"
import { FaUserTie } from "react-icons/fa"

const ViewEvent = ({
  showViewEventModal,
  handleViewEventHideModal,
  selectedItem,
}) => {
  const { eventDropdown } = useSelector((state) => state.events)
  const [activityList, setActivityList] = useState([])
  const [instructorList, setInstructorList] = useState([])
  const [hobList, setHobList] = useState([])

  useEffect(() => {
    if (selectedItem?.id) {
      if (eventDropdown?.activities?.length > 0) {
        let activity_data = eventDropdown?.activities?.map((item, index) => ({
          value: item.id,
          label: item.name,
        }))

        const activitiesId = JSON.parse(selectedItem.activity_list).length
          ? JSON.parse(selectedItem.activity_list)
          : []
        let activities = activity_data
          ?.filter((item) => activitiesId.includes(item.value))
          .map((i) => i.label)

        setActivityList(activities)
      }

      if (eventDropdown?.instructor?.length) {
        let instructor_data = eventDropdown.instructor.map(
          (instructor, index) => ({
            value: instructor.id,
            label: instructor.name,
          })
        )

        const activitiesId = JSON.parse(selectedItem.instructor).length
          ? JSON.parse(selectedItem.instructor)
          : []
        let activities = instructor_data
          ?.filter((item) => activitiesId.includes(item.value))
          .map((i) => i.label)
        setInstructorList(activities)
      }

      if (eventDropdown?.hob?.length) {
        let hob = eventDropdown.hob.map((hob, index) => ({
          value: hob.id,
          label: hob.name,
        }))
        const activitiesId = JSON.parse(selectedItem.hob_list).length
          ? JSON.parse(selectedItem.hob_list)
          : []
        let activities = hob
          ?.filter((item) => activitiesId.includes(item.value))
          .map((i) => i.label)
        setHobList(activities)
      }
    }
  }, [eventDropdown, selectedItem])

  return (
    <Modal
      size="lg"
      show={showViewEventModal}
      onHide={handleViewEventHideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Event Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Card>
            <Card.Body>
              <Card.Title
                className="text-uppercase"
                style={{ fontSize: "1.4em" }}
              >
                {selectedItem?.event_name}
              </Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted text-decoration-underline">
                        {selectedItem?.event_code}
                      </Card.Subtitle> */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <dl className="row mb-0">
                    <dt className="d-flex align-items-center small-text-sm">
                      <BiTime className="me-2" />
                      Start Date
                    </dt>
                    <dd className="text-capitalize small-text">
                      {moment(selectedItem?.start_time)
                        .tz("Africa/Johannesburg")
                        .format("MMM Do YYYY, (h:mm A)")}
                    </dd>

                    <dt className="d-flex align-items-center small-text-sm">
                      <BiTime className="me-2" />
                      End Date
                    </dt>
                    <dd className="text-capitalize small-text">
                      {moment(selectedItem?.end_time)
                        .tz("Africa/Johannesburg")
                        .format("MMM Do YYYY, (h:mm A)")}
                    </dd>
                    <dt className="d-flex align-items-center small-text-sm">
                      <TbBoxModel2 className="me-2" />
                      Event Category
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.event_category?.categorieName}
                    </dd>

                    <dt className="d-flex align-items-center small-text-sm">
                      <RiShapesFill className="me-2" />
                      Event Type
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.event_type?.name}
                    </dd>

                    <dt className="d-flex align-items-center small-text-sm">
                      <FaLocationDot className="me-2" />
                      Region
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.region}
                    </dd>
                    <dt className="d-flex align-items-center small-text-sm">
                      <BiSolidBusiness className="me-2" />
                      Retailer
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.retailer?.dealer_name}
                    </dd>
                  </dl>
                </div>
                <div className="col-md-6">
                  <dl className="row mb-0">
                    <dt className="d-flex align-items-center small-text-sm">
                      <GiHomeGarage className="me-2" />
                      HOBs
                    </dt>
                    <dd className="text-capitalize small-text">
                      {hobList.length ? hobList.join(", ") : null}
                    </dd>
                    <dt className="d-flex align-items-center small-text-sm">
                      <MdLocalActivity className="me-2" />
                      Activities
                    </dt>
                    <dd className="text-capitalize small-text">
                      {activityList.length ? activityList.join(", ") : null}
                    </dd>

                    <dt className="d-flex align-items-center small-text-sm">
                      <FaUserTie className="me-2" />
                      Project Manager
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.project_manager}
                    </dd>
                    <dt className="d-flex align-items-center small-text-sm">
                      <MdOutlineNumbers className="me-2" />
                      No. of Guests
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.number_of_guest}
                    </dd>
                    <dt className="d-flex align-items-center small-text-sm">
                      <MdMeetingRoom className="me-2" />
                      Conference Room
                    </dt>
                    <dd className="text-capitalize small-text">
                      {selectedItem?.conference_room?.name}
                    </dd>
                    <dt className="d-flex align-items-center small-text-sm">
                      <FaIdCardClip className="me-2" />
                      Instructors
                    </dt>
                    <dd className="text-capitalize small-text">
                      {instructorList.length
                        ? instructorList.map((i, index) => (
                            <div key={index}>{`${index + 1}) ${i}`}</div>
                          ))
                        : null}
                    </dd>
                  </dl>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleViewEventHideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewEvent
