import React, { useEffect, useState } from "react"
import {
  createGuest,
  getGuests,
  setCurrentGuest,
  updateGuest,
} from "../../guest/store/guestSlice"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  RadioInput,
  TextInputField,
} from "../../../../components/Fields"

import { Formik, Form } from "formik"
import * as yup from "yup"
import moment from "moment"

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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const AddGuest = ({ handleAddHideModal, selectedItem, onNext }) => {
  const dispatch = useDispatch()
  const {
    IDLists,
    guestTypesList,
    guest: { form },
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

  const validationSchema = yup.object().shape({
    f_name: yup.string().required("First name is required"),
    l_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),

    title: yup.string().required("Title is required"),
    id_type: yup.string().required("ID Type is required"),
    guest_type: yup.string().required("Guest Type is required"),
    id_number: yup
      .number("ID Number should be a number")
      .integer("Please enter an integer value.")
      .positive("Please enter a positive value.")
      .required("ID Number is required"),
    dob: yup
      .string()
      .required("DOB is Required")
      .test("valid-date", "Invalid date", function (value) {
        if (!value) return true
        if (value.includes("Invalid")) {
          return false
        } else {
          return true
        }
      }),
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
    if (form?.customerhash) {
      obj["id"] = Number(form?.id) || ""
      obj["email"] = form?.email
      const role = sessionStorage.getItem("role")
      const response = await dispatch(updateGuest(obj)).unwrap()
      if (response.data.status) {
        dispatch(setCurrentGuest(obj))
        if (values.email !== form?.email) {
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
          }
        }
        onNext()
      }
    } else {
      try {
        const response = await dispatch(createGuest(obj)).unwrap()
        if (response.data.status) {
          dispatch(setCurrentGuest(response.data.data))
          onNext()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={
          form?.customerhash
            ? {
                ...form,
                contact_method: form?.contact_method
                  ? JSON.parse(form?.contact_method)
                  : [],
              }
            : selectedItem
        }
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>Add Guest</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-2">
                  <DropdownField
                    options={titleOptions}
                    label="Title"
                    name="title"
                  />
                </div>
                <div className="col-md-5">
                  <TextInputField
                    label="First name"
                    type="text"
                    name="f_name"
                  />
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
                  />
                </div> */}

                <div className="col-md-6">
                  <DropdownField
                    label="ID Type"
                    options={idlist}
                    name="id_type"
                  />
                </div>
                <div className="col-md-6">
                  <TextInputField
                    label="ID Number"
                    type="number"
                    name="id_number"
                    onChange={(e) => {
                      const idNumber = e.target.value
                      if (idNumber.length >= 6 && values.id_type === "SA ID") {
                        const dobFromId = idNumber.slice(0, 6)
                        const year = parseInt(dobFromId.slice(0, 2))
                        const currentYear = new Date().getFullYear() % 100
                        const century = year <= currentYear ? "20" : "19"
                        const formattedDob = moment(
                          `${century}${dobFromId}`,
                          "YYYYMMDD"
                        ).format("YYYY-MM-DD")
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
              <Button variant="outline-dark" onClick={handleAddHideModal}>
                Cancel
              </Button>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                {form?.customerhash ? "Update and Next" : "Save & Next"}
              </Button>
              {/* <Button variant="dark" onClick={onNext}>
                Next
              </Button> */}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddGuest
