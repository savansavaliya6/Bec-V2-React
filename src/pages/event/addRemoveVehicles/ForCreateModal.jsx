import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../components/DataTable/Pagination"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment"
import { Checkbox } from "@mui/material"
import { getBecFeet } from "../../administration/bec_fleet/store/becFleetSlice"
import AddEventGuest from "../addRemoveGuests/AddEventGuest"
import { getUnAssignedVehicles } from "../events/store/eventsSlice"
import Loading from "../../../components/Loader/loader"

const index = ({
  showAddVehicleModal,
  handleAddVehicleHideModal,
  handleSave,
  vehiclesArray,
  handleCheck,
}) => {
  //   const [selectedItem, setSelectedItem] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    {
      key: "index",
      label: "Select",
      cell: (row) => (
        <div className={"text-capitalize"}>
          <Checkbox
            title="Edit"
            className="ms-2 checkboxes"
            size="sm"
            onChange={(e) => handleCheck(e, row.id)}
            checked={
              // selectedItem.includes(row.id) ||
              vehiclesArray?.includes(row.id)
            }
            variant="outline-dark"
          ></Checkbox>
        </div>
      ),
    },

    {
      key: "registration_no",
      label: "Registration No",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.registration_no || "--"}</div>
      ),
    },
    {
      key: "nameplate",
      label: "Name plate",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.nameplate || "--"}</div>
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
      key: "vin",
      label: "VIN",
      cell: (row) => <div className={"text-capitalize"}>{row.vin || "--"}</div>,
    },
    // {
    //   key: "enginetype",
    //   label: "Engine Type",
    //   cell: (row) => (
    //     <div className={"text-capitalize"}>{row.enginetype || "--"}</div>
    //   ),
    // },

    // {
    //   key: "added_option",
    //   label: "Added options",
    //   cell: (row) => (
    //     <>
    //       {row?.added_option ? (
    //         <Button
    //           variant="outline-dark"
    //           size="sm"
    //           onClick={() =>
    //             handleAddedOptionsShowModal(JSON.parse(row?.added_option)?.list)
    //           }
    //         >
    //           View Added Options
    //         </Button>
    //       ) : (
    //         "No Added Options"
    //       )}
    //     </>
    //   ),
    // },

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
    //       {row?.notes && JSON.parse(row?.notes).length ? (
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
  ]

  const dispatch = useDispatch()
  const {
    unAssignedVehicles: { unAssignedVehicles, totalPages, loading },
  } = useSelector((state) => state.events)

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

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getUnAssignedVehicles({ query, page, perPage }))
    }
  }, [])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  return (
    <>
      <Modal
        size="xl"
        show={showAddVehicleModal}
        onHide={handleAddVehicleHideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vehicles to Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <form className="card-body">
              <hr></hr>
              <SearchFilters
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                itemsPerPage={itemsPerPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
              />
              <div className="table-wrapper">
                <div className="table-wrapper table-responsive">
                  {/* {loading ? (
                <Loading />
              ) : vehicles && vehicles.length ? (
                <> */}
                  <DataTable data={unAssignedVehicles} columns={columns} />
                </div>
              </div>
            </form>
            <Pagination
              currentPage={currentPage}
              totalPages={
                unAssignedVehicles ? Math.ceil(totalPages / itemsPerPage) : 0
              }
              onPageChange={handlePageChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => handleAddVehicleHideModal(vehiclesArray)}
          >
            Add Vehicles
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default index
