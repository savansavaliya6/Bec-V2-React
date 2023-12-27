import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"
import AddVoucher from "./AddVoucher"
import EditVoucher from "./EditVoucher"
import AssignVoucher from "./Assign"
import LinkedUsers from "../allInOne/LinkedUsers"
import {
  getRetailerList,
  getVouchers,
  removeLinkedUsers,
} from "./store/voucherSlice"
import Pagination from "../../../components/DataTable/Pagination"
import DeleteVoucher from "./DeleteVoucher"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import { BiShowAlt } from "react-icons/bi"
import Loading from "../../../components/Loader/loader"
import moment from "moment"
import { MdDelete, MdEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"
import ImportCSV from "./ImportCSV"

const index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [importModal, setImportModal] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const darkMode = sessionStorage.getItem("darkMode")

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
    {
      key: "coupon_id",
      label: "Voucher ID",
    },
    {
      key: "coupon_created_date",
      label: "Voucher created date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.coupon_created_date).format("DD/MM/YYYY") || ""}
        </div>
      ),
    },
    {
      key: "coupon_expiry_date",
      label: "Voucher expiry date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.coupon_expiry_date).format("DD/MM/YYYY") || ""}
        </div>
      ),
    },
    {
      key: "retailer",
      label: "Retailer Name",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.retailer?.dealer_name || ""}
        </div>
      ),
    },
    {
      key: "coupon_used",
      label: "Voucher used",
      cell: (row) => (
        <span
          className={`bg-${
            row.coupon_used == 1 ? "secondary" : "success"
          } badge fw-medium text-xs text-capitalize me-2`}
        >
          {row.coupon_used == 1 ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "coupon_validated",
      label: "Voucher valid",
      cell: (row) => (
        <span
          className={`bg-${
            row.coupon_validated == 1 ? "success" : "secondary"
          } badge fw-medium text-xs text-capitalize me-2`}
        >
          {row.coupon_validated == 1 ? "Yes" : "Expired"}
        </span>
      ),
    },
    {
      key: "assign_voucher",
      label: "Assign Voucher",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          {row.status ? (
            "Assigned"
          ) : (
            <Button
              title="Assign Voucher"
              size="sm"
              disabled={row.coupon_validated == 1 ? false : true}
              variant={darkMode == "true" ? "outline-primary" : "outline-dark"}
              onClick={() => handleAssignShowModal(row)}
            >
              {"Assign Voucher"}
            </Button>
          )}
        </div>
      ),
    },
    {
      key: "users",
      label: "Linked Users",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          {row.status ? (
            <Button
              title="Linked Users"
              size="sm"
              variant="outline-primary"
              onClick={() => handleShowUsersModal(row)}
            >
              <BiShowAlt size={18} />
            </Button>
          ) : (
            "Not Assigned"
          )}
        </div>
      ),
    },
  ]

  const dispatch = useDispatch()
  const { users, totalPages, loading } = useSelector((state) => state.vouchers)

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

  const handleShowUsersModal = (item) => {
    setSelectedItem(item)
    setShowUsers(true)
  }

  const handleHideUsersModal = () => {
    setShowUsers(false)
    setSelectedItem({})
    dispatch(removeLinkedUsers())
  }
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const handleAssignHideModal = () => {
    setShowAssignModal(false)
    setSelectedItem({})
  }

  const handleAssignShowModal = (item) => {
    setSelectedItem(item)
    setShowAssignModal(true)
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getVouchers({ query, page, perPage }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  useEffect(() => {
    dispatch(getRetailerList())
  }, [])

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <Breadcrumb />
      <AddVoucher
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <EditVoucher
        showEditModal={showEditModal}
        handleEditHideModal={handleEditHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <DeleteVoucher
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <AssignVoucher
        showAssignModal={showAssignModal}
        handleAssignHideModal={() => handleAssignHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <LinkedUsers
        showUsersModal={showUsers}
        handleHideUsersModal={() => handleHideUsersModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <ImportCSV
        importModal={importModal}
        handleHideImportModal={() => setImportModal(false)}
      />
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Voucher List</h2>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-dark btn-step  me-3"
                onClick={() => setImportModal(true)}
              >
                Import CSV
              </button>
              <button
                type="button"
                className="btn btn-dark btn-step"
                onClick={() => handleAddShowModal()}
              >
                Add Voucher
              </button>
            </div>
            {/* <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add Voucher
            </button> */}
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
