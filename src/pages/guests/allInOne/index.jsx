import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"
import CompletedEvents from "./CompletedEvents"
import { useDispatch, useSelector } from "react-redux"
import {
  getIDList,
  getGuests,
  getGuestTypesList,
  removeCurrentGuest,
} from "../guest/store/guestSlice"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import MultiStepper from "./WizardForm"
import EditGuest from "../guest/EditGuest"
import {
  emptyVehicle,
  getCustomerHashList,
  getDropdownList,
} from "../vehicle/store/vehicleSlice"
import {
  getRetailerList,
  removeAssignedVoucherDetail,
} from "../voucher/store/voucherSlice"
import DeleteGuest from "../guest/DeleteGuest"
import AssignedVoucher from "./AssignedVoucher"
import Loading from "../../../components/Loader/loader"
import {
  MdMessage,
  MdOutlineMarkEmailRead,
  MdOutlinePhoneCallback,
} from "react-icons/md"
import { GoHistory } from "react-icons/go"
import { TbDeviceTabletPlus } from "react-icons/tb"
import AddNote from "../../instructor/assignNotes/AddNote"
import ImportCSV from "./ImportCSV"
import { MdDelete, MdEdit } from "react-icons/md"
import moment from "moment"
import { FcComments } from "react-icons/fc"
import { RiDeleteBin5Line } from "react-icons/ri"
import { IoCloudDownloadOutline } from "react-icons/io5"

const index = () => {
  const [showModal, setShowModal] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showCompletedEventsModal, setShowCompletedEventsModal] =
    useState(false)
  const [importModal, setImportModal] = useState(false)

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
            <RiDeleteBin5Line size={17} color="#bd081c" />
            {/* <MdDelete  size={17} /> */}
          </Button>
          <Button
            title="Create Note"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleAddNoteShowModal(row)}
          >
            <FcComments size={"17"} className="library-icons" />
          </Button>
          <Button
            title="Previous Events"
            className="ms-2"
            size="sm"
            variant="outline-dark"
            onClick={() => handleCompletedEventsShowModal(row)}
          >
            <GoHistory size={"17"} className="library-icons" />
          </Button>
        </div>
      ),
    },
    {
      key: "added_by",
      label: "",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.added_by?.name ? (
            <TbDeviceTabletPlus />
          ) : (
            <IoCloudDownloadOutline />
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      cell: (row) => (
        <div className={"text-capitalize "}>{row.title || "--"}</div>
      ),
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
    },
    {
      key: "voucher_assign",
      label: "Assigned Voucher",
      cell: (row) => (
        // <div className="d-flex justify-content-center">
        //   {row.voucher_assign && JSON.parse(row.voucher_assign).length
        //     ? JSON.parse(row.voucher_assign).map((voucher) => (
        //         <span
        //           className={
        //             "bg-primary badge fw-medium text-xs text-capitalize me-2"
        //           }
        //         >
        //           {voucher}
        //         </span>
        //       ))
        //     : "Not Assigned"}
        // </div>
        <div className="d-flex justify-content-center">
          {row.voucher_assign && JSON.parse(row.voucher_assign).length ? (
            <Button
              title="View Assigned Vouchers"
              className="ms-2"
              size="sm"
              variant="outline-dark"
              onClick={() => handleVoucherShowModal(row)}
            >
              View Vouchers
            </Button>
          ) : (
            "Not Assigned"
          )}
        </div>
      ),
    },
    // {
    //   key: "ownership_id",
    //   label: "Ownership ID",
    //   cell: (row) => <div>{row.ownership_id || ""}</div>,
    // },

    {
      key: "id_type",
      label: "ID Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.id_type || ""}</div>
      ),
    },
    {
      key: "guest_type",
      label: "Guest Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.guest_type || ""}</div>
      ),
    },
    {
      key: "id_number",
      label: "ID Number",
      cell: (row) => <div>{row.id_number || ""}</div>,
    },
    {
      key: "dob",
      label: "Date of Birth",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.dob).format("DD/MM/YYYY") || ""}
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact Number",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.contact || ""}</div>
      ),
    },
    {
      key: "contact_method",
      label: "Contact Method",
      cell: (row) => (
        // <span
        //   className={
        //     "bg-secondary badge fw-medium text-xs text-capitalize me-2"
        //   }
        //   key={method}
        // >
        //   {method}
        // </span>
        <div className="d-flex justify-content-center">
          {JSON.parse(row.contact_method).map((method) =>
            method == "Email" ? (
              <MdOutlineMarkEmailRead
                key={method}
                size={"17"}
                className="m-1"
              />
            ) : (
              <MdOutlinePhoneCallback
                key={method}
                size={"17"}
                className="m-1"
              />
            )
          )}
        </div>
      ),
    },

    {
      key: "updated_by",
      label: "Updated By",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.updated_by?.name
            ? row.updated_by?.name
            : row.added_by?.name || "Sytem"}
        </div>
      ),
    },
  ]

  const dispatch = useDispatch()
  const { users, totalPages, loading } = useSelector((state) => state.guests)

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
    dispatch(removeCurrentGuest())
    dispatch(emptyVehicle())
  }

  const handleEditShowModal = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleEditHideModal = () => {
    setShowEditModal(false)
    setSelectedItem({})
  }

  const handleVoucherShowModal = (item) => {
    setSelectedItem(item)
    setShowVoucherModal(true)
  }

  const handleVoucherHideModal = () => {
    setShowVoucherModal(false)
    setSelectedItem({})
    dispatch(removeAssignedVoucherDetail())
  }

  const handleDeleteShowModal = (row) => {
    setShowDeleteModal(true)
    setSelectedItem(row)
  }

  const handleDeleteHideModal = () => {
    setShowDeleteModal(false)
    setSelectedItem({})
  }

  const handleAddNoteShowModal = (data) => {
    setSelectedItem(data)
    setShowAddNoteModal(true)
  }

  const handleAddNoteHideModal = () => {
    setShowAddNoteModal(false)
    setSelectedItem({})
  }

  const handleCompletedEventsShowModal = (data) => {
    setSelectedItem(data)
    setShowCompletedEventsModal(true)
  }

  const handleCompletedEventsHideModal = () => {
    setShowCompletedEventsModal(false)
    setSelectedItem({})
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getGuests({ query, page, perPage }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  useEffect(() => {
    dispatch(getIDList())
    dispatch(getGuestTypesList())
    dispatch(getDropdownList())
    dispatch(getRetailerList())
    dispatch(getCustomerHashList())
  }, [])

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <Breadcrumb />
      <MultiStepper
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
      <AssignedVoucher
        showVoucherModal={showVoucherModal}
        handleVoucherHideModal={() => handleVoucherHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <AddNote
        showAddNoteModal={showAddNoteModal}
        handleAddNoteHideModal={handleAddNoteHideModal}
        selectedItem={selectedItem}
        type="guestList"
      />

      <CompletedEvents
        showCompletedEventsModal={showCompletedEventsModal}
        handleCompletedEventsHideModal={() => handleCompletedEventsHideModal()}
        selectedItem={selectedItem}
      />

      <ImportCSV
        importModal={importModal}
        handleHideImportModal={() => setImportModal(false)}
      />

      <div className="card">
        <form className="card-body">
          <div className="d-md-flex justify-content-between align-items-center">
            <h2 className="h5">Guest List</h2>
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
                className="btn btn-dark btn-step "
                onClick={() => handleAddShowModal()}
              >
                Add Guest
              </button>
            </div>
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
