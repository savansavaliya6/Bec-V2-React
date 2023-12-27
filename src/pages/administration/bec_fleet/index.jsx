import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"
import EventsList from "./EventsList"
import AddVehicle from "./AddVehicle"
import { useDispatch, useSelector } from "react-redux"
import {
  emptyVehicle,
  getCustomerHashList,
  getDropdownList,
  getBecFeet,
} from "./store/becFleetSlice"
import EditVehicle from "./EditVehicle"
import Pagination from "../../../components/DataTable/Pagination"
import DeleteVehicle from "./DeleteVehicle"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import AddedOption from "../../guests/allInOne/AddedOption"
import moment from "moment"
import AddNote from "./AddNote"

import { MdDelete, MdEdit, MdMessage } from "react-icons/md"
import { AiFillEye } from "react-icons/ai"
import { IoMdEye } from "react-icons/io"
import { FaFilePdf } from "react-icons/fa6"
import { RiDeleteBin5Line } from "react-icons/ri"
import { FcComments } from "react-icons/fc"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddedOptions, setShowAddedOptions] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showEventList, setShowEventList] = useState(false)
  // const [showNotesModal, setShowNotesModal] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const [addedOptions, setAddedOptions] = useState(null)

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => {
        let url = row.build_url

        let modifiedUrl
        if (url && url.includes("jag2")) {
          modifiedUrl =
            url.replace(
              "https://buildyour.jaguar.co.za/jag2/r/summary/_/",
              "https://pdfgen.config.jaguar.com/jag/"
            ) + "/jaguar.pdf"
        } else if (url && url.includes("lr2")) {
          modifiedUrl =
            url.replace(
              "https://buildyour.landrover.co.za/lr2/r/summary/_/",
              "https://pdfgen.config.landrover.com/lr2/"
            ) + "/landrover.pdf"
        } else {
          modifiedUrl = ""
        }

        return (
          <div className="d-flex justify-content-center">
            <Button
              size="sm"
              className="ms-2"
              variant="outline-dark"
              title="Assigned Events"
              onClick={() => handleEventListShowModal(row)}
            >
              <IoMdEye size={"17"} color="#7f8de1" />
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
              title="Edit"
              className="ms-2"
              size="sm"
              variant="outline-dark"
              onClick={() => handleEditShowModal(row)}
            >
              <MdEdit size={17} color="#fe9339" />
            </Button>
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
            <Button
              size="sm"
              title="Brochure PDF"
              className="ms-2"
              variant="outline-dark"
              disabled={!modifiedUrl}
            >
              <a href={modifiedUrl} target="_blank">
                <FaFilePdf size={17} color="grey" />
              </a>
            </Button>
          </div>
        )
      },
    },
    {
      key: "vehicle_utilization",
      label: "Vehicle Utilization",
      cell: (row) => {
        return (
          <div
            className={"bg-secondary badge fw-medium text-xs text-capitalize"}
          >
            {row.vehicle_utilization
              ? row.vehicle_utilization?.toFixed(2) + " %"
              : "0"}
          </div>
        )
      },
    },
    {
      key: "status",
      label: "Status",
      cell: (row) => (
        <div
          className={
            (row.status ? "bg-success" : "bg-secondary") +
            " badge fw-medium text-xs text-capitalize"
          }
        >
          {row.status ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      key: "vin",
      label: "VIN",
      cell: (row) => <div className={"text-uppercase"}>{row.vin || "--"}</div>,
    },
    {
      key: "nameplate",
      label: "Name plate",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.nameplate || "--"}</div>
      ),
    },
    {
      key: "brand",
      label: "Brand",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.brand || "--"}</div>
      ),
    },
    {
      key: "registration_no",
      label: "Registration Number",
      cell: (row) => (
        <div className={"text-uppercase"}>{row.registration_no || "--"}</div>
      ),
    },
    {
      key: "date_of_registration",
      label: "Date Of Registration",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.date_of_registration || "--"}
        </div>
      ),
    },
    {
      key: "modeldesc",
      label: "Model description",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.modeldesc || "--"}</div>
      ),
    },
    {
      key: "exteriorcolor",
      label: "Exterior color",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.exteriorcolor || "--"}</div>
      ),
    },
    {
      key: "interiorcolor",
      label: "Interior color",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.interiorcolor || "--"}</div>
      ),
    },
    {
      key: "enginetype",
      label: "Engine Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.enginetype || "--"}</div>
      ),
    },
    {
      key: "fueltype",
      label: "Fuel Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.fueltype || "--"}</div>
      ),
    },
    {
      key: "added_option",
      label: "Added options",
      cell: (row) => (
        <>
          {row?.added_option ? (
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() =>
                handleAddedOptionsShowModal(JSON.parse(row?.added_option)?.list)
              }
            >
              View Added Options
            </Button>
          ) : (
            "No Added Options"
          )}
        </>
      ),
    },

    {
      key: "kms",
      label: "Kms",
      cell: (row) => <div className={"text-capitalize"}>{row.kms || "--"}</div>,
    },
    // {
    //   key: "notes",
    //   label: "Notes",
    //   cell: (row) => (
    //     <>
    //       {row?.notes && Array.isArray(row.notes) && row?.notes.length ? (
    //         <Button
    //           variant="outline-dark"
    //           size="sm"
    //           onClick={() => handleNotesShowModal(row)}
    //         >
    //           View Notes
    //         </Button>
    //       ) : (
    //         "No Notes"
    //       )}
    //     </>
    //   ),
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
    {
      key: "updated_at",
      label: "Updated At",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {moment(row.updated_at).format("DD-MM-YYYY") || "--"}
        </div>
      ),
    },
  ]

  const dispatch = useDispatch()
  const { users, totalPages, loading } = useSelector((state) => state.fleets)

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
    dispatch(emptyVehicle())
  }

  const handleEditShowModal = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleEditHideModal = () => {
    setShowEditModal(false)
    setSelectedItem({})
    dispatch(emptyVehicle())
  }

  const handleDeleteShowModal = (row) => {
    setShowDeleteModal(true)
    setSelectedItem(row)
  }

  const handleDeleteHideModal = () => {
    setShowDeleteModal(false)
    setSelectedItem({})
  }

  const handleAddedOptionsShowModal = (data) => {
    setShowAddedOptions(true)
    setAddedOptions(data)
  }

  const handleAddedOptionsHideModal = () => {
    setShowAddedOptions(false)
    setAddedOptions(null)
  }

  // const handleNotesShowModal = (data) => {
  //   setShowNotesModal(true)
  //   setSelectedItem(data)
  // }

  // const handleNotesHideModal = () => {
  //   setShowNotesModal(false)
  //   setSelectedItem({})
  // }

  const handleAddNoteShowModal = (data) => {
    setSelectedItem(data)
    setShowAddNoteModal(true)
  }

  const handleAddNoteHideModal = () => {
    setShowAddNoteModal(false)
    setSelectedItem({})
  }

  const handleEventListShowModal = (data) => {
    setSelectedItem(data)
    setShowEventList(true)
  }

  const handleEventListHideModal = () => {
    setShowEventList(false)
    setSelectedItem({})
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getBecFeet({ query, page, perPage }))
    }
  }, [dispatch])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  useEffect(() => {
    dispatch(getCustomerHashList())
    dispatch(getDropdownList())
  }, [])

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <Breadcrumb />
      <AddVehicle
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <EditVehicle
        showEditModal={showEditModal}
        handleEditHideModal={handleEditHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <DeleteVehicle
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <AddedOption
        showAddedOptions={showAddedOptions}
        handleAddedOptionsHideModal={handleAddedOptionsHideModal}
        data={addedOptions && addedOptions}
      />
      <EventsList
        showEventList={showEventList}
        handleEventListHideModal={handleEventListHideModal}
        selectedItem={selectedItem}
      />
      {/* <Notes
        showNotesModal={showNotesModal}
        handleNotesHideModal={handleNotesHideModal}
        selectedItem={selectedItem}
      /> */}
      <AddNote
        showAddNoteModal={showAddNoteModal}
        handleAddNoteHideModal={handleAddNoteHideModal}
        selectedItem={selectedItem}
      />
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">BEC Fleet</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add BEC Vehicle
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
