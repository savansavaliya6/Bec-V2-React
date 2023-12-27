import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  FilePickerField,
  PhoneInputField,
  RadioInput,
  TextInputField,
} from "../../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment"
import { gatherData } from "../../store/customersSlice"

const Step2 = ({ handleAddHideModal, selectedItem, onNext, onPrevious }) => {
  const dispatch = useDispatch()
  const { formData } = useSelector((state) => state.customers)

  const validationSchema = yup.object().shape({
    kin_f_name: yup.string().required("First name is required"),
    kin_l_name: yup.string().required("Last name is required"),
    kin_contact: yup.string().required("Contact number is required"),
    relation: yup.string().required("Please select a relation"),
  })

  const relationOptions = [
    {
      label: "Father",
      value: "Father",
    },
    {
      label: "Mother",
      value: "Mother",
    },

    {
      label: "Spouse",
      value: "Spouse",
    },
    {
      label: "Child",
      value: "Child",
    },
    {
      label: "Brother",
      value: "Brother",
    },
    {
      label: "Sister",
      value: "Sister",
    },

    {
      label: "Relative",
      value: "Relative",
    },
    {
      label: "Friend",
      value: "Friend",
    },
  ]

  const initialValues = {
    kin_f_name: formData?.kin_f_name || "",
    kin_l_name: formData?.kin_l_name || "",
    relation: formData?.relation || "",
    kin_contact: formData?.kin_contact || "",
  }

  const handleSubmit = async (values) => {
    let obj = { ...values }
    delete obj.invited_by
    dispatch(gatherData(obj))
    onNext()
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>Next of Kin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-6">
                  <TextInputField
                    label="First name"
                    type="text"
                    name="kin_f_name"
                  />
                </div>
                <div className="col-md-6">
                  <TextInputField
                    label="Last name"
                    type="text"
                    name="kin_l_name"
                  />
                </div>

                <div className="col-md-6">
                  <DropdownField
                    label="Relation"
                    name="relation"
                    options={relationOptions}
                  />
                </div>

                <div className="col-md-6">
                  <PhoneInputField label="Contact Number" name="kin_contact" />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={onPrevious}>
                Previous
              </Button>

              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Next
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Step2
