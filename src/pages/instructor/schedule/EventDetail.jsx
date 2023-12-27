import React from "react"
import { useState } from "react"
import { Button, Card, Col, Modal, Row } from "react-bootstrap"
import Table from "react-bootstrap/Table"
import {
  getActivities,
  getInstructors,
} from "../../event/events/store/eventsSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AssignedUsers from "./AssignedUsers"
import AssignedVehicles from "./AssignedVehicles"
import { FaCircleUser } from "react-icons/fa6"
import { Avatar } from "@mui/material"
import { BsCarFront, BsCardText, BsPeople, BsPerson } from "react-icons/bs"
import {
  FcConferenceCall,
  FcPodiumWithSpeaker,
  FcTodoList,
} from "react-icons/fc"

const EventDetail = ({
  data,
  showEventDetailModal,
  handleHideEventDetailModal,
  id,
}) => {
  const dispatch = useDispatch()
  const { activities, instructors } = useSelector((state) => state.events)

  const [showInstructorsModal, setShowInstructorsModal] = useState(false)
  const [showActivitiesModal, setShowActivitiesModal] = useState(false)
  const [showGuestsModal, setShowGuestsModal] = useState(false)
  const [showVehiclesModal, setShowVehiclesModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

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

  const handleShowInstructorsModal = (row) => {
    setShowInstructorsModal(true)
    setSelectedItem(id)
  }
  const handleHideInstructorsModal = () => {
    setShowInstructorsModal(false)
    setSelectedItem({})
  }

  const handleShowActivitiesModal = (row) => {
    setShowActivitiesModal(true)
    setSelectedItem(id)
  }
  const handleHideActivitiesModal = () => {
    setShowActivitiesModal(false)
    setSelectedItem({})
  }

  const handleShowGuestsModal = (row) => {
    setShowGuestsModal(true)
    let obj = { id }
    setSelectedItem(obj)
  }
  const handleHideGuestsModal = () => {
    setShowGuestsModal(false)
    setSelectedItem({})
  }

  const handleShowVehiclesModal = (row) => {
    setShowVehiclesModal(true)
    let obj = { id }
    setSelectedItem(obj)
  }
  const handleHideVehiclesModal = () => {
    setShowVehiclesModal(false)
    setSelectedItem({})
  }

  useEffect(() => {
    if (selectedItem && showInstructorsModal) {
      dispatch(getInstructors(selectedItem))
    }
  }, [showInstructorsModal, selectedItem])

  useEffect(() => {
    if (selectedItem && showActivitiesModal) {
      dispatch(getActivities(selectedItem))
    }
  }, [showActivitiesModal, selectedItem])

  return (
    <>
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
      <Modal
        size="xl"
        show={showEventDetailModal}
        onHide={handleHideEventDetailModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Event Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Table striped bordered hover>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
              <tr>
                <td>Activities</td>
                <td>
                  <Button
                    title="View Activity List"
                    className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowActivitiesModal(data)}
                  >
                    Activities
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Instructors</td>
                <td>
                  <Button
                    title="View Instructors List"
                    className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowInstructorsModal(data)}
                  >
                    Instructors
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Guests</td>
                <td>
                  <Button
                    title="View Guests List"
                    className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowGuestsModal(id)}
                  >
                    View Guests
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Vehicles</td>
                <td>
                  <Button
                    title="View Vehicles List"
                    className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowVehiclesModal(id)}
                  >
                    View Vehicles
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table> */}

          <Row>
            {Object.entries(data).map(([key, value]) => (
              <Col key={key} md={6} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{key}</Card.Title>
                    <Card.Text>{value}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            <Col md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <FcTodoList size={20} className="me-2 text-primary" />
                    Activities
                  </Card.Title>
                  <Button
                    title="View Activity List"
                    // className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowActivitiesModal(data)}
                  >
                    View Activities
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <FcPodiumWithSpeaker
                      size={20}
                      className="me-2 text-primary"
                    />
                    Instructors
                  </Card.Title>
                  <Button
                    title="View Instructors List"
                    // className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowInstructorsModal(data)}
                  >
                    View Instructors
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <FcConferenceCall size={20} className="me-2 text-primary" />
                    Guests
                  </Card.Title>
                  <Button
                    title="View Guests List"
                    // className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowGuestsModal(id)}
                  >
                    View Guests
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <BsCarFront size={20} className="me-2 text-primary" />
                    Vehicles
                  </Card.Title>
                  <Button
                    title="View Vehicles List"
                    // className="ms-2"
                    size="sm"
                    variant="outline-dark"
                    onClick={() => handleShowVehiclesModal(id)}
                  >
                    View Vehicles
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleHideEventDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EventDetail
