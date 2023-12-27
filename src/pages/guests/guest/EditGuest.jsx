import React, { useEffect, useState } from "react"
import { Button, FormGroup, Modal } from "react-bootstrap"
import { getGuests, updateGuest } from "./store/guestSlice"
import { useDispatch, useSelector } from "react-redux"

import {
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  RadioInput,
  TextInputField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import Axios from "../../../services/api"
import { setRandomProgress } from "../../../store/loadingBarSlice"
import moment from "moment"

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const titleOptions = [
  {
    label: "Mr",
    value: "Mr",
  },
  {
    label: "Mrs",
    value: "Mrs",
  },
  {
    label: "Ms",
    value: "Ms",
  },
  {
    label: "Miss",
    value: "Miss",
  },
  {
    label: "Prof",
    value: "Prof",
  },
  {
    label: "Dr",
    value: "Dr",
  },
  {
    label: "Sir",
    value: "Sir",
  },
]

const EditGuest = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const {
    IDLists,
    guestTypesList,
    params: { page, perPage, query },
  } = useSelector((state) => state.guests)
  const [idlist, setIDList] = useState([])
  const [guestTypeList, setGuestTypeList] = useState([])

  useEffect(() => {
    const contactOptions = IDLists.length
      ? IDLists.map((id) => ({ value: id.name, label: id.name }))
      : []
    const guestListOptions = guestTypesList.length
      ? guestTypesList.map((id) => ({ value: id.name, label: id.name }))
      : []
    setGuestTypeList(guestListOptions)
    setIDList(contactOptions)
  }, [IDLists, guestTypesList])

  const initialValues = {
    f_name: selectedItem.f_name,
    l_name: selectedItem.l_name,
    email: selectedItem.email,
    title: selectedItem.title,
    id_type: selectedItem.id_type,
    guest_type: selectedItem.guest_type,
    id_number: selectedItem.id_number,
    dob: selectedItem.dob,
    contact_method: selectedItem.contact_method
      ? JSON.parse(selectedItem.contact_method)
      : [],
    contact: selectedItem.contact,
  }

  const validationSchema = yup.object().shape({
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    title: yup.string().required("Title is required"),
    id_type: yup.string().required("ID Type is required"),
    id_number: yup
      .number("ID Number should be a number")
      .integer("Please enter an integer value.")
      .positive("Please enter a positive value.")
      .required("ID Number is required"),
    dob: yup.string().required("DOB is Required"),
    contact_method: yup
      .array()
      .min(1, "Contact method is Required")
      .required("Contact method is Required"),
    contact: yup
      .string()
      .required("Contact Number is Required")
      .matches(phoneRegExp, "Phone number is not valid"),
  })

  const handleSubmit = async (values) => {
    let obj = { ...values }
    obj["id"] = Number(selectedItem.id) || ""
    obj["email"] = selectedItem.email
    const role = sessionStorage.getItem("role")

    const response = await dispatch(updateGuest(obj)).unwrap()
    if (response.data.status) {
      if (values.email !== selectedItem.email) {
        const res = await Axios.post(
          `/${role}/customer/update_email/${obj.id}`,
          {
            email: values.email,
          }
        )
        if (res.data.status) {
          dispatch(
            getGuests({
              page: page,
              perPage: perPage,
              query: query,
            })
          )
          handleEditHideModal()
        }
      } else {
        handleEditHideModal()
      }
    }
  }

  return (
    <Modal size="lg" show={showEditModal} onHide={handleEditHideModal}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Guest</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-2">
                  <DropdownField
                    options={titleOptions}
                    defaultValue={initialValues.title}
                    label="Title"
                    name="title"
                  />
                </div>
                <div className="col-md-5">
                  <TextInputField label="First name" name="f_name" />
                </div>
                <div className="col-md-5">
                  <TextInputField label="Last name" type="text" name="l_name" />
                </div>
                <div className="col-md-6">
                  <TextInputField label="Email" type="email" name="email" />
                </div>
                {/* <div className="col-md-6">
                  <TextInputField
                    label="Ownership ID"
                    type="number"
                    name="ownership_id"
                    disabled
                  />
                </div> */}

                <div className="col-md-6">
                  <DropdownField
                    label="ID Type"
                    defaultValue={initialValues.id_type}
                    options={idlist}
                    name="id_type"
                  />
                </div>
                <div className="col-md-6">
                  <TextInputField
                    label="ID Number"
                    name="id_number"
                    type="number"
                    onChange={(e) => {
                      const idNumber = e.target.value
                      if (idNumber.length >= 6 && values.id_type === "SA ID") {
                        const dobFromId = idNumber.slice(0, 6)
                        console.log(dobFromId)
                        const formattedDob = moment(dobFromId, "YYMMDD").format(
                          "YYYY-MM-DD"
                        )
                        setFieldValue("dob", formattedDob)
                      }
                      setFieldValue("id_number", idNumber)
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <DatePickerField
                    label="Date of Birth"
                    name="dob"
                    options={{
                      maxDate: moment()
                        .subtract(18, "years")
                        .format("YYYY-MM-DD"),
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <DropdownField
                    label="Guest Type"
                    defaultValue={initialValues.guest_type}
                    options={guestTypeList}
                    name="guest_type"
                  />
                </div>

                <div className="col-md-6">
                  <PhoneInputField label="Contact Number" name="contact" />
                </div>
                <div className="col-md-6">
                  <CheckboxFieldGroup
                    label="Contact Method"
                    name="contact_method"
                    options={[
                      { label: "Email", value: "Email" },
                      { label: "Phone", value: "Phone" },
                    ]}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleEditHideModal}>
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

export default EditGuest
