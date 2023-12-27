import React, { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { updateInterest } from "./store/guestInterestsSlice"
import { useDispatch } from "react-redux"
import {
  DropdownField,
  RadioInput,
  DatePickerField,
  TextInputField,
} from "../../../components/Fields"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { GrAdd } from "react-icons/gr"
import { MdClose, MdDelete, MdEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"

const EditCategory = ({ showEditModal, handleEditHideModal, selectedItem }) => {
  const dispatch = useDispatch()
  const [Category, setCategory] = useState("")
  const [Subcategory, setSubcategory] = useState("")
  const [Showcategory, setShowcategory] = useState([])
  const [inputList, setInputList] = useState("")
  const initialValues = {
    category_name: selectedItem.category,
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = async () => {
    let obj = {
      id: selectedItem?.id,
      category: Category,
      subcategory: Showcategory,
    }

    const response = await dispatch(updateInterest(obj)).unwrap()
    if (response.data.status) handleEditHideModal()
  }

  const handleChange1 = (e) => {
    setSubcategory(e.target.value)
  }

  const handleSubmit1 = () => {
    Subcategory && setShowcategory((Prev) => [...Prev, Subcategory])
    setSubcategory("")
  }

  const handleEdit = (rowData) => {
    const result = Showcategory.filter((c) => c === rowData)
    setSubcategory(result[0])
    setInputList(result[0])
  }

  const handlInputedit = () => {
    if (Subcategory) {
      const index = Showcategory.findIndex((c) => c == inputList)
      Showcategory[index] = Subcategory
      setShowcategory(Showcategory)
      setInputList("")
      setSubcategory("")
    }
  }

  const handleCLoseUpdate = () => {
    setInputList("")
    setSubcategory("")
  }

  useEffect(() => {
    setShowcategory(
      selectedItem?.subcategory ? JSON.parse(selectedItem?.subcategory) : []
    )
    setCategory(selectedItem?.category)
  }, [selectedItem])

  return (
    <Modal
      size="md"
      show={showEditModal}
      onHide={() => {
        handleEditHideModal()
        setCategory("")
        setSubcategory("")
        setShowcategory([])
        setInputList("")
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Interest</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-9 mb-3">
                  <TextInputField
                    label=" Edit Interest Category Name "
                    type="text"
                    name="category_name"
                    onChange={handleChange}
                    value={Category}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <TextInputField
                    label=" Edit Interest Name "
                    type="text"
                    name="subcategory_name"
                    onChange={handleChange1}
                    value={Subcategory}
                  />
                </div>
                {inputList ? (
                  <>
                    <div className="col-md-1 me-2">
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={handlInputedit}
                      >
                        <MdEdit color="#fe9339" />
                      </Button>
                    </div>
                    <div className="col-md-1">
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={handleCLoseUpdate}
                      >
                        <MdClose />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="col-md-1">
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={handleSubmit1}
                    >
                      <GrAdd />
                    </Button>
                  </div>
                )}
              </div>
              <table
                className="table table-bordered"
                style={{ marginTop: "20px" }}
              >
                <thead>
                  <tr>
                    <th>Interests List </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Showcategory.length
                    ? Showcategory.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>{rowData}</td>
                          <td>
                            <Button
                              variant="outline-dark"
                              onClick={() => handleEdit(rowData)}
                            >
                              <MdEdit color="#fe9339" />
                            </Button>
                          </td>
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
                              {/* <MdDelete /> */}
                              <RiDeleteBin5Line color="#bd081c" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-dark"
                onClick={() => {
                  handleEditHideModal()
                  setCategory("")
                  setSubcategory("")
                  setShowcategory([])
                  setInputList("")
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

export default EditCategory
