import React, { useEffect, useState } from "react"
import { Button, Card, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getQuestionList } from "./store/FeedbackSlice"
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
import { Formik } from "formik"
import { CardBody } from "reactstrap"

const ViewQuestion = ({ data, showQuestionsModal, handlehideQuestion }) => {
  const dispatch = useDispatch()
  const { questionLists } = useSelector((state) => state.feedback)

  useEffect(() => {
    if (data?.id && showQuestionsModal) {
      let payload = { form_id: data?.id }
      dispatch(getQuestionList(payload))
    }
  }, [data?.id])
  return (
    <Modal size="xl" show={showQuestionsModal} onHide={handlehideQuestion}>
      <Modal.Header closeButton>
        <Modal.Title>View Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Card>
          <CardBody> */}
        {questionLists.length
          ? questionLists.map((val, index) => (
              <div className="mb-3" key={val.id}>
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
        <Button variant="outline-dark" onClick={handlehideQuestion}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ViewQuestion

export const View = ({
  question_type_id,
  options,
  radio,
  question_text,
  index,
}) => {
  if (question_type_id === 1) {
    return (
      <Formik enableReinitialize={true} initialValues={{ option1: "" }}>
        <div className="question">
          <CheckboxFieldGroup
            label={`${index}) ${question_text}`}
            name="option1"
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
      </Formik>
    )
  } else if (question_type_id === 2) {
    return (
      <Formik enableReinitialize={true} initialValues={{ option2: "" }}>
        <div className="question">
          <RadioInput
            label={`${index}) ${question_text}`}
            name="option2"
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
      </Formik>
    )
  } else if (question_type_id === 3) {
    return (
      <Formik enableReinitialize={true} initialValues={{ option3: "" }}>
        <div className="question">
          <TextareaField
            label={`${index}) ${question_text}`}
            type="text"
            name="option3"
          />
        </div>
      </Formik>
    )
  } else if (question_type_id === 4) {
    let array = []
    for (let index = 1; index <= 10; index++) {
      array.push({ name: index, value: index })
    }
    return (
      <Formik enableReinitialize={true} initialValues={{ option4: "" }}>
        <div className="question">
          <RadioInput
            label={`${index}) ${question_text}`}
            name="option4"
            option={array}
          />
        </div>
      </Formik>
    )
  }
}
