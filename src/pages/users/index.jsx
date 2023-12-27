import React, { useEffect, useMemo, useState } from "react"
import DataTable from "../../components/DataTable"
import Breadcrumb from "../../components/BreadCrumb"
import { Button } from "react-bootstrap"

import AddUser from "./addUser"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsers, updateUser } from "./store/userSlice"
import EditUser from "./EditUser"
import Pagination from "../../components/DataTable/Pagination"
import DeleteUser from "./DeleteUser"
import SearchFilters from "../../components/DataTable/SearchFilters"
import { MdDelete, MdEdit } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import { Avatar, Chip } from "@mui/material"
import { RiDeleteBin5Line } from "react-icons/ri"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

const index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState("")

  function stringToColor(string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = "#"

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: "2.5rem",
        height: "2.5rem",
      },
      children: `${name.split(" ")[0][0].toUpperCase()}${name
        .split(" ")[1][0]
        .toUpperCase()}`,
    }
  }

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
            //onClick={() => handleAddShowModal(row, "edit")}
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
      key: "avatar",
      label: "Avatar",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.avatar ? (
            <img class="circular--square" src={row.avatar} />
          ) : (
            // <FaCircleUser size={32} />
            <div className="d-flex justify-content-center">
              <Avatar {...stringAvatar(`${row.f_name} ${row.l_name}`)} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "f_name",
      label: "First Name",
      cell: (row) => <div className={"text-capitalize"}>{row.f_name}</div>,
      // headerStyle: {
      //   backgroundColor: "grey",
      // },

      // cellStyle: {
      //   backgroundColor: "yellow",
      // },
    },
    {
      key: "l_name",
      label: "Last Name",
      cell: (row) => <div className={"text-capitalize"}>{row.l_name}</div>,
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      cell: (row) => (
        // <div
        //   className={
        //     (row.role == "admin" ? "bg-secondary" : "bg-success") +
        //     " badge fw-medium text-xs text-capitalize"
        //   }
        // >
        //   {row.role}
        // </div>
        <Chip
          className="text-capitalize"
          variant="outlined"
          size="small"
          label={row.role}
          color={row.role == "admin" ? "primary" : "warning"}
        />
      ),
    },
    {
      key: "is_instructor",
      label: "Instructor",
      cell: (row) => (
        // <div
        //   className={
        //     (row.is_instructor == 1 ? "bg-success" : "bg-secondary") +
        //     " badge  fw-medium text-xs text-capitalize"
        //   }
        // >
        //   {row.is_instructor == 1 ? "Yes" : "No"}
        // </div>
        <Chip
          variant="outlined"
          label={row.is_instructor == 1 ? "Yes" : "No"}
          size="small"
          color={row.is_instructor == 1 ? "primary" : "error"}
        />
      ),
    },
    {
      key: "rating",
      label: "Avg. rating",
      cell: (row) => {
        let sum = 0
        if (row.is_instructor == 1 && row.instructor_rating.length) {
          sum = row.instructor_rating.reduce((accumulator, currentValue) => {
            return Number(accumulator) + Number(currentValue.averageInstructor)
          }, 0)
          sum = Number(sum) / Number(row.instructor_rating.length)
        }

        return (
          <>
            {row.is_instructor ? (
              <>
                {row.instructor_rating.length ? (
                  // <Chip
                  //   variant="outlined"
                  //   label={String(sum)}
                  //   size="small"
                  //   color={sum > 6 ? "success" : sum < 3 ? "error" : "warning"}
                  // />
                  <StarRating rating={sum} />
                ) : (
                  <div
                    className={
                      (row.is_instructor == 1
                        ? row.instructor_rating.length
                          ? "bg-success"
                          : "bg-secondary"
                        : "bg-secondary") +
                      " badge fw-medium text-xs text-capitalize"
                    }
                  >
                    {"No Ratings"}
                  </div>
                )}
              </>
            ) : (
              <Chip
                variant="outlined"
                label={"Not an Instructor"}
                size="small"
                color={"error"}
              />
            )}
          </>
        )
      },
    },
  ]

  const dispatch = useDispatch()
  const { users, totalPages, loading } = useSelector((state) => state.users)

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
      dispatch(getUsers({ query, page, perPage }))
    }
  }, [dispatch])

  useEffect(() => {
    getAllUsers(searchTerm, currentPage, itemsPerPage)
  }, [searchTerm, itemsPerPage, currentPage])

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="1x"
            className="me-1"
            style={{ color: "#ffc107" }}
          />
        )
      } else if (index === fullStars && hasHalfStar) {
        return (
          <FontAwesomeIcon
            icon={faStarHalf}
            key={index}
            size="1x"
            className="me-1"
            style={{ color: "#ffc107" }}
          />
        )
      } else {
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="1x"
            className="me-1"
            style={{ color: "#d4d4d4" }}
          />
        )
      }
    })

    return <>{stars}</>
  }

  // if (loading) return <LoaderIcon />;
  return (
    <>
      <Breadcrumb />
      <AddUser
        showModal={showModal}
        handleAddHideModal={handleAddHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <EditUser
        showEditModal={showEditModal}
        handleEditHideModal={handleEditHideModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <DeleteUser
        showDeleteModal={showDeleteModal}
        handleDeleteHideModal={() => handleDeleteHideModal()}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <div className="card">
        <form className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">User List</h2>
            <button
              type="button"
              className="btn btn-dark btn-step"
              onClick={() => handleAddShowModal()}
            >
              Add User
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
