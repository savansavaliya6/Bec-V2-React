import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"

import ViewIndemintyform from "./ViewIndemintyform"
import { AiFillEye } from "react-icons/ai"
import AddIndemintyform from "./AddIndemintyform"
import EditIndemintyform from "./EditIndemintyform"
import DeleteIndemintyform from "./DeleteIndemintyform"
import { useDispatch, useSelector } from "react-redux"
import { getType, deleteCategory, editCategory } from "./store/indemintySlice"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment"
import { Formik, Form } from "formik"
import {
  // CheckboxField,
  CheckboxFieldGroup,
  DatePickerField,
  DropdownField,
  PhoneInputField,
  TextInputField,
} from "../../../components/Fields"
import Loading from "../../../components/Loader/loader"
import { MdDelete, MdEdit } from "react-icons/md"
import { IoMdEye } from "react-icons/io"
import { RiDeleteBin5Line } from "react-icons/ri"

const index = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")
  const [AllCataegory, setAllCataegory] = useState([])
  const { users, totalPages, loading } = useSelector((state) => state.indemnity)
  const [isDeleteButtonHidden, setIsDeleteButtonHidden] = useState(false)

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Button
            size="sm"
            className="ms-2"
            variant="outline-dark"
            title="View"
            onClick={() => handleViewShowModal(row)}
          >
            {/* <AiFillEye size={"17"} /> */}
            <IoMdEye size={"17"} color="#7f8de1" />
          </Button>
          <Button
            title="Edit"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleEditShowModal(row)}
          >
            <MdEdit size={17} color="#fe9339" />
          </Button>{" "}
          <Button
            size="sm"
            className="ms-2"
            variant="outline-dark"
            title="Delete"
            onClick={() => handleDeleteShowModal(row)}
          >
            {/* <MdDelete size={17} /> */}
            <RiDeleteBin5Line size={17} color="#bd081c" />
          </Button>
          {/* } */}
        </div>
      ),
    },
    {
      key: "form_name",
      label: "Form Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.form_name || "--"}</div>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.created_at).format("DD-MM-YYYY") || "--"}
        </div>
      ),
    },

    // {
    //   key: "title",
    //   label: "Assigned",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>
    //       <Button
    //         size="sm"
    //         className="ms-2"
    //         variant="outline-dark"
    //         title="View"
    //         onClick={() => row}
    //       >
    //         {"assign "}
    //         {row.assign}
    //       </Button>
    //     </div>
    //   ),
    // },
  ]

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleViewShowModal = (row) => {
    setShowViewModal(true)
    setSelectedItem(row)
  }

  const handleViewHideModal = () => {
    setShowViewModal(false)
    setSelectedItem({})
  }

  const handleAddShowModal = () => {
    setShowModal(true)
    setSelectedItem({})
  }

  const handleAddHideModal = () => {
    setShowModal(false)
  }

  const handleEditShowModal = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleEditHideModal = () => {
    setShowEditModal(false)
    setSelectedItem({})
  }

  const handleDeleteShowModal = (row) => {
    setShowDeleteModal(true)
    setSelectedItem(row)
  }

  const handleDeleteHideModal = () => {
    setShowDeleteModal(false)
    setSelectedItem({})
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const handleSubmit = (values) => {
    let obj = { ...values }
    console.log(obj)
    // dispatch(createGuest(obj));
  }

  const getAllform = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getType({ query, page, perPage }))
    }
  }, [])

  useEffect(() => {
    getAllform(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])
  return (
    <>
      <Breadcrumb />

      <AddIndemintyform
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <ViewIndemintyform
        showViewModal={showViewModal}
        handleViewHideModal={handleViewHideModal}
        selectedItem={selectedItem}
        // setSelectedItem={setSelectedItem}
      />

      <EditIndemintyform
        showEditModal={showEditModal}
        handleEditHideModal={handleEditHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <DeleteIndemintyform
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5"> Indemnity</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add Indemnity
            </button>
          </div>
          <hr></hr>
          {/* <SearchFilters
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          /> */}
          <div className="table-wrapper">
            <div className="table-wrapper table-responsive">
              <DataTable data={users} columns={columns} />
            </div>
          </div>
        </form>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </>
  )
}

export default index
