import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"
import { AiFillEye } from "react-icons/ai"
import { GrAdd } from "react-icons/gr"
import AddGuest from "./AddGuest"
import { useDispatch, useSelector } from "react-redux"
import { getFeedback } from "./store/FeedbackSlice"
import EditGuest from "./EditGuest"
import Pagination from "../../../components/DataTable/Pagination"
import DeleteGuest from "./DeleteGuest"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment"
import AddQuestion from "./AddQuestion"
import ViewQuestion from "./ViewQuestion"
import Loading from "../../../components/Loader/loader"
import { MdDelete, MdEdit } from "react-icons/md"
import { IoMdEye } from "react-icons/io"
import { RiDeleteBin5Line } from "react-icons/ri"

const index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showQuestionsModal, setShowQuestionModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")
  const [questions, setQuestions] = useState(null)
  const [showAddQueModal, setShowAddQueModal] = useState(false)

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Button
            title="Create Note"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleShowQuestions(row)}
          >
            {/* <AiFillEye size={"17"} /> */}
            <IoMdEye size={"17"} color="#7f8de1" />
            {/*  
 
 
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    className="bi bi-pencil edit-icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg> */}
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
            disabled={row.status}
            onClick={() => handleDeleteShowModal(row)}
          >
            {/* <MdDelete size={17} /> */}
            <RiDeleteBin5Line size={17} color="#bd081c" />
          </Button>
        </div>
      ),
    },
    {
      key: "id",
      label: "Form ID",
      cell: (row) => <div className={"text-capitalize"}>{row.id || "--"}</div>,
    },
    {
      key: "form_name",
      label: "Form Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.form_name || "--"}</div>
      ),
    },
    {
      key: "form_description",
      label: "Description",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.form_description || "--"}</div>
      ),
    },
    {
      key: "notes",
      label: "Manage Question",
      cell: (row) => (
        <>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => handleAddQueShowModal(row)}
          >
            Manage Question
          </Button>
        </>
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
  ]

  const dispatch = useDispatch()
  const { users, totalPages, loading } = useSelector((state) => state.feedback)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleAddShowModal = () => {
    setShowModal(true)
    setSelectedItem({})
  }

  const handleAddQueShowModal = (data) => {
    setShowAddQueModal(true)
    setQuestions(data)
  }

  //question
  const handleAddQueHideModal = () => {
    setShowAddQueModal(false)
    setQuestions(null)
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

  const handleShowQuestions = (data) => {
    setShowQuestionModal(true)
    setQuestions(data)
  }
  const handlehideQuestion = () => {
    setShowQuestionModal(false)
    setQuestions(null)
  }
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getFeedback({ query, page, perPage }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  // useEffect(() => {
  //   dispatch(getIDList());
  // }, []);

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <Breadcrumb />
      <AddGuest
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <EditGuest
        showEditModal={showEditModal}
        handleEditHideModal={handleEditHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <AddQuestion
        showAddQueModal={showAddQueModal}
        handleAddQueHideModal={handleAddQueHideModal}
        data={questions && questions}
      />
      <ViewQuestion
        showQuestionsModal={showQuestionsModal}
        handlehideQuestion={handlehideQuestion}
        data={questions && questions}
      />
      <DeleteGuest
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Event Feedback Form</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add Event Feedback Form
            </button>
          </div>
          <hr></hr>
          <SearchFilters
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
          <div className="table-wrapper">
            <div className="table-wrapper table-responsive">
              <DataTable data={users} columns={columns} />
            </div>
          </div>
        </form>
        <Pagination
          currentPage={currentPage}
          totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default index
