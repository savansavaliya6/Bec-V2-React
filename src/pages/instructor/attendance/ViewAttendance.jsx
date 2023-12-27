import moment from "moment"
import React, { useState } from "react"
import { useEffect } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import { AiFillEye } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { getGuestNotes, getNotes } from "../../event/events/store/eventsSlice"
import { getAttendance } from "../schedule/store/instructorSlice"
import { Checkbox } from "@mui/material"

const ViewAttendance = ({
  selectedItem,
  showAttendanceModal,
  handleAttendanceHideModal,
  eventId,
}) => {
  const dispatch = useDispatch()

  const {
    attendanceList: { events },
  } = useSelector((state) => state.instructor)

  useEffect(() => {
    if (selectedItem?.id && showAttendanceModal) {
      let payload = {
        event_id: eventId,
        customer_id: selectedItem.customer_id,
      }
      dispatch(getAttendance(payload))
    }
  }, [selectedItem?.id])

  return (
    <Modal
      size="lg"
      show={showAttendanceModal}
      onHide={handleAttendanceHideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>View Attendance Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th width={"50%"} className="text-center">
                Event Date
              </th>
              <th className="text-center">Checked in</th>
              <th className="text-center">Present</th>
            </tr>
          </thead>
          <tbody>
            {events && events?.length > 0 ? (
              events.map((event, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {event.event_date?.split(" ")[0]}
                  </td>
                  <td className="text-center">
                    {/* {event.check_in ? "Checked In" : "Not Checked In"} */}

                    <Checkbox
                      title="Checked in Status"
                      className="ms-2 checkboxes"
                      size="sm"
                      variant="primary"
                      checked={event.check_in}
                      // disabled
                    ></Checkbox>
                  </td>
                  <td className="text-center">
                    {/* {event.is_attend ? "Present" : "Absent"} */}
                    <Checkbox
                      title="Present Status"
                      className="ms-2 checkboxes"
                      size="sm"
                      variant="outline-dark"
                      checked={event.is_attend}
                      // disabled
                    ></Checkbox>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No Attendance Report Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleAttendanceHideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ViewAttendance
