import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import { useContext } from "react"
import FileContext from "../FileContext"
import { useParams } from "react-router-dom"
import { registerGuest } from "../../store/customersSlice"
import { useEffect } from "react"

const Step5 = ({ handleAddHideModal, onPrevious }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { files } = useContext(FileContext)
  const [isChecked, setIsChecked] = useState(false)

  const { formData } = useSelector((state) => state.customers)
  const validationSchema = yup.object().shape({
    agree1: yup.bool().oneOf([true], "You must agree to the Terms of Service"),
    agree2: yup.bool().oneOf([true], "You must agree to the Terms of Service"),
  })

  const handleSubmit = async () => {
    const obj = {
      ...formData,
      document: files.filter((i) => i.name == "licence")[0].file,
      signature: files.filter((i) => i.name == "signature")[0].file,
      customerhash: id,
    }
    const response = await dispatch(registerGuest(obj)).unwrap()
    if (response.data.status) handleAddHideModal()
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ agree1: isChecked, agree2: isChecked }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, errors, isSubmitting }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>Terms and Conditions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className="row g-3"
                style={{ marginLeft: "3em", marginRight: "3em" }}
              >
                <div class="article" id="content">
                  <div id="placeholders">
                    {/* <h3 className="d-flex justify-content-center">
                      <span>Terms and Conditions</span>
                    </h3> */}
                    <h3 className="d-flex justify-content-center">
                      <span className="text-decoration-underline mb-3">
                        Jaguar Land Rover Experience
                      </span>
                    </h3>

                    <p className="text-justify">
                      THESE ARE IMPORTANT TERMS AND CONDITIONS, WHICH AFFECT
                      YOUR LEGAL RIGHTS AND OBLIGATIONS. READ IT CAREFULLY AND
                      DO NOT ACCEPT UNLESS YOU ARE SATISFIED THAT YOU UNDERSTAND
                      IT. THESE TERMS AND CONDITIONS ("TERMS") APPLY TO ALL
                      GUESTS PARTICIPATING IN A JAGUAR LAND ROVER EXPERIENCE
                      (“LAND ROVER EXPERIENCE” OR “JAGUAR EXPERIENCE” OR "JAGUAR
                      LAND ROVER EXPERIENCE" herein after referred to as the
                      "EXPERIENCE").
                    </p>
                    <br></br>
                    <p className="text-justify">
                      Please read the TERMS carefully and raise any questions
                      you may have before you arrive on the day of your
                      EXPERIENCE.
                    </p>
                    <br></br>

                    <a
                      href="https://www.landrover.co.za/experience/terms-and-conditions.html"
                      target="_blank"
                    >
                      Land Rover Terms and Conditions
                    </a>
                    <br></br>
                    <br></br>

                    <a
                      href="https://www.jaguar.co.za/experience/terms-and-conditions.html"
                      target="_blank"
                    >
                      Jaguar Terms and Conditions{" "}
                    </a>
                    <br></br>
                    <br></br>

                    <p>You agree that:</p>

                    <div className="mb-2">
                      <div className="d-flex align-items-start">
                        <Field
                          type="checkbox"
                          name="agree1"
                          className="me-2 mt-1"
                        />
                        <label>
                          <p className="text-justify">
                            I hereby declare that I have read the terms and
                            conditions made available to me at the links
                            supplied above, and that I accept the terms and
                            conditions explained and that I fully understand and
                            am satisfied with the nature and content of these
                            terms and conditions and confirm that I am willing
                            to bind myself accordingly, irrespective of my first
                            language.
                          </p>
                        </label>
                      </div>
                      <ErrorMessage
                        name="agree1"
                        component="div"
                        className="text-danger"
                        style={{ marginLeft: "1.4rem" }}
                      />
                    </div>
                    <div className="mb-2">
                      <div className="d-flex align-items-start">
                        <Field
                          type="checkbox"
                          name="agree2"
                          className="me-2 mt-2"
                        />
                        <label>
                          <p className="text-justify">
                            I hereby declare that by proceeding with my
                            Experience booking I have accepted the Terms and
                            Conditions.
                          </p>
                        </label>
                      </div>
                      <ErrorMessage
                        name="agree2"
                        component="div"
                        className="text-danger"
                        style={{ marginLeft: "1.4rem" }}
                      />
                    </div>
                    <pre>
                      Driving Regards,<br></br>
                      The Experience Team<br></br>
                      Jaguar Land RoverExperience<br></br>
                      +27 10 023 0462<br></br>
                      info@experience.landrover.co.za
                    </pre>
                  </div>
                </div>
                {/* <div>
                  <Field type="checkbox" name="agree" className="me-2" />
                  <label style={{ fontSize: "1.5rem" }}>
                    <p>I agree to Terms of Service.</p>
                  </label>
                  <ErrorMessage
                    name="agree"
                    component="div"
                    className="text-danger"
                  />
                </div> */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={onPrevious}>
                Previous
              </Button>

              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Step5
