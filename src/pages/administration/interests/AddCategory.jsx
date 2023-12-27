import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { createInterest } from "./store/guestInterestsSlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  RadioInput,
  TextInputField,
  DatePickerField,
} from "../../../components/Fields"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { GrAdd } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"

const AddCategory = ({ showModal, handleAddHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  // const { IDLists, guestTypesList } = useSelector((state) => state.eventTypes);
  const [Category, setCategory] = useState("")
  const [Subcategory, setSubcategory] = useState("")
  const [Showcategory, setShowcategory] = useState([])

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = async () => {
    let obj = { category: Category, subcategory: Showcategory }

    // console.log('data',obj)
    const response = await dispatch(createInterest(obj)).unwrap()
    if (response.data.status) {
      setCategory("")
      setSubcategory("")
      setShowcategory([])
      handleAddHideModal()
    }
  }

  const handleChange1 = (e) => {
    setSubcategory(e.target.value)
  }

  return (
    <Modal
      size="md"
      show={showModal}
      onHide={() => {
        handleAddHideModal()
        setCategory("")
        setSubcategory("")
        setShowcategory([])
      }}
    >
      <Formik
        enableReinitialize={true}
        initialValues={selectedItem}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add Interest</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-9 mb-3">
                  <TextInputField
                    label=" Add Interest Category Name "
                    type="text"
                    name="category_name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <TextInputField
                    label=" Add Interest Name "
                    type="text"
                    name="subcategory_name"
                    onChange={handleChange1}
                    value={Subcategory}
                  />
                </div>
                <div className="col-md-1">
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => {
                      Subcategory &&
                        setShowcategory((Prev) => [...Prev, Subcategory])
                      setSubcategory("")
                    }}
                  >
                    <GrAdd />
                  </Button>
                </div>
              </div>

              <table
                className="table table-bordered"
                style={{ marginTop: "20px" }}
              >
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Interests List </th>
                  </tr>
                </thead>
                <tbody>
                  {Showcategory.map((rowData, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            const result = Showcategory.filter(
                              (_, i) => i !== rowIndex
                            )
                            setShowcategory(result)
                          }}
                        >
                          <RiDeleteBin5Line color="#bd081c" />
                          {/* <MdDelete  /> */}
                        </Button>
                      </td>
                      <td>{rowData}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-dark"
                onClick={() => {
                  handleAddHideModal()
                  setCategory("")
                  setSubcategory("")
                  setShowcategory([])
                }}
              >
                Cancel
              </Button>
              <Button
                variant="dark"
                type="submit"
                disabled={
                  (Category && Showcategory.length) || !isSubmitting
                    ? false
                    : true
                }
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddCategory
