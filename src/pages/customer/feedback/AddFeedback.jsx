import React, { useEffect, useState } from "react"
import { Button, Card, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getQuestionList, saveFeedback } from "../store/customersSlice"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  RadioInput,
  // DatePickerField,
  // DropdownField,
  // PhoneInputField,
  TextInputField,
  TextareaField,
} from "../../../components/Fields"
import { Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import * as yup from "yup"
import { CardBody } from "reactstrap"

const AddFeedback = ({ selectedItem, showModal, handleAddHideModal }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { questionLists } = useSelector((state) => state.customers)

  const initialValues =
    questionLists && questionLists.questions && questionLists.questions.length
      ? questionLists.questions.reduce((acc, val, index) => {
          acc[`option${index + 1}`] = ""
          return acc
        }, {})
      : {}

  const validationObject =
    questionLists && questionLists.questions && questionLists.questions.length
      ? questionLists.questions.reduce((acc, val, index) => {
          if (!val.mandatory) {
            return acc
          } else if (val.question_type_id == 1) {
            acc[`option${index + 1}`] = yup
              .array()
              .min(1, "Required")
              .required("Required")
            return acc
          } else if (val.question_type_id == 2) {
            acc[`option${index + 1}`] = yup
              .string()
              .oneOf(
                val?.radio?.length && val?.radio?.map((i) => i.radio_name),
                "Select an option"
              )
              .required("Select an option")
            return acc
          } else if (val.question_type_id == 3) {
            acc[`option${index + 1}`] = yup.string().required("Required")
            return acc
          } else if (val.question_type_id == 4) {
            acc[`option${index + 1}`] = yup
              .number()
              .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Please give ratings")
              .required("Please give ratings")
            return acc
          }
        }, {})
      : {}

  const validationSchema = yup.object().shape(validationObject)

  useEffect(() => {
    if (selectedItem?.id && showModal) {
      let payload = { event_id: selectedItem?.id, customerhash: id }
      dispatch(getQuestionList(payload))
    }
  }, [selectedItem?.id])

  const handleSubmit = async (values) => {
    let obj = {}
    obj.customerhash = id
    obj.event_id = selectedItem.id
    obj.form_id = selectedItem.feedback_form_id.id
    obj.questions = questionLists?.questions?.length
      ? questionLists?.questions.map((val, index) => ({
          question_id: val.id,
          question_type_id: val.question_type_id,
          ans: values[`option${index + 1}`],
        }))
      : []

    const response = await dispatch(saveFeedback(obj)).unwrap()
    if (response.data.status) {
      handleAddHideModal()
    }
  }
  return (
    <Modal size="lg" show={showModal} onHide={handleAddHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Give Feedback</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              {/* <Card>
                <CardBody> */}
              {questionLists && questionLists?.questions?.length
                ? questionLists?.questions.map((val, index) => (
                    <div className="mb-5" key={val.id}>
                      <View
                        question_type_id={val.question_type_id}
                        question_text={val.question_text}
                        options={val.options}
                        radio={val.radio}
                        index={index + 1}
                      />
                    </div>
                  ))
                : null}
              {/* </CardBody>
              </Card> */}
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
export default AddFeedback

export const View = ({
  question_type_id,
  options,
  radio,
  question_text,
  index,
}) => {
  if (question_type_id === 1) {
    return (
      <div className="question">
        <CheckboxFieldGroup
          label={`${index}) ${question_text}`}
          name={`option${index}`}
          options={
            options.length
              ? options.map((c) => ({
                  label: c.option_name,
                  value: c.option_name,
                }))
              : []
          }
        />
      </div>
    )
  } else if (question_type_id === 2) {
    return (
      <div className="question">
        <RadioInput
          label={`${index}) ${question_text}`}
          name={`option${index}`}
          option={
            radio.length
              ? radio.map((c) => ({
                  name: c.radio_name,
                  value: c.radio_name,
                }))
              : []
          }
        />
      </div>
    )
  } else if (question_type_id === 3) {
    return (
      <div className="question">
        <TextareaField
          label={`${index}) ${question_text}`}
          type="text"
          name={`option${index}`}
        />
      </div>
    )
  } else if (question_type_id === 4) {
    let array = []
    for (let index = 1; index <= 10; index++) {
      array.push({ name: index, value: index })
    }
    return (
      <div className="question">
        <RadioInput
          label={`${index}) ${question_text}`}
          name={`option${index}`}
          option={array}
        />
      </div>
    )
  }
}
