import { Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Button, Modal, Stack } from "react-bootstrap"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from "react-bootstrap/Popover"
import { PiNotePencilBold } from "react-icons/pi"
import * as yup from "yup"
import {
  DropdownField,
  RadioInput,
  TextInputField,
  TextareaField,
} from "../../../components/Fields"
import { GrAdd } from "react-icons/gr"
import { Chip } from "@mui/material"
import { MdDelete, MdEdit } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import {
  createQuestion,
  deleteQuestion,
  getQuestionList,
  getQuestionType,
  updateQuestion,
} from "./store/FeedbackSlice"
import { RiDeleteBin5Line } from "react-icons/ri"

const validationSchema = yup.object().shape({
  mandatory: yup.string().required("required"),
  // form_desc: yup.string().required("Form Description is required"),
})

const AddQuestion = ({ showAddQueModal, handleAddQueHideModal, data }) => {
  const [questionText, setQuestionText] = useState("")
  const [optionText, setOptionText] = useState("")
  const [edit, setEdit] = useState(false)
  const [editOption, setEditOption] = useState("")
  const [questionList, setQuestionList] = useState([])
  const [optionList, setOptionList] = useState([])
  const [questionType, setQuestionType] = useState([])
  const [questioId, setQuestionId] = useState("")
  const [currentQuestionType, setCurrentQuestionType] = useState("")
  const [mandatory, setMandatory] = useState(0)
  const { questionTypes, questionLists } = useSelector(
    (state) => state.feedback
  )
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    if (edit && questioId) {
      let payload = {
        form_id: data.id,
        question_id: questioId,
        question_type: values.question_type,
        question_text: questionText,
        mandatory: values.mandatory,
        options: JSON.stringify(editOption) || [],
      }
      dispatch(updateQuestion(payload))

      setOptionList([])
      setQuestionList([])
      setOptionText("")
      setQuestionText("")
      setMandatory(0)
      setEdit(false)
      setEditOption([])
      setCurrentQuestionType("")
    } else {
      let payload = {
        form_id: data.id,
        questions: [
          {
            question_text: questionText,
            question_type: values.question_type,
            mandatory: values.mandatory,
            options: optionList || [],
          },
        ],
      }
      dispatch(createQuestion(payload))

      setOptionList([])
      setQuestionList([])
      setOptionText("")
      setQuestionText("")
      setEdit(false)
      setEditOption([])
      setCurrentQuestionType("")
      setMandatory(0)
    }
  }

  useEffect(() => {
    if (data?.id && showAddQueModal) {
      dispatch(getQuestionType())
      let payload = { form_id: data?.id }
      dispatch(getQuestionList(payload))
    }
  }, [data?.id])

  useEffect(() => {
    if (questionTypes.length > 0) {
      let question_types = questionTypes.map((item, index) => ({
        value: item.id,
        label: item.name,
      }))
      setQuestionType(question_types)
    }
    if (questionLists) {
      setQuestionList(questionLists)
    }
  }, [questionTypes, questionLists])
  return (
    <>
      <Modal
        size="xl"
        show={showAddQueModal}
        onHide={() => {
          handleAddQueHideModal()
          setOptionList([])
          setQuestionList([])
          setOptionText("")
          setQuestionText("")
          setEdit(false)
          setEditOption([])
          setCurrentQuestionType("")
          setMandatory(0)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <PiNotePencilBold /> Add Question
          </Modal.Title>
        </Modal.Header>
        <Formik
          enableReinitialize={true}
          initialValues={{ ...data, mandatory }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-11">
                    <TextareaField
                      label="Add Question"
                      placeholder="Enter Question Text"
                      name="question_text"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                    />
                  </div>

                  <div className="col-md-7" style={{ marginTop: "20px" }}>
                    <DropdownField
                      label="Question Type"
                      defaultValue={currentQuestionType || ""}
                      options={questionType}
                      isDisabled={data?.status && edit}
                      name="question_type"
                    />

                    {values?.question_type === 1 ||
                    values?.question_type === 2 ? (
                      <div className="row">
                        <div className="col-md-9 mt-3">
                          <TextInputField
                            label=" Add Question Options"
                            type="text"
                            name="question_option"
                            value={optionText}
                            onChange={(e) => setOptionText(e.target.value)}
                          />
                        </div>
                        <div className="col-md-1 mt-3 ">
                          <Button
                            variant="secondary"
                            className="mt-4"
                            disabled={data?.status && edit}
                            onClick={() => {
                              if (edit) {
                                optionText &&
                                  setEditOption((prev) => [...prev, optionText])
                              } else {
                                optionText &&
                                  setOptionList((prev) => [...prev, optionText])
                              }
                              setOptionText("")
                            }}
                          >
                            <GrAdd />
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {optionList?.length
                    ? optionList.map((rowData, rowIndex) => (
                        <Stack direction="row" spacing={1}>
                          <div className="col-md-3 mt-3" key={rowIndex}>
                            <Chip
                              label={rowData}
                              onDelete={() => {
                                const result = optionList.filter(
                                  (_, index) => index !== rowIndex
                                )
                                setOptionList(result)
                              }}
                              style={{
                                backgroundColor: " #343a40",
                                color: "white",
                              }}
                            />
                          </div>
                        </Stack>
                      ))
                    : null}

                  {edit && editOption?.length
                    ? editOption.map((rowData, rowIndex) => {
                        return (
                          <Stack direction="row" spacing={1}>
                            <div className="col-md-3 mt-3" key={rowIndex}>
                              <Chip
                                label={rowData}
                                disabled={data?.status && edit}
                                onDelete={() => {
                                  const result = editOption.filter(
                                    (_, index) => index !== rowIndex
                                  )
                                  setEditOption(result)
                                }}
                                style={{
                                  backgroundColor: " #343a40",
                                  color: "white",
                                }}
                              />
                            </div>
                          </Stack>
                        )
                      })
                    : null}
                  <div className="mt-3">
                    <RadioInput
                      label="Is this mandatory?"
                      name="mandatory"
                      onChange={() => console.log("first")}
                      option={[
                        {
                          name: "Yes",
                          value: 1,
                        },
                        {
                          name: "No",
                          value: 0,
                        },
                      ]}
                    />
                  </div>
                  <div className="mt-2 d-flex justify-content-end">
                    <Button
                      className="me-2"
                      variant="dark"
                      type="submit"
                      disabled={questionText || !isSubmitting ? false : true}
                    >
                      {edit ? "UPDATE QUESTION" : "SAVE QUESTION"}
                    </Button>
                    {edit ? (
                      <Button
                        variant="dark"
                        onClick={() => {
                          setOptionList([])
                          // setQuestionList([])
                          setOptionText("")
                          setQuestionText("")
                          setEdit(false)
                          setEditOption([])
                          setCurrentQuestionType("")
                          setMandatory(0)
                        }}
                      >
                        cancel
                      </Button>
                    ) : null}
                  </div>
                </div>

                {questionList.length ? (
                  <table
                    className="table table-bordered"
                    style={{ marginTop: "20px" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-left" style={{ width: "70%" }}>
                          View Question
                        </th>
                        <th className="text-center">Question Type</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionList.length > 0 &&
                        questionList.map((question, i) => (
                          <tr key={i}>
                            <td className="text-left">
                              <strong>{question.question_text}</strong>
                              {question.question_type_id == 1
                                ? question.options.length
                                  ? question.options.map((item, index) => {
                                      return (
                                        <div key={item.id} className="d-flex">
                                          {`${index + 1}) ${item.option_name}`}
                                        </div>
                                      )
                                    })
                                  : null
                                : question.question_type_id == 2 &&
                                  question.radio.length
                                ? question.radio.map((item, index) => {
                                    return (
                                      <div className="d-flex" key={item.id}>
                                        {`${index + 1}) ${item.radio_name}`}
                                      </div>
                                    )
                                  })
                                : null}
                            </td>
                            {/* <td className="text-center">
                              {question.question_type_id == 1 ? (
                                question.options.length ? (
                                  <OverlayTrigger
                                    trigger="hover"
                                    placement="top"
                                    overlay={
                                      <Popover className="d-flex">
                                        {question.options.length
                                          ? question.options.map((item) => {
                                              return (
                                                <Popover.Body key={item.id}>
                                                  <strong>
                                                    {item.option_name}
                                                  </strong>{" "}
                                                </Popover.Body>
                                              )
                                            })
                                          : "No options"}
                                      </Popover>
                                    }
                                  >
                                    <Button variant="secondary" size="sm">
                                      Options
                                    </Button>
                                  </OverlayTrigger>
                                ) : (
                                  "No options"
                                )
                              ) : question.question_type_id == 2 &&
                                question.radio.length ? (
                                <OverlayTrigger
                                  trigger="hover"
                                  placement="top"
                                  overlay={
                                    <Popover className="d-flex">
                                      {question.radio.length
                                        ? question.radio.map((item) => {
                                            return (
                                              <Popover.Body key={item.id}>
                                                <strong>
                                                  {item.radio_name}
                                                </strong>{" "}
                                              </Popover.Body>
                                            )
                                          })
                                        : "No options"}
                                    </Popover>
                                  }
                                >
                                  <Button variant="secondary" size="sm">
                                    Options
                                  </Button>
                                </OverlayTrigger>
                              ) : (
                                "No options"
                              )}
                            </td> */}
                            <td className="text-center">
                              {question.question_type_id == 1 ? (
                                <div>Multiselect Checkbox</div>
                              ) : question.question_type_id == 2 ? (
                                <div>Radio Button</div>
                              ) : question.question_type_id == 4 ? (
                                <div>Rating</div>
                              ) : (
                                <div>Input</div>
                              )}
                            </td>
                            <td className="text-center">
                              <Button
                                style={{ marginRight: "1rem" }}
                                variant="outline-dark"
                                onClick={() => {
                                  setEdit(true)
                                  setQuestionText(question.question_text)
                                  setMandatory(Number(question?.mandatory))
                                  setQuestionId(question.id)
                                  setEditOption(
                                    question.question_type_id == 1
                                      ? question.options.length &&
                                          question.options.map(
                                            (i) => i.option_name
                                          )
                                      : question.question_type_id == 2 &&
                                          question.radio.length &&
                                          question.radio.map(
                                            (i) => i.radio_name
                                          )
                                  )
                                  // setOptionList(question.options);
                                  setCurrentQuestionType(
                                    question.question_type_id
                                  )
                                }}
                              >
                                <MdEdit color="#fe9339" />
                              </Button>
                              <Button
                                variant="outline-dark"
                                style={{ marginRight: "1rem" }}
                                disabled={data?.status}
                                onClick={() => {
                                  let payload = {
                                    id: question.id,
                                    form_id: data.id,
                                  }
                                  dispatch(deleteQuestion(payload))
                                }}
                              >
                                <RiDeleteBin5Line color="#bd081c" />
                                {/* <MdDelete  /> */}
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : null}
              </Modal.Body>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default AddQuestion
