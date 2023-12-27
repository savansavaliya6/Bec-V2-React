import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Modal } from "react-bootstrap"
import { BiEditAlt, BiShowAlt, BiSolidEyedropper } from "react-icons/bi"
import AssignVoucher from "../voucher/Assign"
import { useDispatch, useSelector } from "react-redux"
import {
  getLinkedUsers,
  getVouchers,
  unAssignVoucher,
} from "../voucher/store/voucherSlice"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"

const index = ({ showUsersModal, handleHideUsersModal, selectedItem }) => {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const { linkedUsers, totalPages, loading } = useSelector(
    (state) => state.vouchers
  )
  const darkMode = sessionStorage.getItem("darkMode")

  const columns = [
    {
      key: "title",
      label: "Title",
      cell: (row) => <div className={"text-capitalize"}>{row.title || ""}</div>,
    },
    {
      key: "f_name",
      label: "First Name",
      cell: (row) => <div className={"text-capitalize"}>{row.f_name}</div>,
    },
    {
      key: "l_name",
      label: "Last Name",
      cell: (row) => <div className={"text-capitalize"}>{row.l_name}</div>,
    },

    {
      key: "customerhash",
      label: "Customer Token",
      cell: (row) => <div>{row.customerhash || ""}</div>,
    },
    {
      key: "email",
      label: "Email",
      cell: (row) => <div>{row.email || ""}</div>,
    },
    {
      key: "unassign_voucher",
      label: "UnAssign Voucher",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            title="Unassign"
            className="ms-2"
            size="sm"
            variant={darkMode == "true" ? "outline-primary" : "outline-dark"}
            disabled={selectedItem?.coupon_used}
            onClick={() => handleUnAssign(row)}
          >
            Unassign
          </Button>
        </div>
      ),
    },
    // {
    //   key: "voucher_assign",
    //   label: "Assigned Voucher",
    //   cell: (row) => (
    //     <div className="d-flex">
    //       {row.voucher_assign && JSON.parse(row.voucher_assign).length
    //         ? JSON.parse(row.voucher_assign).map((voucher) => (
    //             <span
    //               className={
    //                 "bg-primary badge fw-medium text-xs text-capitalize me-2"
    //               }
    //             >
    //               {voucher}
    //             </span>
    //           ))
    //         : "Not Assigned"}
    //     </div>
    //   ),
    // },
  ]

  const handleUnAssign = (row) => {
    let obj = {
      voucher_id: selectedItem.coupon_id,
      customerhash: row.customerhash,
    }
    dispatch(unAssignVoucher(obj))
    handleHideUsersModal()
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (selectedItem?.id && showUsersModal)
      dispatch(getLinkedUsers({ voucher_id: selectedItem.id }))
  }, [selectedItem])

  useEffect(() => {
    setUsers(linkedUsers)
  }, [linkedUsers])

  // if (loading) return <LoaderIcon />;
  return (
    <Modal size="xl" show={showUsersModal} onHide={handleHideUsersModal}>
      <Modal.Header closeButton>
        <Modal.Title>Linked Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-wrapper table-responsive">
          <DataTable data={users} columns={columns} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleHideUsersModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default index
