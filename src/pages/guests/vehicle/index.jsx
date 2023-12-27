import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../../components/DataTable"
import Breadcrumb from "../../../components/BreadCrumb"
import { Button } from "react-bootstrap"

import AddVehicle from "./AddVehicle"
import { useDispatch, useSelector } from "react-redux"
import {
  emptyVehicle,
  getCustomerHashList,
  getDropdownList,
  getVehicles,
} from "./store/vehicleSlice"
import EditVehicle from "./EditVehicle"
import Pagination from "../../../components/DataTable/Pagination"
import DeleteVehicle from "./DeleteVehicle"
import SearchFilters from "../../../components/DataTable/SearchFilters"
import moment from "moment"
import AddedOption from "../allInOne/AddedOption"
import Loading from "../../../components/Loader/loader"
import { MdDelete, MdEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"

const index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddedOptions, setShowAddedOptions] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  const [addedOptions, setAddedOptions] = useState(null)

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

            {/* <MdDelete size={17} /> */}
          </Button>
        </div>
      ),
    },
    {
      key: "f_name",
      label: "First Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.customer?.f_name || "--"}</div>
      ),
    },
    {
      key: "l_name",
      label: "Last Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.customer?.l_name || "--"}</div>
      ),
    },
    {
      key: "vin",
      label: "VIN",
      cell: (row) => <div className={"text-capitalize"}>{row.vin || "--"}</div>,
    },
    {
      key: "name_plate",
      label: "Name plate",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.name_plate || "--"}</div>
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
      key: "model_description",
      label: "Model description",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.model_description || "--"}</div>
      ),
    },
    {
      key: "ex_color",
      label: "Exterior color",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.ex_color || "--"}</div>
      ),
    },
    {
      key: "in_color",
      label: "Interior color",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.in_color || "--"}</div>
      ),
    },
    {
      key: "engine",
      label: "Engine Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.engine || "--"}</div>
      ),
    },
    {
      key: "fuel_type",
      label: "Fuel Type",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.fuel_type || "--"}</div>
      ),
    },
    {
      key: "added_options",
      label: "Added options",
      cell: (row) => (
        <>
          {row?.added_options ? (
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() =>
                handleAddedOptionsShowModal(
                  JSON.parse(row?.added_options)?.list
                )
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
  const { users, totalPages, loading } = useSelector((state) => state.vehicles)

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

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const getAllUsers = useMemo(() => {
    return (query, page, perPage) => {
      dispatch(getVehicles({ query, page, perPage }))
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
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">Guest Vehicle List</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add Vehicle
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
