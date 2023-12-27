import { Form, Formik } from "formik"
import React from "react"
import { Button, Modal } from "react-bootstrap"
import { RadioInput } from "../../../components/Fields"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { rateEvent, rateInstructor } from "../store/customersSlice"
import * as yup from "yup"

const AddRating = ({
  showModal,
  handleAddHideModal,
  selectedOption,
  selectedItem,
  handleInstructorHideModal,
}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  let array = []
  if (selectedOption == "events") {
    for (let index = 1; index <= 10; index++) {
      array.push({ name: index, value: index })
    }
  } else {
    for (let index = 1; index <= 5; index++) {
      array.push({ name: index, value: index })
    }
  }

  let validationSchema

  validationSchema =
    selectedOption == "events"
      ? yup.object().shape({
          rate: yup
            .number()
            .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Please give ratings")
            .required("Please give ratings"),
        })
      : yup.object().shape({
          rate: yup
            .number()
            .oneOf([1, 2, 3, 4, 5], "Please give ratings")
            .required("Please give ratings"),
        })

  const handleSubmit = async (values) => {
    let obj = { ...selectedItem, ...values, customerhash: id }
    if (selectedOption == "events") {
      const response = await dispatch(rateEvent(obj)).unwrap()
      if (response.data.status) handleAddHideModal()
    } else {
      const response = await dispatch(rateInstructor(obj)).unwrap()
      if (response.data.status) {
        handleInstructorHideModal()
        handleAddHideModal()
      }
    }
  }

  return (
    <Modal
      size={selectedOption == "events" ? "lg" : "md"}
      show={showModal}
      onHide={handleAddHideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedOption == "events" ? "Rate Event" : "Rate Instructor"}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ rate: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <RadioInput
                label={`Give ratings out of ${
                  selectedOption == "events" ? "10" : "5"
                }`}
                name="rate"
                option={array}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleAddHideModal}>
                Cancel
              </Button>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddRating
