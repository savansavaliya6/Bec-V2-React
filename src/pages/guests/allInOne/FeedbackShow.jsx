import React, { Fragment, useState } from "react"
import { useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getUserFeedback } from "../../administration/feedback_form/store/FeedbackSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const FeedbackShow = ({
  showFeedbackModal,
  handleHideFeedbackModal,
  selectedItem,
  event,
}) => {
  const [currentCustomer, setCurrentCustomer] = useState([])
  const dispatch = useDispatch()
  const { userFeedback } = useSelector((state) => state.feedback)
  useEffect(() => {
    if (showFeedbackModal) {
      let obj = {
        customerhash: selectedItem.customerhash,
        event_id: event.id,
        form_id: event.feedback_form_id.id,
      }
      dispatch(getUserFeedback(obj))
      let filteredData = event?.event_customer?.filter(
        (i) => i?.assign_customer?.customerhash == selectedItem?.customerhash
      )
      setCurrentCustomer(filteredData)
    }
  }, [showFeedbackModal])

  const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 10 }, (_, index) => (
      <FontAwesomeIcon
        icon={faStar}
        key={index}
        size="2x"
        className="me-1"
        style={{ color: index < rating ? "#ffc107" : "#d4d4d4" }}
      />
    ))

    return <>{stars}</>
  }

  const StarRatingInstructors = ({ rating }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="2x"
            className="me-1"
            style={{ color: "#ffc107" }}
          />
        )
      } else if (index === fullStars && hasHalfStar) {
        return (
          <FontAwesomeIcon
            icon={faStarHalf}
            key={index}
            size="2x"
            className="me-1"
            style={{ color: "#ffc107" }}
          />
        )
      } else {
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="2x"
            className="me-1"
            style={{ color: "#d4d4d4" }}
          />
        )
      }
    })

    return <>{stars}</>
  }

  return (
    <Modal size="xl" show={showFeedbackModal} onHide={handleHideFeedbackModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ratings, Feedback and Interests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div className="card mb-3">
          <div className="card-body"> */}

        <table className="table">
          <tbody>
            <tr>
              <td>Event Rating</td>
              <td>
                {event?.event_rating?.length ? (
                  event?.event_rating?.map((i, index) => (
                    <div
                      key={index}
                      className={`badge ${
                        i.rate > 5 ? "bg-primary" : "bg-danger"
                      } me-2`}
                    >
                      <StarRating rating={i?.rate} />
                    </div>
                  ))
                ) : (
                  <span className="badge bg-secondary">Not Given</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Instructor Rating</td>
              <td>
                {event?.instructor_rating?.length ? (
                  event?.instructor_rating?.map((i, index) => (
                    <div
                      key={index}
                      className={`d-flex align-items-center ${
                        index !== event?.instructor_rating?.length - 1
                          ? "mb-1"
                          : ""
                      }`}
                    >
                      <span
                        className={`badge ${
                          i.rate > 2.5 ? "bg-primary" : "bg-danger"
                        } me-2`}
                      >
                        <StarRatingInstructors rating={i?.rate} />
                      </span>
                      <span className="me-2">for</span>
                      <span className="instructor-name">
                        {i?.instructor_id?.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="badge bg-secondary">Not Given</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Guest Interests</td>
              <td>
                {currentCustomer?.length ? (
                  <>
                    {currentCustomer[0]?.assign_customer?.interests
                      .split(",")
                      .map((i, index) => (
                        <span className="badge bg-primary me-2 p-2" key={index}>
                          {i}
                        </span>
                      ))}
                  </>
                ) : (
                  "Not selected any"
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">User Feedback</h5>

            {userFeedback.length ? (
              userFeedback.map((i, index) => (
                <div key={i.id} className="mb-3">
                  <div className="border p-3 rounded feedback-card question">
                    <div className="d-flex">
                      <p className="fw-bold mb-3 me-2 question-number">{`Question ${
                        index + 1
                      }:`}</p>
                      <p className="mb-3 question-text">
                        {i.question?.question_text}
                      </p>
                    </div>

                    <div className="d-flex">
                      <p className="me-2 fw-bold">Answer:</p>
                      {i.question_type_id === 1 ? (
                        <p className="answer-text">
                          {JSON.parse(i.input_ans).join(", ")}
                        </p>
                      ) : (
                        <p className="answer-text">{i.input_ans}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Feedback Given</p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleHideFeedbackModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FeedbackShow
