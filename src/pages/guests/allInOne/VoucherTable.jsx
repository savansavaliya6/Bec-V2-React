import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"
import { BiEditAlt, BiShowAlt, BiSolidEyedropper } from "react-icons/bi"
import AssignVoucher from "../voucher/Assign"
import LinkedUsers from "../allInOne/LinkedUsers"
import { useDispatch, useSelector } from "react-redux"
import {
  getNotAssignedVouchers,
  getVouchers,
  removeLinkedUsers,
} from "../voucher/store/voucherSlice"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment"

const index = ({ setAddVoucher, addVoucher }) => {
  const [showUsers, setShowUsers] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")
  const darkMode = sessionStorage.getItem("darkMode")

  const columns = [
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
        <div className={"text-capitalize"}>
          {row.coupon_used == 0 ? "No" : "Yes"}
        </div>
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

  const handleShowUsersModal = (item) => {
    setSelectedItem(item)
    setShowUsers(true)
  }

  const handleHideUsersModal = () => {
    setShowUsers(false)
    setSelectedItem({})
    dispatch(removeLinkedUsers())
  }

  const handleAssignHideModal = () => {
    setShowAssignModal(false)
    setSelectedItem({})
  }

  const handleAssignShowModal = (item) => {
    setSelectedItem(item)
    setShowAssignModal(true)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getVouchers({ query, page, perPage }))
    }
  }, [dispatch])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  // if (loading) return <LoaderIcon />;
  return (
    <>
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

      <div className="card m-5">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Voucher List</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => setAddVoucher(true)}
            >
              Add Voucher
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
