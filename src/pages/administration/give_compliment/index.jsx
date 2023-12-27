import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"

import AddGuest from "./AddGuest"
import { useDispatch, useSelector } from "react-redux"
import { getActivity } from "./store/regionSlice"
import EditGuest from "./EditGuest"
import Pagination from "../../../components/DataTable/Pagination"
import DeleteGuest from "./DeleteGuest"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment"
import Loading from "../../../components/Loader/loader"
import { MdDelete, MdEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"

const index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center">
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
        </div>
      ),
    },
    // {
    //   key: "id",
    //   label: "Activity ID",
    //   cell: (row) => <div className={"text-capitalize"}>{row.id || "--"}</div>,
    // },
    {
      key: "name",
      label: "Region Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.compliment || "--"}</div>
      ),
    },
    // {
    //   key: "status",
    //   label: "Status",
    //   cell: (row) => <div className={"text-capitalize"}>{row.status}</div>,
    // },
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
  const { users, totalPages, loading } = useSelector(
    (state) => state.compliments
  )

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

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getActivity({ query, page, perPage }))
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
      <DeleteGuest
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Compliments List</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add Compliment
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
